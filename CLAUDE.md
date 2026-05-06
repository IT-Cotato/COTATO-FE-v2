# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Root (Turborepo monorepo — use from root)

```bash
pnpm dev              # Run all apps (homepage :3001, recruit :3000)
pnpm dev:home         # Homepage only
pnpm dev:recruit      # Recruit only
pnpm build            # Build all apps
pnpm lint             # Lint all packages
pnpm check-types      # TypeScript check across monorepo
pnpm format           # Prettier format all .ts/.tsx/.md files
```

### UI package (packages/ui)

```bash
pnpm dev:components   # Watch mode for shared components
pnpm dev:styles       # Watch mode for Tailwind CSS
```

## Architecture

**pnpm workspace + Turborepo monorepo** with two Next.js 16 apps sharing a UI library.

```
apps/
  homepage/   # cotato.kr — main website
  recruit/    # recruit.cotato.kr — recruitment platform
packages/
  ui/               # Shared component library (@repo/ui)
  tailwind-config/  # Shared Tailwind theme
  typescript-config/# Shared tsconfig variants (nextjs / react-library / base)
  eslint-config/    # Shared ESLint rules
```

Both apps use **Next.js App Router** with route groups for layout composition:

- `(with-header)/(with-footer)/(home)/page.tsx` — nested layouts via parenthesized folders
- `@` alias resolves to `src/` within each app

### Data flow

- **Server state**: TanStack Query v5 — custom hooks in `hooks/mutations/use*.mutation.ts` and `hooks/queries/`; query identifiers centralized in `constants/queryKeys.ts`
- **Client state**: Zustand v5 — stores in `store/use*.ts` (e.g., auth, admin)
- **API layer**: Axios clients in `services/api/*.api.ts`
- **Validation**: Zod v4 schemas in `schemas/*.schema.ts`, consumed via React Hook Form + `@hookform/resolvers`

### Auth & routing

- `ProtectedRoute` component wraps role-gated pages (roles: `ADMIN`, `MEMBER`)
- Token management via `services/utils/tokenManager`
- Route constants centralized in `constants/routes.ts`

### Shared UI (@repo/ui)

Import from `@repo/ui`. Key exports: `Button`, `FullButton`, `FormInput`, `FormTextarea`, `FormFile`, `FormSelect`, `Modal`, `StatusDropdown`, `CheckboxFilter`, `Pagination`, `StatusChip`, `HeroMainBanner`.

## Conventions

### File naming

| Type                          | Convention            | Example                                                |
| ----------------------------- | --------------------- | ------------------------------------------------------ |
| Components                    | PascalCase            | `HomeClient.tsx`                                       |
| Hooks / stores / utils        | camelCase             | `useAuthStore.ts`                                      |
| API / mutation / schema files | camelCase with suffix | `auth.api.ts`, `useAuth.mutation.ts`, `auth.schema.ts` |
| Folders, assets, icons        | kebab-case            | `mock-faq.ts`, `brand-logo.svg`                        |

### Component declarations

- Pages and layouts: `export default function`
- All other components: `export const ComponentName = () => { }`

### Git

- Branch: `prefix/scope/issue-number-description` (e.g., `fix/recruit/363-mypage-fix`)
- Commit: `prefix(scope): description (#issue-number)` (e.g., `fix(recruit): 버그 수정 (#363)`)
- Prefixes: `feat` `fix` `refactor` `hotfix` `docs` `chore`
- Scopes: `recruit` `homepage` `root`
- Husky pre-commit runs ESLint + Prettier auto-fix; commitlint validates message format

### Code style

- ESLint `max-warnings: 0` — zero warnings allowed
- Prettier: `singleQuote: true`, `printWidth: 80`, Tailwind class ordering via plugin
- Device-specific layouts go in `_desktop/` and `_mobile/` sub-folders when needed

### Pull Requests

- **Template Compliance**: Before creating a Pull Request, always read and strictly follow the format defined in `.github/PULL_REQUEST_TEMPLATE.md`.
- **Content**: Ensure all sections (Description, Key Changes, Screenshots, etc.) are populated based on the current changes.
- **Checklists**: Mark checkboxes as completed only if the criteria are genuinely met.
- **Automation**: When using `gh pr create`, use the template content for the `--body` or `--body-file` flag.
