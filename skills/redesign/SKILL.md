---
name: redesign
description: Use when upgrading the look of an existing website or app in place - restyling a codebase without breaking routes, data, forms or tests. Works with Tailwind, shadcn/ui, CSS modules, plain CSS, Next.js, React, Vue, Svelte, Astro and static HTML. Applies changes in a safe order, system first, screens second.
---

# Redesign in Place

Refinement keeps the identity and improves the craft. A full redesign replaces the look but keeps every fact, feature and flow. Decide which one the user asked for; if unclear, refine.

## Safe order (do not skip ahead)

1. **Inventory** (read-only). Note: how styles are applied, where tokens live, the component library, the root layout, and which files the main pages use. Run the tests/typecheck/build command once if it is cheap, so you know the starting state.
2. **Tokens.** Put the `direction` plan into the project's token home (Tailwind theme, CSS variables, shadcn variables). Replace hard-coded hex values in shared components with tokens as you touch them.
3. **Fonts.** Load the chosen fonts the way the stack prefers (`next/font`, `@fontsource`, or `<link>` with `display=swap`). Set them on `body` and headings globally.
4. **Global base.** Background, text colour, selection colour, focus ring (`:focus-visible` with a 2px accent outline and offset), link style, scrollbar if dark, `text-wrap: balance` on headings, smooth font rendering.
5. **Primitives.** Button, input, select, card, badge, table, modal, nav. Fix these once: sizes, radius, weights, hover/active/focus/disabled states. Most of the visible upgrade happens here.
6. **Layout shells.** Header, footer, sidebar, page container widths, section spacing.
7. **Signature screens.** The home page or main dashboard: apply the mode skill (`landing`, `app-ui`, `game-ui`).
8. **Sweep.** Search for leftovers: raw hex, `transition: all`, inline styles, emoji icons, one-off font sizes. Fix the worst ones.
9. **Check.** Run the same build/test command. Look at the main pages at 1440px and 390px.

## Preserve
- Every route, link, form field name, `id` used by scripts, `data-*` used by tests, ARIA attributes, meta tags, analytics snippets and copy that states facts.
- Component APIs: keep props working. Add variants rather than renaming.
- Dark mode if the project has one: update both themes.

## Stack notes
- **Tailwind:** prefer editing the theme and a few shared components over rewriting class strings in every file. Use `@apply` sparingly, only in base layers.
- **shadcn/ui:** the CSS variables in `globals.css` and `components/ui/*` are the leverage points. Change `--radius`, colour variables and the button/card variants first.
- **Component library (MUI, Chakra, Mantine, Ant):** use its theme API, not overrides on every instance.
- **Static HTML/CSS:** add a `:root` token block at the top of the main stylesheet and refactor values into it.

## Icons and imagery
- Replace emoji icons with one icon set (Lucide, Phosphor, Tabler) at one stroke width. If adding a package is not allowed, inline SVG.
- Keep real photos. Crop them with intent (`object-fit: cover`, consistent aspect ratios). Never replace real work photos with stock.
- Missing imagery: build it from UI (a real product screen in HTML), type, or shape. Mark spots where the owner should add a photo.
