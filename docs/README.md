# Pro Screen Australia

React (Vite) website for Pro Screen Australia — DeSite soil screening equipment supplier.

## Stack

- React 18 + Vite
- React Router
- `react-helmet-async` for SEO metadata
- Static build to `dist/` with per-route meta, JSON-LD, and crawlable HTML body injection
- GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Output is in `dist/` (HTML, hashed CSS/JS, `favicon.ico`, `robots.txt`, `sitemap.xml`, images).

## Deployment

Push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `npm ci`
2. `npm run build`
3. Deploy `dist/` to GitHub Pages (site root, `base: '/'`)

Custom domain: `https://proscreenaustralia.com.au` (`public/CNAME`)

## Contact

Phone: **+61 433 045 045**  
WhatsApp: https://wa.me/61433045045  
Based in **Sydney** — supply Australia-wide. Call Rob to view machines in your area.

Contact form backend: [`google-apps-script/README.md`](../google-apps-script/README.md) — deploy Apps Script, then set GitHub secret `VITE_CONTACT_FORM_URL`.

## Project layout

- `src/` — React app (components, pages, SEO data, styles)
- `public/` — favicon, robots, sitemap, CNAME, images, `.nojekyll`
- `site/` — previous static HTML (reference; not deployed)
- `legacy/` — drafts / unused assets (not deployed)
- `docs/` — additional notes ([DEPLOYMENT.md](./DEPLOYMENT.md), [SEO-FOLLOW-UPS.md](./SEO-FOLLOW-UPS.md))
