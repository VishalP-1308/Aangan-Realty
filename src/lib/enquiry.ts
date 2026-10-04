import { primary, site } from '../data/site.ts'

export type Enquiry = {
  name: string
  email: string
  phone: string
  message: string
  /** listing title, when the enquiry came from a property page */
  property?: string
}

export type FieldErrors = Partial<Record<keyof Enquiry, string>>

// Deliberately permissive: rejecting valid-but-unusual addresses costs a lead.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Trust boundary — everything below runs on whatever the visitor typed. */
export function validate(e: Enquiry): FieldErrors {
  const errors: FieldErrors = {}
  if (e.name.trim().length < 2) errors.name = 'Please tell us your name.'
  // Phone is how we actually reach people here, so email is optional —
  // but if they did type one, it should be a real one.
  if (e.email.trim() && !EMAIL.test(e.email.trim()))
    errors.email = 'That email does not look right.'

  const digits = e.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 13)
    errors.phone = 'Enter a 10-digit mobile number.'

  if (e.message.trim().length > 2000)
    errors.message = 'Please keep this under 2000 characters.'

  return errors
}

/** Pre-filled WhatsApp deep link — the channel most buyers here actually use. */
export function whatsappLink(propertyTitle?: string, to = primary): string {
  const text = propertyTitle
    ? `Hi ${to.name.split(' ')[0]}, I saw "${propertyTitle}" on the ${site.name} website and would like to know more.`
    : `Hi ${to.name.split(' ')[0]}, I found ${site.name} online and would like to discuss a property.`
  return `https://wa.me/${to.whatsapp}?text=${encodeURIComponent(text)}`
}

function summary(e: Enquiry): string {
  return [
    e.property ? `Enquiry about: ${e.property}` : 'General enquiry',
    '',
    `Name:   ${e.name.trim()}`,
    `Email:  ${e.email.trim()}`,
    `Phone:  ${e.phone.trim()}`,
    '',
    e.message.trim() || '(no message)',
  ].join('\n')
}

export type SubmitResult = 'sent' | 'whatsapp'

/**
 * Posts to VITE_ENQUIRY_ENDPOINT when one is configured (Formspree, a Power
 * Automate flow, an Azure Function — anything accepting a JSON POST).
 *
 * With no endpoint set, the enquiry is handed to WhatsApp pre-filled against a
 * real number, rather than a guessed mailbox. That keeps a fresh deploy from
 * silently swallowing leads.
 *
 * ponytail: no queue, no retry. Add one when enquiry volume justifies a real
 * backend with delivery guarantees.
 */
export async function submitEnquiry(e: Enquiry): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: e.name.trim(),
        email: e.email.trim(),
        phone: e.phone.trim(),
        message: e.message.trim(),
        property: e.property ?? '',
        submittedAt: new Date().toISOString(),
      }),
    })
    if (!res.ok) throw new Error(`Enquiry endpoint returned ${res.status}`)
    return 'sent'
  }

  window.open(
    `https://wa.me/${primary.whatsapp}?text=${encodeURIComponent(summary(e))}`,
    '_blank',
    'noopener',
  )
  return 'whatsapp'
}
