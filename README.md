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
npm install
npm run dev
```

## Production build

```sh
npm run build
```

The production output is generated in `dist`.

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
- Shared dialog selects the Northline presentation and focuses its heading on opening. Its Contact action closes the dialog and navigates through `Index.tsx`; other project details retain their existing presentation.
- Home featured carousel: `src/components/FeaturedCaseStudies.tsx` and `featured-case-studies.css`; includes all entries marked `featured: true`, with manual Previous/Next controls and direct-selection dots. Each slide opens its existing project dialog.
- Only Northline and AI-Powered Lead Reactivation are featured, per Chester's October21 clarification. Other projects remain in the library; do not restore their older featured flags without a new request.
- Homepage and library totals use the project list length. Keep existing projects and the independent contract Experience section intact.

The savings estimate and booking-change examples are browser-local illustrations, not measured client results or live automation controls. Keep the sample-data label and scope limitations when revising copy. Diagrams are images, not executable automation exports. No automation credentials are needed to maintain this static website.

Chester authorized publication of this reviewed update on October 21, 2026. The existing publishing route is GitHub `main` → Cloudflare Pages. Future production updates require publication authorization. Source, deployment verification and account-access notes are in the parent Ch3ster-2 project's `projects/portfolio.md`.
