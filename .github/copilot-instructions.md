# Copilot working instructions for 60 Watts of Clarity

Use these rules when editing this codebase.

## Project shape

- This is a React + Vite marketing site with route-level pages and shared UI components.
- Runtime entry points:
  - `src/main.jsx` bootstraps modernizr, analytics, global styles, and app state.
  - `src/App.jsx` owns routing, layout, skip link, accessibility widget, and consent banner.
- Page content lives in `src/pages`.
- Shared UI lives in `src/components`.
- Cross-cutting helpers live in:
  - `src/config` for environment/runtime settings
  - `src/security` for sanitization, spam control, and validation helpers
  - `src/state` for reducer/context state shells
  - `src/ai` for future AI module registration
- Static hosting/server hooks live under `public/`, including `public/api/contact-form.php`.

## Non-negotiable priorities

1. Security.
2. Accessibility.
3. Semantic HTML and maintainable structure.
4. Performance and progressive enhancement.
5. Conversion-focused copy and layout.

## Security rules

- Never trust client input.
- Sanitize and normalize values before use.
- Never render untrusted HTML.
- Keep secrets out of the client bundle.
- Do not hardcode API keys, IDs, or host-specific values in React components.
- For contact form changes, preserve:
  - honeypot support
  - disposable-domain blocking
  - client-side throttling
  - challenge fallback
  - server-side validation
  - Resend delivery through `public/api/contact-form.php`
- If a backend change is needed, use the existing PHP/shared-hosting pattern unless the user explicitly asks for a new server stack.
- When server-side work is involved, validate with the narrowest safe inputs and prefer parameterized operations.

## Accessibility rules

- Use semantic landmarks (`header`, `nav`, `main`, `section`, `footer`).
- Keep heading order logical.
- Preserve visible focus states.
- Ensure all interactive controls are keyboard accessible.
- Keep ARIA only where it adds value and matches behavior.
- Respect reduced-motion, high-contrast, and font-scaling features.
- Do not remove the accessibility widget or its state hooks.

## Styling and layout rules

- Follow the existing BEM-first naming style for custom class names.
- Prefer reusable classes, CSS variables, and Tailwind utilities already used in the project.
- Keep layouts responsive and full-width where the design expects it.
- Avoid inline styles unless there is no maintainable alternative.
- Preserve the dark theme token system and existing typography scale.

## State and AI rules

- Use `src/state` for shared UI state and future form drafts or global toggles.
- Keep state updates action-based and predictable.
- AI features must stay modular:
  - register modules in `src/ai/modules.js`
  - render them through dedicated components
  - keep prompts, state, and presentation separate
- Do not couple AI placeholders directly into page markup if a reusable module can be used.

## Environment and configuration rules

- Read values from `src/config/environment.js`.
- Add new runtime flags there instead of scattering `import.meta.env` reads through components.
- Keep `.env.example` and the mode files in sync when adding a new variable.
- Never commit real secrets into `.env.*`.

## Performance and progressive enhancement

- Preserve lazy loading for routes and other heavy modules.
- Keep feature detection in `src/modernizr.js` lightweight.
- Maintain no-JS and fallback behavior.
- Do not introduce blocking work in the main render path unless necessary.
- Respect the performance budget tooling in `scripts/performance-budget.mjs`.

## SEO and metadata

- Keep titles, metadata, canonical behavior, and social tags consistent with the current site structure.
- Do not remove document-level metadata unless replacing it with an equivalent or better version.

## Logging, privacy, and consent

- Do not log sensitive data.
- Keep consent and Cookiebot wiring intact.
- Preserve the privacy/analytics split between environment flags and runtime behavior.

## File-level expectations

- `src/pages/*`: route/page composition only.
- `src/components/*`: reusable UI only.
- `src/security/*`: input hygiene and anti-spam helpers only.
- `src/config/*`: environment and runtime configuration only.
- `src/ai/*`: AI registry and AI-specific helpers only.
- `public/api/*`: server-side endpoint code for shared-hosting deployment.

## Editing workflow

1. Read the relevant files first.
2. Reuse existing patterns instead of inventing new ones.
3. Make the smallest change that fully solves the task.
4. Update docs when behavior or required setup changes.
5. Run the existing checks:
   - `npm run lint`
   - `npm run build`
   - `php -l public/api/contact-form.php` when PHP changes
6. Do not overwrite unrelated user changes.

## When unsure

- Prefer the repo’s current architecture over adding a new framework or service.
- If the request would require a larger backend decision, document the contract and ask before introducing it.
