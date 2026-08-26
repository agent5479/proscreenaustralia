import { useState } from 'react'
import { isContactFormConfigured, submitContactForm } from '../lib/contact'

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  website: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const configured = isContactFormConfigured()

  const field = (name) => ({
    value: form[name],
    onChange: (e) => setForm((prev) => ({ ...prev, [name]: e.target.value })),
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setSubmitting(true)

    const result = await submitContactForm(form)
    setSubmitting(false)

    if (result.success) {
      setForm(EMPTY)
      setStatus({ type: 'success', text: result.message })
    } else {
      setStatus({ type: 'error', text: result.message })
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <h2>Send Rob a message</h2>
      <p className="contact-form-intro">
        Tell us what you are screening and which carrier you run. Rob will follow up — we do not publish
        an email address on the site.
      </p>

      {!configured && (
        <p className="contact-form-status contact-form-status--warn" role="status">
          Online form is not live yet — call +61 433 045 045 or WhatsApp Rob in the meantime.
        </p>
      )}

      <div className="contact-form-grid">
        <label>
          Your name *
          <input type="text" name="name" required autoComplete="name" {...field('name')} />
        </label>
        <label>
          Email *
          <input type="email" name="email" required autoComplete="email" {...field('email')} />
        </label>
        <label>
          Phone
          <input type="tel" name="phone" autoComplete="tel" {...field('phone')} />
        </label>
        <label>
          Company / site
          <input type="text" name="company" autoComplete="organization" {...field('company')} />
        </label>
        <label className="contact-form-span">
          Message *
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Material type, mesh size, carrier (skidsteer, loader, etc.) and where you are in Australia"
            {...field('message')}
          />
        </label>
      </div>

      <label className="contact-form-honeypot" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" {...field('website')} />
      </label>

      <div className="contact-form-actions">
        <button type="submit" className="cta-primary" disabled={submitting || !configured}>
          {submitting ? 'Sending…' : 'Send message'}
        </button>
      </div>

      {status && (
        <p
          className={`contact-form-status contact-form-status--${status.type}`}
          role={status.type === 'error' ? 'alert' : 'status'}
        >
          {status.text}
        </p>
      )}
    </form>
  )
}
