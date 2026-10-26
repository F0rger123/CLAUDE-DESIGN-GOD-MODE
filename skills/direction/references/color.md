# Colour

## Build the palette
1. Start from the brand colour if one exists. Otherwise pull the accent from the subject's world (hi-vis orange for trades, pool blue for pool service, sage for landscaping, signal red for fire safety).
2. Tint the neutrals toward the accent's hue: grey with 2-6% saturation looks designed; pure grey looks default.
3. Build in OKLCH when you can: keep chroma steady and step lightness for a 50-950 ramp. `oklch(62% 0.17 45)` style values make even ramps.
4. Name tokens by job: `bg surface surface-2 border ink ink-muted accent accent-ink` plus `success warn danger info` for apps.

## Discipline
- 60/30/10: background and surfaces / ink and neutrals / accent. The accent marks the one thing to do.
- Accent on: primary buttons, links, active nav, focus ring, key data. Not on headings, not on decoration everywhere.
- Status colours mean status only. Red is never decoration in an app.
- Text contrast 4.5:1 minimum (3:1 for 24px+ or bold 19px+). Check accent-on-white buttons; many oranges and yellows need dark text.
- Gradients: allowed when they come from the subject (sky, metal, light). Never as filler behind every section.

## Dark mode
- Not inverted light mode. Surfaces step up in lightness (e.g. L 14% / 18% / 23%), not down.
- Desaturate and lighten the accent slightly. Lower shadow use; use borders and surface steps for depth.
- Body text off-white (L 92-95%), not pure white.

## Starter palettes (bend them, do not copy blindly)

| Name | bg | surface | ink | muted | accent | Fits |
|---|---|---|---|---|---|---|
| Hi-vis | #F3F4F1 | #FFFFFF | #16202A | #5B6670 | #F59E0B (dark text) | trades, field service |
| Harbour | #F4F7F8 | #FFFFFF | #0E2433 | #557080 | #0E7C86 | pools, marine, clean tech |
| Ledger | #F7F7F5 | #FFFFFF | #1C1B19 | #6B6862 | #2F5D50 | finance, accounting, legal |
| Signal | #FAFAFA | #FFFFFF | #111827 | #6B7280 | #E5484D | security, emergency, sport |
| Orchard | #F6F5EE | #FFFFFF | #22301F | #66705F | #5B8C2A | landscaping, food, outdoors |
| Nightshift | #0D1117 | #161B22 | #E6EDF3 | #8B949E | #58A6FF | dev tools, dashboards (dark) |
| Arcade | #140F2D | #1F1846 | #F4F1FF | #A79FCF | #FFD23F | games, events (dark) |
| Atelier | #FBFAF8 | #FFFFFF | #1A1A1A | #707070 | #9C6B3F | luxury, interiors, remodelers |
