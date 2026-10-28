# TechPro Institutional Page

## Stack

- HTML
- CSS
- Vanilla JavaScript
- Native Web Components

Do not introduce frameworks or build tooling unless explicitly requested.

## Required Skill

For frontend work, read:

`.agents/skills/developing-vanilla-web-interfaces/SKILL.md`

Project rules in this file take precedence over generic skill guidance.

## Project Structure

- `index.html` → root entry point (redirects to `/pages/home.html`)
- `pages/` → HTML pages (`home`, `services`, `customers`, `industry`, `institutional`, `contact`, `404`)
- `assets/icons/` → SVG icons
- `assets/images/` → logos, photos, and illustrations grouped by section
- `css/variables.css` → design tokens
- `css/global.css` → global styles, utilities, and stylesheet imports
- `css/components/` → reusable component styles
- `css/pages/` → page-specific styles
- `js/components/` → reusable Native Web Components and shared helpers
- `js/main.js` → component registration entry point
- `Caddyfile`, `Dockerfile`, `compose.yaml` → static file server and container configuration

## CSS Conventions

Use BEM:

- `.block`
- `.block__element`
- `.block--modifier`

Use `.is-*` for transient JavaScript state:

- `.is-open`
- `.is-active`
- `.is-hidden`

Prefer variables from `css/variables.css` instead of hard-coded design values.

Do not duplicate component styles inside page stylesheets.

## Components

Before creating a component:

1. Check whether an equivalent already exists.
2. Reuse existing tokens and patterns.
3. Put reusable styles in `css/components/`.
4. Put reusable JavaScript components in `js/components/`.

Existing reusable components include:

- Global layout & CTAs: `site-header`, `site-footer`, `contact-invitation` (`site-cta`), `audience-hero`
- Shared CSS components: buttons (`.btn`, `.btn--primary`, `.btn--secondary`, `.btn--outline`, `.btn--dark`), `.image-card` (`renderImageCard` helper), `.customer-card`
- Domain Web Components: `contact-form`, `customer-card`, `featured-service-card`, `industry-service-card`, `service-summary`, `service-details`, `service-process-card`, `institutional-stat-card`, `institutional-purpose-card`

## Responsive Design

Follow existing responsive conventions.

Current primary breakpoints:

- `1280px`
- `890px`
- `600px`

Do not add new breakpoints without a layout-specific reason.

## Content

User-facing content should be written in Brazilian Portuguese.

Code identifiers, filenames, branches, and commit messages must be in English.

## Git

Use Conventional Commits.

Examples:

- `feat: add services section`
- `fix: correct mobile navigation`
- `refactor: extract reusable card styles`
- `chore: update agent skills`

Branch names:

- `feat/services-page`
- `fix/mobile-navigation`
- `refactor/header-component`
- `chore/add-agent-skills`

Use lowercase English names with hyphen-separated words.

## Scope

Do not refactor unrelated code while implementing a task.

Preserve existing architecture and browser-native implementation unless the task explicitly requires otherwise.

## Before Finishing

Verify:

- desktop, tablet, and mobile behavior
- no browser console errors
- existing components and tokens were reused where appropriate
- no unnecessary dependency was introduced
- accessibility and semantic HTML follow the installed frontend skill
