---
name: app-ui
description: Use when designing or upgrading application screens (Operate mode) - CRMs, dashboards, admin panels, SaaS apps, back offices, client portals, settings, tables, forms, pipelines, calendars and invoices. Focuses on clarity, density, states and speed of use.
---

# App UI (Operate mode)

People live in these screens for hours. Calm, fast and obvious beats impressive. Brand shows in precise details, not decoration.

## Shell
- Sidebar (220-260px, collapsible to icons) for 5+ sections; top bar for fewer. Group nav items; max ~8 per group.
- Active nav item: accent text or a 2-3px indicator plus a subtle surface tint. Not a loud filled block.
- Page header: title, one-line context, primary action on the right. Breadcrumbs only for deep hierarchies.
- Content width: tables and boards full width; forms and settings max 720px.
- Global search / command palette (Ctrl/Cmd+K) if the app has many records.

## Density and type
- Base 14px UI text, 13px for table meta, 12px minimum. Headings 18-24px; app pages do not need 48px titles.
- Row heights: comfortable 48px, compact 36-40px. Offer a density toggle on big tables.
- `tabular-nums` on every number column, right-align numbers, left-align text.

## Colour for meaning
- Chrome is quiet: neutral surfaces, 1px borders, very light shadows only on floating layers (menus, modals, toasts).
- Status uses consistent tokens across the app: new/info blue, in progress amber, done green, overdue/failed red, draft grey. Pair colour with a label or icon.
- One accent for primary actions and focus.

## Tables and lists
- Sticky header, sortable columns with clear indicators, row hover tint, whole row clickable when it opens a record.
- Bulk select with a contextual action bar.
- Truncate long text with a tooltip; never wrap a table into chaos on desktop.
- On phones: turn rows into stacked cards with the 3 most important fields.

## Records, pipelines, calendars
- Record page: summary header (name, status, key numbers, main actions), then tabs or sections (activity, details, related). Activity timeline newest first.
- Kanban: column headers with count and sum; cards show 3-4 fields max; drag has a clear lift shadow and drop target.
- Calendar/schedule: colour by crew or job type, today highlighted, current-time line, drag to reschedule.
- Money: currency formatted, totals bold, overdue clearly marked.

## Forms
- Labels above fields, helper text below, errors in red under the field with how to fix it.
- Group into sections with headings; long forms get a sticky save bar.
- Inputs 36-40px tall, radius consistent with buttons, visible focus ring.
- Validate on blur, not on every keystroke. Disable submit only while saving, and show it saving.

## Every screen has five states
Design them, do not leave them to chance:
1. **Empty:** say what goes here and give the action to add the first one.
2. **Loading:** skeletons shaped like the real content (no spinners for whole pages).
3. **Error:** what happened, what to do, a retry.
4. **Partial / many:** pagination or virtual lists past ~200 rows.
5. **Success:** a toast naming what happened ("Invoice sent to Dana").

## Dashboards
- Top: 3-5 KPI tiles with the number, the change vs last period, and a tiny trend. Only numbers people act on.
- Middle: the one chart that matters most, large. Use bars for comparison, lines for time, avoid pie charts beyond 3 slices.
- Bottom: the work list ("Jobs needing attention", "Overdue invoices") — dashboards should lead to action.
