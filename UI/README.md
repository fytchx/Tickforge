# Tickforge — Master Build Specification

## 🤖 AI Agent Instructions (Claude Execution Directive)
**Objective:** Read the existing `/ui` directory to extract the visual theme, layout patterns, and CSS conventions, then populate the remaining repository directories (`css/`, `js/`, `data/`, `assets/`) in a single pass. Do not overwrite existing `/ui` assets; integrate with them.

---

## 1. Game Overview & Core Architecture ("WoW-Stone" Hybrid)
* **Genre:** Seasonal competitive 2D portrait idle MMOARPG with deckbuilding autobattler elements.
* **Viewport & Palette:** Mobile-first 9:16 portrait container. Dark fantasy aesthetic (`#0b0e16` core background, `#1a2234` card surfaces, `#bba4ff` primary accent, `--tf-*` CSS variables).
* **Decoupled Tick Engine (`js/engine.js`):**
  * Combat calculations, cooldowns, and resource ticks run in a deterministic background loop (20 ticks/sec) decoupled from rendering FPS.
  * **Client-Side FX Culling:** If client framerate drops on low-end devices, throttle/cull low-priority particles while keeping critical hits, major procs, and health bars smooth.
* **Global Cooldown (GCD):** Abilities obey a scalable GCD (1.0s–1.5s base) plus individual skill cooldowns.

---

## 2. UI & Combat Layout (`css/` & `index.html`)
* **Top Header (`GS-UI-HED`):** Zone banner, player HP bar, and Holy Power / class resource meter.
* **The Battlefield (`GS-UI-BOARD`):** *Hearthstone*-inspired enemy board displaying 1 to 5 non-humanoid enemies inside ornate oval portrait frames (`GS-UI-FRM-Oval`). Stylized dark fantasy art with clean silhouettes.
* **Combat Visuals (`css/effects.css`):** Projectiles and spell effects (`GS-FX-`) launch from the bottom hotbar toward specific enemy oval portraits, accompanied by screen shakes and floating combat text.
* **The Hotbar & Deck (`GS-UI-SKL`):** *World of Warcraft*-inspired 4-slot action hotbar at the bottom of the combat frame with rotational cooldown spirals, GCD sweeps, and active "button-mashing" visual feedback. Players configure their 4-skill loadout ("Deck") pre-combat.
* **Gear & Navigation:** 6 permanent transformative gear slots (`Weapon`, `Shield`, `Tome`, `Ring`, `Rune`, `Trinket`) + bottom navigation (`Deck`, `Gear`, `Forge`, `Leaderboard`).

---

## 3. Content & Data Generation Requirements (`data/`)
Generate clean, valid JSON files adhering to these exact counts:
1. **`data/schools.json`:** Define the 7 Magic Schools: `Physical`, `Lightning`, `Fire`, `Poison`, `Bleed`, `Frost`, `Disease`.
2. **`data/abilities.json`:** Generate **10 to 15 distinct abilities per school (70–105 total)**.
   * Include the **Templar 4-Skill Showcase**: `Judgment` (Holy Power generator), `Rebuke` (interrupt/debuff proc), `Holy Strike` (Holy Power spender), `Exorcism` (finisher/DoT detonation).
   * Every ability entry must contain: `id`, `name`, `school`, `resourceCost`, `resourceGain`, `cooldownMs`, `triggersGcd`, `targetType` (`single`, `cleave`, `aoe`, `random`), `fxKey`, and `mathFormula`.
3. **`data/equipment.json`:** Define the 6 permanent equipment slots (`Weapon`, `Shield`, `Tome`, `Ring`, `Rune`, `Trinket`) with transformative modifier hooks that alter skill mechanics.

---

## 4. Asset Naming & Sprite Manifests (`assets/`)
Enforce strict prefixes across all generated manifests, CSS hooks, and SVG/asset placeholders:
* **`GS-UI-`**: UI frames, oval enemy borders, buttons, resource bars, hotbar slots.
* **`GS-FX-`**: Combat spell effects. For **each of the 7 schools**, generate sprite-sheet grid coordinates (3x3 or 4x4) and CSS animation classes for **5+ distinct combat interaction variations**:
  1. `IMP` (Impact Flash)
  2. `PRJ` (Projectile Trail)
  3. `AUR` (Aura / Buff-Debuff Loop)
  4. `CHN` (Channeled Beam / Tick)
  5. `BST` (Burst / AoE Explosion)
  *(Example naming: `GS-FX-FIR-IMP-01`, `GS-FX-LGT-PRJ-01`)*
