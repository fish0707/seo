'use client'
import { useState } from 'react'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'

export default function SavingsGoalCalculator() {
  const [goal, setGoal] = useState('')
  const [current, setCurrent] = useState('')
  const [years, setYears] = useState('')
  const [rate, setRate] = useState('')

  const g = parseFloat(goal)
  const c = parseFloat(current) || 0
  const y = parseFloat(years)
  const r = (parseFloat(rate) || 0) / 100
  const valid = g > 0 && y > 0 && Number.isFinite(g) && Number.isFinite(y) && g > c

  const n = y * 12
  const i = r / 12
  // Future value of current savings, then solve for the monthly contribution that covers the gap.
  const fvCurrent = valid ? c * Math.pow(1 + i, n) : 0
  const remaining = valid ? g - fvCurrent : 0
  let monthly = 0
  if (valid) {
    if (remaining <= 0) monthly = 0
    else monthly = i === 0 ? remaining / n : remaining * (i / (Math.pow(1 + i, n) - 1))
  }
  const totalContrib = valid ? c + monthly * n : 0
  const interestEarned = valid ? g - totalContrib : 0

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Savings goal</span>
          <input type="number" inputMode="decimal" value={goal} onChange={e => setGoal(e.target.value)} className="input-field" placeholder="e.g. 20000" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Already saved — optional</span>
          <input type="number" inputMode="decimal" value={current} onChange={e => setCurrent(e.target.value)} className="input-field" placeholder="e.g. 2000" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Time to goal (years)</span>
          <input type="number" inputMode="decimal" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="e.g. 3" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Annual return (%) — optional</span>
          <input type="number" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="e.g. 4" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5">
          <div className="text-center mb-4">
            <p className="text-sm text-muted">You need to save</p>
            <p className="text-4xl font-bold">${money(monthly)} <span className="text-lg font-medium text-muted">/ month</span></p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-line">
            <div><p className="text-muted">Total you contribute</p><p className="font-semibold">${money(totalContrib)}</p></div>
            <div><p className="text-muted">Interest earned</p><p className="font-semibold text-emerald-600">${money(interestEarned)}</p></div>
          </div>
        </div>
      )}
      {g > 0 && c >= g && (
        <p className="mt-4 text-sm text-emerald-600 text-center">You have already reached this goal 🎉</p>
      )}
    </div>
  )
}
