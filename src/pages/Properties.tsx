import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { SelectButton } from 'primereact/selectbutton'
import { Sidebar } from 'primereact/sidebar'
import { Slider } from 'primereact/slider'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import { EnquiryDialog } from '../components/Enquiry'
import {
  cities,
  formatPrice,
  properties,
  PROPERTY_TYPES,
  sortValue,
  STATUSES,
  type Property,
} from '../data/properties'

const MAX_BUDGET = 100000000 // ₹10 Cr — above the top of current stock

const sorts = [
  { label: 'Featured first', value: 'featured' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Largest area', value: 'area-desc' },
] as const

type SortKey = (typeof sorts)[number]['value']

type Filters = {
  q: string
  type: string
  status: string
  city: string
  beds: number | null
  range: [number, number]
  sort: SortKey
}

const anyOption = (label: string) => ({ label, value: '' })

export default function Properties() {
  const [params, setParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [enquiry, setEnquiry] = useState<Property | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)

  // URL is the source of truth on first paint so links like
  // /properties?status=For+Rent land pre-filtered.
  const [filters, setFilters] = useState<Filters>(() => ({
    q: params.get('q') ?? '',
    type: params.get('type') ?? '',
    status: params.get('status') ?? '',
    city: params.get('city') ?? '',
    beds: params.get('beds') ? Number(params.get('beds')) : null,
    range: [
      Number(params.get('min') ?? 0),
      Number(params.get('max') ?? MAX_BUDGET),
    ],
    sort: 'featured',
  }))

  useEffect(() => {
    const next = new URLSearchParams()
    if (filters.q) next.set('q', filters.q)
    if (filters.type) next.set('type', filters.type)
    if (filters.status) next.set('status', filters.status)
    if (filters.city) next.set('city', filters.city)
    if (filters.beds) next.set('beds', String(filters.beds))
    if (filters.range[0] > 0) next.set('min', String(filters.range[0]))
    if (filters.range[1] < MAX_BUDGET) next.set('max', String(filters.range[1]))
    setParams(next, { replace: true })
  }, [filters, setParams])

  const results = useMemo(() => {
    const needle = filters.q.trim().toLowerCase()

    const matched = properties.filter((p) => {
      if (filters.type && p.type !== filters.type) return false
      if (filters.status && p.status !== filters.status) return false
      if (filters.city && p.city !== filters.city) return false
      if (filters.beds && p.beds < filters.beds) return false

      // Rentals are compared on annualised value so one slider covers both.
      const value = sortValue(p)
      if (value < filters.range[0] || value > filters.range[1]) return false

      if (!needle) return true
      return [p.title, p.locality, p.city, p.type, p.summary]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })

    const sorted = [...matched]
    switch (filters.sort) {
      case 'price-asc':
        return sorted.sort((a, b) => sortValue(a) - sortValue(b))
      case 'price-desc':
        return sorted.sort((a, b) => sortValue(b) - sortValue(a))
      case 'area-desc':
        return sorted.sort((a, b) => b.area - a.area)
      default:
        return sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
    }
  }, [filters])

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }))

  const activeCount = [
    filters.q,
    filters.type,
    filters.status,
    filters.city,
    filters.beds,
    filters.range[0] > 0 || filters.range[1] < MAX_BUDGET ? 'range' : '',
  ].filter(Boolean).length

  const reset = () =>
    setFilters({
      q: '',
      type: '',
      status: '',
      city: '',
      beds: null,
      range: [0, MAX_BUDGET],
      sort: filters.sort,
    })

  const panel = (
    <div className="space-y-8">
      <div>
        <Label>Search</Label>
        <InputText
          value={filters.q}
          onChange={(e) => set('q', e.target.value)}
          placeholder="Locality, city, building"
          aria-label="Search properties"
          className="w-full"
        />
      </div>

      <div>
        <Label>Listing type</Label>
        <Dropdown
          value={filters.status}
          onChange={(e) => set('status', e.value)}
          options={[
            anyOption('Any listing'),
            ...STATUSES.map((s) => ({ label: s, value: s })),
          ]}
          className="w-full"
        />
      </div>

      <div>
        <Label>Property type</Label>
        <Dropdown
          value={filters.type}
          onChange={(e) => set('type', e.value)}
          options={[
            anyOption('Any type'),
            ...PROPERTY_TYPES.map((t) => ({ label: t, value: t })),
          ]}
          className="w-full"
        />
      </div>

      <div>
        <Label>City</Label>
        <Dropdown
          value={filters.city}
          onChange={(e) => set('city', e.value)}
          options={[anyOption('All cities'), ...cities.map((c) => ({ label: c, value: c }))]}
          className="w-full"
        />
      </div>

      <div>
        <Label>Bedrooms, minimum</Label>
        <SelectButton
          value={filters.beds}
          onChange={(e) => set('beds', e.value)}
          options={[
            { label: 'Any', value: null },
            { label: '2+', value: 2 },
            { label: '3+', value: 3 },
            { label: '4+', value: 4 },
            { label: '5+', value: 5 },
          ]}
          allowEmpty={false}
          pt={{ button: { className: 'text-xs px-3 py-2' } }}
        />
      </div>

      <div>
        <Label>Budget</Label>
        <p className="mb-4 font-display text-lg text-ink-900">
          {formatPrice(filters.range[0])} — {formatPrice(filters.range[1])}
          {filters.range[1] >= MAX_BUDGET && '+'}
        </p>
        <Slider
          value={filters.range}
          onChange={(e) => set('range', e.value as [number, number])}
          range
          min={0}
          max={MAX_BUDGET}
          step={2500000}
        />
        <p className="mt-3 text-xs leading-relaxed text-ink-400">
          Rentals are matched on annualised rent, so one range covers both sale
          and lease listings.
        </p>
      </div>

      {activeCount > 0 && (
        <Button
          label="Clear filters"
          icon="pi pi-times"
          text
          onClick={reset}
          className="!px-0 !text-ink-600 hover:!bg-transparent hover:!text-brass-600"
        />
      )}
    </div>
  )

  return (
    <>
      {/* page head */}
      <header className="bg-ink-950 pb-16 pt-36 text-sand-50 sm:pb-20 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-400">
            The list
          </p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02]">
            Every home we currently represent
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sand-200/75">
            {properties.length} listings across Ahmedabad — resale homes and new
            projects we represent directly. No syndicated feeds, no stale
            inventory.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="lg:grid lg:grid-cols-[17rem_1fr] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28">{panel}</div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-900/8 pb-5">
              <p className="text-sm text-ink-600">
                <span className="font-display text-2xl text-ink-900">
                  {results.length}
                </span>{' '}
                {results.length === 1 ? 'home' : 'homes'}
                {activeCount > 0 && ' matching your filters'}
              </p>

              <div className="flex items-center gap-3">
                <Button
                  label="Filters"
                  icon="pi pi-sliders-h"
                  outlined
                  onClick={() => setDrawerOpen(true)}
                  badge={activeCount ? String(activeCount) : undefined}
                  className="!border-ink-900/20 !text-ink-900 lg:!hidden"
                />
                <Dropdown
                  value={filters.sort}
                  onChange={(e) => set('sort', e.value)}
                  options={[...sorts]}
                  aria-label="Sort results"
                  className="!text-sm"
                />
              </div>
            </div>

            {results.length > 0 ? (
              <div className="mt-9 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p, i) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    index={i}
                    onEnquire={(prop) => {
                      setEnquiry(prop)
                      setDialogOpen(true)
                    }}
                  />
                ))}
              </div>
            ) : (
              <Reveal className="mt-9">
                <div className="rounded-2xl border border-dashed border-ink-900/15 bg-sand-100 px-8 py-20 text-center">
                  <i className="pi pi-search text-2xl text-brass-600" aria-hidden="true" />
                  <h2 className="mt-5 font-display text-2xl">Nothing matches that yet</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">
                    We carry a deliberately short list, so gaps are normal. Tell us
                    what you are after and we will call when something lands.
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Button label="Clear filters" outlined onClick={reset} className="!border-ink-900/20 !text-ink-900" />
                    <Button
                      label="Register a requirement"
                      onClick={() => {
                        setEnquiry(undefined)
                        setDialogOpen(true)
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      <Sidebar
        visible={drawerOpen}
        position="bottom"
        onHide={() => setDrawerOpen(false)}
        className="!h-[88svh] !rounded-t-2xl !bg-sand-50 lg:!hidden"
        header={<span className="font-display text-xl">Filters</span>}
      >
        <div className="pb-10">{panel}</div>
        <div className="sticky bottom-0 -mx-4 border-t border-ink-900/10 bg-sand-50 px-4 py-4">
          <Button
            label={`Show ${results.length} ${results.length === 1 ? 'home' : 'homes'}`}
            onClick={() => setDrawerOpen(false)}
            className="w-full !py-3"
          />
        </div>
      </Sidebar>

      <EnquiryDialog
        property={enquiry}
        visible={dialogOpen}
        onHide={() => setDialogOpen(false)}
      />
    </>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink-600">
      {children}
    </p>
  )
}
