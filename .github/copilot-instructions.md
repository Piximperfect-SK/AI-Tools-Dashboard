# Copilot instructions for AI Tools Dashboard

## Big picture
- This is a Vite + React (SWC) single-page that renders `App` → `[src/components/AIToolsDashboard.tsx](src/components/AIToolsDashboard.tsx)` and mounts via `src/main.tsx` with the Tailwind-generated `src/index.css` base loaded globally.
- There is no backend or data fetching yet: the entire dataset, filters, and UI state live inside `AIToolsDashboard`, so updates happen by editing that component rather than wiring APIs.
- Every screen update flows through two pieces: `AIToolsDashboard` manages the search/category filters and produces `filteredTools`, then `AIToolCard` animates and displays each entry with the gradient/feature details.

## Data & UI conventions
- `aiTools` (starting at [src/components/AIToolsDashboard.tsx](src/components/AIToolsDashboard.tsx#L17)) is the canonical list of tool records. Each entry must include `id`, `name`, `description`, `category`, `icon`, `color`, `features`, and `pricing` because `AIToolCard` uses all of those props for the gradient headers, hover list, and footer badges.
- Category filter buttons pull from the `categories` array ([src/components/AIToolsDashboard.tsx#L140]); adding a new category requires updating this list and tagging the relevant tools so the `selectedCategory` guard in `filteredTools` recognizes them.
- Search is case-insensitive and matches both `name` and `description` via `toLowerCase()` before filtering ([src/components/AIToolsDashboard.tsx#L146-L152]). Keep that pattern if you need to extend text-based filtering.
- The empty state lives in the same component and renders when `filteredTools` is empty, so you can tweak copy/illustration there instead of scattering it elsewhere.

## Animation & interaction notes
- Both the header/category panel and the grid items are wrapped with `motion` components from `motion/react`, so changes to animation timing or staggered layouts should happen through those wrappers, not brute-force CSS transitions.
- `AIToolCard` toggles `isHovered` and `isFavorite` via `useState`, shows the `features` list using `AnimatePresence` ([src/components/AIToolCard.tsx#L114-L132]), and uses the `tool.color` string to drive gradients on the glow, badge, and explore button. Keep the gradient classes together (e.g., `bg-gradient-to-br ${tool.color}`) so the styling stays consistent.
- Icons come from `lucide-react` (Sparkles, Search, ExternalLink, Star, TrendingUp) and are paired with `motion` for hover tweaks, so treat them as controlled visual affordances rather than static images.

## Styling & theming
- Tailwind classes drive every layout detail—there are no separate CSS modules. The reset + utility setup lives in `src/index.css` (generated Tailwind base) and `src/styles/globals.css` for color tokens, dark-mode variables, and the `@theme inline` mappings. If you need to expose new semantic colors or tokens, add them to `globals.css` and reuse them via `@apply` or inline class strings.
- The background gradient in `AIToolsDashboard` is set on the outer `<div>` with `from-slate-950 via-slate-900 to-slate-950`, so keep the outer layout structure if you change the hero area.

## Workflow shortcuts
- Install dependencies with `npm i` and run the dev server with `npm run dev` (see README). Vite starts on port 5173 by default; Live Reload picks up edits in both `/src` and `/src/styles` thanks to CSS-in-JS + Tailwind layers.
- Run `npm run build` before shipping changes to ensure the SWC bundler picks up the same tree-shaking logic as development.
- There are no automated tests in this bundle, so rely on the dev server for manual verification (especially the filtering animations and feature list toggles).

## Dependency quirks
- Even though the dependency list includes several Radix UI packages, the current UI only imports `motion/react` and `lucide-react`. Treat the extra dependencies as placeholders—you don’t need to wire them unless you explicitly add those UI layers.
- The theming scaffolding (`next-themes` is in `package.json` but not used yet). If you introduce new dark/light toggles, place the toggler on the outer layout and toggle the `.dark` class so the CSS variables in `src/styles/globals.css` respond.

## Verification tips
- After editing `AIToolsDashboard` or `AIToolCard`, refresh the dev server to review search/category coverage and hover animations.
- Because the data array is static, use the developer console or React DevTools to confirm `filteredTools` output if filters misbehave.

Please let me know if any section here is unclear or missing context so I can iterate.