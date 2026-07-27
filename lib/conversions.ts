// ── Central unit-conversion data ──
// Single source of truth for the four converter tools and the
// programmatic /convert/[slug] long-tail pages.

export type CategoryKey = 'length' | 'weight' | 'speed' | 'temperature'

export type ConvUnit = {
  slug: string // URL fragment, globally unique across categories
  name: string // singular display name, e.g. 'Centimeter'
  plural: string // 'centimeters'
  titleName: string // form used in page titles/H1s, e.g. 'CM'
  symbol: string // 'cm'
  factor?: number // linear units: size of 1 unit in the category base unit
  toBase: (v: number) => number
  fromBase: (v: number) => number
  tableValues?: number[] // per-unit override for the conversion table
}

const lin = (
  slug: string,
  name: string,
  plural: string,
  titleName: string,
  symbol: string,
  factor: number,
): ConvUnit => ({
  slug,
  name,
  plural,
  titleName,
  symbol,
  factor,
  toBase: v => v * factor,
  fromBase: v => v / factor,
})

export type ConvCategory = {
  key: CategoryKey
  name: string
  toolSlug: string // the parent tool page, e.g. 'length-converter'
  toolName: string
  exampleValue: number // used in worked examples
  tableValues: number[]
  units: ConvUnit[]
}

export const CATEGORIES: ConvCategory[] = [
  {
    key: 'length',
    name: 'Length',
    toolSlug: 'length-converter',
    toolName: 'Length Converter',
    exampleValue: 5,
    tableValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 75, 100, 250, 500, 1000],
    units: [
      lin('mm', 'Millimeter', 'millimeters', 'MM', 'mm', 0.001),
      lin('cm', 'Centimeter', 'centimeters', 'CM', 'cm', 0.01),
      lin('meters', 'Meter', 'meters', 'Meters', 'm', 1),
      lin('km', 'Kilometer', 'kilometers', 'KM', 'km', 1000),
      lin('inches', 'Inch', 'inches', 'Inches', 'in', 0.0254),
      lin('feet', 'Foot', 'feet', 'Feet', 'ft', 0.3048),
      lin('yards', 'Yard', 'yards', 'Yards', 'yd', 0.9144),
      lin('miles', 'Mile', 'miles', 'Miles', 'mi', 1609.344),
    ],
  },
  {
    key: 'weight',
    name: 'Weight',
    toolSlug: 'weight-converter',
    toolName: 'Weight Converter',
    exampleValue: 5,
    tableValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 75, 100, 250, 500, 1000],
    units: [
      lin('mg', 'Milligram', 'milligrams', 'MG', 'mg', 0.001),
      lin('grams', 'Gram', 'grams', 'Grams', 'g', 1),
      lin('kg', 'Kilogram', 'kilograms', 'KG', 'kg', 1000),
      lin('ounces', 'Ounce', 'ounces', 'Ounces', 'oz', 28.349523125),
      lin('lbs', 'Pound', 'pounds', 'Lbs', 'lb', 453.59237),
      lin('stone', 'Stone', 'stones', 'Stone', 'st', 6350.29318),
    ],
  },
  {
    key: 'speed',
    name: 'Speed',
    toolSlug: 'speed-converter',
    toolName: 'Speed Converter',
    exampleValue: 100,
    tableValues: [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 150, 200, 300],
    units: [
      lin('kmh', 'Kilometer per hour', 'kilometers per hour', 'KM/H', 'km/h', 0.2777777777777778),
      lin('mph', 'Mile per hour', 'miles per hour', 'MPH', 'mph', 0.44704),
      lin('meters-per-second', 'Meter per second', 'meters per second', 'Meters per Second', 'm/s', 1),
      lin('feet-per-second', 'Foot per second', 'feet per second', 'Feet per Second', 'ft/s', 0.3048),
      lin('knots', 'Knot', 'knots', 'Knots', 'kn', 0.5144444444444444),
    ],
  },
  {
    key: 'temperature',
    name: 'Temperature',
    toolSlug: 'temperature-converter',
    toolName: 'Temperature Converter',
    exampleValue: 25,
    tableValues: [-40, -30, -20, -10, 0, 5, 10, 15, 20, 25, 30, 35, 37, 40, 50, 60, 70, 80, 90, 100, 150, 200],
    units: [
      {
        slug: 'celsius', name: 'Celsius', plural: 'degrees Celsius', titleName: 'Celsius', symbol: '°C',
        toBase: v => v, fromBase: v => v,
      },
      {
        slug: 'fahrenheit', name: 'Fahrenheit', plural: 'degrees Fahrenheit', titleName: 'Fahrenheit', symbol: '°F',
        toBase: v => ((v - 32) * 5) / 9, fromBase: v => (v * 9) / 5 + 32,
      },
      {
        slug: 'kelvin', name: 'Kelvin', plural: 'kelvins', titleName: 'Kelvin', symbol: 'K',
        toBase: v => v - 273.15, fromBase: v => v + 273.15,
        tableValues: [0, 50, 100, 150, 200, 250, 273.15, 280, 290, 293.15, 300, 310, 320, 350, 373.15, 400, 500, 750, 1000],
      },
    ],
  },
]

export const getCategory = (key: CategoryKey) => CATEGORIES.find(c => c.key === key)!

export type ConvPair = { slug: string; category: ConvCategory; from: ConvUnit; to: ConvUnit }

export const CONVERSION_PAIRS: ConvPair[] = CATEGORIES.flatMap(category =>
  category.units.flatMap(from =>
    category.units
      .filter(to => to !== from)
      .map(to => ({ slug: `${from.slug}-to-${to.slug}`, category, from, to })),
  ),
)

export const getPair = (slug: string) => CONVERSION_PAIRS.find(p => p.slug === slug)

export const reversePair = (p: ConvPair) => getPair(`${p.to.slug}-to-${p.from.slug}`)!

export const convert = (v: number, from: ConvUnit, to: ConvUnit) => to.fromBase(from.toBase(v))

// Linear conversion factor from → to (null for temperature).
export const linearFactor = (p: ConvPair) =>
  p.from.factor != null && p.to.factor != null ? p.from.factor / p.to.factor : null

const TEMP_FORMULAS: Record<string, string> = {
  'celsius-to-fahrenheit': '°F = °C × 9/5 + 32',
  'fahrenheit-to-celsius': '°C = (°F − 32) × 5/9',
  'celsius-to-kelvin': 'K = °C + 273.15',
  'kelvin-to-celsius': '°C = K − 273.15',
  'fahrenheit-to-kelvin': 'K = (°F − 32) × 5/9 + 273.15',
  'kelvin-to-fahrenheit': '°F = (K − 273.15) × 9/5 + 32',
}

export const pairFormula = (p: ConvPair) => {
  const f = linearFactor(p)
  return f != null ? `${p.to.symbol} = ${p.from.symbol} × ${fmtConv(f)}` : TEMP_FORMULAS[p.slug]
}

export const pairH1 = (p: ConvPair) => `${p.from.titleName} to ${p.to.titleName} Converter`

export const fmtConv = (n: number) => {
  if (!Number.isFinite(n)) return '—'
  if (n !== 0 && (Math.abs(n) < 1e-6 || Math.abs(n) >= 1e15)) return n.toExponential(6)
  return n.toLocaleString('en-US', { maximumSignificantDigits: 7 })
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const unitLabel = (u: ConvUnit) => `${capitalize(u.plural)} (${u.symbol})`

// Hand-picked high-search-volume pairs, used for internal linking.
export const POPULAR_SLUGS: Record<CategoryKey, string[]> = {
  length: [
    'cm-to-inches', 'inches-to-cm', 'meters-to-feet', 'feet-to-meters',
    'km-to-miles', 'miles-to-km', 'mm-to-inches', 'inches-to-mm',
    'yards-to-meters', 'cm-to-feet',
  ],
  weight: [
    'kg-to-lbs', 'lbs-to-kg', 'grams-to-ounces', 'ounces-to-grams',
    'stone-to-kg', 'kg-to-stone', 'lbs-to-stone', 'mg-to-grams',
  ],
  speed: [
    'kmh-to-mph', 'mph-to-kmh', 'meters-per-second-to-kmh', 'kmh-to-meters-per-second',
    'knots-to-mph', 'mph-to-knots', 'knots-to-kmh', 'feet-per-second-to-mph',
  ],
  temperature: [
    'celsius-to-fahrenheit', 'fahrenheit-to-celsius', 'celsius-to-kelvin',
    'kelvin-to-celsius', 'fahrenheit-to-kelvin', 'kelvin-to-fahrenheit',
  ],
}

export const popularPairsFor = (key: CategoryKey) =>
  POPULAR_SLUGS[key].map(s => getPair(s)!).filter(Boolean)

// All pairs in a category, and all pairs sharing a source unit. Used to build a
// dense internal-link mesh so every pair page has several contextual entry
// points rather than depending on the hub alone.
export const pairsForCategory = (key: CategoryKey) =>
  CONVERSION_PAIRS.filter(p => p.category.key === key)

export const pairsFromUnit = (key: CategoryKey, unitSlug: string) =>
  CONVERSION_PAIRS.filter(p => p.category.key === key && p.from.slug === unitSlug)
