'use client'
import { useState } from 'react'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'
const fmt = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '—'

export default function DiscountCalculator() {
  const [price, setPrice] = useState('')
  const [d1, setD1] = useState('')
  const [d2, setD2] = useState('')

  const p = parseFloat(price)
  const pct1 = parseFloat(d1) || 0
  const pct2 = parseFloat(d2) || 0
  const valid = p > 0 && Number.isFinite(p)

  // Stacked discounts apply sequentially, not additively.
  const afterFirst = valid ? p * (1 - pct1 / 100) : 0
  const finalPrice = valid ? afterFirst * (1 - pct2 / 100) : 0
  const saved = valid ? p - finalPrice : 0
  const effectivePct = valid && p > 0 ? (saved / p) * 100 : 0

  return (
    <div className="card">
      <label className="block">
        <span className="text-sm font-medium text-muted mb-1.5 block">Original price</span>
        <input type="number" inputMode="decimal" value={price} onChange={e => setPrice(e.target.value)} className="input-field" placeholder="e.g. 89.00" />
      </label>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Discount (%)</span>
          <input type="number" inputMode="decimal" value={d1} onChange={e => setD1(e.target.value)} className="input-field" placeholder="e.g. 30" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Extra discount (%) — optional</span>
          <input type="number" inputMode="decimal" value={d2} onChange={e => setD2(e.target.value)} className="input-field" placeholder="e.g. 10" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-4xl font-bold">${money(finalPrice)}</p>
          <p className="text-sm text-emerald-600 font-semibold mt-1">You save ${money(saved)}</p>
          <p className="text-sm text-muted mt-2">
            Effective discount: {fmt(effectivePct)}%
            {pct2 > 0 && ` (not ${fmt(pct1 + pct2)}% — stacked discounts multiply)`}
          </p>
        </div>
      )}
    </div>
  )
}
