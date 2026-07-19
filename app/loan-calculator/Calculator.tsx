'use client'
import { useState } from 'react'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'

export default function LoanCalculator() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')

  const principal = parseFloat(amount)
  const annualRate = parseFloat(rate)
  const term = parseFloat(years)
  const valid = principal > 0 && term > 0 && Number.isFinite(principal) && Number.isFinite(term) && Number.isFinite(annualRate)

  const n = term * 12
  const i = annualRate / 100 / 12

  // Standard amortized payment formula; handle 0% interest separately.
  let monthly = 0
  if (valid) {
    monthly = i === 0 ? principal / n : (principal * i) / (1 - Math.pow(1 + i, -n))
  }
  const totalPaid = valid ? monthly * n : 0
  const totalInterest = valid ? totalPaid - principal : 0

  return (
    <div className="card">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Loan amount</span>
          <input type="number" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder="e.g. 20000" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Annual interest rate (%)</span>
          <input type="number" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="e.g. 6.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Term (years)</span>
          <input type="number" inputMode="decimal" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="e.g. 5" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5">
          <div className="text-center mb-4">
            <p className="text-sm text-muted">Monthly payment</p>
            <p className="text-4xl font-bold">${money(monthly)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-line">
            <div><p className="text-muted">Total interest</p><p className="font-semibold">${money(totalInterest)}</p></div>
            <div><p className="text-muted">Total paid</p><p className="font-semibold">${money(totalPaid)}</p></div>
          </div>
        </div>
      )}
    </div>
  )
}
