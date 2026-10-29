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

import type { Solution } from './data'

// 统一描述要操作的 meta 选择器，兼容标准 meta 与 Open Graph 标签。
type MetaSelector =
  | { attr: 'name'; key: string }
  | { attr: 'property'; key: string }

// 社交分享图，后续 og:image、twitter:image、JSON-LD image 都复用它。
const OG_IMAGE = 'https://moxai.ai/moxai-og.png'

// 离开方案页时恢复系统标题；优先使用本地缓存里的后台配置名称。
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

// 创建或更新指定 meta 标签，并返回清理函数，保证组件卸载后恢复旧值。
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

// 方案页 canonical 来自具体 solution 配置，避免同一方案被多 URL 重复收录。
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

// 为每个方案注入独立的 SoftwareApplication 结构化数据。
function upsertJsonLd(
  solution: Solution,
  seo: {
    description: string
    schemaName: string
  }
) {
  const id = `moxai-solution-jsonld-${solution.slug}`
  let element = document.getElementById(id) as HTMLScriptElement | null
  const created = !element
  const previousText = element?.textContent

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: seo.schemaName,
    applicationCategory: solution.seo.schemaCategory,
    operatingSystem: 'Web',
    url: solution.seo.canonicalUrl,
    image: OG_IMAGE,
    description: seo.description,
    offers: {
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
    },
    provider: {
      '@type': 'Organization',
      name: 'MoxAI',
      url: 'https://moxai.ai',
    },
  })

  return () => {
    if (created) {
      element?.remove()
      return
    }
    element.textContent = previousText ?? ''
  }
}

export function MoxAISolutionSEO(props: { solution: Solution }) {
  const { solution } = props
  const { t } = useTranslation()

  useEffect(() => {
    if (typeof document === 'undefined') return

    // solution 中保存英文源文案，运行时通过 i18n 转成当前语言的 SEO 内容。
    const seo = {
      title: t(solution.seo.title),
      description: t(solution.seo.description),
      keywords: t(solution.seo.keywords),
      ogDescription: t(solution.seo.ogDescription),
      twitterDescription: t(solution.seo.twitterDescription),
      schemaName: t(solution.seo.schemaName),
    }
    const previousTitle = document.title
    document.title = seo.title

    // 记录所有 head 写入操作的清理函数，路由切换或卸载时恢复现场。
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
      upsertMeta(
        { attr: 'property', key: 'og:description' },
        seo.ogDescription
      ),
      upsertMeta(
        { attr: 'property', key: 'og:url' },
        solution.seo.canonicalUrl
      ),
      upsertMeta({ attr: 'property', key: 'og:image' }, OG_IMAGE),
      upsertMeta({ attr: 'name', key: 'twitter:card' }, 'summary_large_image'),
      upsertMeta({ attr: 'name', key: 'twitter:title' }, seo.title),
      upsertMeta(
        { attr: 'name', key: 'twitter:description' },
        seo.twitterDescription
      ),
      upsertMeta({ attr: 'name', key: 'twitter:image' }, OG_IMAGE),
      upsertCanonical(solution.seo.canonicalUrl),
      upsertJsonLd(solution, seo),
    ]

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup())
      document.title = getSystemTitleFallback(previousTitle)
      const metaTitle = document.querySelector(
        'meta[name="title"]'
      ) as HTMLMetaElement | null
      if (metaTitle) metaTitle.setAttribute('content', document.title)
    }
  }, [solution, t])

  return null
}
