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
/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly VITE_CHATWOOT_WEBSITE_TOKEN?: string
  readonly VITE_CHATWOOT_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  chatwootSettings?: {
    position: 'left' | 'right'
    type: 'standard' | 'expanded_bubble'
    launcherTitle: string
    locale?: string
    useBrowserLanguage?: boolean
  }
  chatwootSDK?: {
    run: (config: { websiteToken: string; baseUrl: string }) => void
  }
  __chatwootInitialized?: boolean
  $chatwoot?: {
    setUser: (
      identifier: string,
      user: { name: string; email?: string }
    ) => void
    setCustomAttributes: (attributes: Record<string, unknown>) => void
    setLocale: (locale: string) => void
    reset: () => void
  }
}

declare module '@visactor/react-vchart' {
  export const VChart: React.ComponentType<Record<string, unknown>>
}
