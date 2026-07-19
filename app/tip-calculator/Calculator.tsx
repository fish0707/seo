'use client'
import { useState } from 'react'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'

const PRESETS = [10, 15, 18, 20, 25]

export default function TipCalculator() {
  const [bill, setBill] = useState('')
  const [tipPct, setTipPct] = useState(18)
  const [people, setPeople] = useState('1')
  const [round, setRound] = useState<'none' | 'up'>('none')

  const b = parseFloat(bill)
  const n = Math.max(1, parseInt(people) || 1)
  const valid = b > 0 && Number.isFinite(b)

  let tip = valid ? (b * tipPct) / 100 : 0
  let total = valid ? b + tip : 0
  if (valid && round === 'up') {
    total = Math.ceil(total)
    tip = total - b
  }
  const perPerson = total / n

  return (
    <div className="card">
      <label className="block">
        <span className="text-sm font-medium text-muted mb-1.5 block">Bill amount</span>
        <input type="number" inputMode="decimal" value={bill} onChange={e => setBill(e.target.value)} className="input-field" placeholder="e.g. 64.00" />
      </label>

      <div className="mt-4">
        <span className="text-sm font-medium text-muted mb-1.5 block">Tip percentage: {tipPct}%</span>
        <div className="flex flex-wrap gap-2 mb-3">
          {PRESETS.map(p => (
            <button
              key={p}
              onClick={() => setTipPct(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                tipPct === p ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
        <input type="range" min={0} max={30} step={1} value={tipPct} onChange={e => setTipPct(parseInt(e.target.value))} className="w-full accent-brand" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Split between (people)</span>
          <input type="number" inputMode="numeric" min={1} value={people} onChange={e => setPeople(e.target.value)} className="input-field" placeholder="1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Round total</span>
          <select value={round} onChange={e => setRound(e.target.value as 'none' | 'up')} className="input-field">
            <option value="none">No rounding</option>
            <option value="up">Round up to nearest whole</option>
          </select>
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 space-y-2">
          <div className="flex justify-between text-sm text-muted"><span>Tip</span><span>${money(tip)}</span></div>
          <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>${money(total)}</span></div>
          {n > 1 && (
            <div className="flex justify-between text-sm text-muted pt-2 border-t border-line">
              <span>Per person ({n})</span><span>${money(perPerson)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
