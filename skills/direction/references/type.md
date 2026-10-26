# Typography

## Rules
- 1 family, or 2 that are clearly different (grotesk + serif, wide + condensed). Never two similar sans fonts.
- Body 16-18px on marketing, 14-15px in dense app UI. Never below 12px for anything readable.
- Line length 45-80 characters (`max-width: 65ch`). Serif body gets slightly more leading.
- Leading: body 1.5-1.65, headings 1.0-1.15. Letter spacing: large headings -0.01 to -0.03em; small caps labels +0.04em at most.
- Scale: pick one ratio. 1.2 for apps, 1.25-1.333 for marketing, 1.5+ for editorial heroes. Use `clamp()` for fluid hero sizes, e.g. `clamp(2.5rem, 5vw + 1rem, 5rem)`.
- Numbers in tables, prices, timers: `font-variant-numeric: tabular-nums`.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Weight does hierarchy before colour does. Muted text is for secondary info, not for body copy.

## Pairings by feel (all on Google Fonts)

| Feel | Display | Body |
|---|---|---|
| Precise product | Geist / Inter Tight 600 | Geist / Inter |
| Confident utilitarian | Archivo (width 75-125) | Public Sans / Archivo |
| Friendly modern | Bricolage Grotesque | Figtree / DM Sans |
| Editorial premium | Fraunces / Newsreader | Source Sans 3 / Inter |
| Classic luxury | Cormorant Garamond / Playfair Display | Manrope / Jost |
| Technical | Space Grotesk / IBM Plex Sans | IBM Plex Sans + IBM Plex Mono for data |
| Warm local | Recoleta-style: Young Serif / Gelasio | Nunito Sans / Karla |
| Bold sport / game | Big Shoulders Display / Anton | Barlow / Rubik |
| Playful | Fredoka / Baloo 2 | Nunito |
| Raw / brutal | Space Mono / Unbounded | Inter / system-ui |

Load only the weights used (usually 2-3). Prefer variable fonts.
