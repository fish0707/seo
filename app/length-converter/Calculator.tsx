'use client'
import { useState } from 'react'

// Every unit expressed in metres.
const UNITS: { key: string; label: string; m: number }[] = [
  { key: 'mm', label: 'Millimetres (mm)', m: 0.001 },
  { key: 'cm', label: 'Centimetres (cm)', m: 0.01 },
  { key: 'm', label: 'Metres (m)', m: 1 },
  { key: 'km', label: 'Kilometres (km)', m: 1000 },
  { key: 'in', label: 'Inches (in)', m: 0.0254 },
  { key: 'ft', label: 'Feet (ft)', m: 0.3048 },
  { key: 'yd', label: 'Yards (yd)', m: 0.9144 },
  { key: 'mi', label: 'Miles (mi)', m: 1609.344 },
]

const fmt = (n: number) => {
  if (!Number.isFinite(n)) return '—'
  if (n !== 0 && (Math.abs(n) < 1e-4 || Math.abs(n) >= 1e9)) return n.toExponential(4)
  return n.toLocaleString('en-US', { maximumFractionDigits: 6 })
}

export default function LengthConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState('cm')

  const v = parseFloat(value)
  const valid = value !== '' && Number.isFinite(v)
  const fromUnit = UNITS.find(u => u.key === from)!
  const metres = valid ? v * fromUnit.m : NaN

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Value</span>
          <input type="number" inputMode="decimal" value={value} onChange={e => setValue(e.target.value)} className="input-field" placeholder="e.g. 100" />
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
              <span className="text-lg font-semibold">{fmt(metres / u.m)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
