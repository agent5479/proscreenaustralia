/** Google Apps Script web app URL — set via VITE_CONTACT_FORM_URL (GitHub secret / .env.local). */
export function getContactFormUrl() {
  const url = import.meta.env.VITE_CONTACT_FORM_URL
  return typeof url === 'string' ? url.trim() : ''
}

export function isContactFormConfigured() {
  return Boolean(getContactFormUrl())
}

/**
 * POST enquiry to Apps Script (text/plain + JSON body avoids CORS preflight).
 * @returns {{ success: boolean, message: string }}
 */
export async function submitContactForm(payload) {
  const apiUrl = getContactFormUrl()
  if (!apiUrl) {
    return {
      success: false,
      message: 'The contact form is not configured yet. Please call +61 433 045 045 or WhatsApp Rob.',
    }
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'contact', ...payload }),
    })

    const text = await response.text()
    try {
      return JSON.parse(text)
    } catch {
      return {
        success: response.ok,
        message: response.ok
          ? 'Thanks — Rob will follow up shortly.'
          : 'Something went wrong. Please call +61 433 045 045.',
      }
    }
  } catch {
    return {
      success: false,
      message: 'Could not send your message. Please call +61 433 045 045 or WhatsApp Rob.',
    }
  }
}
