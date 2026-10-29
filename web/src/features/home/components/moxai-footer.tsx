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
import { useTranslation } from 'react-i18next'

const pageShell = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

// MoxAI 官网和用户案例页共用同一套底部内容，避免两处文案和链接分叉维护。
export function MoxAIFooter() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const footerLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/user-agreement' },
    { label: 'Help Center', href: 'https://docs.moxai.ai/' },
  ]

  return (
    <footer className='border-t border-slate-200 bg-[#FBFAF7] py-12'>
      <div className={pageShell}>
        <div className='mb-8 flex flex-col items-center justify-between gap-5 md:flex-row'>
          <img
            src='/moxai-logo.png'
            alt='MoxAI'
            className='h-10 w-auto max-w-[178px] object-contain'
          />
          <div className='flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500'>
            {footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className='transition-colors hover:text-[#B75D48]'
              >
                {t(item.label)}
              </a>
            ))}
          </div>
        </div>
        <div className='text-center text-xs leading-relaxed text-slate-500 md:text-left'>
          <p>
            &copy; {currentYear} MoxAI.{' '}
            {t(
              'Multi-model AI gateway and token management platform for SMB teams.'
            )}
          </p>
          <p className='mt-1'>
            {t('MoxAI manages team AI models, tokens, and costs.')}
          </p>
          <p className='mt-1'>
            {t(
              'MoxAI helps SMBs connect multiple AI models, centrally manage API keys, team permissions, token usage, and project costs, so teams can use AI securely, transparently, and controllably.'
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
