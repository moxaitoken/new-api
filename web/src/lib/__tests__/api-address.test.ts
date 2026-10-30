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

import { expect, it } from 'vitest'

import { resolveAPIAddress, isValidPublicBaseURL } from '../api-address'
import { encodeChannelConnectionInfo } from '../channel-connection-info'

it.each([
  [
    {
      api_address: 'https://api.example.com/',
      server_address: 'https://console.example.com',
    },
    'https://api.example.com',
  ],
  [
    { api_address: '', server_address: 'https://console.example.com' },
    'https://console.example.com',
  ],
  [
    { server_address: 'https://console.example.com' },
    'https://console.example.com',
  ],
  [
    {
      api_address: 'javascript:alert(1)',
      server_address: 'https://console.example.com',
    },
    'https://console.example.com',
  ],
  [null, 'https://origin.example.com'],
])(
  'copies connection information using the API base and legacy fallback: %j',
  (status, expected) => {
    const result = JSON.parse(
      encodeChannelConnectionInfo(
        'test-only',
        resolveAPIAddress(status, 'https://origin.example.com')
      )
    )
    expect(result).toEqual({
      _type: 'newapi_channel_conn',
      key: 'test-only',
      url: expected,
    })
  }
)
it.each([
  'https://user:password@example.com',
  'https://example.com?x=1',
  'https://example.com#x',
  '/relative',
  'https://',
  'https://example.com\\bad',
])('rejects unsafe base addresses: %s', (value) => {
  expect(isValidPublicBaseURL(value)).toBe(false)
})
