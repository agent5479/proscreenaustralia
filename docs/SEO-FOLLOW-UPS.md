# SEO follow-ups (future review)

Operator and content work after the custom-domain cutover to **https://proscreenaustralia.com.au**. Revisit periodically; tick items when done.

Last reviewed: **2026-08-25** (global AI-search / entity-SEO recalibration).

---

## Strategic context (2026)

Search and AI citation are shifting away from generic informational pages toward **entity-matched, first-party value**. For Pro Screen Australia that means:

| Theme | What it means here |
| --- | --- |
| **Informationally additive** | Mesh guide, AU use-case `/for/*` pages, image catalog, and on-site profit framing — not rehashed US/DeSite boilerplate. |
| **Local / entity alignment** | Dedicated product + service URLs, GBP mirror, review language on pages, JSON-LD (`LocalBusiness`, `Product`, `Service`). |
| **Brand demand** | People searching **Pro Screen Australia** by name; Instagram, YouTube, and a direct channel so traffic is not 100% algorithm-dependent. |

---

## Technical checklist (GitHub Pages / static build)

Most engineering items are **already implemented** in this repo. Source of truth: `src/data/seo.js`, prerender: `scripts/prerender-meta.mjs`, CI assert: `scripts/assert-seo.mjs`.

| Item | Status | Notes |
| --- | --- | --- |
| Per-route SSG / body prerender | Done | Crawlers get `<h1>` + copy in `#root` without JS (`npm run build`). |
| Custom domain + HTTPS | Done | `public/CNAME`, `contact.siteUrl`, apex canonicals. Confirm **Enforce HTTPS** in GitHub Pages settings. |
| Canonical URLs | Done | Every indexable route in `seo.js`; 404 has no canonical. |
| `sitemap.xml` | Done | Auto-generated on build (22 public URLs). |
| `robots.txt` | Done | Allows `/`, blocks `/idm/`, `/legacy/`, `/drafts/`. |
| JSON-LD entity graph | Done | Home: `WebSite` + `LocalBusiness` (`@graph`); products: `Product`; `/for/*`: `Service`; mesh guide: `WebPage` + `ItemList`. |
| `lang="en-AU"` | Done | `index.html` + prerendered HTML. |
| Internal / draft routes noindex | Done | `/idm/*`, redirects, legacy paths excluded from sitemap. |
| GeoCoordinates in schema | N/A | Australia-wide mobile supply — no fixed storefront lat/long. Add only if GBP gets a permanent public address. |
| Full SSR for interactive tools | Partial | Home profit calculator: static explanatory defaults in HTML; interactive calc remains JS-only by design. |

### Optional later engineering

- [ ] Progressive enhancement for the home profit calculator (static defaults already in HTML)
- [ ] Consider email capture / quote form on contact or viewing page when ready for a mailing list
- [ ] Add `GeoCoordinates` to `LocalBusiness` only if GBP gains a stable public address worth mirroring
- [ ] Add owned YouTube (or other) URL to `sameAs` in `organizationJsonLd` when a Pro Screen Australia channel exists

---

## Local / Google Business Profile

- [ ] Audit GBP name, address, phone, and website against the site: **Pro Screen Australia**, Australia-wide — call Rob to view machines in your area, `+61 433 045 045`, `https://proscreenaustralia.com.au`
- [ ] Align GBP hours with schema: Monday–Friday 08:00–17:00
- [ ] Mirror site services in GBP categories: soil / gravel / aggregate screeners, static grizzly, telehandler bins, farm / cow-race screening, civil on-site screening, topsoil / landscaping, showroom viewing
- [ ] Ensure GBP service list links to matching site URLs (`/products/*`, `/for/*`) where possible
- [ ] Encourage customer reviews that name specific services, materials, and towns; reuse that language on `/for/*` pages (never invent reviews)

---

## Search Console & indexing

- [ ] Verify Search Console property for `https://proscreenaustralia.com.au` (prefer domain property covering www + apex)
- [ ] Submit / refresh `https://proscreenaustralia.com.au/sitemap.xml`
- [ ] After DNS cutover, confirm old `agent5479.github.io/proscreenaustralia` URLs are not the primary indexed set (use canonicals / redirects as needed)
- [ ] Request indexing for `/for/topsoil-landscaping`, `/for/aggregate-and-road-metal`, `/for/view-in-your-area`
- [ ] Validate Rich Results / schema on home (`WebSite` + `LocalBusiness`), one product (`Product`), and one `/for/` page (`Service`)
- [ ] After deploy, view-source (no JS) a product URL and confirm `<h1>` + body copy are present in HTML
- [ ] Confirm favicon shows in browser tab and (over time) in Google results for the brand

---

## Brand demand (off-site)

- [ ] YouTube: titles/descriptions use **Pro Screen Australia** + model + AU use case; link to product and `/for/*` URLs
- [ ] Add branded `sameAs` entries in `src/data/seo.js` `organizationJsonLd` only for profiles you control (do not use third-party demo channels such as manufacturer-only YouTube)
- [ ] Set up one owned direct channel (email list for stock arrivals / quotes) so revenue is not 100% search-dependent
- [ ] Keep brand string **Pro Screen Australia** consistent across GBP, social bios, and video channels
- [ ] Diversify beyond Google: Instagram (live), YouTube, and at least one direct channel (email / WhatsApp broadcast list)

---

## Content (informationally additive)

Site already has first-party tools/pages worth citing — maintain and extend, do not replace with generic blogs:

- Mesh size guide (`/screening-recommendation`) — proprietary charts for AU operators
- Use-case landing pages (`/for/farmers`, `/for/civil-contractors`, etc.) — outcome-focused copy
- Image catalog and photo galleries — real job-site evidence
- Home profit / on-site screening framing — AU economics, not US rehash

Ongoing:

- [ ] Publish 2–3 first-party AU case notes when real jobs allow (material in → mesh → product out, carrier used, outcome) — not generic how-tos
- [ ] Revisit product pages if DeSite/US copy starts to dominate; keep AU outcomes and mesh/use-case links first
- [ ] Deep-link mesh guide anchors from campaigns and ads (`#farm-filling`, `#topsoil`, `#aggregates`)
- [ ] When reviews mention specific towns or jobs, reflect that phrasing on the relevant `/for/*` page (verbatim from real reviews only)

---

## Reference

- Implementation notes and deploy checks: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Route / schema source of truth: `src/data/seo.js`
- Body prerender: `scripts/prerender-meta.mjs`, `src/data/staticPages.js`
- Build verification: `npm run build` (includes `assert-seo.mjs`)
