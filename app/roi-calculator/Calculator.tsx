'use client'
import { useState } from 'react'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'
const pct = (n: number) =>
  Number.isFinite(n) ? `${n >= 0 ? '+' : ''}${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}%` : '—'

export default function RoiCalculator() {
  const [cost, setCost] = useState('')
  const [finalValue, setFinalValue] = useState('')
  const [years, setYears] = useState('')

  const c = parseFloat(cost)
  const f = parseFloat(finalValue)
  const y = parseFloat(years)
  const valid = c > 0 && Number.isFinite(c) && Number.isFinite(f)

  const profit = valid ? f - c : NaN
  const roi = valid ? (profit / c) * 100 : NaN
  // Annualized (CAGR) when a positive holding period is given and value is positive.
  const annualized = valid && y > 0 && f > 0 ? (Math.pow(f / c, 1 / y) - 1) * 100 : NaN

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Amount invested (cost)</span>
          <input type="number" inputMode="decimal" value={cost} onChange={e => setCost(e.target.value)} className="input-field" placeholder="e.g. 5000" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Final value</span>
          <input type="number" inputMode="decimal" value={finalValue} onChange={e => setFinalValue(e.target.value)} className="input-field" placeholder="e.g. 7500" />
        </label>
      </div>
      <label className="block mt-4">
        <span className="text-sm font-medium text-muted mb-1.5 block">Holding period (years) — optional</span>
        <input type="number" inputMode="decimal" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="e.g. 3" />
      </label>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className={`text-4xl font-bold ${roi >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{pct(roi)}</p>
          <p className="text-sm text-muted mt-1">Total ROI</p>
          <div className="grid grid-cols-2 gap-3 text-sm pt-4 mt-4 border-t border-line">
            <div><p className="text-muted">Net profit</p><p className="font-semibold">${money(profit)}</p></div>
            <div><p className="text-muted">Annualized</p><p className="font-semibold">{Number.isFinite(annualized) ? pct(annualized) : '—'}</p></div>
          </div>
        </div>
      )}
    </div>
  )
}
