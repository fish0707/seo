'use client'
import { useState } from 'react'
import { getPair, reversePair, convert, fmtConv, type ConvPair } from '@/lib/conversions'

export default function MiniConverter({ slug }: { slug: string }) {
  const initial = getPair(slug)!
  const [pair, setPair] = useState<ConvPair>(initial)
  const [value, setValue] = useState('1')

  const v = parseFloat(value)
  const valid = value !== '' && Number.isFinite(v)
  const result = valid ? convert(v, pair.from, pair.to) : NaN

  return (
    <div className="card">
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">{pair.from.name} ({pair.from.symbol})</span>
          <input
            type="number"
            inputMode="decimal"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="input-field"
            placeholder="Enter a value"
            aria-label={`Value in ${pair.from.plural}`}
          />
        </label>

        <button
          onClick={() => setPair(reversePair(pair))}
          className="mb-1 h-11 w-11 rounded-xl bg-surface text-brand text-lg hover:bg-num-hover transition-colors shrink-0 self-end"
          aria-label="Swap units"
          title="Swap"
        >
          ⇄
        </button>

        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">{pair.to.name} ({pair.to.symbol})</span>
          <div className="input-field !bg-surface flex items-center min-h-[46px] font-semibold text-lg">
            {valid ? fmtConv(result) : '—'}
          </div>
        </label>
      </div>

      {valid && (
        <p className="mt-4 text-center text-sm text-muted">
          <span className="text-ink font-medium">{fmtConv(v)} {pair.from.symbol}</span>
          {' = '}
          <span className="text-ink font-medium">{fmtConv(result)} {pair.to.symbol}</span>
        </p>
      )}
    </div>
  )
}
