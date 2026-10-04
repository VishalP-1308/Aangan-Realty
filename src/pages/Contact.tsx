import { useSearchParams } from 'react-router-dom'
import { EnquiryForm } from '../components/Enquiry'
import Reveal from '../components/Reveal'
import { brand } from '../data/brand'
import { partners, site } from '../data/site'
import { whatsappLink } from '../lib/enquiry'

const faqs = [
  {
    q: 'Do you charge the buyer?',
    a: 'On resale we charge some percentage from each side, capped, and it is written down before any viewing. On new-launch inventory the developer pays us and you pay nothing.',
  },
  {
    q: 'Can I view a home this weekend?',
    a: 'Usually yes. Weekend slots fill by Thursday evening, so a call earlier in the week gets you the time you actually want.',
  },
  {
    q: 'I am buying from abroad. Does that work?',
    a: 'It does. We run video walkthroughs, share every document as a scan, and can act on a registered power of attorney if you cannot fly in for registration.',
  },
  {
    q: 'Do you work outside Ahmedabad?',
    a: 'Ahmedabad is our home ground. We take select mandates in Surat and Vadodara, and we will tell you plainly when a micro-market is one we do not know well enough.',
  },
  {
    q: 'I want to sell, not buy.',
    a: 'We take on a small number of sale mandates. Send the address and we will come back with a comparable-led view of the price within two days.',
  },
]

export default function Contact() {
  const [params] = useSearchParams()
  const selling = params.get('intent') === 'sell'

  const mapQuery = encodeURIComponent(`${site.office.city}, ${site.office.state}`)

  return (
    <>
      <header className="bg-ink-950 pb-20 pt-36 text-sand-50 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-400">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02]">
            {selling ? 'Tell us about your property' : 'Start with a conversation'}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-sand-200/75">
            {selling
              ? 'Send us the address and a little context. We will come back within two working days with a comparable-led view of what it should fetch.'
              : 'No forms that go nowhere. Every enquiry here reaches one of us directly, and one of us will call you back.'}
          </p>
        </div>
      </header>

      {/* the two partners, plus instagram */}
      <section className="mx-auto -mt-12 max-w-7xl px-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal key={partner.phoneHref} delay={i * 110}>
              <div className="group flex h-full flex-col rounded-2xl border border-ink-900/8 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brass-400 hover:shadow-[var(--shadow-soft)]">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-sand-100 text-brass-600 transition-colors duration-500 group-hover:bg-brass-500 group-hover:text-ink-950">
                  <i className="pi pi-phone" aria-hidden="true" />
                </div>
                <p className="mt-6 text-[0.68rem] uppercase tracking-[0.18em] text-ink-400">
                  {partner.role}
                </p>
                <p className="mt-1 font-display text-xl text-ink-900">
                  {partner.name}
                </p>
                <a
                  href={`tel:${partner.phoneHref}`}
                  className="mt-3 font-display text-lg text-brass-600 transition-colors hover:text-brass-700"
                >
                  {partner.phone}
                </a>
                <a
                  href={whatsappLink(undefined, partner)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-2 text-xs text-ink-600 transition-colors hover:text-brass-600"
                >
                  <i className="pi pi-whatsapp" aria-hidden="true" />
                  <span className="link-underline pb-0.5">Message on WhatsApp</span>
                </a>
              </div>
            </Reveal>
          ))}

          <Reveal delay={220}>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-full flex-col rounded-2xl border border-ink-900/8 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brass-400 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-sand-100 text-brass-600 transition-colors duration-500 group-hover:bg-brass-500 group-hover:text-ink-950">
                <i className="pi pi-instagram" aria-hidden="true" />
              </div>
              <p className="mt-6 text-[0.68rem] uppercase tracking-[0.18em] text-ink-400">
                Follow us
              </p>
              <p className="mt-1 font-display text-xl text-ink-900">
                @{site.instagram}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-ink-400">
                New listings and walkthroughs go up here first.
              </p>
            </a>
          </Reveal>
        </div>
      </section>

      {/* form + card + faqs */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08]">
              {selling ? 'Request a valuation' : 'Send us a note'}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-600">
              The more you tell us about how you want to live, the less of your
              weekend we waste.
            </p>
            <div className="mt-10">
              <EnquiryForm
                key={selling ? 'sell' : 'general'}
                seedMessage={
                  selling ? 'I would like a valuation for my property at ' : undefined
                }
              />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="overflow-hidden rounded-2xl bg-ink-950">
              <img
                src={brand.contactCard}
                alt={`${site.name} — ${site.tagline} Contact Mohit Patel on ${partners[0].phone} or Vishal Patel on ${partners[1].phone}.`}
                loading="lazy"
                width={1100}
                height={1100}
                className="w-full"
              />
            </div>

            <div className="mt-8 rounded-2xl bg-sand-100 p-8">
              <h3 className="text-xl">Where we are</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                {site.office.city}, {site.office.state}. We work across the city
                rather than from a shopfront, so viewings are booked by phone and we
                meet you at the property.
              </p>
              <p className="mt-4 border-t border-ink-900/10 pt-4 text-sm text-ink-600">
                {site.office.hours}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-ink-400">
                Sunday viewings happen — book them through the week.
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-ink-900/8">
                <iframe
                  title={`Map of ${site.office.city}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full border-0"
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl">Common questions</h3>
              <dl className="mt-5 divide-y divide-ink-900/8">
                {faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="font-display text-lg text-ink-900">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
