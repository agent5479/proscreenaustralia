# SEO follow-ups (future review)

Operator and content work after the custom-domain cutover to **https://proscreenaustralia.com.au**. Revisit periodically; tick items when done.

## Local / Google Business Profile

- [ ] Audit GBP name, address, phone, and website against the site: **Pro Screen Australia**, Australia-wide — call Rob to view machines in your area, `+61 433 045 045`, `https://proscreenaustralia.com.au`
- [ ] Align GBP hours with schema: Monday–Friday 08:00–17:00
- [ ] Mirror site services in GBP categories: soil / gravel / aggregate screeners, static grizzly, telehandler bins, farm / cow-race screening, civil on-site screening, topsoil / landscaping, showroom viewing
- [ ] Encourage customer reviews that name specific services, materials, and towns; reuse that language on `/for/*` pages (never invent reviews)

## Search Console & indexing

- [ ] Verify Search Console property for `https://proscreenaustralia.com.au` (prefer domain property covering www + apex)
- [ ] Submit / refresh `https://proscreenaustralia.com.au/sitemap.xml`
- [ ] After DNS cutover, confirm old `agent5479.github.io/proscreenaustralia` URLs are not the primary indexed set (use canonicals / redirects as needed)
- [ ] Request indexing for `/for/topsoil-landscaping`, `/for/aggregate-and-road-metal`, `/for/view-in-your-area`
- [ ] Validate Rich Results / schema on home (`LocalBusiness`), one product (`Product`), and one `/for/` page (`Service`)
- [ ] After deploy, view-source (no JS) a product URL and confirm `<h1>` + body copy are present in HTML
- [ ] Confirm favicon shows in browser tab and (over time) in Google results for the brand

## Brand demand (off-site)

- [ ] YouTube: titles/descriptions use **Pro Screen Australia** + model + AU use case; link to product and `/for/*` URLs
- [ ] Add branded `sameAs` entries in `src/data/seo.js` `organizationJsonLd` only for profiles you control (do not use third-party demo channels such as manufacturer-only YouTube)
- [ ] Set up one owned direct channel (email list for stock arrivals / quotes) so revenue is not 100% search-dependent
- [ ] Keep brand string **Pro Screen Australia** consistent across GBP, social bios, and video channels

## Content (informationally additive)

- [ ] Publish 2–3 first-party AU case notes when real jobs allow (material in → mesh → product out, carrier used, outcome) — not generic how-tos
- [ ] Revisit product pages if DeSite/US copy starts to dominate; keep AU outcomes and mesh/use-case links first
- [ ] Deep-link mesh guide anchors from campaigns and ads (`#farm-filling`, `#topsoil`, `#aggregates`)

## Optional later engineering

- [ ] Progressive enhancement for the home profit calculator (static explanatory defaults already in HTML; interactive calc remains JS-only by design)
- [ ] Consider email capture / quote form on contact or viewing in your area page when ready for a mailing list

## Reference

- Implementation notes and deploy checks: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Route / schema source of truth: `src/data/seo.js`
- Body prerender: `scripts/prerender-meta.mjs`, `src/data/staticPages.js`
