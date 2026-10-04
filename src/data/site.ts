export type Partner = {
  name: string
  role: string
  phone: string
  /** unformatted, for tel: links */
  phoneHref: string
  /** country code + number, for wa.me links */
  whatsapp: string
}

export const partners: Partner[] = [
  {
    name: 'Mohit Patel',
    role: 'Partner',
    phone: '+91 94286 62009',
    phoneHref: '+919428662009',
    whatsapp: '919428662009',
  },
  {
    name: 'Vishal Patel',
    role: 'Partner',
    phone: '+91 96646 44295',
    phoneHref: '+919664644295',
    whatsapp: '919664644295',
  },
]

/** Default contact for site-wide calls to action. */
export const primary = partners[0]

export const site = {
  name: 'Aangan Realty',
  tagline: 'Your space. Your story.',
  promise: "Let's build your tomorrow, together.",
  instagram: 'aanganrealestate',
  instagramUrl: 'https://instagram.com/aanganrealestate',
  /**
   * No public email address has been supplied, so enquiries fall back to
   * WhatsApp rather than a guessed mailbox. Set this once a real inbox exists
   * and the enquiry form will offer it too.
   */
  email: null as string | null,
  office: {
    city: 'Ahmedabad',
    state: 'Gujarat',
    hours: 'Mon–Sat · 10:00–19:00 IST',
  },
  /** Where we actually work, in order of depth. */
  cities: [
    { name: 'Ahmedabad', note: 'Home ground' },
    { name: 'Surat', note: 'Select mandates' },
    { name: 'Vadodara', note: 'Select mandates' },
  ],
} as const

/** The three words on the brand card — used as the site's promise band. */
export const values = [
  {
    icon: 'pi-shield',
    title: 'Trust',
    body: 'We only list what we have walked ourselves, and we say what is wrong with a home before you find it out on your own.',
  },
  {
    icon: 'pi-eye',
    title: 'Transparency',
    body: 'Pricing, paperwork and our own fee are on the table from the first conversation. Nothing appears at the last minute.',
  },
  {
    icon: 'pi-verified',
    title: 'Commitment',
    body: 'One of us owns your file from the first viewing to the day the keys change hands. No handing you to a junior halfway.',
  },
]

export const testimonials = [
  {
    quote:
      'We saw nine homes in two days, and Mohit talked us out of six of them. That is the part you do not get from a listing portal.',
    name: 'Aditya & Nandini Rao',
    detail: 'Bought in Bodakdev',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'The title check turned up an unreleased mortgage the seller had not mentioned. They renegotiated and we closed ₹11 lakh lower.',
    name: 'Farhan Qureshi',
    detail: 'Bought in Vesu, Surat',
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'I was relocating from Singapore and did the whole purchase remotely. Video walkthroughs, every document scanned, no surprises at handover.',
    name: 'Meera Sundaram',
    detail: 'Bought in Alkapuri, Vadodara',
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'They sold our Prahladnagar flat in 31 days, above what two other brokers told us it was worth. The styling advice alone paid for the fee.',
    name: 'Kunal Desai',
    detail: 'Sold in Prahladnagar',
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
] as const
