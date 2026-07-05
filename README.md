# 60 Watts of Clarity (React + Vite)

Marketing website for 60 Watts of Clarity built with React, Vite, React Router, and Tailwind CSS v4.

## Current starter scaffold

This scaffold now includes:

1. Dark theme token system (`#000000`, `#ffffff`, `#FFB300`, `#2EC4B6`) with Merriweather typography.
2. Accessibility widget for font scaling, high contrast mode, dyslexia-friendly text mode, and keyboard/screen-reader support enhancements.
3. Conversion-focused hero with three primary CTA paths.
4. Contact form security controls: honeypot trap, disposable-domain blocking, local submission throttling, challenge fallback, and a configurable API handoff for Resend delivery.
5. AI integration placeholders for personalization, smart forms, and adaptive learning modules.
6. Progressive enhancement bootstrap that adds Modernizr-style classes for CSS Grid, Flexbox, Service Workers, and WebP support.
7. Environment modes for development, staging, and production via `.env.development`, `.env.staging`, and `.env.production`.
8. Privacy compliance placeholder banner for cookie/consent messaging, enabled by `VITE_ENABLE_CONSENT_BANNER`.

## Analytics

Google tag configuration is bootstrapped in `src/analytics.js` for production builds:

1. Google tag name: `60 Watts of Clarity`
2. Google tag ID: `GT-T5JVK8SK`
3. Google Analytics destination ID: `G-JK70L5RV1Z`

## Environment and deployment scripts

1. `npm run dev` — local development using `.env.development`
2. `npm run dev:staging` — staging-mode local preview
3. `npm run build:staging` — staging deploy artifact
4. `npm run build` or `npm run build:production` — production deploy artifact
5. `npm run deploy:staging` / `npm run deploy:production` — explicit deploy aliases
6. `npm run perf:budget` — checks built page weight and asset-size budgets
7. `npm run perf:budget:lighthouse` — checks a Lighthouse JSON report saved as `lighthouse-report.json`

## Development

```bash
npm install
npm run dev
```

## Build and lint

```bash
npm run lint
npm run build
```

## Front-end architecture conventions

1. **BEM-first class naming** for semantic structure (`block`, `block__element`, `block--modifier`), layered with Tailwind utilities for layout and visual detail.
2. **Semantic HTML landmarks** (`header`, `nav`, `main`, `section`, `footer`) and clear heading hierarchy.
3. **Accessibility defaults**: keyboard-focus visible styles, ARIA relationships for toggles/disclosures, and status messaging for forms.
4. **Semantic HTML and keyboard navigation:** use appropriate HTML elements for structure and ensure every interactive element remains reachable and operable by keyboard.
4. **Security guardrails**: never render untrusted HTML, sanitize/normalize input on change, and keep client-side validation explicit.
5. **Scalable tokens**: use CSS custom properties in `src/index.css` for spacing, surface, focus, and container behavior.
6. **Graceful degradation:** provide functional fallbacks for unsupported features so the experience still works without the latest browser capabilities.

## Consistent formatting and style

1. Follow the repo’s established React/JavaScript style conventions and keep new code aligned with the existing component patterns.
2. Use consistent indentation, spacing, and line breaks so files stay easy to scan and diff.
3. Keep formatting stable across modules, components, and helper files to minimize churn and reduce review noise.
4. Prefer the existing project structure and naming patterns when adding new code, modules, or AI hooks.

## Contact form security notes

Client-side protections in `src/security/contactSecurity.js` are UX-level defenses. Production deployment still requires:

1. Server-side input validation and sanitization.
2. True IP-based rate limiting at the API or edge layer.
3. CAPTCHA provider validation when challenge mode is triggered.
4. HTTPS-only hosting for all endpoints and form submissions.
5. The deployed API route should validate input server-side, enforce IP throttling, and send the message through Resend rather than exposing SMTP credentials in the client.

## Contact delivery via Resend

1. `public/api/contact-form.php` accepts the form POST and sends the message to `contact@60wattsofclarity.com`.
2. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and optionally `RESEND_TO_EMAIL` on the server.
3. Keep `VITE_CONTACT_SUBMISSION_ENDPOINT=/api/contact-form.php` in the deployed environment file.

## Error logging best practices

1. Use a centralized logging pipeline so errors from the app, build output, and hosting layer are easy to review together.
2. Prefer structured logs (for example JSON) so log aggregators can parse, search, and filter events reliably.
3. Define clear log levels (`DEBUG`, `INFO`, `WARN`, `ERROR`) and keep them consistent across modules.
4. Include useful context such as timestamps, error messages, stack traces, user actions, and environment details.
5. Exclude sensitive data like passwords, PII, and secrets from logs.
6. Apply sampling and rate limiting for high-volume errors so the logging system stays usable and performant.

## Bug tracking

1. Write bug reports with a clear summary, reproducible steps, expected vs. actual results, and any useful screenshots or logs.
2. Classify bugs by category and severity so urgent issues are easy to prioritize.
3. Integrate bug tracking with Git and the development workflow so fixes, commits, and reviews stay connected.
4. Review and triage bugs regularly to assign ownership and avoid stale issues.
5. Keep a short knowledge base of known issues and fixes to speed up future troubleshooting.
6. Use automated tests and CI/CD to catch regressions early and reduce production defects.

## AI integration structure

1. `src/ai/modules.js` holds the AI module registry so personalization, smart form assistance, and adaptive learning features can be added without rewriting page markup.
2. `src/components/AiModuleGrid.jsx` renders the current placeholders and can later be swapped with live AI-powered experiences.
3. Future AI modules should keep prompts, state, and output rendering separated so the core layout stays stable.

## Progressive enhancement

`src/modernizr.js` applies `js`, `no-js`, `cssgrid`, `no-cssgrid`, `flexbox`, `no-flexbox`, `serviceworker`, `no-serviceworker`, and `webp` / `no-webp` classes to `<html>`. The app uses those classes plus `CSS.supports` and `navigator.serviceWorker` checks to:

1. Keep the default layout usable even if advanced layout APIs are missing.
2. Register a service worker only when the browser supports it.
3. Hide enhancement-only UI when JavaScript is unavailable.
4. Provide CSS fallbacks for older layout engines.

## Environment files

1. `.env.example` — template with non-secret defaults.
2. `.env.development` — local dev values.
3. `.env.staging` — staging URL and non-production toggles.
4. `.env.production` — live production URL and production-only toggles.
5. `VITE_CONTACT_SUBMISSION_ENDPOINT` points the contact form at the backend API route that sends mail through Resend.

## Security headers and privacy compliance

1. `index.html` includes the Cookiebot embed with CBID `e5a6935d-ef86-4c40-98aa-30d9896cc2bd`.
2. `public/security-headers.sample.conf` contains a sample CSP and related headers for deployment platforms.
3. The app includes `src/components/ConsentBanner.jsx` as an opt-in consent-management placeholder for privacy notices, cookie preferences, and analytics opt-in flows.
4. Set `VITE_ENABLE_CONSENT_BANNER=true` in staging/production when you want the placeholder visible.

## State extension hooks

`src/state/AppStateProvider.jsx` includes an app-level context + reducer shell for future interactive features (form drafts, global UI state, async workflow status) without changing current UX.

## Architectural notes

1. **State management approach:** keep shared UI and future AI workflow state in the app-level context/reducer shell, and split feature-specific state into separate slices or providers as the product grows. Use dispatch-driven actions for predictable updates and keep side effects at the edges.
2. **Modular component structure:** route pages live in `src/pages`, reusable UI lives in `src/components`, cross-cutting helpers live in `src/security`, `src/config`, and `src/state`, and runtime bootstrap stays in `src/main.jsx`/`src/App.jsx`.
3. **Separation of concerns:** markup stays in JSX components, visual rules stay in `src/index.css` and Tailwind utilities, and environment/runtime behavior stays in dedicated modules like `src/analytics.js`, `src/modernizr.js`, and `src/config/environment.js`.
4. **Future AI features:** add new AI experiences as isolated modules or feature folders so model prompts, client state, and presentation can evolve without entangling the core layout or navigation.
5. **Single responsibility and DRY:** keep each function or module focused on one task, and factor repeated logic into shared helpers or modules so behavior stays easy to test and reuse.
6. **Performance and security basics:** prefer efficient algorithms and lazy loading for heavy resources, and always validate/sanitize inputs while serving the app over HTTPS.
7. **Version control:** use Git to capture changes in small, reviewable commits and preserve a clear history for collaboration and rollback.

## Meaningful naming conventions

1. Prefer descriptive identifiers that explain intent, such as `calculateTotalPrice` instead of `calcPrice`.
2. Use names that match the domain and the surrounding component role, especially for state, actions, and helper functions.
3. Keep module, component, and file names aligned with the behavior they expose so future AI and interactive features remain easy to discover.
4. Avoid abbreviations unless they are widely understood or part of an established external API.

## Performance budgets

1. `performance-budget.sample.json` contains baseline thresholds for page weight, max asset size, and Lighthouse metrics.
2. `scripts/performance-budget.mjs` validates `dist/` after a build and can optionally validate a Lighthouse JSON report.
3. Suggested automation flow:
   - `npm run build`
   - `npm run perf:budget`
   - generate a Lighthouse JSON report
   - `npm run perf:budget:lighthouse`

## Testing strategy and recommended tooling

Recommended additions when test automation is introduced:

1. **Unit/component tests:** Vitest + React Testing Library.
2. **Accessibility regression checks:** `@axe-core/react` (dev) and `jest-axe` or axe assertions in component tests.
3. **End-to-end smoke tests:** Playwright for route rendering, navigation, menu toggle, and contact form validation paths.
4. **SEO checks:** verify title/meta/canonical/social tags on built output with lightweight integration tests.

Suggested initial test coverage:

1. Navbar desktop/mobile interaction and ARIA state transitions.
2. FAQ disclosure controls (`aria-expanded`, `aria-controls`, region linkage).
3. Contact form validation + error messaging behavior.
4. Route-level lazy loading fallback rendering.

## Accessibility testing and QA

### Manual checks

1. Keyboard-only navigation from skip link through nav, CTAs, widget, consent banner, and forms.
2. Screen-reader pass on the accessibility widget, contact form errors, consent banner actions, and FAQ toggles.
3. Zoom/reflow checks at 200% and 400% on narrow and wide viewports.
4. Color-contrast spot checks in normal and high-contrast modes.
5. Reduced-motion verification with motion-sensitive browser settings.

### Automated tools

1. `@axe-core/react` or `jest-axe` for component-level accessibility assertions.
2. Playwright for keyboard navigation, focus order, and interactive-control regression tests.
3. Lighthouse Accessibility audits for quick regression screening.
4. Browser devtools accessibility tree inspection for labels, names, and roles.
