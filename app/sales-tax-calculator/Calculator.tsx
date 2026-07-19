'use client'
import { useState } from 'react'

type Mode = 'add' | 'reverse'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'

export default function SalesTaxCalculator() {
  const [mode, setMode] = useState<Mode>('add')
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')

  const amt = parseFloat(amount)
  const r = parseFloat(rate)
  const valid = amt > 0 && r >= 0 && Number.isFinite(amt) && Number.isFinite(r)

  let pretax = 0
  let tax = 0
  let total = 0
  if (valid) {
    if (mode === 'add') {
      pretax = amt
      tax = amt * (r / 100)
      total = pretax + tax
    } else {
      total = amt
      pretax = amt / (1 + r / 100)
      tax = total - pretax
    }
  }

  return (
    <div className="card">
      <div className="flex flex-wrap gap-2 mb-5">
        {([['add', 'Add tax to a price'], ['reverse', 'Remove tax from a total']] as [Mode, string][]).map(([k, label]) => (
          <button key={k} onClick={() => setMode(k)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === k ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">{mode === 'add' ? 'Pre-tax price' : 'Total (tax included)'}</span>
          <input type="number" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder="e.g. 100" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Sales tax rate (%)</span>
          <input type="number" inputMode="decimal" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="e.g. 8.25" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 space-y-2">
          <div className="flex justify-between text-sm text-muted"><span>Pre-tax price</span><span>${money(pretax)}</span></div>
          <div className="flex justify-between text-sm text-muted"><span>Sales tax</span><span>${money(tax)}</span></div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-line"><span>Total</span><span>${money(total)}</span></div>
        </div>
      )}
    </div>
  )
}
