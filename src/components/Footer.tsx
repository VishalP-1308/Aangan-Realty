import { Link } from 'react-router-dom'
import { brand } from '../data/brand'
import { partners, site } from '../data/site'
import { whatsappLink } from '../lib/enquiry'

const columns = [
  {
    heading: 'Browse',
    items: [
      { label: 'All properties', to: '/properties' },
      { label: 'For sale', to: '/properties?status=For+Sale' },
      { label: 'For rent', to: '/properties?status=For+Rent' },
      { label: 'New launches', to: '/properties?status=New+Launch' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Sell with us', to: '/contact?intent=sell' },
      { label: 'Book a viewing', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-sand-200">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src={brand.logoRound}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl tracking-[0.08em] text-sand-50">
                  AANGAN
                </span>
                <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.42em] text-brass-400">
                  Realty
                </span>
              </span>
            </Link>

            <p className="mt-6 font-display text-lg italic text-brass-300">
              {site.promise}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-200/70">
              A boutique brokerage working across {site.office.city}, Surat and
              Vadodara. We represent a small number of homes at a time, and we know
              each one properly.
            </p>

            <div className="mt-6 flex gap-2">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Instagram — @${site.instagram}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-sand-200/15 text-sand-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-400 hover:bg-brass-400 hover:text-ink-950"
              >
                <i className="pi pi-instagram text-sm" aria-hidden="true" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-sand-200/15 text-sand-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-400 hover:bg-brass-400 hover:text-ink-950"
              >
                <i className="pi pi-whatsapp text-sm" aria-hidden="true" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-brass-400">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="link-underline pb-0.5 text-sand-200/80 transition-colors hover:text-sand-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-brass-400">
              Talk to us
            </h3>

            <ul className="mt-5 space-y-4">
              {partners.map((partner) => (
                <li key={partner.phoneHref}>
                  <p className="text-xs tracking-wide text-sand-200/55">
                    {partner.name}
                  </p>
                  <a
                    href={`tel:${partner.phoneHref}`}
                    className="font-display text-xl text-sand-50 transition-colors hover:text-brass-400"
                  >
                    {partner.phone}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-sand-200/80">
              {site.office.city}, {site.office.state}
            </p>
            <p className="mt-1 text-sm text-sand-200/55">{site.office.hours}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-sand-200/10 pt-7 text-xs text-sand-200/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.tagline}
          </p>
          <p>
            Listing information is believed reliable but is not guaranteed, and
            should be independently verified.
          </p>
        </div>
      </div>
    </footer>
  )
}
