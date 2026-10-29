import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function read(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8')
}

function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length
}

const html = await read('index.html')
const homeSeo = await read('src/features/home/components/moxai-home-seo.tsx')
const solutionSeo = await read('src/features/solutions/moxai-solution-seo.tsx')
const seoDescription =
  'MoxAI provides a lightweight and trusted AI usage control layer for SMBs, unifying access to models such as OpenAI, Claude, Gemini, DeepSeek, Qwen, and others, while centrally managing API keys, team permissions, token usage, and project costs. Empowering teams to use AI with greater control.'
const ogImageUrl = 'https://moxai.ai/moxai-og.png'

assert.equal(
  countMatches(html, /<link\s+rel=["']canonical["']/gi),
  1,
  'index.html must contain exactly one canonical link'
)
assert.equal(
  countMatches(html, /<meta\s+name=["']description["']/gi),
  1,
  'index.html must contain exactly one description'
)
assert.equal(
  countMatches(html, /<meta\s+name=["']robots["']/gi),
  0,
  'index.html must not contain a shared robots meta tag'
)

for (const property of [
  'og:type',
  'og:site_name',
  'og:title',
  'og:description',
  'og:url',
  'og:image',
]) {
  assert.equal(
    countMatches(
      html,
      new RegExp(`<meta\\s+property=["']${property}["']`, 'gi')
    ),
    1,
    `index.html must contain exactly one ${property} tag`
  )
}

for (const name of [
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
]) {
  assert.equal(
    countMatches(html, new RegExp(`<meta\\s+name=["']${name}["']`, 'gi')),
    1,
    `index.html must contain exactly one ${name} tag`
  )
}

const jsonLdBlocks = [
  ...html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  ),
].map((match) => JSON.parse(match[1]))

assert.deepEqual(
  new Set(jsonLdBlocks.map((block) => block['@type'])),
  new Set(['Organization', 'WebSite', 'SoftwareApplication']),
  'index.html must contain Organization, WebSite and SoftwareApplication JSON-LD'
)

for (const block of jsonLdBlocks) {
  assert.equal(
    block.description,
    seoDescription,
    `${block['@type']} JSON-LD must use the homepage SEO description`
  )
}

const organization = jsonLdBlocks.find(
  (block) => block['@type'] === 'Organization'
)
const softwareApplication = jsonLdBlocks.find(
  (block) => block['@type'] === 'SoftwareApplication'
)
assert.equal(organization.logo, 'https://moxai.ai/moxai-logo.png')
assert.equal(softwareApplication.image, ogImageUrl)
assert.match(
  html,
  /<meta\s+property=["']og:image["']\s+content=["']https:\/\/moxai\.ai\/moxai-og\.png["']\s*\/>/i
)
assert.match(
  html,
  /<meta\s+name=["']twitter:image["']\s+content=["']https:\/\/moxai\.ai\/moxai-og\.png["']\s*\/>/i
)
assert.ok(homeSeo.includes(`const OG_IMAGE = '${ogImageUrl}'`))
assert.ok(solutionSeo.includes(`const OG_IMAGE = '${ogImageUrl}'`))
assert.match(
  homeSeo,
  /key:\s*'robots'\s*}\s*,\s*'index,follow,max-image-preview:large'/,
  'homepage runtime robots meta must allow indexing and large image previews'
)

const robots = await read('public/robots.txt')
assert.match(robots, /^User-agent: \*$/m)
assert.match(robots, /^Allow: \/$/m)
assert.match(robots, /^Sitemap: https:\/\/moxai\.ai\/sitemap\.xml$/m)
assert.match(robots, /^Sitemap: https:\/\/moxai\.ai\/blog\/sitemap\.xml$/m)

for (const path of [
  '/sign-in',
  '/sign-up',
  '/register',
  '/reset',
  '/forgot-password',
  '/otp',
  '/oauth',
  '/user/reset',
  '/dashboard',
  '/system-settings',
  '/channels',
  '/keys',
  '/models',
  '/usage-logs',
  '/users',
  '/wallet',
  '/subscriptions',
  '/redemption-codes',
  '/profile',
  '/playground',
  '/chat',
  '/chat2link',
  '/setup',
  '/console',
  '/errors',
  '/401',
  '/403',
  '/404',
  '/500',
  '/503',
  '/api/',
  '/v1/',
]) {
  assert.match(
    robots,
    new RegExp(`^Disallow: ${path.replaceAll('/', '\\/')}$`, 'm'),
    `robots.txt must disallow ${path}`
  )
}

const sitemap = await read('public/sitemap.xml')
assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/)
const locations = [...sitemap.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(
  (match) => match[1]
)
assert.deepEqual(locations, ['https://moxai.ai/', 'https://moxai.ai/blog/'])
assert.equal(
  new Set(locations).size,
  locations.length,
  'sitemap URLs must be unique'
)

const llms = await read('public/llms.txt')
for (const requiredText of [
  '# MoxAI',
  'https://moxai.ai/',
  'https://moxai.ai/blog/',
  'https://docs.moxai.ai/',
  'AI API gateway',
  'Token usage tracking',
  'moxai-codex-cli-tutorial',
  'moxai-claude-code-tutorial',
  'moxai-cursor-tutorial',
  'moxai-cherry-studio-tutorial',
  'moxai-cc-switch-ai-cli-tutorial',
]) {
  assert.ok(
    llms.includes(requiredText),
    `llms.txt must contain ${requiredText}`
  )
}

const ogImage = await readFile(path.join(root, 'public/moxai-og.png'))
assert.equal(ogImage.toString('ascii', 1, 4), 'PNG', 'OG image must be a PNG')
assert.equal(ogImage.readUInt32BE(16), 1200, 'OG image width must be 1200')
assert.equal(ogImage.readUInt32BE(20), 630, 'OG image height must be 630')

console.log('SEO checks passed')
