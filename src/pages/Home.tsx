import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Carousel } from 'primereact/carousel'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import { EnquiryDialog } from '../components/Enquiry'
import {
  heroImage,
  localities,
  properties,
  PROPERTY_TYPES,
  type Property,
} from '../data/properties'
import { brand } from '../data/brand'
import { partners, primary, site, testimonials, values } from '../data/site'

const budgets = [
  { label: 'Any budget', value: '' },
  { label: 'Under ₹1.5 Cr', value: '15000000' },
  { label: 'Under ₹3 Cr', value: '30000000' },
  { label: 'Under ₹5 Cr', value: '50000000' },
  { label: 'Above ₹5 Cr', value: 'above' },
]

const steps = [
  {
    n: '01',
    title: 'We listen first',
    body: 'A long conversation about how you actually live — school runs, parents visiting, whether you cook every day. Not a budget and a pin code.',
  },
  {
    n: '02',
    title: 'We shortlist hard',
    body: 'You see four or five homes, not forty. Each one has been walked by us, with the title, the society accounts and the neighbours already checked.',
  },
  {
    n: '03',
    title: 'We close it properly',
    body: 'Negotiation, diligence, bank coordination, registration. One person owns the file from first viewing to handover of keys.',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [budget, setBudget] = useState('')
  const [enquiry, setEnquiry] = useState<Property | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)

  const featured = properties.filter((p) => p.featured).slice(0, 6)

  function search(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q.trim())
    if (type) params.set('type', type)
    if (budget === 'above') params.set('min', '50000000')
    else if (budget) params.set('max', budget)
    navigate(`/properties?${params}`)
  }

  function openEnquiry(p: Property) {
    setEnquiry(p)
    setDialogOpen(true)
  }

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-950">
        <img
          src={heroImage}
          alt=""
          fetchPriority="high"
          className="ken-burns absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/35" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
          <p
            className="rise-in text-[0.68rem] font-medium uppercase tracking-[0.32em] text-brass-300"
            style={{ animationDelay: '120ms' }}
          >
            {site.tagline}
          </p>

          <h1
            className="rise-in mt-6 max-w-4xl text-balance font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] text-sand-50"
            style={{ animationDelay: '220ms' }}
          >
            Let's build your
            <span className="block italic text-brass-300">tomorrow, together.</span>
          </h1>

          <p
            className="rise-in mt-7 max-w-xl text-base leading-relaxed text-sand-200/85 sm:text-lg"
            style={{ animationDelay: '340ms' }}
          >
            A boutique brokerage in Ahmedabad, with select mandates in Surat and
            Vadodara. We hold a short list of considered homes — and we know every
            one of them by heart.
          </p>

          {/* search */}
          <form
            onSubmit={search}
            className="rise-in mt-11 grid gap-3 rounded-2xl border border-sand-50/12 bg-ink-950/45 p-3 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_auto]"
            style={{ animationDelay: '460ms' }}
          >
            <InputText
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Locality, city or building"
              aria-label="Search by locality, city or building"
              className="!h-14 w-full !border-transparent !bg-sand-50/95 !px-4"
            />

            <Dropdown
              value={type}
              onChange={(e) => setType(e.value)}
              options={[
                { label: 'Any type', value: '' },
                ...PROPERTY_TYPES.map((t) => ({ label: t, value: t })),
              ]}
              placeholder="Any type"
              aria-label="Property type"
              className="!h-14 !items-center !border-transparent !bg-sand-50/95"
            />

            <Dropdown
              value={budget}
              onChange={(e) => setBudget(e.value)}
              options={budgets}
              placeholder="Any budget"
              aria-label="Budget"
              className="!h-14 !items-center !border-transparent !bg-sand-50/95"
            />

            <Button
              type="submit"
              label="Search"
              icon="pi pi-search"
              className="!h-14 !bg-brass-500 !border-brass-500 !px-8 !text-ink-950 hover:!bg-brass-400 hover:!border-brass-400 hover:!text-ink-950"
            />
          </form>

          <dl className="mt-14 grid gap-x-8 gap-y-8 border-t border-sand-50/10 pt-10 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 110}>
                <dt className="flex items-center gap-3 font-display text-2xl text-sand-50">
                  <i
                    className={`pi ${v.icon} text-base text-brass-300`}
                    aria-hidden="true"
                  />
                  {v.title}
                </dt>
                <dd className="mt-2.5 max-w-xs text-xs leading-relaxed text-sand-200/65">
                  {v.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <a
          href="#featured"
          aria-label="Scroll to featured homes"
          className="float-y absolute bottom-6 right-6 hidden h-11 w-11 place-items-center rounded-full border border-sand-50/25 text-sand-50 transition-colors hover:border-brass-300 hover:text-brass-300 lg:grid"
        >
          <i className="pi pi-arrow-down text-sm" aria-hidden="true" />
        </a>
      </section>

      {/* ------------------------------------------------------ city ticker */}
      <div className="marquee overflow-hidden border-b border-ink-900/8 bg-sand-100 py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-10" aria-hidden={dup === 1}>
              {localities.map((n) => (
                <span
                  key={n}
                  className="flex items-center gap-10 text-[0.68rem] uppercase tracking-[0.28em] text-ink-400"
                >
                  {n}
                  <i className="pi pi-circle-fill text-[0.28rem] text-brass-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------- featured */}
      <section id="featured" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-600">
              Currently representing
            </p>
            <h2 className="mt-4 text-balance text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05]">
              A short list, and only homes we would live in ourselves
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-900"
            >
              <span className="link-underline pb-0.5">See all {properties.length} homes</span>
              <i className="pi pi-arrow-right text-[0.7rem] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} onEnquire={openEnquiry} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- method */}
      <section className="bg-ink-950 text-sand-100">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal className="max-w-2xl">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-400">
              How we work
            </p>
            <h2 className="mt-4 text-balance font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] text-sand-50">
              Three steps, one person, no handoffs
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-sand-50/10 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 130}>
                <div className="group h-full bg-ink-950 p-9 transition-colors duration-500 hover:bg-ink-900">
                  <span className="font-display text-5xl text-brass-400/35 transition-colors duration-500 group-hover:text-brass-400">
                    {s.n}
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-sand-50">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-sand-200/70">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- partners */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-ink-950">
                <img
                  src={brand.logoFull}
                  alt={`${site.name} — ${site.tagline}`}
                  loading="lazy"
                  width={900}
                  height={773}
                  className="w-full transition-transform duration-[1.4s] hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden max-w-[13rem] rounded-2xl bg-brass-500 px-7 py-6 text-ink-950 shadow-[var(--shadow-lift)] sm:block">
                <p className="font-display text-xl leading-snug italic">
                  {site.promise}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-600">
              Who you will deal with
            </p>
            <h2 className="mt-4 text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.06]">
              You call us, you get us
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-600">
              <p>
                There is no call centre here and no rotating pool of agents. Between
                the two of us we take the enquiry, do the viewings, and sit across
                the table at registration. That is the whole model.
              </p>
              <p>
                It limits how many homes we can carry at once — usually nine or ten —
                but it means we can tell you which flat gets afternoon heat, which
                society has a funded corpus, and which developer is slow on snags.
              </p>
            </div>

            <ul className="mt-9 grid gap-4 border-t border-ink-900/10 pt-7 sm:grid-cols-2">
              {partners.map((partner) => (
                <li key={partner.phoneHref}>
                  <p className="font-display text-xl text-ink-900">{partner.name}</p>
                  <p className="mt-0.5 text-xs tracking-wide text-ink-400">
                    {partner.role}
                  </p>
                  <a
                    href={`tel:${partner.phoneHref}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm text-ink-700 transition-colors hover:text-brass-600"
                  >
                    <i className="pi pi-phone text-[0.7rem] text-brass-600" aria-hidden="true" />
                    <span className="link-underline pb-0.5">{partner.phone}</span>
                  </a>
                </li>
              ))}
            </ul>

            <Link to="/about" className="mt-8 inline-block">
              <Button
                label="More about us"
                outlined
                className="!border-ink-900/20 !text-ink-900 hover:!bg-ink-900 hover:!text-sand-50 !px-6"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- testimonials */}
      <section className="border-y border-ink-900/8 bg-sand-100">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <Reveal>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-600">
              From the families
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-[clamp(1.9rem,4vw,3rem)] leading-[1.06]">
              What people say once the keys have changed hands
            </h2>
          </Reveal>

          <Reveal delay={140} className="mt-12">
            <Carousel
              value={[...testimonials]}
              numVisible={2}
              numScroll={1}
              circular
              autoplayInterval={6500}
              responsiveOptions={[
                { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
                { breakpoint: '768px', numVisible: 1, numScroll: 1 },
              ]}
              itemTemplate={(t: (typeof testimonials)[number]) => (
                <figure className="mx-2 flex h-full flex-col rounded-2xl border border-ink-900/8 bg-white p-8">
                  <i className="pi pi-comment text-lg text-brass-500" aria-hidden="true" />
                  <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-ink-800">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-ink-900/8 pt-6">
                    <img
                      src={t.photo}
                      alt=""
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-ink-900">{t.name}</p>
                      <p className="text-xs text-ink-400">{t.detail}</p>
                    </div>
                  </figcaption>
                </figure>
              )}
            />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- cta */}
      <section className="relative overflow-hidden bg-ink-900">
        <img
          src={properties[1].images[0]}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-sand-50">
              Tell us what home should feel like
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-sand-200/80">
              Send one message. We will come back within a working day with two or
              three homes worth your Sunday — or tell you honestly that we have
              nothing right now.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/contact">
                <Button
                  label="Start a conversation"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  className="!bg-brass-500 !border-brass-500 !text-ink-950 hover:!bg-brass-400 hover:!border-brass-400 hover:!text-ink-950 !px-8 !py-3.5"
                />
              </Link>
              <a href={`tel:${primary.phoneHref}`}>
                <Button
                  label={primary.phone}
                  icon="pi pi-phone"
                  outlined
                  className="!border-sand-50/35 !text-sand-50 hover:!bg-sand-50 hover:!text-ink-900 !px-8 !py-3.5"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <EnquiryDialog
        property={enquiry}
        visible={dialogOpen}
        onHide={() => setDialogOpen(false)}
      />
    </>
  )
}
