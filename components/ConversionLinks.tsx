import Link from 'next/link'
import { getCategory, pairsFromUnit, convert, fmtConv, type CategoryKey, type ConvPair } from '@/lib/conversions'

export function PairLink({ pair }: { pair: ConvPair }) {
  return (
    <Link
      href={`/convert/${pair.slug}`}
      className="px-3 py-2 rounded-lg border border-line hover:border-brand hover:bg-surface transition-colors text-sm"
    >
      <span className="font-medium text-ink">{pair.from.titleName} to {pair.to.titleName}</span>
      <span className="text-muted block text-xs mt-0.5">
        1 {pair.from.symbol} = {fmtConv(convert(1, pair.from, pair.to))} {pair.to.symbol}
      </span>
    </Link>
  )
}

// Every pair in a category, grouped by source unit. Rendering the full set
// (rather than a hand-picked "popular" subset) gives each long-tail pair page
// an internal link from the category tool page and the hub.
export default function ConversionLinks({ category }: { category: CategoryKey }) {
  const cat = getCategory(category)

  return (
    <div className="not-prose space-y-5">
      {cat.units.map(unit => (
        <div key={unit.slug}>
          <h3 className="text-sm font-semibold text-ink mb-2">From {unit.plural}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {pairsFromUnit(category, unit.slug).map(p => (
              <PairLink key={p.slug} pair={p} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
