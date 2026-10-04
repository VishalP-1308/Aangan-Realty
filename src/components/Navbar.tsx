import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import { brand } from '../data/brand'
import { partners, primary, site } from '../data/site'

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  // Seeded lazily: a refresh partway down the page must not start transparent.
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Only the home hero sits under the bar; everywhere else it is solid at rest.
  const overHero = pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        overHero
          ? 'bg-transparent py-4'
          : 'bg-sand-50/85 backdrop-blur-xl py-2.5 shadow-[0_1px_0_0_rgb(11_13_15/0.08)]',
      ].join(' ')}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <img
            src={brand.logoRound}
            srcSet={`${brand.logoRoundSmall} 96w, ${brand.logoRound} 256w`}
            sizes="48px"
            alt=""
            width={48}
            height={48}
            className={`transition-all duration-500 ${
              overHero ? 'h-12 w-12' : 'h-10 w-10'
            }`}
          />
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-xl tracking-[0.08em] transition-colors sm:text-2xl ${
                overHero ? 'text-sand-50' : 'text-ink-900'
              }`}
            >
              AANGAN
            </span>
            <span
              className={`mt-1 text-[0.6rem] font-medium uppercase tracking-[0.42em] transition-colors ${
                overHero ? 'text-brass-300' : 'text-brass-600'
              }`}
            >
              Realty
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  [
                    'link-underline pb-1 text-sm tracking-wide transition-colors',
                    overHero
                      ? 'text-sand-100 hover:text-white'
                      : 'text-ink-600 hover:text-ink-900',
                    isActive ? (overHero ? 'text-white' : 'text-ink-900') : '',
                  ].join(' ')
                }
                data-active={pathname === l.to || undefined}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${primary.phoneHref}`}
            className={`hidden items-center gap-2 text-sm tracking-wide transition-colors lg:flex ${
              overHero
                ? 'text-sand-100 hover:text-brass-300'
                : 'text-ink-600 hover:text-brass-600'
            }`}
          >
            <i className="pi pi-phone text-xs" aria-hidden="true" />
            {primary.phone}
          </a>

          <Link to="/contact" className="hidden sm:block">
            <Button
              label="Book a viewing"
              className={
                overHero
                  ? '!bg-sand-50 !border-sand-50 !text-ink-900 hover:!bg-white hover:!border-white hover:!text-ink-900 !px-5 !py-2.5 !text-sm'
                  : '!px-5 !py-2.5 !text-sm'
              }
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors md:hidden ${
              overHero
                ? 'text-sand-50 hover:bg-white/15'
                : 'text-ink-900 hover:bg-ink-900/8'
            }`}
          >
            <i className="pi pi-bars text-lg" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Sidebar
        visible={menuOpen}
        position="right"
        onHide={() => setMenuOpen(false)}
        className="!w-[min(20rem,88vw)] !bg-sand-50"
        pt={{ header: { className: '!pb-2' } }}
      >
        <div className="flex items-center gap-3">
          <img src={brand.logoRoundSmall} alt="" width={40} height={40} className="h-10 w-10" />
          <span className="font-display text-lg tracking-[0.08em] text-ink-900">
            AANGAN REALTY
          </span>
        </div>

        <ul className="mt-8 space-y-1">
          {links.map((l, i) => (
            <li key={l.to} className="rise-in" style={{ animationDelay: `${i * 60}ms` }}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block border-b border-ink-900/8 py-4 font-display text-2xl transition-colors ${
                    isActive ? 'text-brass-600' : 'text-ink-900 hover:text-brass-600'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-10 space-y-4">
          {partners.map((partner) => (
            <a
              key={partner.phoneHref}
              className="flex items-center gap-3 text-sm text-ink-600 transition-colors hover:text-brass-600"
              href={`tel:${partner.phoneHref}`}
            >
              <i className="pi pi-phone text-xs text-brass-600" aria-hidden="true" />
              <span>
                <span className="block text-xs text-ink-400">{partner.name}</span>
                {partner.phone}
              </span>
            </a>
          ))}
          <a
            className="flex items-center gap-3 text-sm text-ink-600 transition-colors hover:text-brass-600"
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="pi pi-instagram text-xs text-brass-600" aria-hidden="true" />@
            {site.instagram}
          </a>
        </div>
      </Sidebar>
    </header>
  )
}
