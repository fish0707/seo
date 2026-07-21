'use client'
import { useState } from 'react'

// Every unit expressed in grams.
const UNITS: { key: string; label: string; g: number }[] = [
  { key: 'mg', label: 'Milligrams (mg)', g: 0.001 },
  { key: 'g', label: 'Grams (g)', g: 1 },
  { key: 'kg', label: 'Kilograms (kg)', g: 1000 },
  { key: 'oz', label: 'Ounces (oz)', g: 28.349523125 },
  { key: 'lb', label: 'Pounds (lb)', g: 453.59237 },
  { key: 'st', label: 'Stones (st)', g: 6350.29318 },
]

const fmt = (n: number) => {
  if (!Number.isFinite(n)) return '—'
  if (n !== 0 && (Math.abs(n) < 1e-4 || Math.abs(n) >= 1e9)) return n.toExponential(4)
  return n.toLocaleString('en-US', { maximumFractionDigits: 6 })
}

export default function WeightConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState('kg')

  const v = parseFloat(value)
  const valid = value !== '' && Number.isFinite(v)
  const fromUnit = UNITS.find(u => u.key === from)!
  const grams = valid ? v * fromUnit.g : NaN

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Value</span>
          <input type="number" inputMode="decimal" value={value} onChange={e => setValue(e.target.value)} className="input-field" placeholder="e.g. 70" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">From</span>
          <select value={from} onChange={e => setFrom(e.target.value)} className="input-field">
            {UNITS.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 space-y-2">
          {UNITS.filter(u => u.key !== from).map(u => (
            <div key={u.key} className="flex justify-between items-baseline">
              <span className="text-sm text-muted">{u.label}</span>
              <span className="text-lg font-semibold">{fmt(grams / u.g)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
