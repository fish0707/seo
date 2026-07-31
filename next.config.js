/** @type {import('next').NextConfig} */

// Legacy /convert/<from>-to-<to> pages were removed (they were 112 template-
// generated pages that AdSense flagged as low-value content). Redirect each to
// its parent converter tool so previously indexed URLs do not 404.
// This map is frozen: it only needs to cover the units those pages used.
const LEGACY_CONVERT_UNITS = {
  'length-converter': ['mm', 'cm', 'meters', 'km', 'inches', 'feet', 'yards', 'miles'],
  'weight-converter': ['mg', 'grams', 'kg', 'ounces', 'lbs', 'stone'],
  'speed-converter': ['kmh', 'mph', 'meters-per-second', 'feet-per-second', 'knots'],
  'temperature-converter': ['celsius', 'fahrenheit', 'kelvin'],
}

const legacyConvertRedirects = () =>
  Object.entries(LEGACY_CONVERT_UNITS).flatMap(([tool, units]) =>
    units.flatMap(from =>
      units
        .filter(to => to !== from)
        .map(to => ({
          source: `/convert/${from}-to-${to}`,
          destination: `/${tool}`,
          permanent: true,
        })),
    ),
  )

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      ...legacyConvertRedirects(),
      { source: '/convert', destination: '/', permanent: true },
    ]
  },
}

module.exports = nextConfig
