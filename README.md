# ChesAutomate Portfolio

Personal portfolio website for Chester Wapanio, a CRM & AI Automation Specialist.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Local development

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run check
npm run build
npm run preview -- --host 127.0.0.1
```

The production output is generated in `dist`. The build compiles the browser application, renders all 28 portfolio routes as HTML using an intermediate `dist-ssr` bundle, and generates the sitemap and a noindex 404 page. Publish only `dist`; no Node server is needed on Cloudflare. Both generated folders are ignored by Git. `npm run build:dev` uses the same rendering pipeline with Vite's development mode.

## ClearNest case study — October 28

ClearNest is the first of three featured projects, followed by Northline and Lead Reactivation. Chester authorized publishing this reviewed update on October 28, 2026, through the existing GitHub → Cloudflare Pages integration. It adds the 21st library entry at `/projects/clearnest-ai-receptionist/`.

- `src/components/ClearNestCaseStudy.tsx` and `clearnest.css`: short business overview, immediately loaded Loom player, booking/message outcome tabs and optional detail sections. The home featured box also displays the player directly.
- All three user-supplied workflow images are in `src/assets/workflows/clearnest-*.png`; diagrams, tool roles, evidence and scope start collapsed for busy visitors.
- The Loom video is `https://www.loom.com/share/c0b16a31fe1941b9b3383aaf30f06e1f`, with a direct-link fallback. The embedded player was observed loading; the full recording/audio was not independently reviewed.
- Sample-data context stays visible. The project books owner phone callbacks, not cleaning visits; no measured savings or production-readiness claims.
- Normal production build and TypeScript checks passed for this addition, resolving the earlier sandbox-only build limitation described below. Desktop/narrow-screen layout, carousel, outcome tabs, diagrams and Contact navigation were checked. See the parent project's `artifacts/portfolio/2026-10-28-clearnest-check.md`.

## October 24 search improvements and restored design

Historical checkpoint: Chester requested restoration of the previous design after reviewing the refresh. Colors, typography, spacing, backgrounds and Home/About/Contact wording follow `0c0f8b8`; real section/project URLs, static HTML and corrected search metadata remain. This work was already in the clean `8cd1799` checkout inspected before the ClearNest addition. It preserved 50+ contract workflows, the confidentiality note, the original 20 demonstrations, five certificates and the selected light-background portrait.

- Shared route definitions, page metadata and JSON-LD: `src/lib/site.ts`.
- Browser navigation and section content: `src/pages/Index.tsx`; real links preserve modified clicks and browser history. Older `/#projects`, `/#experience`, etc. redirect in the browser to the new section paths.
- Project pages: `src/components/ProjectPage.tsx` and `project-page.css`. The older `ProjectDialog.tsx` remains in source but is no longer used by the active dashboard.
- Static rendering: `src/entry-server.tsx`, `scripts/build.mjs`, `scripts/prerender.mjs`; hydration entry: `src/main.tsx`.
- Search access: `public/robots.txt`; the build generates `dist/sitemap.xml` from the same route list. Canonical and social URLs use the Cloudflare domain. No AI API, special AI file or new hosting service is required; indexing and AI citations are not guaranteed.
- Project paths are derived from titles. Before renaming a published project, preserve its existing URL or add a redirect. Add new projects in `src/data/projects.ts`; the build includes their pages automatically.
- Keep public case-study claims tied to the supplied evidence. Demonstrations and hypothetical savings are separate from contract experience and measured client outcomes.

Historical verification after the October 24 restoration: TypeScript and a local SWC verification build passed, all 28 then-generated HTML files (27 routes plus 404) passed metadata/asset/internal-link checks, and targeted browser checks passed. The normal build was blocked by sandbox `spawn EPERM` at that checkpoint. On October 28 the normal production build passed outside the sandbox for ClearNest, generating a minified client bundle and all 28 current routes plus 404. Publication remains separate.

## Deployment

For Cloudflare Pages, use:

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20`

## Northline case study

Northline is a featured sample-data project, added locally on October 20, 2026 and overhauled on October 21 as **Northline — Booking Automation**. It introduces the fictional event company and explains business value before the workflow detail.

- Project card and library entry: `src/data/projects.ts`.
- Case study, four illustrated booking-change scenarios, workflow descriptions, historical test results and adjustable time estimate: `src/components/NorthlineCaseStudy.tsx`.
- Scoped case-study styles, desktop/phone dialog and illustration layouts: `src/components/northline.css`.
- Original diagrams: `src/assets/workflows/northline-process.png`, `northline-receive.png`, `northline-review-retry.png`, and `northline-review-amendments.png`.
- The standalone project page reuses the Northline presentation and its local interactions. Contact navigates through `Index.tsx` to `/contact/`.
- Home featured carousel: `src/components/FeaturedCaseStudies.tsx` and `featured-case-studies.css`; includes entries marked `featured: true`, with manual Previous/Next controls and direct-selection dots. Each slide links to its project page.
- Northline and AI-Powered Lead Reactivation remain featured. Chester's October28 request adds ClearNest as a third featured case study; other projects remain in the library.
- Homepage and library totals use the project list length. Keep existing projects and the independent contract Experience section intact.

The savings estimate and booking-change examples are browser-local illustrations, not measured client results or live automation controls. Keep the sample-data label and scope limitations when revising copy. Diagrams are images, not executable automation exports. No automation credentials are needed to maintain this static website.

Chester authorized publication of this reviewed update on October 21, 2026. The existing publishing route is GitHub `main` → Cloudflare Pages. Future production updates require publication authorization. Source, deployment verification and account-access notes are in the parent Ch3ster-2 project's `projects/portfolio.md`.

## Short featured case studies — October 28

Northline and Lead Reactivation now lead with a short business outcome and three benefits. Original workflows, tools and supporting details are closed until opened. Northline retains its booking examples and hypothetical savings calculator. Lead Reactivation has its own `LeadReactivationCaseStudy.tsx` and `lead-reactivation.css`, preserving both diagrams and the limits of its verification. Project titles/routes remain unchanged. This release also hides the Loom top toolbar, places ClearNest's demo note near the bottom of its case study and fixes the Contact cards' blur seam.
