---
name: motion
description: Use when adding, reviewing or fixing animation and transitions in a web UI - hover and press feedback, modals, dropdowns, toasts, page and scroll reveals, springs, easing and durations. Decides whether something should animate at all, then how, with reduced-motion support.
---

# Motion

Motion explains change and confirms input. If it does neither, it is decoration and needs a reason.

## 1. Should it animate?

| How often the user sees it | Decision |
|---|---|
| 100+ times a day (shortcuts, palette toggle, typing) | Never animate |
| Tens of times (hover, list navigation, tabs) | Tiny or none (colour/opacity under 150ms) |
| Occasionally (modal, drawer, toast, dropdown) | Standard transition |
| Rarely (onboarding, success, first visit hero) | Room for delight |

Never animate keyboard-triggered actions.

## 2. Easing
- Entering or exiting: strong ease-out `cubic-bezier(.23, 1, .32, 1)`.
- Moving on screen: ease-in-out `cubic-bezier(.77, 0, .175, 1)`.
- Drawers/sheets: `cubic-bezier(.32, .72, 0, 1)`.
- Colour/hover: `ease`. Constant motion (marquee, progress): `linear`.
- Never `ease-in` for UI; it feels laggy at the moment the user is watching.

## 3. Duration
Press 100-160ms · tooltip 125-200ms · dropdown 150-250ms · modal/drawer 200-400ms · marketing hero up to 800ms. Exits ~20% faster than entrances. UI motion stays under 300ms.

## 4. Craft rules
- Animate `transform` and `opacity` only. Never `width`, `height`, `top`, `left`, or `transition: all`.
- Nothing appears from `scale(0)`; start at `scale(.95)` + `opacity: 0`.
- Popovers and menus scale from their trigger (`transform-origin` at the trigger). Modals stay centred.
- Buttons: `:active { transform: scale(.97) }` with a 120ms transition.
- Tooltips: delay the first one (~400ms); adjacent ones open instantly.
- Stagger lists by 30-50ms per item, cap the total under 400ms.
- Scroll reveals: one per page at most, small distance (8-16px), run once. Not on every section.
- Springs (Motion/Framer, React Spring) for drag, gestures and interruptible movement: `{ type: "spring", duration: .4, bounce: .15 }`. Keep bounce at 0.1-0.3, and only on playful surfaces.
- Prefer CSS transitions and `@starting-style` for simple enter/exit; the View Transitions API for page/state morphs; a JS library only when gestures or sequences need it.

## 5. Reduced motion (required)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Keep opacity changes and state colour; remove movement, parallax and shake.

## Review format
When reviewing motion code, answer with a table: `| Before | After | Why |`, one row per issue.
