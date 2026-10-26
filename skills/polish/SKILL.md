---
name: polish
description: Use for the final quality pass on any web UI before shipping - spacing, alignment, interactive states, accessibility, responsive behaviour, performance, copy and the small details that separate good from great. Also use when a design is "almost there" or the user says "make it feel finished".
---

# Final Polish

Go through the list once, fix in one batch, then look at the page. Do not narrate each item; report only what you changed.

## Layout and rhythm
- [ ] Every spacing value comes from the scale. Sections breathe evenly (e.g. 96-128px desktop, 56-72px phone).
- [ ] Left edges line up down the page. Text blocks do not float alone in the middle.
- [ ] No orphaned single words in headings (`text-wrap: balance`).
- [ ] Optical alignment: icons nudged to sit centred with text; play-button triangles shifted right.
- [ ] Nested radius: inner radius = outer radius - padding.

## States
- [ ] Hover (pointer devices only: `@media (hover: hover)`), `:focus-visible`, `:active`, disabled, loading for every button and link.
- [ ] Inputs: focus ring, error, disabled, filled. Placeholder is never the label.
- [ ] Empty, loading and error states exist for every data view.

## Accessibility
- [ ] Text contrast 4.5:1 (3:1 for large). Check muted text and text on accent.
- [ ] Visible focus everywhere; tab order follows the visual order; skip link on content sites.
- [ ] Icon-only buttons have `aria-label`. Images have meaningful `alt` or `alt=""` if decorative.
- [ ] Headings in order (one `h1`). Landmarks: `header nav main footer`.
- [ ] Hit targets 44px+ on touch. Colour is never the only signal.
- [ ] `prefers-reduced-motion` handled.

## Responsive
- [ ] 390px: no sideways scroll, nav collapses cleanly, tables become cards or scroll inside their own box, hero text fits without awkward breaks.
- [ ] 768px and 1440px+: content max width (1200-1320px), no ultra-long lines.
- [ ] Images use `srcset`/`sizes` or the framework image component, and have width/height to avoid layout shift.

## Performance
- [ ] Fonts: 2-3 weights, `display: swap`, preload the main one. Images AVIF/WebP, lazy below the fold.
- [ ] No animation on layout properties. No giant blur filters over large areas on mobile.
- [ ] Third-party scripts deferred.

## Copy and details
- [ ] Buttons name the action. Same action, same word everywhere.
- [ ] Numbers, dates and money formatted for the locale; `tabular-nums` where they line up.
- [ ] Curly quotes and real apostrophes (’), proper ellipsis (…), non-breaking space in "10 km".
- [ ] Favicon, page titles, social share image present.
- [ ] `::selection` colour set; `color-scheme` set for dark themes so form controls match.
- [ ] Remove one accessory: cut the least useful decoration on the page.

## Verify
Look at the rendered page at 1440px and 390px (screenshot tool, Playwright, or the browser). If something looks off, fix it and look once more. If you cannot render, say so.
