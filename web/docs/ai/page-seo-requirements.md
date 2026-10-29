# MoxAI Page SEO Requirements

官网、公开页、营销页、落地页和文档页默认必须包含 SEO 信息。

后台页面不需要完整 SEO，但需要清晰的页面标题、面包屑和路由命名。

新创建的营销页和落地页可结合 `docs/ai/page-animation-requirements.md` 使用动画。首屏标题默认保持静态 HTML/React 文案；只有专题页明确需要“打字/流式”表达时，才使用流式文字动效，并且必须保留完整 H1 文案、支持 `prefers-reduced-motion: reduce`。

## 必填项

公开页面的 `<head>` 至少包含：

- 唯一 `<title>`，建议格式：`页面核心关键词 | MoxAI`
- 唯一 `<meta name="description">`，建议 80-160 个中文字符，包含目标客群、核心问题和 MoxAI 价值
- `<meta name="keywords">`，包含核心行业词、产品词和品牌词
- `<meta name="robots" content="index,follow">`
- `<meta name="theme-color" content="#fbfaf7">`
- `<link rel="canonical">`，使用生产 URL
- favicon：`assets/moxai-favicon-icon.png`
- Open Graph：
  - `og:type`
  - `og:site_name`
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:image`
- Twitter Card：
  - `twitter:card`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
- JSON-LD 结构化数据，优先使用 `SoftwareApplication`

## URL 规则

原型文件可以放在 `prototype/` 下，但 SEO 中的 canonical 和分享 URL 应使用未来生产路径：

- 官网主页：`https://moxai.ai/`
- 行业解决方案页：`https://moxai.ai/solutions/<slug>`
- 文档页：`https://moxai.ai/docs/<slug>`
- 运营活动页：`https://moxai.ai/campaigns/<slug>`

## 默认 OG 图片

在正式制作专用分享图前，默认使用：

`https://moxai.ai/assets/moxai-logo-horizontal.png`

后续建议补充标准 OG 图：

- 尺寸：1200 x 630
- 内容：Logo、页面标题、核心卖点
- 风格：与官网一致，浅色网格背景、深色大标题、青蓝/珊瑚强调色

## 页面文案原则

- 标题必须包含该页面的行业或客群关键词。
- Description 必须说明 MoxAI 解决的核心问题：多模型接入、API Key 权限、Token 用量、成本归因。
- 不要把 MoxAI 描述成聊天机器人或新的 AI 模型。
- 对行业落地页，优先使用行业语言，而不是泛泛的“AI 管理平台”。

## 检查清单

创建新页面前确认：

- 页面是否有唯一 SEO title？
- 页面是否有唯一 description？
- canonical 是否是生产 URL？
- OG/Twitter 信息是否与页面主题一致？
- JSON-LD 是否能表达产品类型和页面用途？
- 页面 H1 是否与 title 方向一致，但不完全重复？
