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
import {
  ArrowRight01Icon,
  Clock03Icon,
  Mail01Icon,
  Message01Icon,
  QrCodeIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useQuery } from '@tanstack/react-query'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'
import { RichContent } from '@/components/rich-content'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { isHttpUrl, isLikelyHtml } from '@/lib/content-format'
import { requireServerSuccess } from '@/lib/server-error-message'

import { getAboutContent } from './api'

type SupportIconProps = {
  icon: typeof Mail01Icon
  variant?: 'default' | 'amber' | 'coral'
}

function SupportIcon({ icon, variant = 'default' }: SupportIconProps) {
  const variantClassName = {
    default:
      'border-[rgba(6,182,212,0.24)] bg-[rgba(6,182,212,0.12)] text-[#087a8d]',
    amber:
      'border-[rgba(245,165,36,0.28)] bg-[rgba(245,165,36,0.14)] text-[#a45f00]',
    coral:
      'border-[rgba(217,121,97,0.28)] bg-[rgba(217,121,97,0.10)] text-[#b75d48]',
  }[variant]

  return (
    <div
      className={`grid size-14 place-items-center rounded-2xl border ${variantClassName}`}
      aria-hidden='true'
    >
      <HugeiconsIcon icon={icon} className='size-7' strokeWidth={2} />
    </div>
  )
}

function DefaultAboutSupportContent() {
  const { t } = useTranslation()

  return (
    <div className='relative min-h-[calc(100svh-8rem)] overflow-hidden bg-[radial-gradient(circle_at_14%_0%,hsl(var(--primary)/0.12),transparent_28rem),radial-gradient(circle_at_86%_12%,hsl(var(--accent)/0.16),transparent_30rem)] py-12 md:py-16'>
      <div className='absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.035)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.035)_1px,transparent_1px)] bg-[length:64px_64px]' />
      <div className='relative mx-auto flex w-full max-w-6xl flex-col gap-11 px-4'>
        <section
          className='mx-auto flex max-w-3xl flex-col gap-3 text-center'
          aria-labelledby='support-title'
        >
          <h1
            id='support-title'
            className='text-5xl leading-tight font-bold tracking-normal md:text-7xl'
          >
            {t('Customer Support')}
          </h1>
          <p className='text-muted-foreground text-base leading-7 md:text-[17px]'>
            {t(
              'If you have any questions or need assistance, please contact us through the following methods. We will serve you sincerely.'
            )}
          </p>
        </section>

        <section
          className='grid grid-cols-1 gap-5 lg:grid-cols-3'
          aria-label={t('Customer support methods')}
        >
          <article className='bg-card/90 shadow-foreground/10 flex min-h-[390px] flex-col items-start rounded-3xl border p-7 shadow-xl transition hover:-translate-y-1 hover:border-[rgba(217,121,97,0.44)] hover:shadow-2xl'>
            <SupportIcon icon={Mail01Icon} />
            <h2 className='mt-6 text-[22px] leading-snug font-bold'>
              {t('Email Support')}
            </h2>
            <p className='text-muted-foreground mt-3 text-[15px] leading-7'>
              {t(
                'You can send emails to our official mailbox, and we will process your request within 24 hours.'
              )}
            </p>
            <p className='break-anywhere mt-6 text-[19px] font-bold text-[#b75d48]'>
              support@agt.moxai.ai
            </p>
            <Button
              className='mt-auto min-h-11 gap-2 rounded-xl bg-[#d97961] px-5 font-bold text-white shadow-[0_14px_30px_rgba(217,121,97,0.26)] hover:bg-[#b75d48] max-sm:w-full'
              render={<a href='mailto:support@agt.moxai.ai' />}
            >
              {t('Send Email')}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                data-icon='inline-end'
                strokeWidth={2}
              />
            </Button>
          </article>

          <article className='bg-card/90 shadow-foreground/10 flex min-h-[390px] flex-col items-start rounded-3xl border p-7 shadow-xl transition hover:-translate-y-1 hover:border-[rgba(217,121,97,0.44)] hover:shadow-2xl'>
            <SupportIcon icon={Clock03Icon} variant='amber' />
            <h2 className='mt-6 text-[22px] leading-snug font-bold'>
              {t('Online Hours')}
            </h2>
            <p className='text-muted-foreground mt-3 text-[15px] leading-7'>
              {t(
                'Our customer service team is online during the specified hours to provide real-time business consultation and technical support.'
              )}
            </p>
            <p className='mt-6 text-[19px] font-bold text-[#9a5b00]'>
              {t('Monday to Saturday 9:00 - 18:00')}
            </p>
            <Button
              variant='secondary'
              className='mt-auto min-h-11 gap-2 rounded-xl bg-[#0f172a] px-5 font-bold text-white shadow-[0_14px_30px_rgba(15,23,42,0.16)] hover:bg-[#1e293b] max-sm:w-full'
              type='button'
            >
              {t('Consult Now')}
              <HugeiconsIcon
                icon={Message01Icon}
                data-icon='inline-end'
                strokeWidth={2}
              />
            </Button>
          </article>

          <article className='bg-card/90 shadow-foreground/10 flex min-h-[390px] flex-col items-start rounded-3xl border p-7 shadow-xl transition hover:-translate-y-1 hover:border-[rgba(217,121,97,0.44)] hover:shadow-2xl'>
            <SupportIcon icon={QrCodeIcon} variant='coral' />
            <h2 className='mt-6 text-[22px] leading-snug font-bold'>
              {t('Customer Service QR Code')}
            </h2>
            <p className='text-muted-foreground mt-3 text-[15px] leading-7'>
              {t(
                'Scan the QR code below to follow the official customer service account and get more convenient mobile support services.'
              )}
            </p>
            <div className='mx-auto mt-auto grid aspect-square w-full max-w-44 place-items-center overflow-hidden rounded-2xl'>
              <img
                src='https://moxai.ai/about/TGQrcode.png'
                alt={t('Telegram QR code')}
                className='size-full rounded-xl object-cover'
              />
            </div>
            <a
              className='break-anywhere mt-4 inline-flex items-center justify-center gap-2 self-center text-center text-[15px] font-bold text-[#b75d48] hover:text-[#d97961] hover:underline'
              href='https://t.me/moxaiai_bot'
              target='_blank'
              rel='noopener noreferrer'
            >
              https://t.me/moxaiai_bot
              <ExternalLink className='size-4 shrink-0' aria-hidden='true' />
            </a>
          </article>
        </section>
      </div>
    </div>
  )
}

export function About() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => requireServerSuccess(await getAboutContent()),
  })

  const rawContent = data?.data?.trim() ?? ''
  const hasContent = rawContent.length > 0
  const isUrl = hasContent && isHttpUrl(rawContent)
  const contentIsHtml = hasContent && isLikelyHtml(rawContent)

  if (isLoading) {
    return (
      <PublicLayout>
        <div className='mx-auto flex max-w-4xl flex-col gap-4 py-12'>
          <Skeleton className='h-8 w-[45%]' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[90%]' />
          <Skeleton className='h-4 w-[80%]' />
        </div>
      </PublicLayout>
    )
  }

  if (!hasContent) {
    return (
      <PublicLayout>
        <DefaultAboutSupportContent />
      </PublicLayout>
    )
  }

  if (isUrl) {
    return (
      <PublicLayout showMainContainer={false}>
        <iframe
          src={rawContent}
          className='h-[calc(100vh-3.5rem)] w-full border-0'
          title={t('About')}
          sandbox='allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts'
        />
      </PublicLayout>
    )
  }

  if (contentIsHtml) {
    return (
      <PublicLayout showMainContainer={false}>
        <RichContent
          mode='html'
          htmlVariant='isolated'
          content={rawContent}
          className='prose-neutral dark:prose-invert max-w-none'
        />
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <RichContent
          mode='markdown'
          content={rawContent}
          className='prose-neutral dark:prose-invert max-w-none'
        />
      </div>
    </PublicLayout>
  )
}
