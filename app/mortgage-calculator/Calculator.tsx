'use client'
import { useState } from 'react'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'

export default function MortgageCalculator() {
  const [price, setPrice] = useState('')
  const [down, setDown] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('30')
  const [tax, setTax] = useState('')
  const [insurance, setInsurance] = useState('')

  const p = parseFloat(price)
  const d = parseFloat(down) || 0
  const annualRate = parseFloat(rate)
  const term = parseFloat(years)
  const annualTax = parseFloat(tax) || 0
  const annualIns = parseFloat(insurance) || 0

  const principal = p > 0 ? p - d : NaN
  const valid = principal > 0 && term > 0 && Number.isFinite(annualRate)

  const i = annualRate / 100 / 12
  const n = term * 12
  const pi = valid ? (i === 0 ? principal / n : (principal * i) / (1 - Math.pow(1 + i, -n))) : NaN
  const monthlyTax = annualTax / 12
  const monthlyIns = annualIns / 12
  const totalMonthly = valid ? pi + monthlyTax + monthlyIns : NaN

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Home price</span>
          <input type="number" inputMode="decimal" value={price} onChange={e => setPrice(e.target.value)} className="input-field" placeholder="e.g. 350000" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Down payment</span>
          <input type="number" inputMode="decimal" value={down} onChange={e => setDown(e.target.value)} className="input-field" placeholder="e.g. 70000" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Interest rate (%)</span>
          <input type="number" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="e.g. 6.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Term (years)</span>
          <input type="number" inputMode="decimal" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="30" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Property tax / year — optional</span>
          <input type="number" inputMode="decimal" value={tax} onChange={e => setTax(e.target.value)} className="input-field" placeholder="e.g. 3600" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Home insurance / year — optional</span>
          <input type="number" inputMode="decimal" value={insurance} onChange={e => setInsurance(e.target.value)} className="input-field" placeholder="e.g. 1200" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5">
          <div className="text-center mb-4">
            <p className="text-sm text-muted">Estimated monthly payment</p>
            <p className="text-4xl font-bold">${money(totalMonthly)}</p>
          </div>
          <div className="space-y-1.5 text-sm pt-4 border-t border-line">
            <div className="flex justify-between"><span className="text-muted">Principal &amp; interest</span><span className="font-semibold">${money(pi)}</span></div>
            {monthlyTax > 0 && <div className="flex justify-between"><span className="text-muted">Property tax</span><span className="font-semibold">${money(monthlyTax)}</span></div>}
            {monthlyIns > 0 && <div className="flex justify-between"><span className="text-muted">Home insurance</span><span className="font-semibold">${money(monthlyIns)}</span></div>}
            <div className="flex justify-between pt-2 mt-1 border-t border-line"><span className="text-muted">Loan amount</span><span className="font-semibold">${money(principal)}</span></div>
          </div>
        </div>
      )}
    </div>
  )
}
