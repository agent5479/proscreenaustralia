# Contact form — Google Apps Script

Sends `/contact` enquiries to Rob’s Gmail without publishing the address on the site.

## One-time setup

1. Sign into [script.google.com](https://script.google.com) with the **Pro Screen Australia Gmail** account.
2. **New project** → paste [`Code.gs`](./Code.gs) → Save.
3. Optional: **Project Settings → Script Properties**
   - `OWNER_EMAIL` — only if mail should go somewhere other than the deploying account
   - `SITE_URL` — `https://proscreenaustralia.com.au`
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the web app URL (ends in `/exec`).
6. GitHub repo → **Settings → Secrets and variables → Actions**
   - Name: `VITE_CONTACT_FORM_URL`
   - Value: that `/exec` URL
7. Locally: copy `.env.example` → `.env.local` and set the same URL, then `npm run dev`.

After any `Code.gs` edit, create a **new** deployment version (or “Manage deployments → Edit → New version”).

## Privacy

- Inbox address stays in Apps Script / Script Properties only — never in `src/` or the client bundle.
- The Apps Script URL is injected at build time via `VITE_CONTACT_FORM_URL` (GitHub secret). It appears in the built JS (needed for the browser to POST) but does not reveal the Gmail address.
