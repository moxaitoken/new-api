# MoxAI Page Animation Requirements

本文档以官方 Default 模板为动画基线。后续官网、营销页和产品展示页应优先沿用 Default 模板已有动效，不再默认引入早期独立落地页的 `streaming-title.js` 或额外动画体系。

## 1. Default 模板动效基线

当前官方模板使用的动效模式：

- Tailwind 过渡类：`transition-all`、`transition-colors`、`transition-transform`、`duration-300`。
- 悬浮反馈：卡片 `hover:-translate-y-1`、模型卡片 `hover:scale-105`、图标 `group-hover:scale-110` 或 `group-hover:rotate-12`。
- 跑马灯：`.marquee-track` 使用 `marquee-scroll 30s linear infinite`，hover 时暂停。
- 导航下拉：用户案例下拉使用 `opacity`、`visibility`、`transform` 的 0.18s 过渡。
- 按钮反馈：主按钮 hover 仅改变背景和阴影，不做复杂位移。

这些动效可以直接复用，不需要重新设计动画语言。

## 2. 默认原则

- 动效服务于状态反馈和内容展示，不做炫技型首屏动画。
- 首屏标题默认保持静态 HTML 文案，保证 SEO、首屏稳定性和研发可维护性。
- 新增动效优先使用 Tailwind 原子类；只有复用性强或 Default 模板已有的效果才写入 `<style>`。
- 动画时长控制在 `0.18s - 0.3s`，长循环动画只允许用于模型 Logo 跑马灯等展示型模块。
- 不引入额外动画库，不使用 GSAP、Framer Motion 作为官网默认依赖。

## 3. 可用动画模式

### 3.1 卡片悬浮

```html
<div
  class="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
>
  ...
</div>
```

适用于功能卡片、Agent 卡片、价格卡片和数据卡片。

### 3.2 图标反馈

```html
<div class="group">
  <iconify-icon
    class="transition-transform duration-300 group-hover:scale-110"
  ></iconify-icon>
</div>
```

适用于能力模块图标和模型供应商卡片。

### 3.3 跑马灯

沿用模板中的：

```css
.marquee-track {
  animation: marquee-scroll 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}
```

只用于模型、工具、合作伙伴 Logo 展示，不用于正文或 CTA。

### 3.4 下拉菜单

沿用当前 `.nav-case-dropdown` 的 `opacity + visibility + transform` 实现。新增下拉菜单时直接复用同类结构，不单独引入交互库。

## 4. 流式标题说明

早期落地页曾使用流式文字动效。后续在 Default 模板基础上迭代时：

- 不作为默认要求。
- 只有在专题页明确需要“打字/流式”表达时才使用。
- 必须保留完整 H1 文案在 HTML/React 首屏源码中。
- 必须支持 `prefers-reduced-motion: reduce`。
- 不得造成移动端横向滚动或影响首屏 CTA 稳定布局。

## 5. 禁用项

- 不使用大面积视差、滚动劫持、整屏进入动画。
- 不使用装饰性光球、bokeh、漂浮粒子作为默认背景动画。
- 不让标题、按钮、价格、表格数字在加载后发生明显位移。
- 不在产品后台中使用营销型动效；后台只保留 hover、focus、loading、toast 等必要反馈。

## 6. 验收标准

- 页面首屏静态内容在禁用 JS 时仍可读。
- 浏览器开启减少动态效果时，循环动画和标题动画应停止或直接展示最终状态。
- 桌面和移动端均无横向滚动。
- 控制台无动画相关报错。
- 新增动画不增加新的第三方运行时依赖。
