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

Custom domain: `https://agent5479.github.io/proscreenaustralia`

## Contact

Phone: **+61 433 045 045**  
WhatsApp: info@agent5479.github.io/proscreenaustralia  
Showroom: Australia-wide — call Rob to view machines in your area

## Project layout

- `src/` — React app (components, pages, SEO data, styles)
- `public/` — favicon, robots, sitemap, images, `.nojekyll`
- `site/` — previous static HTML (reference; not deployed)
- `legacy/` — drafts / unused assets (not deployed)
- `docs/` — additional notes ([DEPLOYMENT.md](./DEPLOYMENT.md), [SEO-FOLLOW-UPS.md](./SEO-FOLLOW-UPS.md))
