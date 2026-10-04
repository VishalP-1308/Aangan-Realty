/**
 * Smallest thing that fails if the money maths, the lead validation or the
 * listing filters break. Run with `npm test`.
 */
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  displayPrice,
  formatPrice,
  properties,
  sortValue,
  type Property,
} from '../data/properties.ts'
import { validate, type Enquiry } from './enquiry.ts'

// ---------------------------------------------------------------- money
assert.equal(formatPrice(47500000), '₹4.75 Cr')
assert.equal(formatPrice(72000000), '₹7.2 Cr')
assert.equal(formatPrice(10000000), '₹1 Cr')
assert.equal(formatPrice(9900000), '₹99 L')
assert.equal(formatPrice(145000), '₹1.45 L')
assert.equal(formatPrice(4200), '₹4,200')

// No rentals in stock right now, so the lease maths runs on a fixture.
const rental: Property = { ...properties[0], price: 0, rent: 95000 }
assert.ok(displayPrice(rental).endsWith('/mo'), 'rentals must read as monthly')
assert.equal(displayPrice({ ...properties[0], price: 0, rent: null }), 'Price on request')
assert.equal(
  displayPrice({ ...properties[0], price: 6400000, priceFrom: true }),
  'From ₹64 L',
)
assert.equal(
  sortValue(rental),
  rental.rent! * 12,
  'rentals sort on annualised rent',
)

const sale = properties.find((p) => !p.rent)!
assert.equal(sortValue(sale), sale.price)

// ------------------------------------------------------------- listings
assert.ok(properties.length > 0)
assert.equal(
  new Set(properties.map((p) => p.slug)).size,
  properties.length,
  'slugs are the route key — they must be unique',
)
for (const p of properties) {
  assert.ok(p.images.length >= 3, `${p.slug} needs a real gallery`)
  assert.ok(p.area >= 0, `${p.slug} has a negative area`)
  assert.ok(
    !(p.rent && p.price),
    `${p.slug} must be priced as either a sale or a lease, not both`,
  )
  // Galleries come from `npm run images`; a wrong count means a broken image.
  for (const src of p.images) {
    assert.ok(existsSync(fileURLToPath(src)), `${p.slug}: missing ${src}`)
  }
}

// -------------------------------------------------------------- filters
// Mirrors the predicate in pages/Properties.tsx: a budget window on
// annualised value has to catch sale and lease stock alike.
const within = (p: Property, min: number, max: number) => {
  const v = sortValue(p)
  return v >= min && v <= max
}
assert.ok(within(rental, 0, 100000000))
assert.ok(!within(sale, 0, 1000))

// ------------------------------------------------------------ enquiries
const ok: Enquiry = {
  name: 'Rohan Shah',
  email: 'rohan@example.com',
  phone: '+91 98250 41200',
  message: 'Looking in Bodakdev.',
}
assert.deepEqual(validate(ok), {}, 'a good lead must pass')

assert.ok(validate({ ...ok, name: 'R' }).name)
assert.ok(validate({ ...ok, email: 'rohan@' }).email, 'a malformed email is still rejected')
assert.deepEqual(
  validate({ ...ok, email: '' }),
  {},
  'email is optional — phone is how we reach people here',
)
assert.ok(validate({ ...ok, phone: '9825' }).phone, 'short numbers rejected')
assert.ok(
  !validate({ ...ok, phone: '98250-41200' }).phone,
  'punctuation in a valid number must not reject the lead',
)
assert.ok(validate({ ...ok, message: 'x'.repeat(2001) }).message)
assert.deepEqual(validate({ ...ok, message: '' }), {}, 'message is optional')

console.log('selfcheck: all assertions passed')
