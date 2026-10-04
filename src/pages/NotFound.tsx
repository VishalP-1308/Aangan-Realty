import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { heroImage } from '../data/properties'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink-950">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-xl px-5 py-32 text-center sm:px-8">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brass-400">
          404
        </p>
        <h1 className="mt-5 text-balance font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-sand-50">
          This door does not open
        </h1>
        <p className="mt-5 text-base leading-relaxed text-sand-200/75">
          The page you were after has moved or the listing has been taken off the
          market. The rest of the list is still here.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/properties">
            <Button
              label="Browse properties"
              className="!bg-brass-500 !border-brass-500 !text-ink-950 hover:!bg-brass-400 hover:!border-brass-400 hover:!text-ink-950 !px-7 !py-3"
            />
          </Link>
          <Link to="/">
            <Button
              label="Back home"
              outlined
              className="!border-sand-50/35 !text-sand-50 hover:!bg-sand-50 hover:!text-ink-900 !px-7 !py-3"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
