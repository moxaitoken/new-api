# Project map

- Purpose: Go AI API gateway with a React management console and provider relay.
- Backend: root `go.mod`; `main.go` initializes Gin and embeds `web/dist`.
  `router/` owns HTTP routes, `controller/` request handling, `service/` business
  logic, `model/` GORM persistence, `relay/` provider forwarding.
- Independent Go modules: `relaykit/` protocol conversion, `tokenkit/` token counting.
- Integrations: SQLite/MySQL/PostgreSQL, optional separate log database, Redis;
  provider credentials stay in the existing channel subsystem.
- Console: `web/package.json`, React/TypeScript, Rsbuild, Bun, TanStack Router/Query,
  Zustand, Base UI and Tailwind; `web/src/features/` owns feature implementations.
- Contracts: management routes under `/api`; model relay under `/v1`, `/v1beta`
  and provider/task routes. Preserve existing authentication and relay formats.
- Settings: `setting/config` registers structs persisted through the existing
  options mechanism. `controller/misc.go` exposes public `/api/status` data.
  `ServerAddress` remains the website/callback address; optional
  `general_setting.api_address` supplies the console's connection/export base URL.
- Shared public status query: `web/src/lib/status-query.ts`; API base selection and
  validation: `web/src/lib/api-address.ts`. Site settings own the API address form.
- Generated outputs: `web/dist`, `web/src/routeTree.gen.ts`; change generator inputs.
- Verification: `.github/workflows/ci.yml`, `make test`, `go test ./...`,
  `web/` scripts `bun run typecheck`, `bun run test`, `bun run lint`, `bun run build`.
- Normative rules: `docs/developmentConventions.md`, root and nearest `AGENTS.md`.
