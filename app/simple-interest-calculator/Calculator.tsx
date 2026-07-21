'use client'
import { useState } from 'react'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')

  const p = parseFloat(principal)
  const r = parseFloat(rate)
  const t = parseFloat(years)
  const valid = p > 0 && Number.isFinite(p) && Number.isFinite(r) && Number.isFinite(t) && t >= 0

  // Simple interest: I = P × r × t
  const interest = valid ? (p * r * t) / 100 : NaN
  const total = valid ? p + interest : NaN

  return (
    <div className="card">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Principal</span>
          <input type="number" inputMode="decimal" value={principal} onChange={e => setPrincipal(e.target.value)} className="input-field" placeholder="e.g. 10000" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Annual rate (%)</span>
          <input type="number" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="e.g. 5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Time (years)</span>
          <input type="number" inputMode="decimal" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="e.g. 3" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5">
          <div className="text-center mb-4">
            <p className="text-sm text-muted">Interest</p>
            <p className="text-4xl font-bold">${money(interest)}</p>
          </div>
          <div className="flex justify-between text-sm pt-4 border-t border-line">
            <span className="text-muted">Total amount (principal + interest)</span>
            <span className="font-semibold">${money(total)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
