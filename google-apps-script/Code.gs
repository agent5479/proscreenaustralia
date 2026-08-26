/**
 * Pro Screen Australia — contact form backend (Google Apps Script)
 *
 * SETUP (use the Pro Screen Australia Gmail account):
 * 1. https://script.google.com → New project → paste this file
 * 2. Project Settings → Script Properties (optional override):
 *      OWNER_EMAIL = (leave blank to use the Gmail account running this script)
 *      SITE_URL    = https://proscreenaustralia.com.au
 * 3. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Copy the /exec URL → GitHub secret VITE_CONTACT_FORM_URL
 *    (also .env.local for local builds)
 *
 * The public site never sees the inbox address — only this script sends mail.
 * Redeploy a new version after any Code.gs change.
 */

var SCRIPT_VERSION = '1'

function doGet() {
  return jsonResponse({
    success: true,
    message: 'Pro Screen Australia contact endpoint. Use POST.',
    script_version: SCRIPT_VERSION,
  })
}

function doPost(e) {
  try {
    var data = {}
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents)
    }

    // Honeypot — bots that fill "website" get a fake success
    if (String(data.website || '').trim()) {
      return jsonResponse({ success: true, message: 'Thanks — Rob will follow up shortly.' })
    }

    var action = String(data.action || 'contact').trim().toLowerCase()
    if (action !== 'contact') {
      return jsonResponse({ success: false, message: 'Unknown action.' })
    }

    return jsonResponse(submitContact(data))
  } catch (err) {
    return jsonResponse({
      success: false,
      message: err && err.message ? err.message : 'Server error.',
    })
  }
}

function submitContact(data) {
  var name = String(data.name || '').trim()
  var email = String(data.email || '').trim()
  var phone = String(data.phone || '').trim()
  var company = String(data.company || '').trim()
  var message = String(data.message || '').trim()

  if (!name) {
    return { success: false, message: 'Please provide your name.' }
  }
  if (!isValidEmail(email)) {
    return { success: false, message: 'Please provide a valid email address.' }
  }
  if (!message) {
    return { success: false, message: 'Please enter a message.' }
  }
  if (message.length > 5000) {
    return { success: false, message: 'Message is too long.' }
  }

  var ownerEmail = getOwnerEmail()
  if (!ownerEmail) {
    return {
      success: false,
      message: 'Contact form is not configured yet. Please call Rob on +61 433 045 045.',
    }
  }

  var siteUrl = getConfig('SITE_URL', 'https://proscreenaustralia.com.au')
  var mailSubject = 'Website enquiry from ' + name

  MailApp.sendEmail({
    to: ownerEmail,
    subject: mailSubject,
    replyTo: email,
    name: 'Pro Screen Australia Website',
    body: [
      'New enquiry from the website contact form:',
      '',
      '  Name:    ' + name,
      '  Email:   ' + email,
      '  Phone:   ' + (phone || '(not provided)'),
      '  Company: ' + (company || '(not provided)'),
      '',
      'Message:',
      message,
      '',
      'Sent via ' + siteUrl,
    ].join('\n'),
  })

  return {
    success: true,
    message: 'Thanks — Rob will follow up shortly.',
  }
}

function getOwnerEmail() {
  var fromProps = getConfig('OWNER_EMAIL', '')
  if (fromProps) return fromProps
  try {
    return String(Session.getActiveUser().getEmail() || '').trim()
  } catch (err) {
    return ''
  }
}

function getConfig(key, fallback) {
  var value = PropertiesService.getScriptProperties().getProperty(key)
  if (value === null || value === undefined || String(value).trim() === '') {
    return fallback
  }
  return String(value).trim()
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim())
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  )
}
