'use client'
import { useState } from 'react'

// Every unit expressed in metres per second.
const UNITS: { key: string; label: string; ms: number }[] = [
  { key: 'kmh', label: 'Kilometres/hour (km/h)', ms: 0.277777778 },
  { key: 'mph', label: 'Miles/hour (mph)', ms: 0.44704 },
  { key: 'ms', label: 'Metres/second (m/s)', ms: 1 },
  { key: 'fts', label: 'Feet/second (ft/s)', ms: 0.3048 },
  { key: 'kn', label: 'Knots (kn)', ms: 0.514444444 },
]

const fmt = (n: number) => {
  if (!Number.isFinite(n)) return '—'
  if (n !== 0 && (Math.abs(n) < 1e-4 || Math.abs(n) >= 1e9)) return n.toExponential(4)
  return n.toLocaleString('en-US', { maximumFractionDigits: 4 })
}

export default function SpeedConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState('kmh')

  const v = parseFloat(value)
  const valid = value !== '' && Number.isFinite(v)
  const fromUnit = UNITS.find(u => u.key === from)!
  const ms = valid ? v * fromUnit.ms : NaN

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
              <span className="text-lg font-semibold">{fmt(ms / u.ms)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
