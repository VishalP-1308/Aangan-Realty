/**
 * Brand artwork, kept apart from site.ts so the data modules stay importable
 * outside a bundler (the self-check runs them under plain Node).
 * Regenerate these files with `npm run images`.
 */
import contactCard from '../assets/brand/contact-card.webp'
import logoFull from '../assets/brand/logo-full.webp'
import logoRound from '../assets/brand/logo-round-256.webp'
import logoRoundSmall from '../assets/brand/logo-round-96.webp'

export const brand = { logoRound, logoRoundSmall, logoFull, contactCard }
