---
name: audit
description: Use when asked to score, grade, critique or review the design of a website, app, landing page, dashboard or game UI. Returns a score out of 100 across eight categories, the generic "AI look" tells found, and a fix list ranked by points gained. Read-only; it changes nothing.
---

# Design Audit

Score what is there, honestly. A generic but tidy page lands around 55-65. Reserve 90+ for work a senior designer would ship.

## Steps

1. Run `node <skill-base-dir>/scripts/slop-scan.mjs <project-dir>` for a fast static read (fonts, colours, radii, shadows, motion, emoji icons, focus styles).
2. Look at the rendered page if you can (desktop 1440px and phone 390px). A screenshot beats reading 1,000 lines of CSS. If you cannot render it, score from code and mark visual categories "estimated".
3. Score each category, then list fixes.

## Categories (100 points)

| # | Category | Pts | Full marks means |
|---|---|---|---|
| 1 | Hierarchy | 15 | One clear focal point per screen; the eye knows where to go next. Size, weight and space do the work, not colour alone. |
| 2 | Typography | 15 | Deliberate typefaces (max 2), a real scale, body 16px+, line length 45-80 characters, tight headings, comfortable body leading. |
| 3 | Colour | 12 | 4-6 named tokens, one accent used with discipline, neutrals tinted toward the brand, text contrast 4.5:1+. |
| 4 | Layout and spacing | 15 | One spacing scale, consistent rhythm, alignment to a grid, variety in section shapes, no cramped or floating blocks. |
| 5 | Identity | 13 | It looks like this product and no other. Imagery, motifs and copy come from the subject's world. |
| 6 | Interaction and states | 10 | Hover, focus, active, disabled, loading, empty and error states exist and are designed. |
| 7 | Responsive | 10 | Works at 390px with no sideways scroll, tap targets 44px+, nav that fits. |
| 8 | Accessibility and performance | 10 | Visible focus, labels, alt text, reduced motion respected, no layout shift, fonts load without flash. |

## Generic "AI look" tells (each costs points in Identity or Hierarchy)

- Purple-to-blue or pink gradient hero, gradient text on the main headline.
- System default font or Inter/Roboto/Arial everywhere with no type decisions.
- Every section centred, every section the same height, three identical cards in a row.
- One border radius and one soft grey shadow on everything.
- Emoji used as icons. Icon in a coloured circle above every card title.
- Tracked-out ALL-CAPS eyebrow above every heading. "01 / 02 / 03" on things that are not steps.
- Fade-and-slide-up on every section. `transition: all`.
- Fake numbers ("10,000+ happy customers") and stock "Trusted by" logo rows.
- Cream background with terracotta accent and serif headline; or near-black with one acid-green accent (both are current defaults, fine only when chosen on purpose).
- Buttons ending in "→", vague CTAs ("Get started", "Learn more", "Submit").

## Output format

```
Design score: 58/100  (Persuade mode)
Hierarchy 9/15 · Type 7/15 · Colour 8/12 · Layout 9/15 · Identity 4/13 · States 6/10 · Responsive 8/10 · A11y/Perf 7/10

Tells found: gradient hero, Inter only, 3 identical feature cards, emoji icons

Fixes, biggest gain first
1. (+8) Replace gradient hero with a product-led hero showing the real schedule view. — app/page.tsx
2. (+6) Set a type pair and scale in tokens. — globals.css
...
```

Keep it under 40 lines. Point to files. Each fix names what to do, not just what is wrong.
