'use client'
import { useState } from 'react'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'

const FREQ: { label: string; value: number }[] = [
  { label: 'Annually', value: 1 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Daily', value: 365 },
]

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [freq, setFreq] = useState(12)
  const [contribution, setContribution] = useState('')

  const P = parseFloat(principal) || 0
  const r = (parseFloat(rate) || 0) / 100
  const t = parseFloat(years)
  const n = freq
  const PMT = parseFloat(contribution) || 0 // contribution per compounding period
  const valid = t > 0 && Number.isFinite(t) && (P > 0 || PMT > 0)

  // Future value of principal + future value of a series of contributions.
  let future = 0
  if (valid) {
    const growth = Math.pow(1 + r / n, n * t)
    const fvPrincipal = P * growth
    const fvContrib = r === 0 ? PMT * n * t : PMT * ((growth - 1) / (r / n))
    future = fvPrincipal + fvContrib
  }
  const totalContrib = valid ? P + PMT * n * t : 0
  const interestEarned = valid ? future - totalContrib : 0

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Starting amount</span>
          <input type="number" inputMode="decimal" value={principal} onChange={e => setPrincipal(e.target.value)} className="input-field" placeholder="e.g. 10000" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Annual interest rate (%)</span>
          <input type="number" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="e.g. 5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Years</span>
          <input type="number" inputMode="decimal" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="e.g. 10" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Compounding</span>
          <select value={freq} onChange={e => setFreq(parseInt(e.target.value))} className="input-field">
            {FREQ.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </label>
      </div>

      <label className="block mt-4">
        <span className="text-sm font-medium text-muted mb-1.5 block">Regular contribution (per period) — optional</span>
        <input type="number" inputMode="decimal" value={contribution} onChange={e => setContribution(e.target.value)} className="input-field" placeholder="e.g. 200" />
      </label>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5">
          <div className="text-center mb-4">
            <p className="text-sm text-muted">Future value</p>
            <p className="text-4xl font-bold">${money(future)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-line">
            <div><p className="text-muted">Total contributed</p><p className="font-semibold">${money(totalContrib)}</p></div>
            <div><p className="text-muted">Interest earned</p><p className="font-semibold text-emerald-600">${money(interestEarned)}</p></div>
          </div>
        </div>
      )}
    </div>
  )
}
