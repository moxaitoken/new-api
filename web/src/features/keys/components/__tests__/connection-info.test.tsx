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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Row } from '@tanstack/react-table'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'

import type { ApiKey } from '../../types'
import { DataTableRowActions } from '../data-table-row-actions'

vi.mock('../api-keys-provider', () => ({
  useApiKeys: () => ({
    setOpen: vi.fn(),
    setCurrentRow: vi.fn(),
    triggerRefresh: vi.fn(),
    setResolvedKey: vi.fn(),
    resolveRealKey: async () => 'test-only',
    loadingKeys: {},
  }),
}))
vi.mock('@/hooks/use-chat-presets', () => ({
  useChatPresets: () => ({
    chatPresets: [],
    serverAddress: 'https://console.example.com',
  }),
}))
afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.restoreAllMocks()
})
it.each([
  [
    {
      api_address: 'https://api.example.com/',
      server_address: 'https://console.example.com',
    },
    'https://api.example.com',
  ],
  [
    { server_address: 'https://console.example.com' },
    'https://console.example.com',
  ],
])(
  'copies the resolved API address from the row menu: %j',
  async (status, expected) => {
    const client = new QueryClient({
      defaultOptions: { queries: { enabled: false, retry: false } },
    })
    client.setQueryData(['status'], status)
    const row = {
      original: {
        id: 1,
        name: 'test',
        key: '',
        status: 1,
        remain_quota: 1,
        used_quota: 0,
        unlimited_quota: false,
        expired_time: -1,
        created_time: 0,
        accessed_time: 0,
        group: 'default',
        model_limits_enabled: false,
      },
    } as Row<ApiKey>
    const user = userEvent.setup()
    const write = vi.spyOn(navigator.clipboard, 'writeText')
    render(
      <QueryClientProvider client={client}>
        <DataTableRowActions row={row} />
      </QueryClientProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.click(
      await screen.findByRole('menuitem', { name: /Copy Connection Info/ })
    )
    await waitFor(() => expect(write).toHaveBeenCalled())
    expect(JSON.parse(String(write.mock.calls[0]?.[0]))).toEqual({
      _type: 'newapi_channel_conn',
      key: 'test-only',
      url: expected,
    })
    expect(client.getQueryData(['status'])).toEqual(status)
    client.clear()
  }
)
