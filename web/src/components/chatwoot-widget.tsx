/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { normalizeInterfaceLanguage } from '@/i18n/languages'
import { getSelf } from '@/lib/api'
import { formatQuotaWithCurrency } from '@/lib/currency'
import { formatTimestampToDate } from '@/lib/format'
import { useAuthStore, type AuthUser } from '@/stores/auth-store'

const CHATWOOT_SCRIPT_ID = 'chatwoot-sdk'
const DEFAULT_CHATWOOT_BASE_URL = 'https://app.chatwoot.com'
const CHATWOOT_WEBSITE_TOKEN = 'PTHtTtyuUqR16YoY8Gmr8F8f'
const CHATWOOT_SELF_REFRESH_TTL_MS = 60_000
const CHATWOOT_QUOTA_FORMAT_OPTIONS = {
  digitsLarge: 2,
  digitsSmall: 4,
  abbreviate: false,
} as const

type ChatwootEnv = {
  VITE_CHATWOOT_WEBSITE_TOKEN?: string
  VITE_CHATWOOT_BASE_URL?: string
}

type ChatwootConfig = {
  websiteToken: string
  baseUrl: string
}

type ChatwootSettings = NonNullable<Window['chatwootSettings']>

type ChatwootUserPayload = {
  identifier: string
  user: {
    name: string
    email?: string
  }
  customAttributes: MoxaiChatwootAttributes
}

type MoxaiChatwootAccountStatus = 'active' | 'disabled' | 'unknown'

type MoxaiChatwootAttributes = {
  mox_user_id: string
  mox_username: string
  mox_email: string
  mox_account_balance: string
  mox_total_consumption: string
  mox_account_status: MoxaiChatwootAccountStatus
  mox_total_recharge: number // 累计充值金额，直接返回 USD
  mox_monthly_spend: string // 本月消费额度，内部额度/积分口径
  mox_registered_at: string // 用户注册日期
  mox_last_login_at: string // 最近登录日期
}

type SyncChatwootSessionOptions = {
  refreshSelf?: boolean
}

let selfRefreshPromise: Promise<AuthUser | null> | null = null
let lastSelfRefreshAt = 0

// 获取 Chatwoot 初始化配置，当前使用内置的网站 token，并允许通过环境变量覆盖服务地址。
function getChatwootConfig(env: ChatwootEnv): ChatwootConfig | null {
  return {
    websiteToken: CHATWOOT_WEBSITE_TOKEN,
    baseUrl: env.VITE_CHATWOOT_BASE_URL || DEFAULT_CHATWOOT_BASE_URL,
  }
}

// 将系统语言代码规范化为 Chatwoot 支持的 locale 格式。
function normalizeChatwootLocale(language?: string | null): string {
  if (!language) return 'en'
  const normalized = language.trim().replaceAll('_', '-').toLowerCase()

  if (['zh', 'zhcn', 'zh-cn', 'zh-hans'].includes(normalized)) return 'zh_CN'
  if (['zhtw', 'zh-tw', 'zh-hk', 'zh-hant'].includes(normalized)) return 'zh_TW'

  if (['en', 'fr', 'ru', 'ja', 'vi'].includes(normalized)) {
    return normalized
  }

  return 'en'
}

// 构建 Chatwoot 小组件设置，包括位置、类型、标题和语言。
function buildChatwootSettings(
  launcherTitle: string,
  language: string
): ChatwootSettings {
  return {
    position: 'left',
    type: 'standard',
    launcherTitle,
    locale: normalizeChatwootLocale(language),
    useBrowserLanguage: false,
  }
}

// 将 MoxAI 用户状态映射为同步给 Chatwoot 的账号状态。
function mapChatwootAccountStatus(status?: number): MoxaiChatwootAccountStatus {
  if (status === 1) return 'active'
  if (status === 2) return 'disabled'
  return 'unknown'
}

// 根据当前用户信息构建同步到 Chatwoot 的自定义联系人字段。
function buildMoxaiChatwootAttributes(user: AuthUser): MoxaiChatwootAttributes {
  const identifier = String(user.id) || ''
  const username = user.username || user?.display_name || ''
  return {
    mox_user_id: identifier,
    mox_username: username,
    mox_email: user?.email || '',
    mox_account_balance: formatQuotaWithCurrency(
      user.quota ?? 0,
      CHATWOOT_QUOTA_FORMAT_OPTIONS
    ), //账户余额
    mox_total_consumption: formatQuotaWithCurrency(
      user.used_quota ?? 0,
      CHATWOOT_QUOTA_FORMAT_OPTIONS
    ), //累计消费

    mox_account_status: mapChatwootAccountStatus(user.status), //账户状态
    mox_total_recharge: user.mox_total_recharge || 0, //累计充值金额，直接返回 USD
    mox_monthly_spend: formatQuotaWithCurrency(
      user.mox_monthly_spend ?? 0,
      CHATWOOT_QUOTA_FORMAT_OPTIONS
    ), //本月消费额度，内部额度/积分口径
    mox_registered_at: formatTimestampToDate(user.mox_registered_at, 'seconds'), // 用户注册日期
    mox_last_login_at: formatTimestampToDate(user.mox_last_login_at, 'seconds'), // 最近登录日期
  }
}

// 构建 Chatwoot setUser 所需的用户资料和自定义字段载荷。
function buildChatwootUserPayload(user: AuthUser): ChatwootUserPayload {
  const identifier = String(user?.id) || ''
  const name = user?.display_name?.trim() || user?.username || ''

  return {
    identifier,
    user: {
      name: name,
      email: user?.email || '',
    },
    customAttributes: buildMoxaiChatwootAttributes(user),
  }
}

// 将当前登录用户同步到 Chatwoot；用户为空时重置 Chatwoot 会话。
function syncMoxaiUserToChatwoot(user: AuthUser | null): void {
  if (!window.$chatwoot) return

  if (!user) {
    try {
      window.$chatwoot.reset()
    } catch (error) {
      console.warn('[chatwoot] reset failed', error)
    }
    return
  }

  const payload = buildChatwootUserPayload(user)
  try {
    window.$chatwoot.setUser(payload.identifier, payload.user)
  } catch (error) {
    console.warn('[chatwoot] set user failed', error)
  }

  try {
    window.$chatwoot.setCustomAttributes(payload.customAttributes)
  } catch (error) {
    console.warn('[chatwoot] set custom attributes failed', error)
  }
}

// 启动 Chatwoot SDK，并通过全局标记避免重复初始化。
function runChatwoot(config: ChatwootConfig): void {
  if (window.__chatwootInitialized) return
  window.chatwootSDK?.run({
    websiteToken: config.websiteToken,
    baseUrl: config.baseUrl,
  })
  window.__chatwootInitialized = true
}

// 同步 Chatwoot 小组件语言。
function syncChatwootLocale(language: string): void {
  window.$chatwoot?.setLocale(normalizeChatwootLocale(language))
}

// 判断是否已经超过刷新当前用户资料的最小时间间隔。
function canRefreshSelf(): boolean {
  return Date.now() - lastSelfRefreshAt >= CHATWOOT_SELF_REFRESH_TTL_MS
}

// 从后端重新获取当前用户资料，并复用进行中的请求避免并发刷新。
async function refreshSelfForChatwoot(): Promise<AuthUser | null> {
  if (selfRefreshPromise) return selfRefreshPromise
  lastSelfRefreshAt = Date.now()
  selfRefreshPromise = getSelf({
    skipBusinessError: true,
    skipErrorHandler: true,
  })
    .then((res) => {
      if (res?.success && res.data) return res.data as AuthUser
      return null
    })
    .catch((error) => {
      console.warn('[chatwoot] refresh self failed', error)
      return null
    })
    .finally(() => {
      selfRefreshPromise = null
    })

  return selfRefreshPromise
}

// 刷新当前用户资料后，同步 Zustand 登录态和 Chatwoot 联系人字段。
async function refreshAndSyncChatwootUser(cachedUser: AuthUser): Promise<void> {
  const expectedUserId = cachedUser.id
  const freshUser = await refreshSelfForChatwoot()
  if (!freshUser || freshUser.id !== expectedUserId) return

  const { auth } = useAuthStore.getState()
  if (auth.user?.id !== expectedUserId) return

  auth.setUser(freshUser)
  syncMoxaiUserToChatwoot(freshUser)
}

// 同步 Chatwoot 用户信息，并按需刷新最新用户资料。
function syncChatwootUserSession(
  user: AuthUser | null,
  options: SyncChatwootSessionOptions = {}
): void {
  !options.refreshSelf && syncMoxaiUserToChatwoot(user)
  // 用户存在\refreshSelf: true\距离上次刷新超过 60 秒,请求self
  if (!user || !options.refreshSelf || !canRefreshSelf()) return
  void refreshAndSyncChatwootUser(user)
}

// 同步 Chatwoot 会话的语言和用户信息，并按需刷新最新用户资料。
function syncChatwootSession(
  user: AuthUser | null,
  language: string,
  options: SyncChatwootSessionOptions = {}
): void {
  syncChatwootLocale(language)
  syncChatwootUserSession(user, options)
}

// 加载 Chatwoot SDK 脚本；脚本已存在时复用现有脚本或 SDK 实例。
// 如果 SDK 已存在，直接 runChatwoot
// 如果页面已有脚本，监听它 load 后运行
// 否则插入 ${baseUrl}/packs/js/sdk.js
// runChatwoot 用 window.__chatwootInitialized 防止重复初始化
function loadChatwootScript(
  config: ChatwootConfig,
  settings: ChatwootSettings
): void {
  window.chatwootSettings = settings

  if (window.chatwootSDK) {
    runChatwoot(config)
    return
  }

  const existingScript = document.getElementById(CHATWOOT_SCRIPT_ID)
  if (existingScript) {
    existingScript.addEventListener('load', () => runChatwoot(config), {
      once: true,
    })
    return
  }

  const script = document.createElement('script')
  script.id = CHATWOOT_SCRIPT_ID
  script.src = `${config.baseUrl}/packs/js/sdk.js`
  script.async = true
  script.onload = () => runChatwoot(config)

  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode?.insertBefore(script, firstScript)
}
// useEffect([locale])：只执行 syncChatwootLocale(locale)
// useEffect([user])：只执行 syncMoxaiUserToChatwoot(user)，必要时刷新 self
// chatwoot:ready：执行初始化同步，包含 locale + user
// 点击打开 Chatwoot：按需刷新用户，不负责 locale

// Chatwoot 小组件挂载组件，负责初始化脚本并保持语言、用户资料同步。
export function ChatwootWidget() {
  const user = useAuthStore((state) => state.auth.user)
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language || 'en'
  const locale = normalizeInterfaceLanguage(language)

  useEffect(() => {
    const config = getChatwootConfig(import.meta.env)
    if (!config) return

    loadChatwootScript(
      config,
      buildChatwootSettings(t('Online Support'), locale)
    )
  }, [locale, t])

  useEffect(() => {
    syncChatwootLocale(locale)
  }, [locale])

  useEffect(() => {
    syncChatwootUserSession(user, { refreshSelf: false })
  }, [user])

  useEffect(() => {
    // Chatwoot SDK 就绪后同步当前会话；窗口打开时只刷新用户资料。
    const handleReady = () => {
      syncChatwootSession(user, locale, { refreshSelf: false })
      syncChatwootLocale(locale)
    }
    const handleOpened = () => {
      syncChatwootUserSession(user, { refreshSelf: true })
    }

    window.addEventListener('chatwoot:ready', handleReady)
    window.addEventListener('chatwoot:opened', handleOpened)

    return () => {
      window.removeEventListener('chatwoot:ready', handleReady)
      window.removeEventListener('chatwoot:opened', handleOpened)
    }
  }, [user, locale])

  return null
}
