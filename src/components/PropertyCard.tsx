import { Link } from 'react-router-dom'
import { Tag } from 'primereact/tag'
import { displayPrice, type Property } from '../data/properties'
import Reveal from './Reveal'

const statusTone: Record<Property['status'], string> = {
  'For Sale': 'bg-ink-950/80 text-sand-50',
  'For Rent': 'bg-brass-500/90 text-ink-950',
  'New Launch': 'bg-sand-50/90 text-ink-900',
}

type Props = {
  property: Property
  /** stagger index within a grid */
  index?: number
  onEnquire?: (p: Property) => void
}

export default function PropertyCard({ property: p, index = 0, onEnquire }: Props) {
  const specs = [
    p.beds > 0 && { icon: 'pi-home', text: `${p.beds} Bed` },
    p.baths > 0 && { icon: 'pi-inbox', text: `${p.baths} Bath` },
    p.area > 0 && { icon: 'pi-arrows-alt', text: `${p.area.toLocaleString('en-IN')} sq.ft.` },
  ].filter(Boolean) as { icon: string; text: string }[]

  return (
    <Reveal as="article" delay={(index % 3) * 110} className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-900/15 hover:shadow-[var(--shadow-lift)]">
        <Link
          to={`/property/${p.slug}`}
          className="relative block aspect-[4/3] overflow-hidden bg-sand-200"
          aria-label={`View ${p.title}`}
        >
          <img
            src={p.images[0]}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-107"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-ink-950/5 to-transparent" />

          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] backdrop-blur ${
              statusTone[p.status]
            }`}
          >
            {p.status}
          </span>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <span className="font-display text-2xl text-sand-50 drop-shadow-sm">
              {displayPrice(p)}
            </span>
            <span className="translate-y-2 text-[0.68rem] uppercase tracking-[0.18em] text-sand-100 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {p.images.length} photos
            </span>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-brass-600">
            <i className="pi pi-map-marker text-[0.65rem]" aria-hidden="true" />
            {p.locality}, {p.city}
          </p>

          <h3 className="mt-2.5 font-display text-xl leading-snug text-ink-900">
            <Link
              to={`/property/${p.slug}`}
              className="link-underline transition-colors hover:text-brass-600"
            >
              {p.title}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-600">
            {p.summary}
          </p>

          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink-900/8 pt-5 text-xs text-ink-600">
            {specs.map((s) => (
              <li key={s.text} className="flex items-center gap-1.5">
                <i className={`pi ${s.icon} text-[0.7rem] text-brass-600`} aria-hidden="true" />
                {s.text}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between gap-3 pt-1">
            <Link
              to={`/property/${p.slug}`}
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-ink-900"
            >
              <span className="link-underline pb-0.5">View details</span>
              <i
                className="pi pi-arrow-right text-[0.7rem] transition-transform duration-300 group-hover/link:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            {onEnquire && (
              <button
                type="button"
                onClick={() => onEnquire(p)}
                className="rounded-full border border-ink-900/12 px-4 py-2 text-xs font-medium tracking-wide text-ink-700 transition-all duration-300 hover:border-brass-500 hover:bg-brass-500 hover:text-ink-950"
              >
                I'm interested
              </button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/** Compact variant used in the "similar homes" rail on a detail page. */
export function PropertyCardMini({ property: p }: { property: Property }) {
  return (
    <Link
      to={`/property/${p.slug}`}
      className="group flex gap-4 rounded-xl border border-ink-900/8 bg-white p-3 transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
    >
      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-sand-200">
        <img
          src={p.images[0]}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="min-w-0 py-0.5">
        <p className="text-[0.62rem] uppercase tracking-[0.16em] text-brass-600">
          {p.locality}
        </p>
        <p className="mt-1 truncate font-display text-base text-ink-900">{p.title}</p>
        <p className="mt-1 text-sm text-ink-600">{displayPrice(p)}</p>
      </div>
      <Tag
        value={p.status}
        className="ml-auto !hidden self-start !bg-sand-100 !text-[0.6rem] !text-ink-600 sm:!inline-flex"
      />
    </Link>
  )
}
