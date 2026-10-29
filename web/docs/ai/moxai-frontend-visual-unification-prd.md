# MoxAI 前端视觉统一 PRD V1

> 更新日期：2026-06-12  
> 当前结论：MoxAI 前端基于官方 Default 模板继续迭代，MoxAI 存量后台视觉统一也应向 Default 模板靠拢，而不是另起一套独立 UI 体系。

## 1. 背景

MoxAI 项目前端计划直接在官方 Default 模板基础上工程化。此前项目中存在多套视觉来源：

- 官网早期静态原型
- 行业落地页原型
- MoxAI 存量后台
- API Key 治理产品原型
- 下载目录中的官方 Default 模板

为降低研发成本和视觉漂移风险，本 PRD 将官方 Default 模板确定为统一基线。

## 2. 目标

### 2.1 产品目标

- 保留 MoxAI 原有菜单和功能路径。
- 将新增 API Key 治理、归属管理、访问规则模板、用量成本分析等功能统一到 Default 模板视觉语言。
- 让官网、营销页和后台页面在字体、颜色、圆角、按钮、卡片、图标和动效上保持一致。

### 2.2 研发目标

- 前端工程优先复用 Default 模板的 Tailwind 类名习惯。
- 减少自定义 CSS 和重复组件。
- 保持 Iconify、ECharts、Tailwind 的技术路径一致。
- 后续由 Codex 生成页面时，可以直接遵循本文档完成样式统一。

## 3. Default 模板技术基线

<!-- 参考文件：

`C:/Users/Administrator.DESKTOP-F5A7R4N/Downloads/MoxAI-platform_v16-MoxAI-theme (1).html` -->

- Tailwind CSS CDN
- Iconify Web Component
- ECharts
- Inter + HarmonyOS Sans + Source Han Sans SC + system sans-serif
- 少量自定义 CSS 类

## 4. 不变量

以下内容不应被后续页面改掉：

- 默认字体栈保持 Inter 优先。
- 默认背景以白色和 `slate-50` 为主。
- 顶部导航使用 `fixed top-0 w-full z-50 glass-nav`。
- 主体内容最大宽度使用 `max-w-7xl`。
- 页面容器使用 `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`。
- 卡片使用 `rounded-2xl`、`border-slate-200`、`shadow-sm`。
- 按钮使用 `gradient-btn`、`rounded-xl` 或 `rounded-full` 体系。
- 图标统一使用 Iconify。
- 图表统一使用 ECharts。
- 交互反馈使用 Tailwind `transition-*`、hover 类和模板已有 marquee。
- 默认计费币种为美元 `$`，数据层币种为 `USD`。

## 5. 官网与后台的差异化规则

### 5.1 官网 / 营销页

沿用 Default 模板：

- 大 Hero
- 指标条
- 代码块
- 模型供应商跑马灯
- Agent / 工具生态卡片
- 产品能力卡片
- 成本可视化图表
- Pricing
- CTA

允许使用 MoxAI 品牌覆盖：

- `.gradient-btn`
- `.gradient-text`
- `.glass-nav`
- `.gradient-border-card`

但不得改动页面骨架和组件形态。

### 5.2 产品后台

后台不需要营销 Hero。应将 Default 模板视觉收敛为工具型页面：

- 侧栏 / 顶栏保持稳定。
- 页面容器使用浅灰底 `bg-slate-50`。
- 内容卡片使用 `bg-white rounded-2xl border border-slate-200 shadow-sm`。
- 表格、筛选器、抽屉、弹窗使用同一圆角和边框。
- 操作按钮使用 `rounded-xl`，高危操作使用红色语义，不使用营销渐变。

## 6. 菜单兼容

MoxAI 存量菜单不做大重构：

- 聊天
  - 操练场
  - 聊天
- 控制台
  - 数据看板
  - 令牌管理
  - 使用日志
  - 绘图日志
  - 任务日志
- 归属管理
  - 使用主体
  - 项目与部门
- 个人中心
  - 钱包管理
  - 个人设置

新增能力应在原菜单内叠加：

- 数据看板承载概览、成本分析、模型分析。
- 令牌管理承载 API Key 列表和访问规则模板。
- 使用日志承载归属、成本、规则结果筛选。
- 归属管理承载使用主体、项目、部门。

## 7. 组件映射

### 7.1 按钮

主操作：

```html
<button
  class="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800"
>
  保存
</button>
```

次操作：

```html
<button
  class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
>
  取消
</button>
```

营销 CTA 可继续使用 `.gradient-btn`。

### 7.2 卡片

```html
<section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  ...
</section>
```

### 7.3 表格

- 表头：`text-xs font-bold text-slate-500 bg-slate-50`
- 单元格：`text-sm text-slate-700`
- 行 hover：`hover:bg-slate-50`
- 状态标签使用 `rounded-full` 或 `rounded-md`

### 7.4 表单

- 输入框：`rounded-xl border border-slate-200 bg-white`
- Label：`text-sm font-semibold text-slate-700`
- Help：`text-xs text-slate-500`
- 错误：红色语义，保持克制。

### 7.5 抽屉和弹窗

- 背景遮罩：`rgba(15, 23, 42, 0.48)`
- 容器：`bg-white rounded-2xl shadow-xl`
- 大型抽屉右侧滑出，小型配置使用居中 Modal。

## 8. API Key 治理页面要求

### 8.1 令牌管理

用户端不展示 MoxAI 原生模型分组。系统内部默认写入同一个分组。

列表字段：

- 名称 + 使用场景
- 状态
- 剩余额度 / 总额度
- 密钥
- 可用模型
- IP 限制
- 使用归属
- 项目 / 部门
- 规则模板名称
- 创建时间
- 过期时间
- 操作

创建 API Key 三步：

1. 基本信息与归属
2. 访问规则
3. 确认创建

访问规则页：

- 可用模型独立一行。
- IP 限制独立一行。
- 规则模板使用下拉选项，不使用卡片单选。

### 8.2 访问规则模板

模板只管理：

- 日 / 周 / 月额度
- 可用时间
- 时区
- IP 白名单
- 超限动作

模板不包含可用模型或模型分组。

### 8.3 归属管理

使用主体、项目、部门使用同一套表格和弹窗风格。功能闭环必须包含：

- 查询
- 新建
- 编辑
- 归档 / 恢复
- 删除无引用对象
- 查看关联 API Key

## 9. 图表与数据

在统一使用 ECharts 的前提下，适用场景包括：

- 成本趋势
- Token 趋势
- 模型分布
- 项目成本占比
- API Key 消耗排行

图表颜色：

- 主序列：indigo 或 MoxAI coral
- 次序列：cyan
- 成功：emerald
- 中性：slate
- 预警：amber
- 错误：red

## 10. 动效

后台只允许必要交互动效：

- hover
- focus
- loading
- toast
- modal/drawer 进入退出

官网可使用 Default 模板已有：

- 卡片 hover
- Logo 跑马灯
- 导航下拉
- 按钮 hover

不默认使用流式标题或复杂滚动动画。

## 11. SEO

官网、公开页、营销页、落地页和文档页必须保留：

- title
- description
- keywords
- Open Graph
- Twitter Card
- canonical
- favicon
- JSON-LD

后台页面不需要完整 SEO，但需要清晰页面标题、面包屑和路由命名。

## 12. 验收标准

### 12.1 视觉

- 页面主体使用 Default 模板字体、圆角、卡片、按钮和图标风格。
- 没有明显混入早期 landing.css 的独立视觉体系。
- 桌面端导航单行展示，不横向溢出。
- 移动端无横向滚动。

### 12.2 交互

- 表格查询、重置、创建、编辑、删除、归档等动作闭环。
- 抽屉和弹窗打开关闭无报错。
- 访问规则模板下拉可正常选择并展示摘要。

### 12.3 技术

- 不新增新的 CSS 框架。
- 不新增新的图标库。
- 不新增新的图表库。
- 控制台无 JS 报错。
- 所有金额默认 `$`。

## 13. 后续执行建议

1. 先以官方 Default 模板抽象全局 Layout、Nav、Button、Card、Table、Modal、Drawer。
2. 再迁移 MoxAI 存量页面，不改变原业务路由。
3. 最后把 API Key 治理、归属管理和成本分析能力叠加到原菜单。

优先级：

- P0：导航、页面壳、按钮、卡片、表格、弹窗统一。
- P1：数据看板、令牌管理、访问规则模板、归属管理。
- P2：日志、钱包、个人设置、模型市场等细节页面。
