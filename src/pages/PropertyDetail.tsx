import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Galleria } from 'primereact/galleria'
import { EnquiryForm } from '../components/Enquiry'
import { PropertyCardMini } from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import {
  displayPrice,
  findProperty,
  formatPrice,
  properties,
  type Property,
} from '../data/properties'
import { brand } from '../data/brand'
import { partners, primary, site } from '../data/site'
import { whatsappLink } from '../lib/enquiry'

export default function PropertyDetail() {
  const { slug = '' } = useParams()
  const property = findProperty(slug)
  const [galleryIndex, setGalleryIndex] = useState(0)
  // PrimeReact's fullscreen Galleria is imperative — no visible prop.
  const lightbox = useRef<Galleria>(null)

  if (!property) return <Navigate to="/properties" replace />

  const p: Property = property
  const similar = properties
    .filter((o) => o.id !== p.id && (o.city === p.city || o.type === p.type))
    .slice(0, 3)

  const specs = [
    { label: 'Configuration', value: p.beds > 0 ? `${p.beds} BHK` : p.type },
    { label: 'Area', value: p.area ? `${p.area.toLocaleString('en-IN')} sq.ft.` : 'On request' },
    { label: 'Bathrooms', value: p.baths > 0 ? String(p.baths) : '—' },
    { label: 'Facing', value: p.facing },
    { label: 'Floor', value: p.floor },
    { label: 'Furnishing', value: p.furnishing },
    { label: 'Parking', value: p.parking > 0 ? `${p.parking} covered` : '—' },
    { label: 'Possession', value: p.possession },
  ]

  // Needs both a price and an area — "price on request" listings show neither.
  const perSqft = !p.area
    ? null
    : p.rent
      ? `${formatPrice(Math.round(p.rent / p.area))} / sq.ft. / month`
      : p.price
        ? `${formatPrice(Math.round(p.price / p.area))} / sq.ft.`
        : null

  const mapQuery = encodeURIComponent(`${p.locality}, ${p.city}, India`)

  const itemTemplate = (src: string) => (
    <img
      src={src}
      alt={p.title}
      // contain, not cover: brochure pages and floor plans must not be cropped
      className="h-[68svh] w-full bg-ink-900 object-contain"
    />
  )

  const thumbTemplate = (src: string) => (
    <img src={src} alt="" loading="lazy" className="h-16 w-24 object-cover" />
  )

  return (
    <>
      {/* ---------------------------------------------------------- header */}
      <header className="bg-ink-950 pb-10 pt-32 text-sand-50 sm:pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="flex items-center gap-2 text-xs tracking-wide text-sand-200/55">
            <Link to="/" className="transition-colors hover:text-brass-300">
              Home
            </Link>
            <i className="pi pi-angle-right text-[0.6rem]" aria-hidden="true" />
            <Link to="/properties" className="transition-colors hover:text-brass-300">
              Properties
            </Link>
            <i className="pi pi-angle-right text-[0.6rem]" aria-hidden="true" />
            <span className="truncate text-sand-200/80">{p.title}</span>
          </nav>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <span className="inline-flex rounded-full bg-brass-500 px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-ink-950">
                {p.status}
              </span>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.03]">
                {p.title}
              </h1>
              <p className="mt-4 flex items-center gap-2 text-sm text-sand-200/75">
                <i className="pi pi-map-marker text-brass-400" aria-hidden="true" />
                {p.locality}, {p.city}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-brass-300">
                {displayPrice(p)}
              </p>
              {perSqft && (
                <p className="mt-3 text-xs tracking-wide text-sand-200/60">{perSqft}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------- gallery */}
      <section className="bg-ink-950 pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-2xl">
            <Galleria
              value={p.images}
              activeIndex={galleryIndex}
              onItemChange={(e) => setGalleryIndex(e.index)}
              item={itemTemplate}
              thumbnail={thumbTemplate}
              numVisible={5}
              circular
              showItemNavigators
              showItemNavigatorsOnHover
              showThumbnails
              pt={{ thumbnailWrapper: { className: 'bg-ink-900' } }}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs tracking-wide text-sand-200/55">
              {galleryIndex + 1} of {p.images.length}
            </p>
            <Button
              label="Open full screen"
              icon="pi pi-window-maximize"
              text
              onClick={() => lightbox.current?.show()}
              className="!text-sand-200 hover:!bg-white/8 hover:!text-sand-50"
            />
          </div>

          <Galleria
            ref={lightbox}
            value={p.images}
            activeIndex={galleryIndex}
            onItemChange={(e) => setGalleryIndex(e.index)}
            fullScreen
            circular
            showItemNavigators
            showThumbnails={false}
            item={(src: string) => (
              <img src={src} alt={p.title} className="max-h-[92svh] max-w-[94vw] object-contain" />
            )}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------ body */}
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_23rem] lg:gap-16">
          <div className="min-w-0">
            {/* quick stats */}
            <Reveal>
              <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-900/8 sm:grid-cols-4">
                {[
                  { icon: 'pi-home', label: 'Bedrooms', value: p.beds || '—' },
                  { icon: 'pi-inbox', label: 'Bathrooms', value: p.baths || '—' },
                  {
                    icon: 'pi-arrows-alt',
                    label: 'Sq.ft.',
                    value: p.area ? p.area.toLocaleString('en-IN') : '—',
                  },
                  { icon: 'pi-car', label: 'Parking', value: p.parking || '—' },
                ].map((s) => (
                  <li key={s.label} className="bg-sand-50 px-5 py-6 text-center">
                    <i className={`pi ${s.icon} text-brass-600`} aria-hidden="true" />
                    <p className="mt-3 font-display text-2xl text-ink-900">{s.value}</p>
                    <p className="mt-1 text-[0.66rem] uppercase tracking-[0.16em] text-ink-400">
                      {s.label}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* description */}
            <Reveal className="mt-16">
              <h2 className="text-[clamp(1.6rem,3vw,2.25rem)]">About this home</h2>
              <p className="mt-5 font-display text-xl leading-relaxed text-ink-800">
                {p.summary}
              </p>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-600">
                {p.description.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </Reveal>

            {/* highlights */}
            <Reveal className="mt-14">
              <h3 className="text-xl">What stands out</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 rounded-xl border border-ink-900/8 bg-white p-4 text-sm leading-relaxed text-ink-700 transition-colors duration-300 hover:border-brass-400"
                  >
                    <i
                      className="pi pi-check-circle mt-0.5 text-brass-600"
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* spec + amenities */}
            <Reveal className="mt-16">
              <Accordion multiple activeIndex={[0]}>
                <AccordionTab header="Specification">
                  <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                    {specs.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-baseline justify-between gap-4 border-b border-ink-900/6 pb-3"
                      >
                        <dt className="text-xs uppercase tracking-[0.14em] text-ink-400">
                          {s.label}
                        </dt>
                        <dd className="text-right text-sm text-ink-900">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionTab>

                <AccordionTab header="Amenities">
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
                    {p.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2.5 text-sm text-ink-700">
                        <i
                          className="pi pi-circle-fill text-[0.3rem] text-brass-500"
                          aria-hidden="true"
                        />
                        {a}
                      </li>
                    ))}
                  </ul>
                </AccordionTab>

                <AccordionTab header="Legal and registration">
                  <div className="space-y-3 text-sm leading-relaxed text-ink-600">
                    <p>
                      <span className="text-ink-400">RERA registration: </span>
                      <span className="text-ink-900">Shared on request</span>
                    </p>
                    <p>
                      Title documents, society NOC status and the encumbrance
                      certificate are available for inspection before any token is
                      paid. We do not ask for a token until you have seen them.
                    </p>
                    <p className="text-xs text-ink-400">
                      Stamp duty, registration charges and GST where applicable are
                      over and above the quoted price.
                    </p>
                  </div>
                </AccordionTab>
              </Accordion>
            </Reveal>

            {/* location */}
            <Reveal className="mt-16">
              <h3 className="text-xl">The neighbourhood</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                {p.locality}, {p.city}. Exact door number is shared with
                shortlisted buyers at the time of the viewing.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-ink-900/8">
                <iframe
                  title={`Map of ${p.locality}, ${p.city}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[22rem] w-full border-0"
                />
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------------ aside */}
          <aside className="mt-16 lg:mt-0">
            <div className="sticky top-28 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-[var(--shadow-soft)]">
                <div className="flex items-center gap-4 border-b border-ink-900/8 p-6">
                  <img
                    src={brand.logoRound}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-lg text-ink-900">{site.name}</p>
                    <p className="truncate text-xs text-ink-400">{site.tagline}</p>
                  </div>
                </div>

                <div className="space-y-3 p-6">
                  {partners.map((partner) => (
                    <a
                      key={partner.phoneHref}
                      href={`tel:${partner.phoneHref}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-ink-900/10 px-4 py-3 transition-colors duration-300 hover:border-brass-500 hover:bg-brass-500/8"
                    >
                      <span className="min-w-0">
                        <span className="block text-xs text-ink-400">
                          {partner.name}
                        </span>
                        <span className="block font-display text-lg text-ink-900">
                          {partner.phone}
                        </span>
                      </span>
                      <i className="pi pi-phone text-brass-600" aria-hidden="true" />
                    </a>
                  ))}

                  <a
                    href={whatsappLink(p.title)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block"
                  >
                    <Button
                      label="WhatsApp about this home"
                      icon="pi pi-whatsapp"
                      outlined
                      className="w-full !border-ink-900/20 !py-3 !text-ink-900 hover:!bg-ink-900 hover:!text-sand-50"
                    />
                  </a>
                  <p className="pt-1 text-center text-xs text-ink-400">
                    Viewings {site.office.hours}
                  </p>
                </div>
              </div>

              <div
                id="enquire"
                className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-xl">Register your interest</h3>
                <p className="mt-2 mb-6 text-sm leading-relaxed text-ink-600">
                  We reply within one working day, with the documents attached.
                </p>
                <EnquiryForm
                  key={p.id}
                  property={p}
                  seedMessage={`I would like to view ${p.title} in ${p.locality}.`}
                />
              </div>
            </div>
          </aside>
        </div>

        {/* ------------------------------------------------------- similar */}
        {similar.length > 0 && (
          <Reveal className="mt-24 border-t border-ink-900/8 pt-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[clamp(1.6rem,3vw,2.25rem)]">You might also like</h2>
              <Link
                to="/properties"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink-900"
              >
                <span className="link-underline pb-0.5">Browse everything</span>
                <i className="pi pi-arrow-right text-[0.7rem] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {similar.map((s) => (
                <PropertyCardMini key={s.id} property={s} />
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {/* mobile sticky action bar */}
      <div className="sticky bottom-0 z-40 flex items-center gap-3 border-t border-ink-900/10 bg-sand-50/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-ink-400">{p.locality}</p>
          <p className="font-display text-xl text-ink-900">{displayPrice(p)}</p>
        </div>
        <a href={`tel:${primary.phoneHref}`}>
          <Button icon="pi pi-phone" outlined aria-label="Call" className="!border-ink-900/20 !text-ink-900" />
        </a>
        <a href="#enquire">
          <Button label="Enquire" className="!px-6" />
        </a>
      </div>
    </>
  )
}
