'use client'
import { useState } from 'react'

type Basis = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'annual'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'

export default function SalaryCalculator() {
  const [amount, setAmount] = useState('')
  const [basis, setBasis] = useState<Basis>('hourly')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [daysPerWeek, setDaysPerWeek] = useState('5')
  const [weeksPerYear, setWeeksPerYear] = useState('52')

  const amt = parseFloat(amount)
  const hpw = parseFloat(hoursPerWeek) || 0
  const dpw = parseFloat(daysPerWeek) || 0
  const wpy = parseFloat(weeksPerYear) || 0
  const valid = amt > 0 && hpw > 0 && wpy > 0 && Number.isFinite(amt)

  // Normalise everything to an annual figure, then derive the rest.
  let annual = 0
  if (valid) {
    if (basis === 'hourly') annual = amt * hpw * wpy
    else if (basis === 'daily') annual = amt * dpw * wpy
    else if (basis === 'weekly') annual = amt * wpy
    else if (basis === 'monthly') annual = amt * 12
    else annual = amt
  }
  const hoursPerYear = hpw * wpy
  const rows: [string, number][] = valid
    ? [
        ['Hourly', hoursPerYear > 0 ? annual / hoursPerYear : NaN],
        ['Daily', dpw > 0 && wpy > 0 ? annual / (dpw * wpy) : NaN],
        ['Weekly', wpy > 0 ? annual / wpy : NaN],
        ['Monthly', annual / 12],
        ['Annual', annual],
      ]
    : []

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Amount</span>
          <input type="number" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder="e.g. 25" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Paid</span>
          <select value={basis} onChange={e => setBasis(e.target.value as Basis)} className="input-field">
            <option value="hourly">Per hour</option>
            <option value="daily">Per day</option>
            <option value="weekly">Per week</option>
            <option value="monthly">Per month</option>
            <option value="annual">Per year</option>
          </select>
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Hours / week</span>
          <input type="number" inputMode="decimal" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} className="input-field" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Days / week</span>
          <input type="number" inputMode="decimal" value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)} className="input-field" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Weeks / year</span>
          <input type="number" inputMode="decimal" value={weeksPerYear} onChange={e => setWeeksPerYear(e.target.value)} className="input-field" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 space-y-2">
          {rows.map(([label, v]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-muted">{label}</span>
              <span className="font-semibold">${money(v)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
