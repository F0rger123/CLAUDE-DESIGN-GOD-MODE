# AGENTS.md: Claude Design God Mode

## 1. What this is (say this to the person)

Claude Design God Mode is a set of nine design skills for Claude Code and other coding agents. Once installed, the agent can look at any website, CRM, app, landing page or browser game, give the design a score out of 100, choose a look that fits the business, and upgrade the design in place without breaking how it works. It costs nothing and installs nothing except the skills.

## 2. Questions to ask the person first

Ask only what you do not already know:

1. Which project should look better? (a folder on their computer, or a GitHub repo)
2. Which pages matter most? (for example the home page, the dashboard, the pricing page)
3. Are there brand colours, fonts or a logo that must stay?
4. Light refresh (keep the current look, make it sharper) or full redesign (new look, same content)?
5. Can you run the site locally so you can look at it? (if not, you will work from the code and say so)

## 3. Set it up

**In Claude Code**, run:

```
/plugin marketplace add F0rger123/CLAUDE-DESIGN-GOD-MODE
/plugin install design-god-mode@design-god-mode
```

**In another agent** (Codex, Cursor, Gemini CLI, Windsurf, ChatGPT with a repo): copy the `skills/` folder of this repo into the target project, for example at `.claude/skills/` or `.agents/skills/`, then read `skills/god-mode/SKILL.md` and follow it.

**Check it worked:**
- Claude Code: `/design-god-mode:audit` appears when typing `/design`. Running it on the project returns a score out of 100.
- Any agent: `node skills/audit/scripts/slop-scan.mjs <project-folder>` prints a summary that starts with "Design God Mode slop-scan". Node 18 or newer is needed for the scanner only.

## 4. How to use it

- Full upgrade: `/design-god-mode:god-mode` plus what they want, for example "make the landing page feel premium" or "clean up the CRM dashboard".
- Score only, no changes: `/design-god-mode:audit`.
- One area: `direction` (colours and fonts plan), `redesign` (restyle existing code safely), `landing`, `app-ui`, `game-ui`, `motion`, `polish`.
- After a run, show the person the before and after score, the main changes in plain words, and the pages to look at.

## 5. Never do this

- Never print, copy or commit secrets (API keys, `.env` values, tokens) found in the project.
- Never spend money: no paid fonts, paid image services or paid UI kits without a clear yes.
- Never deploy, push to production or change live settings without a clear yes from the person.
- Never break behaviour: keep routes, forms, field names, tests, analytics and SEO tags working.
- Never invent facts on a site: no fake reviews, customer logos, numbers or awards. Use marked placeholders.
- Never replace real photos of the person's work with stock images.

## 6. For developers changing this repo

- Skills live in `skills/<name>/SKILL.md` with `name` and `description` frontmatter. Keep each under ~700 words; put tables in `references/`.
- The scanner (`skills/audit/scripts/slop-scan.mjs`) must stay dependency-free and read-only.
- Re-take screenshots from `examples/` after changing the demo pages.
