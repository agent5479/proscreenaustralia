# SEO follow-ups (future review)

Operator and content work that remains after the Aug 2026 remediation (crawlable prerender, JSON-LD, NZ use-case pages). Revisit periodically; tick items when done.

## Local / Google Business Profile

- [ ] Audit GBP name, address, phone, and website against the site: **Pro Screen Australia**, Australia-wide — call Rob to view machines in your area, `+61 433 045 045`, `https://agent5479.github.io/proscreenaustralia`
- [ ] Align GBP hours with schema: Monday–Friday 08:00–17:00
- [ ] Mirror site services in GBP categories: soil / gravel / aggregate screeners, static grizzly, telehandler bins, farm / cow-race screening, civil on-site screening, topsoil / landscaping, showroom viewing
- [ ] Encourage customer reviews that name specific services, materials, and towns; reuse that language on `/for/*` pages (never invent reviews)

## Search Console & indexing

- [ ] Confirm Search Console property is only `https://agent5479.github.io/proscreenaustralia` (no indexed `.github.io` duplicate)
- [ ] Submit / refresh `https://agent5479.github.io/proscreenaustralia/sitemap.xml`
- [ ] Request indexing for `/for/topsoil-landscaping`, `/for/aggregate-and-road-metal`, `/for/view-in-your-area`
- [ ] Validate Rich Results / schema on home (`LocalBusiness`), one product (`Product`), and one `/for/` page (`Service`)
- [ ] After deploy, view-source (no JS) a product URL and confirm `<h1>` + body copy are present in HTML

## Brand demand (off-site)

- [ ] YouTube: titles/descriptions use **Pro Screen Australia** + model + NZ use case; link to product and `/for/*` URLs
- [ ] Add branded `sameAs` entries in `src/data/seo.js` `organizationJsonLd` only for profiles you control (do not use third-party demo channels such as manufacturer-only YouTube)
- [ ] Set up one owned direct channel (email list for stock arrivals / quotes) so revenue is not 100% search-dependent
- [ ] Keep brand string **Pro Screen Australia** consistent across GBP, social bios, and video channels

## Content (informationally additive)

- [ ] Publish 2–3 first-party NZ case notes when real jobs allow (material in → mesh → product out, carrier used, outcome) — not generic how-tos
- [ ] Revisit product pages if DeSite/US copy starts to dominate; keep NZ outcomes and mesh/use-case links first
- [ ] Deep-link mesh guide anchors from campaigns and ads (`#farm-filling`, `#topsoil`, `#aggregates`)

## Optional later engineering

- [ ] Progressive enhancement for the home profit calculator (static explanatory defaults already in HTML; interactive calc remains JS-only by design)
- [ ] Consider email capture / quote form on contact or viewing in your area page when ready for a mailing list

## Reference

- Implementation notes and deploy checks: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Route / schema source of truth: `src/data/seo.js`
- Body prerender: `scripts/prerender-meta.mjs`, `src/data/staticPages.js`
