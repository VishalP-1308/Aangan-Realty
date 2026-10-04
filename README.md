# Aangan Realty

> Your space. Your story.

Marketing and listing site for Aangan Realty, a boutique property brokerage in
Ahmedabad with select mandates in Surat and Vadodara. Visitors browse properties,
filter them, view full photo galleries and detail pages, and register interest
through an enquiry form that reaches the partners.

Built with Vite, React 19, TypeScript, Tailwind CSS v4, PrimeReact and React Router.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production bundle into dist/
npm run preview    # serve the built bundle
npm run lint
npm test           # assertion self-check for pricing, filters and validation
npm run images     # regenerate web-sized brand assets from the source artwork
```

## Where to change things

| What | File |
| --- | --- |
| Partner names, phone numbers, Instagram, cities, hours, brand values | `src/data/site.ts` |
| Logo and artwork imports | `src/data/brand.ts` |
| The property listings themselves | `src/data/properties.ts` |
| Enquiry validation and delivery | `src/lib/enquiry.ts` |
| Colours, fonts, animations, PrimeReact overrides | `src/index.css` |
| Routes | `src/App.tsx` |

No component hardcodes a phone number or a price — it all comes from `src/data/`.

## Brand assets

Source artwork lives in `src/assets/images/Logo/` as print-resolution PNGs
(1–2 MB each). `npm run images` turns those into the web-sized WebP files in
`src/assets/brand/` plus the favicons in `public/`:

| Output | Used for |
| --- | --- |
| `logo-round-96.webp`, `logo-round-256.webp` | Circular mark — navbar, footer, cards |
| `logo-full.webp` | Full lockup on its dark plate — home page panel |
| `contact-card.webp` | The designed contact card — contact page |
| `public/favicon-{32,180,192}.png` | Browser and home-screen icons |

The round mark is cropped to the gold ring and alpha-masked, so it drops onto any
background. If the artwork is replaced, re-check the `RING` crop box at the top of
`scripts/optimise-images.mjs`.

The palette in `src/index.css` (charcoal `ink`, ivory `sand`, gold `brass`) is
sampled from the logo.

## Enquiry delivery — read before going live

The form has two modes:

1. **Endpoint configured.** Set `VITE_ENQUIRY_ENDPOINT` (see `.env.example`) to
   anything that accepts a JSON `POST` — Formspree, a Power Automate HTTP trigger,
   an Azure Function. Submissions go there and the visitor sees a confirmation.
2. **No endpoint.** The enquiry opens in WhatsApp, pre-filled, addressed to the
   first partner in `src/data/site.ts`. Leads are capturable on day one, but
   delivery depends on the visitor pressing send.

**Set an endpoint before launch.** The WhatsApp fallback exists so a fresh deploy
does not silently drop enquiries, not as a production answer.

No enquiry data is stored in the browser and nothing is sent anywhere except the
endpoint you configure.

## Still to supply

Real, confirmed details are in place for: partner names, both phone numbers, the
Instagram handle, the cities, and the artwork. The following is **placeholder and
must be replaced before launch**:

- **All nine property listings** — titles, localities, prices, areas, amenities and
  descriptions are invented sample data.
- **Photography** — currently Unsplash stock, hot-linked from `images.unsplash.com`.
  Replace with the firm's own photographs and self-host them.
- **Testimonials** in `src/data/site.ts`.
- **RERA registration number.** Gujarat requires registered agents to display it.
  There is no number in the codebase — the property pages currently say
  "Shared on request". Add the real one to `src/data/site.ts` and surface it in the
  footer and on `PropertyDetail`.
- **Email address.** None was supplied, so `site.email` is `null` and the site
  offers phone and WhatsApp only. Set it and the form can offer email too.
- The **office hours** (`Mon–Sat · 10:00–19:00 IST`) are assumed.
- The **fee structure** quoted in the contact page FAQ ("some % from each side") is
  assumed — correct it or remove it.

## Deployment

Static output in `dist/` — any static host works.

Because routing is client-side, the host must rewrite unknown paths to
`index.html`, or a direct hit on `/properties` returns 404:

- **Netlify** — `public/_redirects` is already in place.
- **Vercel** — add a `vercel.json` rewrite of `/(.*)` to `/index.html`.
- **Azure Static Web Apps** — add `staticwebapp.config.json` with a
  `navigationFallback` of `/index.html`.
- **IIS / Azure App Service** — add a `web.config` URL Rewrite rule to the same effect.

## Known limitations

- The JS bundle is ~186 kB gzipped, most of it PrimeReact. Route-level code
  splitting would cut first paint if that matters; for a five-page site it has not
  been done.
- Listings are a static array compiled into the bundle. Past roughly fifty
  properties, or once someone other than a developer needs to edit them, move them
  to a CMS or an API.
- Enquiry submission has no retry or queue. If the endpoint is down the visitor is
  told to phone instead.
- Maps are Google Maps embeds without an API key, which is fine for a location pin
  but offers no styling or custom markers.
