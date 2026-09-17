import { contact } from './contact.js'

/** Public IndexNow ownership key (hosted at the site root; not a secret). */
export const indexNowKey = '3481b2c71f3849bd9d53fd46b812c1c4'
export const indexNowHost = new URL(contact.siteUrl).host
export const indexNowKeyFile = `${indexNowKey}.txt`
export const indexNowKeyLocation = `${contact.siteUrl}/${indexNowKeyFile}`
