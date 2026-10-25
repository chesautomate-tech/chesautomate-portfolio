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

The production output is generated in `dist`. The build compiles the browser application, renders all 27 portfolio routes as HTML using an intermediate `dist-ssr` bundle, and generates the sitemap and a noindex 404 page. Publish only `dist`; no Node server is needed on Cloudflare. Both generated folders are ignored by Git. `npm run build:dev` uses the same rendering pipeline with Vite's development mode.

## October 24 search improvements and restored design

This is an **unpublished draft** on top of commit `0c0f8b8`. Chester requested restoration of the previous design after reviewing the refresh. Colors, typography, spacing, backgrounds and Home/About/Contact wording follow that commit; real section/project URLs, static HTML and corrected search metadata remain. It preserves 50+ contract workflows, the confidentiality note, all 20 demonstrations, five certificates and the selected light-background portrait.

- Shared route definitions, page metadata and JSON-LD: `src/lib/site.ts`.
- Browser navigation and section content: `src/pages/Index.tsx`; real links preserve modified clicks and browser history. Older `/#projects`, `/#experience`, etc. redirect in the browser to the new section paths.
- Project pages: `src/components/ProjectPage.tsx` and `project-page.css`. The older `ProjectDialog.tsx` remains in source but is no longer used by the active dashboard.
- Static rendering: `src/entry-server.tsx`, `scripts/build.mjs`, `scripts/prerender.mjs`; hydration entry: `src/main.tsx`.
- Search access: `public/robots.txt`; the build generates `dist/sitemap.xml` from the same route list. Canonical and social URLs use the Cloudflare domain. No AI API, special AI file or new hosting service is required; indexing and AI citations are not guaranteed.
- Project paths are derived from titles. Before renaming a published project, preserve its existing URL or add a redirect. Add new projects in `src/data/projects.ts`; the build includes their pages automatically.
- Keep public case-study claims tied to the supplied evidence. Demonstrations and hypothetical savings are separate from contract experience and measured client outcomes.

Verification after the October 24 restoration: TypeScript and a local SWC verification build passed, all 28 generated HTML files (27 routes plus 404) passed metadata/asset/internal-link checks, and targeted browser checks passed. The normal production command is **not yet verified for this draft**: this execution environment rejects esbuild child-process creation with `spawn EPERM`. The current local `dist` is an unminified verification build, not a production release. Run the normal commands above successfully before publishing; see the parent project record and `artifacts/portfolio/2026-10-24-design-restored.md` for the current checks and exact limitations.

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
- Only Northline and AI-Powered Lead Reactivation are featured, per Chester's October21 clarification. Other projects remain in the library; do not restore their older featured flags without a new request.
- Homepage and library totals use the project list length. Keep existing projects and the independent contract Experience section intact.

The savings estimate and booking-change examples are browser-local illustrations, not measured client results or live automation controls. Keep the sample-data label and scope limitations when revising copy. Diagrams are images, not executable automation exports. No automation credentials are needed to maintain this static website.

Chester authorized publication of this reviewed update on October 21, 2026. The existing publishing route is GitHub `main` → Cloudflare Pages. Future production updates require publication authorization. Source, deployment verification and account-access notes are in the parent Ch3ster-2 project's `projects/portfolio.md`.
