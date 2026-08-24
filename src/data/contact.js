export const contact = {
  siteName: 'Pro Screen Australia',
  phoneDisplay: '+61 433 045 045',
  phoneTel: '+61433045045',
  whatsappHref: 'https://wa.me/61433045045',
  instagramUrl: 'https://www.instagram.com/proscreen_australia/',
  instagramHandle: '@proscreen_australia',
  siteUrl: 'https://proscreenaustralia.com.au',
  /** Empty on custom domain (site served at domain root). Use '/proscreenaustralia' only for project Pages without CNAME. */
  basePath: '',
  locationLine: 'Australia-wide supply — call Rob to view machines in your area',
  contactName: 'Rob',
}

export const phoneHref = `tel:${contact.phoneTel}`
export const whatsappHref = contact.whatsappHref
/** No public email — WhatsApp is the written-contact path. */
export const emailHref = contact.whatsappHref

export function withBase(path) {
  if (!path) return path
  if (
    path.startsWith('http') ||
    path.startsWith('tel:') ||
    path.startsWith('mailto:') ||
    path.startsWith('sms:') ||
    path.startsWith('#') ||
    path.startsWith('data:')
  ) {
    return path
  }
  const base = contact.basePath || ''
  if (!path.startsWith('/')) return `${base}/${path}`
  return `${base}${path}`
}

export function prefixHtml(html) {
  const base = contact.basePath || ''
  if (!base || !html) return html
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`)
}
