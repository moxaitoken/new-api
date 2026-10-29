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
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BellRing,
  BookOpen,
  ChartBar,
  CheckCircle,
  CircleEllipsis,
  CirclePlus,
  ClipboardList,
  Copy,
  KeyRound,
  Layers3,
  LineChart,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Code2,
  type LucideIcon,
} from 'lucide-react'
import { type ReactNode, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'

import { MoxAIFooter } from './moxai-footer'
import { MoxAIHomeSEO } from './moxai-home-seo'

type CodeTab = 'python' | 'node' | 'curl' | 'sdk'

interface MoxAIHomeProps {
  isAuthenticated?: boolean
}

const pageShell = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
const headingClass = 'tracking-tight text-slate-900'
const sectionTitle = cn(
  headingClass,
  'text-[clamp(30px,4vw,52px)] leading-[1.1] font-bold'
)
const cardClass = 'rounded-2xl border border-slate-200 bg-white shadow-sm'
const iconBoxClass =
  'flex size-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-50 text-cyan-700 transition-transform duration-300 group-hover:scale-110'
const primaryButtonClass =
  'h-auto min-h-11 rounded-xl bg-[#D97961] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#D97961]/20 hover:bg-[#B75D48] hover:text-white'
const secondaryButtonClass =
  'h-auto min-h-11 rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm font-bold text-slate-900 shadow-sm hover:border-[#D97961]/40 hover:bg-[#FBFAF7] hover:text-[#B75D48]'

// 首页首屏指标，用于快速传达网关覆盖范围、可用性和密钥安全价值。
const STATS = [
  { value: '20+', label: 'Model providers' },
  { value: '99.9%', label: 'Gateway availability' },
  { value: '<400ms', label: 'Proxy latency' },
  { value: '0', label: 'Master keys exposed' },
] as const

// 代码示例按标签切换，展示 MoxAI 与 OpenAI 兼容接口的接入方式。
const CODE_SNIPPETS: Record<CodeTab, string> = {
  python: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.moxai.ai",
    api_key="mx_team_project_key"
)

response = client.chat.completions.create(
    model="claude-4-sonnet",
    messages=[{"role": "user", "content": "Summarize tickets"}],
    metadata={"project": "support-q2", "member": "lina"}
)`,
  node: `import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.moxai.ai",
  apiKey: "mx_team_project_key",
})

const response = await client.chat.completions.create({
  model: "gpt-4.1",
  messages: [{ role: "user", content: "Draft a launch brief" }],
  metadata: { project: "growth", member: "kai" },
})`,
  curl: `curl https://api.moxai.ai/chat/completions \\
  -H "Authorization: Bearer mx_team_project_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-chat",
    "messages": [
      { "role": "user", "content": "Analyze refund trends" }
    ],
    "metadata": { "project": "ops-review" }
  }'`,
  sdk: `const openai = new OpenAI({
  baseURL: "https://api.moxai.ai",
  apiKey: process.env.MOXAI_API_KEY,
})

await openai.responses.create({
  model: "gemini-2.5-pro",
  input: "Create a multilingual product FAQ",
})`,
}

// 跑马灯模型供应商列表；重复渲染两组以实现无缝横向滚动。
const MODEL_PROVIDERS = [
  { name: 'OpenAI', code: 'OA', iconName: 'OpenAI' },
  { name: 'Claude', code: 'CL', iconName: 'Claude' },
  { name: 'Gemini', code: 'GM', iconName: 'Gemini' },
  { name: 'DeepSeek', code: 'DS', iconName: 'DeepSeek' },
  { name: 'Qwen', code: 'QW', iconName: 'Qwen' },
  { name: 'Kimi', code: 'KM', iconName: 'Kimi' },
  { name: 'MiniMax', code: 'MM', icon: Layers3 },
  { name: 'Custom', code: '+', icon: CirclePlus },
] as const

// 支持接入的主流 Agent 与客户端，用于说明网关可服务的工作流入口。
const AGENTS = [
  {
    name: 'OpenClaw',
    desc: 'Multi-tool AI agent framework for complex workflows',
    iconName: 'OpenClaw',
  },
  {
    name: 'CC Switch',
    desc: 'Model proxy foundation with Skill and MCP management',
    icon: MessageSquareText,
  },
  {
    name: 'Claude Code',
    desc: 'Coding assistant deeply integrated with development workflows',
    iconName: 'Claude',
  },
  {
    name: 'Hermes Agent',
    desc: 'Lightweight autonomous agent for automated task handling',
    icon: Sparkles,
  },
  {
    name: 'OpenCode',
    desc: 'Open source coding tool for generation and completion',
    icon: Code2,
  },
  {
    name: 'Cursor',
    desc: 'AI-first editor with context-aware code assistance',
    iconName: 'Cursor',
  },
  {
    name: 'Cherry Studio',
    desc: 'Visual AI workflow builder for orchestrating model calls',
    iconName: 'CherryStudio',
  },
  {
    name: 'More',
    desc: 'Other agents and clients that support custom models',
    icon: CircleEllipsis,
  },
] as const

// 首页核心能力卡片，统一从数据表渲染，方便后续增删能力点。
const CAPABILITIES = [
  {
    title: 'Multi-model unified access',
    desc: 'One OpenAI-compatible gateway routes by task, cost, availability, and permission policy.',
    icon: Route,
  },
  {
    title: 'Member-level usage analytics',
    desc: 'Track tokens, requests, failure rate, and cost by member, project, model, and provider.',
    icon: ChartBar,
  },
  {
    title: 'Permissions and quota control',
    desc: 'Stop sharing master API keys with role, project quota, model scope, and time-window controls.',
    icon: ShieldCheck,
  },
  {
    title: 'Cost-optimized routing',
    desc: 'Use stronger models for high-value tasks and low-cost models for routine automation.',
    icon: TrendingUp,
  },
  {
    title: 'Budget alerts',
    desc: 'Project budgets, member quotas, and abnormal calls trigger alerts before month-end surprises.',
    icon: BellRing,
  },
  {
    title: 'Request log tracing',
    desc: 'Record model, tokens, cost, status, and project ownership for every AI request.',
    icon: ClipboardList,
  },
] as const

// 充值档位配置；Enterprise 使用 features 字段展示专属权益。
const PLANS = [
  {
    name: 'Starter',
    desc: 'Entry experience for personal learning, light exploration, and multi-model switching.',
    price: '$20.00',
    featured: false,
    cta: 'Start using',
  },
  {
    name: 'Standard',
    desc: 'For heavy personal users and small teams running everyday AI workflows.',
    price: '$100.00',
    featured: false,
    cta: 'Start using',
  },
  {
    name: 'Advanced',
    desc: 'Shared team balance for high-frequency automation and multi-agent collaboration.',
    price: '$500.00',
    featured: true,
    cta: 'Start using',
  },
  {
    name: 'Enterprise',
    desc: 'Private deployment, SSO, dedicated support, and custom usage reports.',
    price: 'Custom plan price',
    featured: false,
    cta: 'Contact advisor',
    features: [
      'Private or dedicated gateway',
      'SSO and audit logs',
      'Finance cost center',
      'Dedicated technical support',
    ],
  },
] as const

// 通用分区标题组件，统一控制 eyebrow、标题、描述和左右/居中布局。
function SectionHeading(props: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <div
      className={cn(
        props.align === 'left' ? 'text-left' : 'mx-auto max-w-3xl text-center'
      )}
    >
      {props.eyebrow && (
        <p className='mb-4 text-[13px] font-bold tracking-[0.16em] text-[#B75D48] uppercase'>
          {props.eyebrow}
        </p>
      )}
      <h2 className={sectionTitle}>{props.title}</h2>
      {props.description && (
        <p className='mt-5 text-[15px] leading-[1.72] text-slate-600 md:text-lg md:leading-[1.78]'>
          {props.description}
        </p>
      )}
    </div>
  )
}

// 首屏顶部的小标签，概括 MoxAI 的核心定位。
function EyebrowPill() {
  const { t } = useTranslation()

  return (
    <div className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-bold text-slate-700 shadow-sm'>
      <span className='size-2 rounded-full bg-[#06B6D4] shadow-[0_0_0_5px_rgba(6,182,212,0.14)]' />
      {t('AI Gateway - Token Control - Cost Visibility')}
    </div>
  )
}

// 首页 Hero：根据登录态决定主按钮跳转，并从系统配置读取文档链接。
function MoxAIHero(props: MoxAIHomeProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsUrl =
    (status?.docs_link as string | undefined) || 'https://moxai.ai/apidocuments'

  return (
    <section className='bg-linear-to-b from-white via-white to-[#FBFAF7] pt-32 pb-20'>
      <div className={pageShell}>
        <div className='mx-auto max-w-5xl text-center'>
          <EyebrowPill />
          <h1
            className={cn(
              headingClass,
              'mt-7 text-[36px] leading-[1.12] font-bold md:text-[clamp(44px,6vw,76px)] md:leading-[1.08]'
            )}
          >
            <span className='moxai-stream-word inline-block'>
              {t('Unified management for team')}
            </span>
            <br />
            <span className='moxai-stream-word moxai-stream-word-delay inline-block text-[#B75D48]'>
              {t('AI models, tokens, and costs')}
            </span>
          </h1>
          <p className='mx-auto mt-6 max-w-3xl text-[15px] leading-[1.72] text-slate-700 md:text-lg md:leading-[1.78]'>
            {t(
              'MoxAI provides a lightweight and trusted AI control layer for global teams, entertainment, cross-border ecommerce, and SMBs. Connect OpenAI, Claude, Gemini, XAI, DeepSeek, and more while centrally managing API keys, team permissions, token usage, and project costs.'
            )}
          </p>
          <div className='mt-[34px] flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Button
              className={cn(primaryButtonClass, 'w-full sm:w-auto')}
              render={
                <Link to={props.isAuthenticated ? '/dashboard' : '/sign-up'} />
              }
            >
              {props.isAuthenticated
                ? t('Go to Dashboard')
                : t('Start free trial')}
              <ArrowRight className='ml-2 size-4' />
            </Button>
            <Button
              variant='outline'
              className={cn(secondaryButtonClass, 'w-full sm:w-auto')}
              render={
                docsUrl.startsWith('http') ? (
                  <a href={docsUrl} target='_blank' rel='noopener noreferrer' />
                ) : (
                  <Link to={docsUrl} />
                )
              }
            >
              <BookOpen className='mr-2 size-4' />
              {t('View integration docs')}
            </Button>
          </div>
        </div>
        <div className='mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 border-y border-slate-200 py-7 md:grid-cols-4'>
          {STATS.map((stat) => (
            <div key={stat.label} className='text-center'>
              <div className='text-[28px] leading-none font-black text-slate-900'>
                {stat.value}
              </div>
              <div className='mt-2 text-[11px] font-black tracking-[0.12em] text-slate-500 uppercase'>
                {t(stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 交互式代码演示面板，用于展示不同语言/SDK 的接入示例。
function CodeDemo() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<CodeTab>('python')
  const tabs = useMemo(
    () =>
      [
        ['python', 'Python'],
        ['node', 'Node.js'],
        ['curl', 'cURL'],
        ['sdk', 'OpenAI SDK'],
      ] as const,
    []
  )

  return (
    <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md'>
      <div className='flex min-h-12 items-center justify-between border-b border-slate-200 bg-slate-50 px-4'>
        <div className='flex min-w-0 items-center gap-2'>
          <span className='size-3 rounded-full bg-[#D97961]' />
          <span className='size-3 rounded-full bg-[#F5A524]' />
          <span className='size-3 rounded-full bg-[#22C55E]' />
          <span className='ml-2 truncate font-mono text-xs text-slate-500'>
            https://api.moxai.ai
          </span>
          <span className='rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700'>
            {t('Live')}
          </span>
        </div>
        <Copy className='size-4 shrink-0 text-slate-500' />
      </div>
      <div className='flex overflow-x-auto border-b border-slate-200 text-xs font-extrabold'>
        {tabs.map(([tab, label]) => (
          <button
            key={tab}
            type='button'
            onClick={() => setActiveTab(tab)}
            className={cn(
              'shrink-0 border-b-2 px-5 py-3 transition-colors',
              activeTab === tab
                ? 'border-[#B75D48] text-[#B75D48]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <pre className='min-h-[330px] overflow-x-auto bg-white p-6 text-left font-mono text-[13px] leading-[1.72] text-slate-700'>
        <code>{CODE_SNIPPETS[activeTab]}</code>
      </pre>
      <span className='sr-only'>{t('Code example')}</span>
    </div>
  )
}

// 网关接入分区，左侧说明价值，右侧展示可复制感的接口调用示例。
function GatewaySection() {
  const { t } = useTranslation()

  return (
    <section className='bg-[#FBFAF7] py-20 md:py-24'>
      <div className={cn(pageShell, 'grid items-center gap-12 lg:grid-cols-2')}>
        <div>
          <SectionHeading
            align='left'
            eyebrow='moxai.ai'
            title={t('Make team AI usage controllable')}
            description={t(
              'Use one AI Gateway to manage model access, API key permissions, token usage, and project costs so AI usage stays secure, transparent, and measurable.'
            )}
          />
          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <Button
              className={cn(primaryButtonClass, 'w-full sm:w-auto')}
              render={<Link to='/sign-up' />}
            >
              {t('Register now')}
              <ArrowRight className='ml-2 size-4' />
            </Button>
            {/* <Button
              variant='outline'
              className={cn(secondaryButtonClass, 'w-full')}
            >
              <Copy className='mr-2 size-4' />
              {t('Copy integration method')}
            </Button> */}
          </div>
        </div>
        <CodeDemo />
      </div>
    </section>
  )
}

function ProviderIcon(props: {
  icon?: LucideIcon
  iconName?: string
  size: number
  className?: string
  strokeWidth?: number
}) {
  if (props.iconName) {
    return (
      <span
        className={cn(
          'text-[#B75D48] [&_path]:fill-current [&_path]:stroke-current [&_svg]:block [&_svg]:fill-current [&_svg]:text-current',
          props.className
        )}
      >
        {getLobeIcon(props.iconName, props.size)}
      </span>
    )
  }

  if (!props.icon) return null

  const Icon = props.icon
  return (
    <Icon className={props.className} strokeWidth={props.strokeWidth ?? 1.8} />
  )
}

// 模型与 Agent 分区：先展示模型供应商，再展示可接入的 Agent/客户端。
function ModelsAndAgentsSection() {
  const { t } = useTranslation()
  // 同一列表渲染两份，实现无缝循环滚动。
  const marqueeGroups = [
    { id: 'primary', providers: MODEL_PROVIDERS },
    { id: 'loop', providers: MODEL_PROVIDERS },
  ] as const

  return (
    <>
      <section className='border-b border-slate-200 bg-slate-50 py-20 md:py-24'>
        <div className={cn(pageShell, 'text-center')}>
          <SectionHeading
            title={t(
              'One entry point connects the mainstream AI models your team already uses'
            )}
            description={t(
              'Engineering, operations, support, and marketing teams keep familiar SDKs while MoxAI handles routing, permission checks, usage statistics, and cost attribution.'
            )}
          />
          <div className='relative mt-12 overflow-hidden'>
            <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-slate-50 to-transparent' />
            <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-slate-50 to-transparent' />
            <div className='moxai-marquee-track flex w-max gap-6 pt-2 md:gap-12'>
              {marqueeGroups.map((group) => (
                <div
                  key={group.id}
                  className='flex shrink-0 items-center gap-6 md:gap-12'
                >
                  {group.providers.map((provider) => (
                    <ModelProviderCard
                      key={`${group.id}-${provider.name}`}
                      provider={provider}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id='agents' className='bg-slate-50 py-20 md:py-24'>
        <div className={pageShell}>
          <SectionHeading
            title={t('Fast access to mainstream AI agents')}
            description={t(
              'Connect the agents and clients your team already uses, then manage every model call and token cost from one gateway.'
            )}
          />
          <div className='mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
            {AGENTS.map((agent) => {
              return (
                <AgentCard
                  key={agent.name}
                  icon={'icon' in agent ? agent.icon : undefined}
                  iconName={'iconName' in agent ? agent.iconName : undefined}
                  title={agent.name === 'More' ? t('More') : agent.name}
                  description={t(agent.desc)}
                />
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

// 单个模型供应商卡片；图标和短码用于保持跑马灯内容紧凑。
function ModelProviderCard(props: {
  provider: (typeof MODEL_PROVIDERS)[number]
}) {
  const { t } = useTranslation()

  return (
    <div className='moxai-model-card group flex shrink-0 cursor-pointer flex-col items-center'>
      <div className='flex size-20 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#D97961]/50 group-hover:shadow-md'>
        <ProviderIcon
          icon={'icon' in props.provider ? props.provider.icon : undefined}
          iconName={
            'iconName' in props.provider ? props.provider.iconName : undefined
          }
          size={28}
          className='mb-1 size-7 text-[#B75D48] transition-transform duration-300 group-hover:rotate-12'
        />
        <span className='text-xs font-black text-slate-700'>
          {props.provider.code}
        </span>
      </div>
      <span className='mt-1.5 text-xs font-medium text-slate-500'>
        {t(props.provider.name)}
      </span>
    </div>
  )
}

// 单个 Agent 卡片，展示名称、图标和适用场景说明。
function AgentCard(props: {
  icon?: LucideIcon
  iconName?: string
  title: string
  description: string
}) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D97961]/40 hover:shadow-md md:p-6'>
      <div className={cn(iconBoxClass, 'mb-4')}>
        <ProviderIcon
          icon={props.icon}
          iconName={props.iconName}
          size={24}
          className='size-6 text-[#B75D48]'
        />
      </div>
      <h3 className='mb-1 text-[15px] leading-[1.3] font-bold text-slate-900 md:text-base'>
        {props.title}
      </h3>
      <p className='text-sm leading-[1.65] text-slate-600'>
        {props.description}
      </p>
    </div>
  )
}

// 通用能力卡片，复用首页卡片视觉和悬停动效。
function FeatureCard(props: {
  icon: LucideIcon
  title: string
  description: string
}) {
  const Icon = props.icon

  return (
    <div
      className={cn(
        cardClass,
        'group p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D97961]/40 hover:shadow-md'
      )}
    >
      <div className={cn(iconBoxClass, 'mb-5')}>
        <Icon className='size-6' strokeWidth={1.8} />
      </div>
      <h3 className='mb-4 text-xl leading-[1.3] font-bold text-slate-900'>
        {props.title}
      </h3>
      <p className='text-[15px] leading-[1.75] text-slate-600'>
        {props.description}
      </p>
    </div>
  )
}

// 核心能力分区，说明 MoxAI 是团队 AI 使用管理层而不是新模型。
function CapabilitiesSection() {
  const { t } = useTranslation()

  return (
    <section className='bg-[#FBFAF7] py-20 md:py-24'>
      <div className={pageShell}>
        <SectionHeading
          title={t(
            'Not a new model, but the management layer teams need for AI usage'
          )}
          description={t(
            'MoxAI brings scattered model accounts, API keys, call logs, and billing data into one clear workspace for SMB teams.'
          )}
        />
        <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {CAPABILITIES.map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={t(item.title)}
              description={t(item.desc)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// 成本可视化分区，用模拟看板展示 token、预算和项目归因能力。
function CostSection() {
  const { t } = useTranslation()
  const projects = [
    ['Customer support automation', '$496', 'bg-[#06B6D4]'],
    ['Content marketing', '$331', 'bg-[#D97961]'],
    ['Engineering Copilot', '$238', 'bg-[#22C55E]'],
    ['Sales assistant', '$141', 'bg-[#F5A524]'],
  ] as const

  return (
    <section className='bg-slate-950 py-20 text-white md:py-24'>
      <div className={pageShell}>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='mb-4 text-[13px] font-bold tracking-[0.16em] text-[#D97961] uppercase'>
            {t('Token & Cost')}
          </p>
          <h2
            className={cn(
              'text-[clamp(30px,4vw,52px)] leading-[1.1] font-bold tracking-tight text-white'
            )}
          >
            {t('Turn the token black box into an explainable cost report')}
          </h2>
          <p className='mt-5 text-lg leading-[1.78] text-white/70'>
            {t(
              'MoxAI calculates token consumption by member, project, model, provider, and period so management can see where AI costs come from and set budgets, quotas, and alerts in advance.'
            )}
          </p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-5'>
          <div className='rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-sm md:p-8 lg:col-span-3'>
            <div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start'>
              <div>
                <h3 className='text-xl font-bold text-white'>
                  {t('Token & Cost Overview')}
                </h3>
                <p className='mt-1 text-sm text-white/60'>
                  {t('This month - auto attribution')}
                </p>
              </div>
              <div className='flex gap-6 sm:text-right'>
                <Metric label='Total Tokens' value='18.6M' />
                <Metric label='Estimated Cost' value='$1,284' accent />
              </div>
            </div>
            <div className='grid items-center gap-8 md:grid-cols-2'>
              <div className='relative mx-auto flex aspect-square w-full max-w-[260px] items-center justify-center rounded-full bg-[conic-gradient(#06B6D4_0_39%,#D97961_39%_65%,#22C55E_65%_84%,#F5A524_84%_100%)]'>
                <div className='flex size-[62%] flex-col items-center justify-center rounded-full bg-[#101827] text-center shadow-inner'>
                  <LineChart className='mb-2 size-7 text-[#06B6D4]' />
                  <span className='text-2xl font-bold text-white'>64%</span>
                  <span className='text-xs text-white/60'>
                    {t('Budget used')}
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='rounded-2xl border border-white/10 bg-white/[0.06] p-4'>
                  <div className='mb-2 flex justify-between text-sm'>
                    <span className='text-white/70'>{t('Budget used')}</span>
                    <span className='font-bold text-[#06B6D4]'>64%</span>
                  </div>
                  <div className='h-2 overflow-hidden rounded-full bg-white/10'>
                    <div className='h-full w-[64%] bg-[#06B6D4]' />
                  </div>
                </div>
                <ul className='flex flex-col gap-3'>
                  {projects.map(([name, cost, color]) => (
                    <li
                      key={name}
                      className='flex items-center justify-between gap-4 text-sm'
                    >
                      <span className='flex min-w-0 items-center text-white/75'>
                        <span
                          className={cn(
                            'mr-2 size-2 shrink-0 rounded-full',
                            color
                          )}
                        />
                        <span className='truncate'>{t(name)}</span>
                      </span>
                      <span className='font-mono text-white'>{cost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-sm md:p-8 lg:col-span-2'>
            <div className='mb-6 flex items-center justify-between gap-4'>
              <h3 className='text-xl font-bold text-white'>
                {t('API Key & Access')}
              </h3>
              <span className='rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-cyan-100'>
                {t('Master keys stay private')}
              </span>
            </div>
            <div className='flex flex-col gap-4'>
              {[
                [
                  'support-prod-key',
                  'Claude / Gemini - $600 monthly budget',
                  'Active',
                ],
                [
                  'marketing-content-key',
                  'OpenAI / Qwen - weekdays only',
                  'Active',
                ],
                [
                  'dev-sandbox-key',
                  'DeepSeek / Kimi - low-cost routing first',
                  'Active',
                ],
                [
                  'finance-audit-view',
                  'Read-only reports - department export',
                  'View',
                ],
              ].map(([name, desc, state]) => (
                <div
                  key={name}
                  className='rounded-2xl border border-white/10 bg-white/[0.06] p-4'
                >
                  <div className='mb-1 flex items-center justify-between gap-3'>
                    <span className='truncate font-mono text-sm text-white/90'>
                      {name}
                    </span>
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                        state === 'Active'
                          ? 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100'
                          : 'border-white/10 bg-white/10 text-white/60'
                      )}
                    >
                      {t(state)}
                    </span>
                  </div>
                  <p className='text-xs text-white/60'>{t(desc)}</p>
                </div>
              ))}
            </div>
            <Button
              variant='outline'
              className='mt-6 w-full rounded-xl border-dashed border-white/20 bg-transparent text-white/70 hover:border-[#D97961]/60 hover:bg-white/10 hover:text-white'
            >
              <KeyRound className='mr-2 size-4' />
              {t('Create new project key')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// 暗色成本看板中的小指标组件，支持强调色展示关键金额。
function Metric(props: { label: string; value: string; accent?: boolean }) {
  const { t } = useTranslation()

  return (
    <div>
      <div className='text-xs font-bold text-white/55 uppercase'>
        {t(props.label)}
      </div>
      <div
        className={cn(
          'text-xl font-bold',
          props.accent ? 'text-[#D97961]' : 'text-white'
        )}
      >
        {props.value}
      </div>
    </div>
  )
}

// 价格/充值分区，根据计划配置渲染个人、团队和企业档位。
function PricingSection() {
  const { t } = useTranslation()

  return (
    <section className='bg-[#FBFAF7] py-20 md:py-24'>
      <div className={pageShell}>
        <SectionHeading
          title={t('Recharge on demand with a shared team balance pool')}
          description={t(
            'Buy balance as needed instead of subscribing monthly. Pay for what you use and match your usage scale flexibly.'
          )}
        />
        <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                cardClass,
                'relative flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
                plan.featured &&
                  'border-[#D97961] shadow-md shadow-[#D97961]/10'
              )}
            >
              {plan.featured && (
                <div className='absolute -top-3 left-6 rounded-full bg-[#D97961] px-3 py-1 text-xs font-bold text-white'>
                  {t('Most popular')}
                </div>
              )}
              <h3 className='text-[20px] leading-[1.3] font-bold text-slate-900'>
                {t(plan.name)}
              </h3>
              <p className='mt-3 flex-1 text-sm leading-[1.75] text-slate-600'>
                {t(plan.desc)}
              </p>
              <div className='mt-6 text-3xl font-bold text-slate-900'>
                {t(plan.price)}
                {plan.name === 'Enterprise' && (
                  <span className='text-sm font-normal text-slate-500'>
                    {' '}
                    / {t('annual payment')}
                  </span>
                )}
              </div>
              {'features' in plan ? (
                <ul className='mt-6 flex flex-1 flex-col gap-4'>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className='flex items-center text-sm text-slate-700'
                    >
                      <CheckCircle className='mr-2 size-4 shrink-0 text-cyan-700' />
                      {t(feature)}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='mt-3 flex items-start text-xs leading-relaxed text-slate-500'>
                  <span className='mt-1 mr-2 size-2 shrink-0 rounded-full border border-[#F5A524] bg-[#F5A524]' />
                  {t(
                    'Balance offsets model compute. Not a monthly subscription.'
                  )}
                </div>
              )}
              <Button
                className={cn(
                  'mt-6 w-full',
                  plan.name === 'Enterprise'
                    ? secondaryButtonClass
                    : primaryButtonClass
                )}
                variant={plan.name === 'Enterprise' ? 'outline' : 'default'}
                render={
                  <Link
                    to={plan.name === 'Enterprise' ? '/pricing' : '/sign-up'}
                  />
                }
              >
                {t(plan.cta)}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 页面底部最终转化区，复用登录态决定跳转到控制台或注册页。
function FinalCTA(props: MoxAIHomeProps) {
  const { t } = useTranslation()

  return (
    <section className='border-y border-slate-200 bg-slate-50 py-20 md:py-24'>
      <div className={cn(pageShell, 'text-center')}>
        <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm'>
          <span className='size-2 rounded-full bg-[#06B6D4] shadow-[0_0_0_5px_rgba(6,182,212,0.14)]' />
          <span className='text-sm font-bold text-slate-700'>moxai.ai</span>
        </div>
        <h2 className={sectionTitle}>
          {t('Make team')}
          <span className='text-[#B75D48]'> AI </span>
          {t('more controllable')}
        </h2>
        <p className='mx-auto mt-5 max-w-2xl text-[15px] leading-[1.72] text-slate-700 md:text-lg md:leading-[1.78]'>
          {t(
            'Use one AI Gateway to manage model access, API key permissions, token usage, and project costs so AI usage stays secure, transparent, and measurable.'
          )}
        </p>
        <Button
          className={cn(primaryButtonClass, 'mt-8 w-full sm:w-auto')}
          render={
            <Link to={props.isAuthenticated ? '/dashboard' : '/sign-up'} />
          }
        >
          {props.isAuthenticated ? t('Go to Dashboard') : t('Register now')}
          <ArrowRight className='ml-2 size-4' />
        </Button>
      </div>
    </section>
  )
}

// MoxAI 首页总装组件：注入 SEO、局部动画样式并按业务叙事顺序排列分区。
export function MoxAIHome(props: MoxAIHomeProps) {
  return (
    <>
      <MoxAIHomeSEO />
      <style>
        {`
          @keyframes moxai-stream-in {
            from {
              opacity: 0;
              transform: translate3d(0, 14px, 0);
              filter: blur(8px);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
              filter: blur(0);
            }
          }

          .moxai-stream-word {
            opacity: 0;
            animation: moxai-stream-in 680ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }

          .moxai-stream-word-delay {
            animation-delay: 160ms;
          }

          @keyframes moxai-marquee-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .moxai-marquee-track {
            animation: moxai-marquee-scroll 30s linear infinite;
          }

          .moxai-marquee-track:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .moxai-stream-word {
              opacity: 1;
              animation: none;
              transform: none;
              filter: none;
            }

            .moxai-marquee-track {
              animation: none;
              transform: none;
            }
          }
        `}
      </style>
      <main className='overflow-x-hidden bg-[#FBFAF7] text-slate-900'>
        <MoxAIHero isAuthenticated={props.isAuthenticated} />
        <GatewaySection />
        <ModelsAndAgentsSection />
        <CapabilitiesSection />
        <CostSection />
        <PricingSection />
        <FinalCTA isAuthenticated={props.isAuthenticated} />
        <MoxAIFooter />
      </main>
    </>
  )
}
