# MoxAI UI Style Guide

本文档定义 MoxAI 官网、营销页和产品前端的统一视觉规范。自 2026-06-12 起，前端默认基于官方 Default 模板迭代，所有新页面和改版应尽量保持 Default 模板的技术栈、类名风格、布局习惯和组件观感。

关联文档：

- `docs/ai/page-seo-requirements.md`
- `docs/ai/page-animation-requirements.md`
- `docs/ai/product/moxai-frontend-visual-unification-prd.md`

## 1. 前端技术基线

后续工程化到 React 时，应保留这些视觉语义，而不是重新设计一套组件外观。

## 2. 设计原则

MoxAI 面向中小企业和 B2B 团队，视觉表达应体现：

- 清晰
- 可控
- 专业
- 可信
- 轻量
- 工具感
- B2B SaaS
- AI Infrastructure

实现原则：

- 优先复用 Default 模板现有结构和 Tailwind 类。
- 不重写全局设计系统，除非现有模板确实无法承载。
- 新增组件先找模板中相近结构：导航、卡片、价格卡、代码块、数据卡、Logo 跑马灯、CTA 区。
- MoxAI 品牌色作为轻量覆盖，不改变模板布局骨架。

## 3. 颜色规范

### 3.1 Default 模板基础色

| Token        | Hex / Tailwind                 | 用途                   |
| ------------ | ------------------------------ | ---------------------- |
| `slate-950`  | `#020617`                      | 登录按钮、强文字       |
| `slate-900`  | `#0F172A`                      | 标题、主文字           |
| `slate-700`  | `#334155`                      | 正文、次级文字         |
| `slate-600`  | `#475569`                      | 导航、说明文字         |
| `slate-500`  | `#64748B`                      | 辅助信息               |
| `slate-200`  | `#E2E8F0`                      | 边框、分割线           |
| `slate-50`   | `#F8FAFC`                      | 浅灰区块               |
| `white`      | `#FFFFFF`                      | 卡片、主背景           |
| `indigo-500` | `#6366F1` / 模板近似 `#4F46E5` | Default 主强调         |
| `cyan-500`   | `#06B6D4`                      | AI、网关、模型流动强调 |

### 3.2 MoxAI 品牌覆盖色

当前主题覆盖允许使用：

| Token              | Hex       | 用途                     |
| ------------------ | --------- | ------------------------ |
| `--mox-coral`      | `#D97961` | 主 CTA、重点强调         |
| `--mox-coral-dark` | `#B75D48` | CTA hover                |
| `--mox-cyan`       | `#06B6D4` | 模型节点、状态点、次强调 |
| `--mox-paper`      | `#FBFAF7` | 温暖浅底                 |
| `--mox-line`       | `#DFE7EE` | 细边框                   |

使用规则：

- 允许在一个集中主题覆盖区内重定义 `.gradient-btn`、`.gradient-text`、`.glass-nav` 等 Default 类。
- 不要在每个模块内散落大量自定义颜色。
- 如果页面需要和官方 Default 模板保持最高一致性，优先保留 indigo/cyan 渐变。
- 如果页面需要 MoxAI 品牌识别，使用 coral/cyan 覆盖，但不要改变布局和组件形态。

## 4. 字体规范

Default 模板字体：

```css
font-family:
  'Inter', 'HarmonyOS Sans', 'Source Han Sans SC', -apple-system,
  BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

规则：

- 官网、落地页、产品后台统一使用无衬线字体。
- 不再默认使用 Georgia 或其他衬线标题字体。
- 代码块使用 Tailwind `font-mono`。
- 导航、按钮、表格、卡片标题使用 `font-medium`、`font-semibold`、`font-bold`。

## 5. 布局规范

Default 模板常用结构：

- 页面容器：`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Hero：`pt-32 pb-20 px-4 bg-white`
- 普通 Section：`py-20` 或 `py-24`
- 两栏布局：`grid lg:grid-cols-2 gap-12 items-center`
- 卡片网格：`grid md:grid-cols-2 lg:grid-cols-3 gap-8`
- 价格网格：`grid md:grid-cols-4 gap-6`

规则：

- 新页面优先复用以上结构。
- 不再使用早期自定义 `width: min(1160px, calc(100% - 32px))` 作为官网默认容器。
- 页面 Section 可以使用 `bg-white`、`bg-slate-50`、浅渐变区分。
- 不把整段 Section 包成浮动大卡片。

## 6. 导航栏规范

Default 导航结构：

- 固定顶部：`fixed top-0 w-full z-50 glass-nav`
- 高度：`h-16`
- 容器：`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- 主导航：`hidden md:flex items-center space-x-5 text-sm font-medium text-slate-600`
- 右侧工具：语言、主题、通知、登录。

当前官网导航顺序：

1. 主页
2. 控制台
3. 模型广场
4. 排行榜
5. 用户案例
6. 博客
7. 文档
8. 合作伙伴
9. 关于

用户案例使用下拉菜单，复用 `.nav-case-menu` 和 `.nav-case-dropdown`。

规则：

- 导航文字不超过 4 个中文字符时优先保留完整文案。
- 桌面端保持单行，不允许换行。
- 移动端如需菜单，应按 Default 风格新增折叠按钮，不另起一套移动导航样式。

## 7. 按钮规范

Default 模板按钮形态：

主 CTA：

```html
<a
  class="gradient-btn rounded-xl px-8 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-500/20 transition-all"
>
  开始试用
</a>
```

导航登录按钮：

```html
<a
  class="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800"
>
  登录
</a>
```

次按钮：

```html
<a
  class="rounded-xl border border-indigo-300 bg-white px-8 py-4 text-lg font-bold text-indigo-600 shadow-sm hover:bg-indigo-50"
>
  查看接入文档
</a>
```

规则：

- 官网按钮优先 `rounded-xl` 或 `rounded-full`，与 Default 一致。
- 不再强制所有按钮使用 999px 胶囊形态。
- 主 CTA 可使用 Default indigo/cyan 渐变，或 MoxAI coral 覆盖后的 `.gradient-btn`。

## 8. 卡片规范

Default 卡片形态：

```html
<div
  class="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
>
  ...
</div>
```

常用圆角：

- 小按钮、下拉项：`rounded`、`rounded-md`
- 普通按钮和输入：`rounded-lg`、`rounded-xl`
- 功能卡、代码块、价格卡：`rounded-2xl`、`rounded-3xl`

规则：

- 保留 Default 的较大圆角风格，不强制改回 8px。
- 后台业务卡片、表格容器、弹窗和抽屉默认使用 `rounded-2xl`，保持工具型页面一致性。
- 官网和营销页的大型代码块、价格卡、Hero 视觉模块可按 Default 模板使用 `rounded-3xl`。
- 卡片用于功能项、模型项、价格项、数据项。
- 不做复杂卡片嵌套。
- hover 反馈使用 `hover:-translate-y-1 hover:shadow-md` 或已有 `model-card:hover`。

## 9. 代码块和数据可视化

代码块沿用：

- `.code-container`
- `rounded-[1.5rem]`
- `font-mono text-sm leading-relaxed`
- 顶部红黄绿窗口点
- Tab 切换按钮 `tab-active`

图表沿用 ECharts：

- 成本趋势、Token 分布、模型用量等图表优先用 ECharts。
- 图表容器保留固定高度，如 `w-full h-64`。
- 图表颜色优先使用 indigo/cyan/emerald/slate，MoxAI 主题页可用 coral/cyan。

## 10. 金额与计费币种

- 系统默认计费币种为美元，数据层币种代码使用 `USD`。
- 所有余额、充值、模型价格、Token 成本、预算、额度、账单、统计卡片、表格和导出金额，默认使用 `$`。
- 默认显示格式为 `$1,234.56`。
- 金额输入框允许只输入数值，但字段标签或帮助文字必须明确单位为 `$`。

## 11. SEO 与页面结构

官网、公开页、营销页、落地页和文档页默认包含：

- `title`
- `description`
- `keywords`
- Open Graph
- Twitter Card
- `robots`
- `canonical`
- favicon
- JSON-LD

后台页面不需要完整 SEO，但需要清晰的页面标题、面包屑和路由命名。

页面结构优先复用 Default：

1. Nav
2. Hero
3. 指标条
4. 接入方式 / 代码块
5. 模型供应商展示
6. Agent / 工具生态
7. 产品能力
8. 成本可视化
9. Pricing
10. CTA
11. Footer

投放落地页可按需求移除导航和 Footer，但仍应保留 Default 的卡片、按钮、间距和字体风格。

## 12. 禁用项

- 不引入与 Default 冲突的全新 CSS 框架。
- 不把官网改成深色科技风。
- 不使用大量装饰性光球、粒子、bokeh。
- 不使用过度复杂的滚动动画。
- 不用自定义 SVG 图标替代已有 Iconify 图标，除 Logo 必要结构外。
