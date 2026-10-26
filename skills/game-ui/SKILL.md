---
name: game-ui
description: Use when designing or upgrading the interface of a browser or mobile game (Play mode) - title screens, menus, HUDs, scoreboards, settings, pause and game-over screens, shops, and the "juice" (feedback, screen shake, particles, sound cues) that makes play feel good. Works with DOM/CSS overlays, Canvas, Phaser, PixiJS and Three.js.
---

# Game UI (Play mode)

Players read the UI at speed, mid-action. Legibility first, personality second, both always.

## Art direction in one line
Write it before touching code: era/genre + material + palette + type. Example: "1980s arcade cabinet, glossy plastic, deep violet with sun yellow, condensed sport type". Every screen follows it.

## Screens
- **Title:** game name large, one obvious Play button (keyboard focus on it by default), secondary items smaller. Show the game moving behind it if possible.
- **Menus:** vertical lists with a strong selected state (scale 1.05 + colour + marker). Work with mouse, touch, keyboard arrows/Enter and gamepad if supported. Esc/back always works.
- **HUD:** only what the player needs right now. Corners and edges, never the centre of the action. Score/time/health readable at a glance: big tabular numbers, high contrast, a dark backing plate or outline when over busy scenes.
- **Pause:** dims and blurs the game, freezes time, Resume is the default focus.
- **Game over / results:** the result first (score, rank, new best), then Retry as the primary action (fastest path back in), then Menu.
- **Settings:** volume sliders (music/effects separate), controls, reduced motion/flash toggle, colour-blind friendly option if colour carries meaning.

## Juice (feedback that makes it feel good)
Use in layers, scaled to the event's importance:
- Every input gets an instant response (under 50ms): press scale, sound, flash.
- Hits/scores: number pop (scale 1.4 → 1, 150ms), short screen shake (2-6px, under 200ms), particles, a sound.
- Big moments (level up, win): hit-stop (40-80ms freeze), bigger shake, colour flash, a fanfare. Use rarely so they stay big.
- Counters roll up rather than jump. Health bars lag a ghost bar behind the real value.
- Respect `prefers-reduced-motion` and a settings toggle: drop shake and flashes, keep sound and colour feedback.

## Type and colour
- Display font with character for titles; a clean, wide, legible font for numbers and body. Numbers always `tabular-nums`.
- Text over the scene: outline (`-webkit-text-stroke` or text-shadow in 4 directions) or a backing plate. Never rely on the scene's colour.
- Team/state colours must differ in brightness too, not hue alone.

## Technical
- DOM overlay on top of the canvas for menus and text: sharper text, accessibility, easier styling. Keep the HUD's DOM small and update with `transform`/`textContent`, not layout-changing properties.
- Scale UI with the viewport (`clamp()`, or a UI scale setting). Test 390px portrait and landscape.
- Touch targets 48px+, with thumb-zone placement on phones (bottom corners).
- Preload UI fonts and sounds; first interaction unlocks audio.
