#!/usr/bin/env node
// Design God Mode: slop-scan
// Fast static read of a frontend codebase so the agent does not have to read every stylesheet.
// Usage: node slop-scan.mjs [project-dir] [--json]
// No dependencies. Read-only.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const root = process.argv.slice(2).find((a) => !a.startsWith("--")) || ".";
const asJson = process.argv.includes("--json");

const SKIP = new Set(["node_modules", ".git", "dist", "build", ".next", "out", "coverage", "vendor", ".svelte-kit", ".astro", ".turbo", ".vercel", ".output"]);
const STYLE = new Set([".css", ".scss", ".sass", ".less"]);
const MARKUP = new Set([".html", ".jsx", ".tsx", ".vue", ".svelte", ".astro"]);
const SCRIPT = new Set([".js", ".ts", ".mjs"]);
const MAX_FILES = 3000;
const MAX_BYTES = 400_000;

const files = [];
(function walk(dir) {
  if (files.length >= MAX_FILES) return;
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name.startsWith(".") && e.name !== ".storybook") { if (e.isDirectory()) continue; }
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(p); continue; }
    const ext = extname(e.name).toLowerCase();
    if (STYLE.has(ext) || MARKUP.has(ext) || SCRIPT.has(ext)) {
      try { if (statSync(p).size <= MAX_BYTES) files.push({ p, ext }); } catch {}
    }
  }
})(root);

const tally = new Map();
const where = new Map();
const add = (key, file, n = 1) => {
  if (!n) return;
  tally.set(key, (tally.get(key) || 0) + n);
  if (!where.has(key)) where.set(key, new Set());
  if (where.get(key).size < 3) where.get(key).add(relative(root, file));
};
const count = (s, re) => (s.match(re) || []).length;

const fonts = new Map();
const hexes = new Set();
const radii = new Set();
let reducedMotion = false, focusVisible = false, tokens = 0, tailwind = false;

for (const { p, ext } of files) {
  let s;
  try { s = readFileSync(p, "utf8"); } catch { continue; }
  const isMarkup = MARKUP.has(ext);
  const isStyle = STYLE.has(ext);
  const markupOnly = isMarkup ? s.replace(/<style[\s\S]*?<\/style>/gi, "") : s;
  if (SCRIPT.has(ext) && !/className|class=|styled\.|css`|tailwind|theme/.test(s)) continue;

  // Fonts
  for (const m of s.matchAll(/font-family\s*:\s*([^;}{]+)/gi)) {
    const f = m[1].split(",")[0].replace(/["']/g, "").trim();
    if (f && !f.startsWith("var(") && f !== "inherit") fonts.set(f, (fonts.get(f) || 0) + 1);
  }
  for (const m of s.matchAll(/fonts\.googleapis\.com\/css2?\?([^"'\s)]+)/g))
    for (const fam of m[1].matchAll(/family=([^:&]+)/g)) {
      const f = decodeURIComponent(fam[1]).replace(/\+/g, " ");
      fonts.set(f, (fonts.get(f) || 0) + 1);
    }
  for (const m of s.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']next\/font\/google["']/g))
    for (const f of m[1].split(",")) fonts.set(f.trim().replace(/_/g, " "), 1);

  // Colour
  for (const m of s.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) hexes.add(m[0].toLowerCase());
  if (isMarkup) add("raw hex in components", p, count(markupOnly, /["'`:]\s*#[0-9a-f]{3,8}\b/gi));
  add("purple/indigo/pink gradient", p,
    count(s, /(linear|radial)-gradient\([^)]*(purple|violet|indigo|fuchsia|#7c3aed|#8b5cf6|#6366f1|#a855f7|#9333ea|#4f46e5|#ec4899)/gi) +
    count(s, /\bfrom-(purple|violet|indigo|fuchsia|pink)-\d{3}/g));
  add("gradient text", p, count(s, /bg-clip-text|background-clip\s*:\s*text/g));
  tokens += count(s, /--[a-z][\w-]*\s*:/gi);
  if (/@theme|@tailwind|tailwindcss/.test(s)) tailwind = true;

  // Shape
  for (const m of s.matchAll(/border-radius\s*:\s*([^;}{]+)/gi)) radii.add(m[1].trim());
  for (const m of s.matchAll(/\brounded(-[a-z0-9]+)?\b/g)) radii.add(m[0]);
  add("generic soft shadow", p, count(s, /rgba\(0,\s*0,\s*0,\s*0?\.1\)|\bshadow-(md|lg|xl)\b/g));

  // Motion
  add("transition: all", p, count(s, /transition\s*:\s*all\b|\btransition-all\b/g));
  add("layout-property animation", p, count(s, /transition\s*:\s*(width|height|top|left|margin)\b/g));
  if (/prefers-reduced-motion|motion-reduce|motion-safe/.test(s)) reducedMotion = true;

  // Focus and a11y
  if (/focus-visible/.test(s)) focusVisible = true;
  add("outline removed", p, count(s, /outline\s*:\s*(none|0)\b|\boutline-none\b/g));
  if (isMarkup) {
    add("img without alt", p, count(s, /<img(?![^>]*\balt=)[^>]*>/gi));
    add("tiny text (<12px)", p, count(s, /\btext-\[(8|9|10|11)px\]/g));
  }
  if (isStyle) add("tiny text (<12px)", p, count(s, /font-size\s*:\s*(8|9|10|11)px/g));

  // Template tells
  if (isMarkup) {
    add("emoji in markup", p, count(markupOnly.replace(/(^|\s)\/\/.*|\/\*[\s\S]*?\*\/|[©®™]/g, ""), /\p{Extended_Pictographic}/gu));
    add("uppercase tracked eyebrows", p, count(s, /uppercase[^"'`]{0,40}tracking-(wide|wider|widest)|tracking-(wide|wider|widest)[^"'`]{0,40}uppercase/g));
    add("arrow in link/button text", p, count(s, />[^<]{1,40}(→|&rarr;)\s*</g));
    add("vague CTA text", p, count(s, />\s*(Get Started|Learn More|Submit|Click Here)\s*</gi));
    add("fake-sounding stats", p, count(s, /\b\d{1,3}(,\d{3})+\+?\s+(happy|satisfied|customers|users)/gi));
  }
  add("!important", p, count(s, /!important/g));
}

const generic = /^(inter|roboto|arial|helvetica|open sans|system-ui|-apple-system|sans-serif|segoe ui|lato|poppins|montserrat)$/i;
const fontList = [...fonts.keys()].slice(0, 8);
const allGeneric = fontList.length === 0 || fontList.every((f) => generic.test(f));

const findings = [...tally.entries()]
  .filter(([, n]) => n > 0)
  .sort((a, b) => b[1] - a[1])
  .map(([k, n]) => ({ issue: k, count: n, files: [...where.get(k)] }));

const flags = [];
if (allGeneric) flags.push("Typography: only default/common fonts found - no type decision made");
if (hexes.size > 40) flags.push(`Colour: ${hexes.size} distinct hex values - no palette discipline`);
if (tokens < 8) flags.push("Tokens: few or no CSS custom properties - styles are hard-coded");
if (radii.size <= 2 && files.length > 5) flags.push("Shape: one radius everywhere");
if (radii.size > 12) flags.push(`Shape: ${radii.size} different radius values - inconsistent`);
if (!reducedMotion) flags.push("Motion: no prefers-reduced-motion handling");
if (!focusVisible) flags.push("Focus: no :focus-visible styles found");

const report = {
  scanned: files.length,
  stack: tailwind ? "Tailwind detected" : "No Tailwind detected",
  fonts: fontList,
  distinctHex: hexes.size,
  cssVariables: tokens,
  radiusVariants: radii.size,
  flags,
  findings,
};

if (asJson) { console.log(JSON.stringify(report, null, 2)); process.exit(0); }

console.log(`Design God Mode slop-scan: ${files.length} files (${report.stack})`);
console.log(`Fonts: ${fontList.join(", ") || "none declared"}`);
console.log(`Colours: ${hexes.size} distinct hex · CSS variables: ${tokens} · Radius variants: ${radii.size}`);
if (flags.length) { console.log("\nSystem flags:"); for (const f of flags) console.log(`  - ${f}`); }
if (findings.length) {
  console.log("\nTells (count, example files):");
  for (const f of findings.slice(0, 14)) console.log(`  - ${f.issue}: ${f.count}  [${f.files.join(", ")}]`);
} else console.log("\nNo template tells found.");
