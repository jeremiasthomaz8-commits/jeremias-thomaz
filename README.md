# Jeremias Thomaz — Portfólio

Responsive one-page portfolio in Brazilian Portuguese. Buildless HTML, CSS and native JavaScript modules; no runtime dependencies.

## Run and validate

Requires Node.js 18+.

```sh
npm run dev
npm run build
```

The preview is served at http://localhost:4173. `npm run build` validates the ready-to-deploy static files in `dist/`; it does not require an installation step. Deploy the entire `dist/` directory to any static host. `.openai/hosting.json` identifies the private Sites deployment.

## Files

- `dist/index.html`: semantic sections, contact actions, SEO and dialog markup.
- `dist/assets/styles.css`: tokens, responsive layouts and reduced motion support.
- `dist/assets/app.js`: filters, previews, mobile navigation, tool and testimonial rendering.
- `dist/assets/data.js`: projects, categories, tools, testimonials and contact configuration.
- `dist/assets/*.webp`: portraits, original logo and original project images extracted from the supplied PDF.
- `scripts/serve.mjs`: dependency-free local server.
- `scripts/validate.mjs`: source, asset and anchor validation.

## Content and asset provenance

Project images were extracted from `SITE - JEREMIAS THOMAZ.pdf` supplied in the user's Downloads folder. The PDF contains rasterized website screenshots. These project previews are authentic crops, not generated client work. Their available resolution is limited by the source; replace them with original full-resolution assets when available. The hero uses the separate `Foto de perfil.png` supplied by the user on October 15, 2026, converted to `jeremias-hero.webp` at its original 896 × 896 resolution. The about section uses `Gemini_Generated_Image_vdvitivdvitivdvi.png`, also supplied by the user on October 15, 2026, converted to `jeremias-about.webp` at its original 896 × 896 resolution. Both source files are unchanged.

The supplied brief provides the project label “Mês Portal”; the associated source artwork visibly refers to congresso Portal. Confirm the preferred complete title before changing it. Descriptions are limited to the service evidenced in the brief or source; no outcomes or fabricated deliverables are included.

The experience and customer statistics come from the brief. Ignore the previous site's partially animated counters in its screenshot. Testimonials and attribution match the PDF. Contact email and WhatsApp were confirmed by the user during this task. No social account URLs were available in the PDF. Add verified `instagram` and `behance` HTTPS URLs in `data.js` to reveal those links.

Tool initials are typographic labels, not reproductions of official software logos. Decorative motion graphics in the service card illustrate the discipline and are not presented as client projects. Motion Design and Vídeo filters intentionally display an informative contact invitation until genuine projects for those categories are added.

## Add a project

Add a WebP/AVIF image in `dist/assets/` and an object to `projects` in `data.js`:

```js
{
  id: 'unique-project-id',
  title: 'Nome do projeto',
  category: 'Identidade Visual',
  categories: ['Identidade Visual'],
  image: './assets/project.webp',
  alt: 'Descrição da imagem em português',
  description: 'Descrição factual e confirmada.',
  featured: false,
}
```

The gallery and native modal adapt automatically. The modal supports Escape, backdrop dismissal, arrow navigation, focus trapping and focus restoration. Category buttons announce the result count to assistive technology. Mobile navigation supports Escape and closes after choosing a link.

The structured project data can also retain optional `gallery` and `externalUrl` fields for later expansion; the current view uses the verified main image only. All visitor-facing strings must remain in pt-BR.

## Production configuration

- No canonical URL is emitted until the final public domain is confirmed.
- Open Graph imagery currently uses the provisioned Sites origin. Update it to the public domain when applicable.
- Sora and Inter are loaded via Google Fonts, with sans-serif fallbacks.
- Contact actions open WhatsApp or the visitor's email client. No message is sent automatically, and no backend or contact form is implied.
- All source changes are within the project folder. Temporary PDF extraction and QA artifacts are ignored under `tmp/`.
