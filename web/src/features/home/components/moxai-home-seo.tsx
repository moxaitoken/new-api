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

const SEO_TITLE = 'MoxAI AI Gateway - Token, Cost and API Key Management'
const SEO_DESCRIPTION =
  'MoxAI provides a lightweight and trusted AI usage control layer for SMBs, unifying access to models such as OpenAI, Claude, Gemini, DeepSeek, Qwen, and others, while centrally managing API keys, team permissions, token usage, and project costs. Empowering teams to use AI with greater control.'
const SEO_KEYWORDS =
  'MoxAI, AI Gateway, multi-model API, API key management, token usage, AI cost attribution, OpenAI gateway, Claude gateway, Gemini gateway'
const CANONICAL_URL = 'https://moxai.ai/'
const OG_IMAGE = 'https://moxai.ai/moxai-og.png'

// 统一描述要操作的 meta 选择器，兼容 name 与 Open Graph 的 property 两类属性。
type MetaSelector =
  | { attr: 'name'; key: string }
  | { attr: 'property'; key: string }

// 离开 MoxAI 首页时恢复系统标题；优先使用本地缓存里的后台配置名称。
function getSystemTitleFallback(previousTitle: string) {
  try {
    const saved = window.localStorage.getItem('status')
    if (!saved) return previousTitle
    const status = JSON.parse(saved)
    return typeof status?.system_name === 'string' && status.system_name.trim()
      ? status.system_name
      : previousTitle
  } catch {
    return previousTitle
  }
}

// 创建或更新指定 meta 标签，并返回清理函数，保证组件卸载后能还原原始 head 状态。
function upsertMeta(selector: MetaSelector, content: string) {
  const query = `meta[${selector.attr}="${selector.key}"]`
  let element = document.head.querySelector(query) as HTMLMetaElement | null
  const created = !element
  const previousContent = element?.getAttribute('content')

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(selector.attr, selector.key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)

  return () => {
    if (created) {
      element?.remove()
      return
    }
    if (previousContent === null || previousContent === undefined) {
      element?.removeAttribute('content')
      return
    }
    element?.setAttribute('content', previousContent)
  }
}

// 首页需要固定 canonical，避免多入口路径导致搜索引擎收录重复页面。
function upsertCanonical(href: string) {
  let element = document.head.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null
  const created = !element
  const previousHref = element?.getAttribute('href')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)

  return () => {
    if (created) {
      element?.remove()
      return
    }
    if (previousHref === null || previousHref === undefined) {
      element?.removeAttribute('href')
      return
    }
    element?.setAttribute('href', previousHref)
  }
}

type JsonLd = Record<string, unknown>

function upsertJsonLd(id: string, data: JsonLd) {
  let element = document.getElementById(id) as HTMLScriptElement | null
  const created = !element
  const previousText = element?.textContent

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)

  return () => {
    if (created) {
      element?.remove()
      return
    }
    element.textContent = previousText ?? ''
  }
}

function buildJsonLd(description: string) {
  return [
    {
      id: 'moxai-organization-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MoxAI',
        url: CANONICAL_URL,
        logo: 'https://moxai.ai/moxai-logo.png',
        description,
      },
    },
    {
      id: 'moxai-website-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'MoxAI',
        url: CANONICAL_URL,
        description,
      },
    },
    {
      id: 'moxai-software-application-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'MoxAI',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: CANONICAL_URL,
        image: OG_IMAGE,
        description,
        offers: {
          priceCurrency: 'USD',
        },
      },
    },
  ]
}

export function MoxAIHomeSEO() {
  const { t } = useTranslation()

  useEffect(() => {
    if (typeof document === 'undefined') return

    // SEO 文案仍走 i18n，确保切换语言后 title、description 等内容同步刷新。
    const seo = {
      title: t(SEO_TITLE),
      description: t(SEO_DESCRIPTION),
      keywords: t(SEO_KEYWORDS),
    }
    const previousTitle = document.title
    document.title = seo.title

    // 所有写入 head 的副作用都收集清理函数，卸载时按相反顺序恢复。
    const cleanups = [
      upsertMeta({ attr: 'name', key: 'title' }, seo.title),
      upsertMeta({ attr: 'name', key: 'description' }, seo.description),
      upsertMeta({ attr: 'name', key: 'keywords' }, seo.keywords),
      upsertMeta(
        { attr: 'name', key: 'robots' },
        'index,follow,max-image-preview:large'
      ),
      upsertMeta({ attr: 'name', key: 'theme-color' }, '#fbfaf7'),
      upsertMeta({ attr: 'property', key: 'og:type' }, 'website'),
      upsertMeta({ attr: 'property', key: 'og:site_name' }, 'MoxAI'),
      upsertMeta({ attr: 'property', key: 'og:title' }, seo.title),
      upsertMeta({ attr: 'property', key: 'og:description' }, seo.description),
      upsertMeta({ attr: 'property', key: 'og:url' }, CANONICAL_URL),
      upsertMeta({ attr: 'property', key: 'og:image' }, OG_IMAGE),
      upsertMeta({ attr: 'property', key: 'og:image:width' }, '1200'),
      upsertMeta({ attr: 'property', key: 'og:image:height' }, '630'),
      upsertMeta({ attr: 'property', key: 'og:image:alt' }, 'MoxAI AI Gateway'),
      upsertMeta({ attr: 'name', key: 'twitter:card' }, 'summary_large_image'),
      upsertMeta({ attr: 'name', key: 'twitter:title' }, seo.title),
      upsertMeta({ attr: 'name', key: 'twitter:description' }, seo.description),
      upsertMeta({ attr: 'name', key: 'twitter:image' }, OG_IMAGE),
      upsertMeta(
        { attr: 'name', key: 'twitter:image:alt' },
        'MoxAI AI Gateway'
      ),
      upsertCanonical(CANONICAL_URL),
      ...buildJsonLd(seo.description).map((schema) =>
        upsertJsonLd(schema.id, schema.data)
      ),
    ]

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup())
      document.title = getSystemTitleFallback(previousTitle)
      const metaTitle = document.querySelector(
        'meta[name="title"]'
      ) as HTMLMetaElement | null
      if (metaTitle) metaTitle.setAttribute('content', document.title)
    }
  }, [t])

  return null
}
