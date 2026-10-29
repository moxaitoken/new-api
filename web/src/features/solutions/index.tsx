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
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { MoxAIFooter } from '@/features/home/components/moxai-footer'
import { cn } from '@/lib/utils'

import type { Solution } from './data'
import { MoxAISolutionSEO } from './moxai-solution-seo'

const pageShell = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
const headingClass = 'tracking-tight text-slate-950'
const sectionTitle = cn(
  headingClass,
  'text-[clamp(30px,4vw,52px)] leading-[1.1] font-bold'
)
const primaryButtonClass =
  'h-auto min-h-11 rounded-xl bg-[#D97961] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#D97961]/20 hover:bg-[#B75D48] hover:text-white'
const secondaryButtonClass =
  'h-auto min-h-11 rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm font-bold text-slate-900 shadow-sm hover:border-[#D97961]/40 hover:bg-[#FBFAF7] hover:text-[#B75D48]'

// 小型 eyebrow 标签，支持深色背景下的反色样式。
function Eyebrow(props: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={cn(
        'inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-extrabold shadow-sm',
        props.dark
          ? 'border-white/10 bg-white/10 text-white/75'
          : 'border-slate-200 bg-white/80 text-slate-700'
      )}
    >
      <span className='size-2 rounded-full bg-[#06B6D4] shadow-[0_0_0_5px_rgba(6,182,212,0.14)]' />
      {props.children}
    </div>
  )
}

// 方案页通用标题组件，统一处理浅色/深色分区的标题与描述样式。
function SectionHeading(props: {
  title: string
  description?: string
  dark?: boolean
}) {
  const { t } = useTranslation()

  return (
    <div className='mx-auto max-w-3xl text-center'>
      <h2 className={cn(sectionTitle, props.dark && 'text-white')}>
        {t(props.title)}
      </h2>
      {props.description && (
        <p
          className={cn(
            'mt-5 text-[15px] leading-[1.72] md:text-lg md:leading-[1.78]',
            props.dark ? 'text-white/68' : 'text-slate-600'
          )}
        >
          {t(props.description)}
        </p>
      )}
    </div>
  )
}

// 公共布局头部使用的 MoxAI 标识。
function MoxAILogo() {
  return (
    <img
      src='/moxai-logo.png'
      alt='MoxAI'
      className='h-8 w-auto max-w-[136px] object-contain'
    />
  )
}

// Hero 标题由前缀、强调词和后缀拼接，便于不同方案复用同一版式。
function HeroTitle(props: { hero: Solution['hero'] }) {
  const { t } = useTranslation()

  return (
    <h1
      className={cn(
        headingClass,
        'mx-auto mt-7 max-w-5xl text-[36px] leading-[1.12] font-bold md:text-[clamp(44px,6vw,76px)] md:leading-[1.08]'
      )}
    >
      {props.hero.titlePrefix && t(props.hero.titlePrefix)}
      <span className='moxai-solution-stream inline text-[#B75D48] italic'>
        {t(props.hero.titleAccent)}
      </span>
      {props.hero.titleSuffix && t(props.hero.titleSuffix)}
    </h1>
  )
}

// 方案页首屏：展示方案定位、主转化按钮、可选次按钮和核心指标。
function HeroSection(props: { solution: Solution }) {
  const { t } = useTranslation()
  const { hero } = props.solution

  return (
    <section className='bg-[linear-gradient(rgba(17,24,39,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.035)_1px,transparent_1px),radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.12),transparent_32rem),#FBFAF7] bg-[length:64px_64px,64px_64px,auto,auto] pt-32 pb-20'>
      <div className={cn(pageShell, 'text-center')}>
        <Eyebrow>{t(hero.eyebrow)}</Eyebrow>
        <HeroTitle hero={hero} />
        <p className='mx-auto mt-6 max-w-3xl text-[15px] leading-[1.72] text-slate-700 md:text-lg md:leading-[1.78]'>
          {t(hero.description)}
        </p>
        <div className='mt-[34px] flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button
            className={cn(primaryButtonClass, 'w-full sm:w-auto')}
            render={<Link to='/sign-up' />}
          >
            {t(hero.primaryCta)}
            <ArrowRight className='ml-2 size-4' />
          </Button>
          {hero.secondaryCta && (
            <Button
              variant='outline'
              className={cn(secondaryButtonClass, 'w-full sm:w-auto')}
              render={<a href={hero.secondaryHref} />}
            >
              {t(hero.secondaryCta)}
            </Button>
          )}
        </div>
        <div className='mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 border-y border-slate-200 py-7 md:grid-cols-4'>
          {hero.metrics.map((metric) => (
            <div
              key={`${metric.value}-${metric.label}`}
              className='text-center'
            >
              <div className='text-[28px] leading-none font-black text-slate-950'>
                {t(metric.value)}
              </div>
              <div className='mt-2 text-[11px] font-black tracking-[0.12em] text-slate-500 uppercase'>
                {t(metric.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 通用信息卡片，用于痛点、使用场景等三列内容。
function InfoCard(props: {
  marker: string
  title: string
  description: string
  dark?: boolean
}) {
  const { t } = useTranslation()

  return (
    <article
      className={cn(
        'min-h-[190px] rounded-lg border p-6 shadow-[0_18px_54px_rgba(17,24,39,0.08)]',
        props.dark
          ? 'border-white/10 bg-white/[0.06] shadow-none'
          : 'border-slate-200 bg-white/90'
      )}
    >
      <div
        className={cn(
          'mb-5 grid size-11 place-items-center rounded-lg border text-sm font-black',
          props.dark
            ? 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200'
            : 'border-cyan-500/25 bg-cyan-50 text-cyan-800'
        )}
      >
        {t(props.marker)}
      </div>
      <h3
        className={cn(
          'text-xl leading-[1.3] font-bold',
          props.dark ? 'text-white' : 'text-slate-950'
        )}
      >
        {t(props.title)}
      </h3>
      <p
        className={cn(
          'mt-3 text-[15px] leading-[1.72]',
          props.dark ? 'text-white/68' : 'text-slate-600'
        )}
      >
        {t(props.description)}
      </p>
    </article>
  )
}

// 痛点分区使用深色背景，突出目标场景中未接入网关前的问题。
function PainSection(props: { solution: Solution }) {
  const { pain } = props.solution

  return (
    <section className='bg-slate-950 py-20 md:py-24'>
      <div className={pageShell}>
        <SectionHeading
          title={pain.title}
          description={pain.description}
          dark
        />
        <div className='mt-12 grid gap-4 md:grid-cols-3'>
          {pain.cards.map((card) => (
            <InfoCard
              key={card.title}
              marker={card.marker}
              title={card.title}
              description={card.description}
              dark
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// 终端风格面板，用于展示接入命令、请求示例或工作流日志。
function TerminalPanel(props: { title: string; lines: string[] }) {
  const { t } = useTranslation()

  return (
    <div
      id='connect'
      className='overflow-hidden rounded-lg border border-slate-200 bg-white/95 text-left shadow-[0_24px_70px_rgba(17,24,39,0.12)]'
    >
      <div className='flex min-h-12 items-center justify-between gap-4 border-b border-slate-200 px-4 font-mono text-xs text-slate-500'>
        <div className='flex gap-2'>
          <span className='size-3 rounded-full bg-[#FF6B5F]' />
          <span className='size-3 rounded-full bg-[#F4BF4F]' />
          <span className='size-3 rounded-full bg-[#43C66F]' />
        </div>
        <span className='truncate'>{props.title}</span>
        <span className='font-bold text-cyan-700'>{t('Live')}</span>
      </div>
      <pre className='min-h-[280px] overflow-x-auto p-6 font-mono text-[13px] leading-[1.72] text-slate-800'>
        <code>{props.lines.join('\n')}</code>
      </pre>
    </div>
  )
}

// 流程面板展示 MoxAI 对请求路由、权限、成本等步骤的处理结果。
function FlowPanel(props: { solution: Solution }) {
  const { t } = useTranslation()
  const { solution } = props

  return (
    <div className='rounded-lg border border-slate-200 bg-white/90 p-6 shadow-[0_18px_54px_rgba(17,24,39,0.08)]'>
      <h3 className='text-xl font-bold text-slate-950'>
        {t(solution.solution.panelTitle)}
      </h3>
      <div className='mt-5 grid gap-3'>
        {solution.solution.rows.map((row) => (
          <div
            key={`${row.label}-${row.status}`}
            className='grid items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 md:grid-cols-[7rem_1fr_auto]'
          >
            <b className='text-slate-950'>{t(row.label)}</b>
            <span className='text-sm text-slate-600'>{t(row.value)}</span>
            <span className='inline-flex items-center justify-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700'>
              {t(row.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 解决方案分区将终端面板和流程面板组合，并支持左右顺序由数据配置控制。
function SolutionSection(props: { solution: Solution }) {
  const { solution } = props
  const terminal = (
    <TerminalPanel
      title={solution.solution.terminalTitle}
      lines={solution.solution.terminalLines}
    />
  )
  const panel = <FlowPanel solution={solution} />

  return (
    <section id='solution' className='bg-[#FBFAF7] py-20 md:py-24'>
      <div className={pageShell}>
        <SectionHeading
          title={solution.solution.title}
          description={solution.solution.description}
        />
        <div className='mt-12 grid items-stretch gap-5 lg:grid-cols-2'>
          {solution.solution.terminalFirst ? (
            <>
              {terminal}
              {panel}
            </>
          ) : (
            <>
              {panel}
              {terminal}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// 使用场景分区，展示某个 solution 适合落地的具体业务场景。
function ScenesSection(props: { solution: Solution }) {
  const { scenes } = props.solution

  return (
    <section className='border-y border-slate-200 bg-slate-50 py-20 md:py-24'>
      <div className={pageShell}>
        <SectionHeading title={scenes.title} />
        <div className='mt-12 grid gap-4 md:grid-cols-3'>
          {scenes.cards.map((card) => (
            <InfoCard
              key={card.title}
              marker={card.marker}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// 页面底部转化区，引导用户注册并继续进入 MoxAI 使用流程。
function CTASection(props: { solution: Solution }) {
  const { t } = useTranslation()
  const { cta } = props.solution

  return (
    <section className='bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.16),transparent_24rem),#F5F7F8] py-20 text-center md:py-24'>
      <div className={pageShell}>
        <Eyebrow>{t(cta.eyebrow)}</Eyebrow>
        <h2 className={cn(sectionTitle, 'mx-auto mt-6 max-w-4xl')}>
          {t(cta.title)}
        </h2>
        <p className='mx-auto mt-5 max-w-3xl text-[15px] leading-[1.72] text-slate-700 md:text-lg md:leading-[1.78]'>
          {t(cta.description)}
        </p>
        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button
            className={cn(primaryButtonClass, 'w-full sm:w-auto')}
            render={<Link to='/sign-up' />}
          >
            {t('Register now')}
            <ArrowRight className='ml-2 size-4' />
          </Button>
        </div>
      </div>
    </section>
  )
}

// 方案页总装组件：公共布局、动态 SEO、页面动画和各业务分区在这里串联。
export function SolutionPage(props: { solution: Solution }) {
  const { solution } = props

  return (
    <PublicLayout
      showMainContainer={false}
      logo={<MoxAILogo />}
      logoContainerClassName='h-10 w-[136px] overflow-hidden sm:w-[150px]'
      hideSiteName
    >
      <MoxAISolutionSEO solution={solution} />
      <style>
        {`
          @keyframes moxai-solution-stream-in {
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

          .moxai-solution-stream {
            opacity: 0;
            animation: moxai-solution-stream-in 680ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }

          @media (prefers-reduced-motion: reduce) {
            .moxai-solution-stream {
              opacity: 1;
              animation: none;
              transform: none;
              filter: none;
            }
          }
        `}
      </style>
      <main className='overflow-x-hidden bg-[#FBFAF7] text-slate-950'>
        <HeroSection solution={solution} />
        <PainSection solution={solution} />
        <SolutionSection solution={solution} />
        <ScenesSection solution={solution} />
        <CTASection solution={solution} />
        {/* 方案页底部复用首页 MoxAI 页脚，保持品牌文案和协议链接一致。 */}
        <MoxAIFooter />
      </main>
    </PublicLayout>
  )
}
