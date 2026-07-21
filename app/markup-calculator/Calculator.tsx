'use client'
import { useState } from 'react'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'
const fmt = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '—'

export default function MarkupCalculator() {
  const [cost, setCost] = useState('')
  const [markup, setMarkup] = useState('')

  const c = parseFloat(cost)
  const m = parseFloat(markup)
  const valid = c > 0 && Number.isFinite(c) && Number.isFinite(m)

  const price = valid ? c * (1 + m / 100) : NaN
  const profit = valid ? price - c : NaN
  const margin = valid && price > 0 ? (profit / price) * 100 : NaN

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Cost</span>
          <input type="number" inputMode="decimal" value={cost} onChange={e => setCost(e.target.value)} className="input-field" placeholder="e.g. 40" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Markup (%)</span>
          <input type="number" inputMode="decimal" value={markup} onChange={e => setMarkup(e.target.value)} className="input-field" placeholder="e.g. 50" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5">
          <div className="text-center mb-4">
            <p className="text-sm text-muted">Selling price</p>
            <p className="text-4xl font-bold">${money(price)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-line">
            <div><p className="text-muted">Profit</p><p className="font-semibold">${money(profit)}</p></div>
            <div><p className="text-muted">Profit margin</p><p className="font-semibold">{fmt(margin)}%</p></div>
          </div>
        </div>
      )}
    </div>
  )
}
