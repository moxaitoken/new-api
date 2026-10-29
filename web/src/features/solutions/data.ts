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

export type SolutionSlug =
  | 'digital-entertainment-global'
  | 'cross-border-ecommerce'
  | 'app-saas-global'
  | 'developer-overseas-models'

type Metric = {
  value: string
  label: string
}

type Card = {
  marker: string
  title: string
  description: string
}

type FlowRow = {
  label: string
  value: string
  status: string
}

export type Solution = {
  slug: SolutionSlug
  navTitle: string
  seo: {
    title: string
    description: string
    keywords: string
    canonicalUrl: string
    ogDescription: string
    twitterDescription: string
    schemaName: string
    schemaCategory: 'BusinessApplication' | 'DeveloperApplication'
  }
  hero: {
    eyebrow: string
    titlePrefix?: string
    titleAccent: string
    titleSuffix?: string
    description: string
    primaryCta: string
    secondaryCta?: string
    secondaryHref: string
    metrics: Metric[]
  }
  pain: {
    title: string
    description: string
    cards: Card[]
  }
  solution: {
    title: string
    description: string
    panelTitle: string
    rows: FlowRow[]
    terminalTitle: string
    terminalLines: string[]
    terminalFirst?: boolean
  }
  scenes: {
    title: string
    cards: Card[]
  }
  cta: {
    eyebrow: string
    title: string
    description: string
  }
}
// 用户案例 定义文案和seo
export const SOLUTION_LIST: Solution[] = [
  {
    // 数娱出海
    slug: 'digital-entertainment-global',
    navTitle: 'Digital entertainment',
    seo: {
      title:
        'Digital entertainment global AI calls and token cost management | MoxAI',
      description:
        'MoxAI helps game, short drama, interactive entertainment, and virtual character teams manage high-frequency AI calls, token costs, team permissions, campaign budgets, and request logs.',
      keywords:
        'digital entertainment AI, game AI cost management, short drama AI tools, virtual character AI, token budget alert, AI request logs, multi-model gateway, MoxAI',
      canonicalUrl: 'https://moxai.ai/solutions/digital-entertainment-global',
      ogDescription:
        'Manage model calls for character chat, content generation, support, and operations, with token cost attribution by product line, campaign, language, and team.',
      twitterDescription:
        'Manage high-frequency AI calls, token costs, team permissions, and campaign budgets for digital entertainment teams.',
      schemaName: 'MoxAI for Digital Entertainment Global Teams',
      schemaCategory: 'BusinessApplication',
    },
    hero: {
      eyebrow: 'For Games, Short Drama, and Interactive Entertainment',
      titlePrefix: 'Manage high-frequency AI calls and token costs for ',
      titleAccent: 'digital entertainment global teams',
      description:
        'Centrally manage model calls for character conversations, content generation, support, and operations, then track token costs by product line, campaign, language, and team.',
      primaryCta: 'Register now',
      secondaryHref: '#solution',
      metrics: [
        { value: 'Campaign', label: 'Budget alerts' },
        { value: 'Language', label: 'Cost attribution' },
        { value: 'Role', label: 'Request logs' },
        { value: 'Team', label: 'Permission quotas' },
      ],
    },
    pain: {
      title:
        'AI costs in entertainment teams often spike during campaigns and content peaks',
      description:
        'Games, short dramas, communities, and interactive entertainment products use AI frequently across many scenarios and languages, so budget, permissions, and log visibility become essential.',
      cards: [
        {
          marker: '01',
          title: 'Character interaction volume is hard to predict',
          description:
            'Virtual characters, story dialogue, and community interaction can create high-frequency model requests with volatile cost.',
        },
        {
          marker: '02',
          title: 'Campaign budgets can lose control quickly',
          description:
            'Launch campaigns, holiday operations, and paid traffic periods can surge before the team notices abnormal month-end spend.',
        },
        {
          marker: '03',
          title: 'Content quality and exceptions are hard to trace',
          description:
            'Different models, languages, characters, and operations teams need request logs for review and troubleshooting.',
        },
      ],
    },
    solution: {
      title: 'See every token cost by product line, campaign, and language',
      description:
        'MoxAI lets operations, story, support, and publishing teams share one AI Gateway while splitting costs and permissions by business dimension.',
      panelTitle: 'Entertainment cost control',
      rows: [
        {
          label: 'Product line',
          value: 'Game A / Short Drama B / Community C',
          status: 'Attributable',
        },
        {
          label: 'Campaign',
          value: 'Launch campaign / Traffic cycle / Holiday operation',
          status: 'Alertable',
        },
        {
          label: 'Language',
          value: 'English / Japanese / Spanish / Indonesian',
          status: 'Comparable',
        },
        {
          label: 'Team',
          value: 'Story / Support / Operations / Publishing',
          status: 'Controlled',
        },
      ],
      terminalTitle: 'activity-budget.rules',
      terminalLines: [
        '# Route high-value interaction to stronger models',
        'rule "vip_character_chat" {',
        '  model = "claude-sonnet"',
        '  budget = "campaign:summer_launch"',
        '  alert_at = "80%"',
        '}',
        '',
        '# Bulk content uses lower-cost routing',
        'rule "ugc_batch_localization" {',
        '  model = "auto:low_cost"',
        '  team = "operations"',
        '}',
      ],
    },
    scenes: {
      title: 'Cover common AI usage scenarios for entertainment teams',
      cards: [
        {
          marker: 'AI',
          title: 'Character chat and interaction',
          description:
            'Track tokens by character, language, and product line while using budgets to control high-frequency interaction cost.',
        },
        {
          marker: 'TXT',
          title: 'Story and content generation',
          description:
            'Attribute story, short drama, community content, and operation assets by team and keep request logs.',
        },
        {
          marker: '!',
          title: 'Campaign budget alerts',
          description:
            'Set AI usage quotas for launch campaigns, traffic cycles, and holiday operations to avoid sudden cost spikes.',
        },
      ],
    },
    cta: {
      eyebrow: 'AI cost control for entertainment teams',
      title: 'Scale AI content and interaction while keeping cost controlled',
      description:
        'Built for games, short drama, interactive entertainment, virtual characters, community content, and global operations teams.',
    },
  },
  {
    // 跨境电商
    slug: 'cross-border-ecommerce',
    navTitle: 'Cross-border ecommerce',
    seo: {
      title:
        'Cross-border ecommerce AI usage and token cost management | MoxAI',
      description:
        'MoxAI helps cross-border ecommerce teams manage AI calls for product copy, translation, support, ads, and product research while tracking token cost by store, platform, SKU, and project.',
      keywords:
        'cross-border ecommerce AI, AI copy cost management, product translation AI, AI support cost, token cost analytics, store AI cost report, API key permissions, MoxAI',
      canonicalUrl: 'https://moxai.ai/solutions/cross-border-ecommerce',
      ogDescription:
        'See AI token costs for product copy, translation, support, ads, and product research by store, platform, SKU, and project.',
      twitterDescription:
        'AI usage and cost management for cross-border ecommerce teams, with token costs tracked by store, platform, SKU, and project.',
      schemaName: 'MoxAI for Cross-border E-commerce Teams',
      schemaCategory: 'BusinessApplication',
    },
    hero: {
      eyebrow: 'For Cross-border E-commerce Teams',
      titleAccent: 'Cross-border ecommerce',
      titleSuffix: ' AI usage and cost management platform',
      description:
        'Centrally manage model calls for product copy, translation, support, ads, and product research, then see AI cost by store, platform, SKU, and project.',
      primaryCta: 'Register now',
      secondaryHref: '#solution',
      metrics: [
        { value: 'Store', label: 'Cost split' },
        { value: 'SKU', label: 'Task attribution' },
        { value: 'Support', label: 'Usage analytics' },
        { value: 'Ads', label: 'Budget alerts' },
      ],
    },
    pain: {
      title:
        'After batch AI adoption, ecommerce teams struggle to know which store and task spent the money',
      description:
        'Operations, support, advertising, and product research teams all use AI, while API keys, model permissions, and bills are often scattered across people and providers.',
      cards: [
        {
          marker: '01',
          title: 'Batch copy and translation consume quickly',
          description:
            'Product titles, bullet points, localization, and ad assets can create large token consumption.',
        },
        {
          marker: '02',
          title: 'Store and SKU accounting is missing',
          description:
            'Provider bills show only totals, making it hard to split cost by platform, store, site, SKU, or client project.',
        },
        {
          marker: '03',
          title: 'Team permissions and quotas are unclear',
          description:
            'Operations, support, advertising, and product research teams need different model scopes and budget limits.',
        },
      ],
    },
    solution: {
      title: 'Trace AI cost to store, platform, SKU, and task',
      description:
        'MoxAI helps cross-border teams unify scattered AI calls into one gateway and produce reports that owners, finance, and operations leads can read.',
      panelTitle: 'Cross-border AI cost dimensions',
      rows: [
        {
          label: 'Store',
          value: 'Amazon US / Shopify EU / TikTok Shop',
          status: 'Splittable',
        },
        {
          label: 'Task',
          value: 'Listing / Translation / Support / Ad copy',
          status: 'Attributable',
        },
        {
          label: 'SKU',
          value: 'Track tokens by product or batch task',
          status: 'Traceable',
        },
        {
          label: 'Team',
          value: 'Operations / Support / Ads / Product research',
          status: 'Quota ready',
        },
      ],
      terminalTitle: 'store-cost-report.json',
      terminalLines: [
        '{',
        '  "store": "amazon-us",',
        '  "sku": "MX-2026-042",',
        '  "task": "listing_localization",',
        '  "model_policy": "low_cost_batch",',
        '  "budget_alert": "70%"',
        '}',
      ],
    },
    scenes: {
      title: 'Cover high-frequency AI tasks for cross-border teams',
      cards: [
        {
          marker: 'COPY',
          title: 'Product copy and localization',
          description:
            'Attribute titles, bullet points, detail pages, site translation, and localized content by SKU and store.',
        },
        {
          marker: 'SUP',
          title: 'Support replies and review analysis',
          description:
            'Track AI calls by support team, platform, and language while setting member quotas and model scopes.',
        },
        {
          marker: 'ADS',
          title: 'Advertising and product research',
          description:
            'Control token costs for ad copy, competitor analysis, and product research by project and campaign budget.',
        },
      ],
    },
    cta: {
      eyebrow: 'AI cost attribution for ecommerce teams',
      title:
        'Let cross-border teams use AI in batches while every token cost stays traceable',
      description:
        'Built for teams using AI for product content, support, ads, translation, and product research.',
    },
  },
  {
    // app / saas 出海
    slug: 'app-saas-global',
    navTitle: 'App/SaaS global',
    seo: {
      title: 'App/SaaS global AI Gateway and token cost management | MoxAI',
      description:
        'MoxAI gives App and SaaS global teams a controllable AI Gateway for multi-model access, API key permissions, token usage, tenant cost, and product feature cost attribution.',
      keywords:
        'App global AI gateway, SaaS global AI Gateway, AI cost management, token cost attribution, multi-model access, API key management, MoxAI',
      canonicalUrl: 'https://moxai.ai/solutions/app-saas-global',
      ogDescription:
        'Connect multiple AI models and track token costs by product feature, tenant, customer, and plan so AI features can launch safely and scale predictably.',
      twitterDescription:
        'Unified multi-model access, API keys, token usage, and product-level cost attribution for App and SaaS global teams.',
      schemaName: 'MoxAI for App/SaaS Global Teams',
      schemaCategory: 'BusinessApplication',
    },
    hero: {
      eyebrow: 'For App and SaaS Global Teams',
      titlePrefix: 'Build a controllable AI Gateway for global ',
      titleAccent: 'App and SaaS',
      titleSuffix: ' products',
      description:
        'Connect multiple models through one layer and attribute token cost by feature, tenant, customer, and plan so AI features can launch safely, scale steadily, and remain explainable.',
      primaryCta: 'Register now',
      secondaryCta: 'View SaaS cost attribution example',
      secondaryHref: '#solution',
      metrics: [
        { value: '1', label: 'Unified endpoint' },
        { value: 'Tenant', label: 'Cost attribution' },
        { value: '0', label: 'Master keys exposed' },
        { value: 'Policy', label: 'Model routing' },
      ],
    },
    pain: {
      title:
        'After AI features launch, cost and permissions can fail before model capability does',
      description:
        'Global SaaS teams usually know how to call models, but struggle to fit those calls into product, tenant, and monetization systems.',
      cards: [
        {
          marker: '01',
          title: 'Cost cannot be attributed by feature',
          description:
            'Summaries, support, search, generation, and analysis share model calls, but the final bill is just one provider charge.',
        },
        {
          marker: '02',
          title: 'Free and paid users need different strategies',
          description:
            'Different plans need different models, quotas, and fallback strategies, but hard-coding them into business logic becomes hard to maintain.',
        },
        {
          marker: '03',
          title: 'Global call stability differs by provider',
          description:
            'Provider latency and availability vary by region, so teams need unified logs, failure rates, and switching policies.',
        },
      ],
    },
    solution: {
      title: 'Turn AI calls into product-managed infrastructure',
      description:
        'MoxAI sits between your product and model providers, handling API keys, model routing, tenant attribution, token analytics, and budget control.',
      panelTitle: 'Product-level cost attribution',
      rows: [
        {
          label: 'Feature',
          value: 'AI support / Content generation / AI search',
          status: 'Measurable',
        },
        {
          label: 'Tenant',
          value: 'Attribute by customer, plan, and workspace',
          status: 'Splittable',
        },
        {
          label: 'Policy',
          value: 'Low-cost free users, high-quality paid users',
          status: 'Routable',
        },
      ],
      terminalTitle: 'api.moxai.ai/v1',
      terminalLines: [
        '# Add tenant and feature metadata for cost attribution',
        'client.chat.completions.create(',
        '  model="auto:product-support",',
        '  messages=messages,',
        '  metadata={',
        '    "tenant": "acme-pro",',
        '    "feature": "ai-summary",',
        '    "plan": "business"',
        '  }',
        ')',
      ],
    },
    scenes: {
      title: 'Fit common App and SaaS AI scenarios',
      cards: [
        {
          marker: 'AI',
          title: 'In-product AI features',
          description:
            'Unify summaries, search, generation, classification, and assistants while tracking cost and call quality by feature.',
        },
        {
          marker: 'B2B',
          title: 'Multi-tenant SaaS',
          description:
            'Split token cost by customer, plan, and workspace to support pricing and margin analysis.',
        },
        {
          marker: 'UP',
          title: 'Model fallback and cost optimization',
          description:
            'Use stronger models for high-value tasks and route routine requests to lower-cost or backup models.',
        },
      ],
    },
    cta: {
      eyebrow: 'moxai.ai',
      title: 'Grow AI features without letting AI cost drift out of control',
      description:
        'Built for App and SaaS teams embedding AI capabilities into global products.',
    },
  },
  {
    // 开发者互联网团队
    slug: 'developer-overseas-models',
    navTitle: 'Developer and internet',
    seo: {
      title: 'Overseas model gateway and API key management | MoxAI',
      description:
        'MoxAI gives developers and internet teams an overseas model gateway: one endpoint for multiple overseas models, with unified API keys, permissions, logs, token analytics, and project cost attribution.',
      keywords:
        'overseas model calls, AI Gateway, LLM Gateway, OpenAI-compatible gateway, API key management, token analytics, AI request logs, multi-model routing, MoxAI',
      canonicalUrl: 'https://moxai.ai/solutions/developer-overseas-models',
      ogDescription:
        'Use one endpoint for multiple overseas models while unifying API keys, permissions, request logs, token analytics, and project-level cost attribution.',
      twitterDescription:
        'An overseas model gateway for developers and internet teams, with one endpoint for multiple models.',
      schemaName: 'MoxAI Overseas Model Gateway',
      schemaCategory: 'DeveloperApplication',
    },
    hero: {
      eyebrow: 'For Developers, Internet Teams, and Overseas Models',
      titlePrefix: 'An ',
      titleAccent: 'overseas model gateway',
      titleSuffix: ' for developers and internet teams',
      description:
        'Use one endpoint to access multiple overseas models while unifying API keys, permissions, request logs, token analytics, and project-level cost attribution.',
      primaryCta: 'Register now',
      secondaryCta: 'View API integration',
      secondaryHref: 'https://moxai.ai/apidocuments/',
      metrics: [
        { value: 'SDK', label: 'Compatible access' },
        { value: 'Endpoint', label: 'Unified entry' },
        { value: 'Logs', label: 'Request tracing' },
        { value: 'Cost', label: 'Project attribution' },
      ],
    },
    pain: {
      title:
        'Multi-model integration is not hard once. It repeats in every project',
      description:
        'Developers and internet teams care about low migration cost, unified auth, observable logs, model switching, and project-level cost analytics.',
      cards: [
        {
          marker: '01',
          title: 'Repeated integration across providers',
          description:
            'Different SDKs, endpoints, auth methods, error codes, and log formats spread across projects.',
        },
        {
          marker: '02',
          title: 'API keys and environment permissions are messy',
          description:
            'Development, test, and production environments often share keys across teams, making security and scope hard to control.',
        },
        {
          marker: '03',
          title: 'Project-level observability is missing',
          description:
            'Failures, latency, tokens, cost, and model quality cannot be traced in one place, making debugging expensive.',
        },
      ],
    },
    solution: {
      title:
        'Lower integration and management cost with an SDK-compatible AI Gateway',
      description:
        'MoxAI provides a unified API layer so developers can access overseas models quickly while teams gain permissions, logs, token analytics, and cost management.',
      panelTitle: 'Gateway capabilities developers need',
      rows: [
        {
          label: 'Compatible',
          value: 'Keep OpenAI SDK-style calls where possible',
          status: 'Low migration',
        },
        {
          label: 'Routing',
          value: 'Choose models by availability, cost, and task',
          status: 'Switchable',
        },
        {
          label: 'Logs',
          value: 'Record request, model, tokens, and status together',
          status: 'Observable',
        },
        {
          label: 'Cost',
          value: 'Split usage by project, environment, and customer',
          status: 'Attributable',
        },
      ],
      terminalTitle: 'api.moxai.ai/v1',
      terminalFirst: false,
      terminalLines: [
        'from openai import OpenAI',
        '',
        'client = OpenAI(',
        '  base_url="https://api.moxai.ai",',
        '  api_key="mx_project_key"',
        ')',
        '',
        'response = client.chat.completions.create(',
        '  model="auto:best_available",',
        '  messages=messages,',
        '  metadata={',
        '    "project": "ai-agent-prod",',
        '    "env": "production"',
        '  }',
        ')',
      ],
    },
    scenes: {
      title: 'For development teams that need overseas model calls',
      cards: [
        {
          marker: 'API',
          title: 'AI products and tools',
          description:
            'Provide one model entry point for AI agents, automation tools, content platforms, and internal systems.',
        },
        {
          marker: 'ENV',
          title: 'Multiple projects and environments',
          description:
            'Configure separate keys, model permissions, quotas, and request logs for development, test, and production.',
        },
        {
          marker: 'OBS',
          title: 'Request observability',
          description:
            'View latency, failure rates, token usage, provider cost, and abnormal requests in one place.',
        },
      ],
    },
    cta: {
      eyebrow: 'OpenAI-compatible gateway for teams',
      title: 'Write less gateway code and gain team-level management',
      description:
        'Built for developers and internet teams that need stable overseas model calls with project cost, API key, log, and permission management.',
    },
  },
]

export const SOLUTIONS = Object.fromEntries(
  SOLUTION_LIST.map((solution) => [solution.slug, solution])
) as Record<SolutionSlug, Solution>

export function isSolutionSlug(slug: string): slug is SolutionSlug {
  return Object.prototype.hasOwnProperty.call(SOLUTIONS, slug)
}
