---
name: direction
description: Use when a project needs a visual direction or design system before building or restyling - choosing colours, fonts, type scale, spacing, radius, shadows and motion as tokens. Produces a short DESIGN.md token plan matched to the product and checked against generic defaults.
---

# Design Direction

Decide the look on paper first. A 30-line plan saves hours of restyling.

## 1. Find the subject's world
Write down 5 concrete nouns from the product's real world (for a roofing CRM: shingles, ladders, invoices, weather, trucks). Distinct choices come from these, not from "modern and clean".

## 2. Set three dials (1-10)

| Dial | Low | High | Typical |
|---|---|---|---|
| Variance | centred, symmetric, calm | asymmetric, editorial, surprising | Landing 6-8, CRM 2-4, Game 7-9 |
| Motion | instant, minimal | choreographed, playful | Landing 4-6, CRM 2-3, Game 7-9 |
| Density | airy, big spacing | packed, small spacing | Landing 2-4, CRM 6-8, Game HUD 5-7 |

## 3. Pick a style family
Open `references/styles.md` and choose one family that fits the product and the dials. Bend it toward the subject's world. Do not stack two families.

## 4. Write the token plan
Use `references/color.md` and `references/type.md`. Output this, saved as `DESIGN.md` in the project root when the user wants it kept:

```md
# Design: <product>
Read: <one line>. Mode: <mode>. Dials: variance 7 / motion 4 / density 3.
Family: <style family> — <one sentence on how it is bent to this subject>

Colour   bg #… · surface #… · ink #… · muted #… · accent #… · accent-ink #… (+ success/warn/danger if Operate)
Type     display <font> 600-800, tight -0.02em · body <font> 400/500 · scale 1.25 (14/16/20/25/31/39/49/61)
Space    4px base: 4 8 12 16 24 32 48 64 96 128
Radius   <values per size: e.g. 6 inputs, 10 cards, 999 pills>
Shadow   <1-2 layered shadows tinted with ink, or none>
Motion   ease-out cubic-bezier(.23,1,.32,1) · 150-250ms UI · one signature moment: <what>
Signature <the one memorable thing on this site>
Never    <2-3 things this design refuses to do>
```

## 5. Anti-default check (required)
Ask: "Would I produce this same plan for any other product in this category?" For each part that answers yes, change it and say why in one line. Common defaults to question: Inter + slate + indigo; purple gradients; cream + terracotta + serif; black + acid green; one radius everywhere.

The user's own brand, colours or fonts always win over this check.

## Implementation targets
- Tailwind v4: tokens in `@theme { --color-*, --font-*, --radius-* }` in the main CSS.
- Tailwind v3: `theme.extend` in `tailwind.config`.
- shadcn/ui: map tokens onto `--background --foreground --primary --muted --border --ring --radius` (HSL or OKLCH as the project already uses).
- Plain CSS: custom properties on `:root`, dark values under `[data-theme="dark"]` and `prefers-color-scheme`.
- Fonts: self-host or `next/font`; otherwise Google Fonts with `display=swap` and `preconnect`.
