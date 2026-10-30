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
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'

import { SystemInfoSection } from '../general/system-info-section'

const update = vi.hoisted(() => vi.fn().mockResolvedValue({ success: true }))
vi.mock('../hooks/use-update-option', () => ({
  useUpdateOption: () => ({ mutateAsync: update, isPending: false }),
}))
vi.mock('../components/form-navigation-guard', () => ({
  FormNavigationGuard: () => null,
}))
afterEach(() => {
  cleanup()
  update.mockClear()
})
it('saves only the API base setting and leaves ServerAddress unchanged', async () => {
  render(
    <SystemInfoSection
      defaultValues={{
        SystemName: 'Test',
        ServerAddress: 'https://console.example.com',
        TaskPublicAddress: '',
        Logo: '',
        general_setting: { docs_link: '' },
        legal: {},
      }}
    />
  )
  const user = userEvent.setup()
  const input = screen.getByRole('textbox', { name: 'API Base Address' })
  await user.type(input, 'https://api.example.com/')
  const form = input.closest('form')
  expect(form).not.toBeNull()
  if (!form) throw new Error('Settings form is missing')
  fireEvent.submit(form)
  await waitFor(() =>
    expect(update).toHaveBeenCalledWith({
      key: 'general_setting.api_address',
      value: 'https://api.example.com',
    })
  )
  expect(update).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('textbox', { name: 'Server Address' })).toHaveValue(
    'https://console.example.com'
  )
})
