# Deployment Guide

## Overview

The live site is a Vite + React app. GitHub Actions builds `dist/` and deploys it to GitHub Pages. The public site is **https://proscreenaustralia.com.au** (custom domain on GitHub Pages).

## Requirements

- Node.js 22+
- npm
- GitHub Pages source set to **GitHub Actions**
- Custom domain `proscreenaustralia.com.au` configured in the repo Pages settings (CNAME file ships in `public/CNAME`)

## Deploy (automatic)

```bash
git add .
git commit -m "Your message"
git push origin main
```

The workflow [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) will:

1. Install dependencies (`npm ci`)
2. Build (`npm run build`) — Vite + SEO meta/body prerender
3. Upload and deploy the `dist/` artifact

## Deploy (manual)

In the GitHub repo: **Actions → Deploy to GitHub Pages → Run workflow**.

## Local verify before push

```bash
npm run build
npm run preview
```

Confirm:

- CSS/images load at root paths (`/assets/...`, `/images/...`)
- Favicon at `/favicon.ico`
- `/sitemap.xml` and `/robots.txt` present
- Phone displays as `+61 433 045 045`
- Meta tags present in `dist/index.html` and route folders (e.g. `dist/about/index.html`)
- **Body prerender:** open `dist/products/slg-78vf/index.html` (and peers) and confirm an `<h1>` and page copy exist inside `#root` without running JS
- **Mesh guide:** `dist/screening-recommendation/index.html` contains chart tables in the static HTML
- **JSON-LD:** home has `LocalBusiness`; product routes have `Product`; `/for/*` routes have `Service`
- **Sitemap:** includes `/for/topsoil-landscaping`, `/for/aggregate-and-road-metal`, `/for/view-in-your-area`
- **Internal routes:** `dist/idm/**/index.html` keep empty `#root` and `noindex`
- Canonicals and sitemap use `https://proscreenaustralia.com.au`

## Custom domain (DNS cutover)

`public/CNAME` contains `proscreenaustralia.com.au`. Vite `base` is `/` and `contact.basePath` is empty so assets resolve at the domain root.

Typical DNS for GitHub Pages:

1. Apex `proscreenaustralia.com.au` — A records to GitHub Pages IPs (or ALIAS/ANAME if your DNS supports it)
2. Optional `www` — CNAME to `agent5479.github.io`
3. In GitHub → Settings → Pages: confirm custom domain, wait for DNS check, enable **Enforce HTTPS**

Until DNS propagates, the github.io project URL may still work depending on Pages settings; once the custom domain is verified, treat **https://proscreenaustralia.com.au** as the only public URL for Search Console and GBP.

## Post-deploy SEO operator checklist

Full tick-list for future review: **[SEO-FOLLOW-UPS.md](./SEO-FOLLOW-UPS.md)**.

### Google Business Profile (GBP)

1. Match NAP to the site: **Pro Screen Australia**, Australia-wide — call Rob to view machines in your area, phone **+61 433 045 045**, website `https://proscreenaustralia.com.au`.
2. Hours: Monday–Friday 08:00–17:00 (aligned with schema).
3. Categories/services mirror site use cases: soil/gravel/aggregate screeners, static grizzly, telehandler bins, farm/cow-race screening, civil on-site screening, topsoil/landscaping, showroom viewing.
4. Encourage reviews that name specific services, materials, and towns; reuse that language on `/for/*` pages (do not invent reviews).

### Search Console

1. Add/verify property `https://proscreenaustralia.com.au` (domain or URL-prefix). After cutover, treat the old `agent5479.github.io/proscreenaustralia` property as a redirect/legacy — do not leave it as the primary indexed site.
2. Submit/refresh `https://proscreenaustralia.com.au/sitemap.xml`.
3. Request indexing for key URLs: home, products, `/for/topsoil-landscaping`, `/for/aggregate-and-road-metal`, `/for/view-in-your-area`.
4. Spot-check Rich Results / schema on home, one product, and one `/for/` page.

### Brand demand (outside the repo)

1. YouTube titles/descriptions: include **Pro Screen Australia** + model + AU use case; link to product and `/for/*` URLs.
2. Add branded `sameAs` profiles to `organizationJsonLd` in `src/data/seo.js` only when you control a public Pro Screen Australia / DeSite AU channel or social page (do not point `sameAs` at third-party demo channels).
3. One owned direct channel (email list for stock/quotes) so traffic is not 100% search-dependent.
4. Keep the brand string **Pro Screen Australia** consistent in titles, GBP, and social bios.

## Notes

- `site/` is legacy static HTML and is **not** what Pages deploys anymore.
- Do not re-enable workflows that sync files into `site/` for publishing.
- Prerender injects static nav/body/footer into `#root` for crawlers; React replaces `#root` on load for interactive users.
- Favicon / JSON-LD logo: DeSite gear on DeSite blue (`public/favicon.ico`, `favicon-48.png`, `apple-touch-icon.png`, `site-logo.png`). Regenerate with `python scripts/make-favicon.py` if the source mark changes.
