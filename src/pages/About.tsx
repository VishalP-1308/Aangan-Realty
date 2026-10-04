import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import Reveal from '../components/Reveal'
import { brand } from '../data/brand'
import { partners, site, values } from '../data/site'
import { properties } from '../data/properties'
import { whatsappLink } from '../lib/enquiry'

const commitments = [
  {
    icon: 'pi-exclamation-circle',
    title: 'We tell you the flaws',
    body: 'Every listing on this site has something wrong with it — a hot west bedroom, a tight approach road, a society that argues. You will hear it from us before you hear it from a neighbour.',
  },
  {
    icon: 'pi-file-check',
    title: 'Documents before deposits',
    body: 'Title chain, encumbrance certificate, society NOC, approved plans. All of it on the table before anyone talks about a token amount.',
  },
  {
    icon: 'pi-users',
    title: 'One file, one person',
    body: 'The partner who shows you the home is the one who negotiates it and sits with you at the sub-registrar. Nothing gets handed off halfway.',
  },
  {
    icon: 'pi-lock',
    title: 'Your details stay here',
    body: 'We do not sell enquiry data to builders, and we do not put you on a broadcast list. One enquiry gets you one conversation.',
  },
]

export default function About() {
  return (
    <>
      <header className="bg-ink-950 pb-20 pt-36 text-sand-50 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-400">
            About us
          </p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02]">
            An aangan is the part of the house everything else opens onto
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-sand-200/75 sm:text-lg">
            We took the name because it describes what we look for in a home:
            somewhere with a centre to it. Light, air, and a room the family
            actually gathers in.
          </p>
        </div>
      </header>

      {/* story */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={properties[1].images[0]}
                alt={`${properties[1].title}, represented by Aangan Realty`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-600">
              {site.tagline}
            </p>
            <h2 className="mt-4 text-balance text-[clamp(1.85rem,3.6vw,2.75rem)] leading-[1.08]">
              We started because the alternative was exhausting
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-600">
              <p>
                The usual way to buy a home here is to call eleven numbers off a
                portal, be shown six flats that do not match the brief, and discover
                the good one was sold three weeks ago. We built the opposite of that.
              </p>
              <p>
                We carry nine or ten listings at a time. Each is visited, measured
                and photographed by us, the title is read before it goes up, and we
                turn down more mandates than we accept — usually because the pricing
                is not honest or the paperwork is not clean.
              </p>
              <p>
                It is a slower business model. It also means that when we call you
                about a home, it is worth answering.
              </p>
            </div>

            <dl className="mt-12 grid gap-8 border-t border-ink-900/10 pt-10 sm:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 90}>
                  <dt className="flex items-center gap-2.5 font-display text-xl text-ink-900">
                    <i
                      className={`pi ${v.icon} text-sm text-brass-600`}
                      aria-hidden="true"
                    />
                    {v.title}
                  </dt>
                  <dd className="mt-2 text-xs leading-relaxed text-ink-400">
                    {v.body}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* where we work */}
      <section className="border-y border-ink-900/8 bg-sand-100">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-600">
              Where we work
            </p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-ink-900/10 sm:grid-cols-3">
              {site.cities.map((c) => (
                <div key={c.name} className="bg-sand-100 px-7 py-8">
                  <p className="font-display text-3xl text-ink-900">{c.name}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-brass-600">
                    {c.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-600">
              Ahmedabad is where we live and where most of our stock sits. We take
              select mandates in Surat and Vadodara where we know the micro-market
              well enough to be useful — and say so plainly when we do not.
            </p>
          </Reveal>
        </div>
      </section>

      {/* commitments */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-600">
            How we behave
          </p>
          <h2 className="mt-4 text-balance text-[clamp(1.9rem,4vw,3rem)] leading-[1.06]">
            Four things we will not trade away for a commission
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {commitments.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 120}>
              <div className="group h-full rounded-2xl border border-ink-900/8 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-sand-100 text-brass-600 transition-colors duration-500 group-hover:bg-brass-500 group-hover:text-ink-950">
                  <i className={`pi ${v.icon}`} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* partners */}
      <section className="border-t border-ink-900/8 bg-sand-100">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-600">
              The whole firm
            </p>
            <h2 className="mt-4 text-balance text-[clamp(1.9rem,4vw,3rem)] leading-[1.06]">
              Two people. That is not a humblebrag, it is the design
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {partners.map((m, i) => (
              <Reveal key={m.phoneHref} delay={i * 120}>
                <div className="flex h-full flex-col rounded-2xl border border-ink-900/8 bg-white p-8">
                  <img
                    src={brand.logoRound}
                    alt=""
                    width={72}
                    height={72}
                    loading="lazy"
                    className="h-18 w-18"
                  />
                  <p className="mt-6 font-display text-2xl text-ink-900">{m.name}</p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-brass-600">
                    {m.role}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-ink-900/8 pt-6">
                    <a href={`tel:${m.phoneHref}`}>
                      <Button
                        label={m.phone}
                        icon="pi pi-phone"
                        outlined
                        className="!border-ink-900/20 !px-5 !py-2.5 !text-sm !text-ink-900 hover:!bg-ink-900 hover:!text-sand-50"
                      />
                    </a>
                    <a
                      href={whatsappLink(undefined, m)}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Button
                        label="WhatsApp"
                        icon="pi pi-whatsapp"
                        text
                        className="!px-3 !text-sm !text-ink-600 hover:!bg-transparent hover:!text-brass-600"
                      />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="bg-ink-950">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] text-sand-50">
              Come and see what we are holding
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-sand-200/75">
              {properties.length} homes and projects on the list. Twenty minutes on the phone will tell
              us whether any of them are for you.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/properties">
                <Button
                  label="Browse properties"
                  className="!border-brass-500 !bg-brass-500 !px-8 !py-3.5 !text-ink-950 hover:!border-brass-400 hover:!bg-brass-400 hover:!text-ink-950"
                />
              </Link>
              <Link to="/contact">
                <Button
                  label="Talk to us"
                  outlined
                  className="!border-sand-50/35 !px-8 !py-3.5 !text-sand-50 hover:!bg-sand-50 hover:!text-ink-900"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
