'use client'
import { useState } from 'react'

type Unit = 'C' | 'F' | 'K'

const fmt = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '—'

const toCelsius = (v: number, from: Unit) =>
  from === 'C' ? v : from === 'F' ? ((v - 32) * 5) / 9 : v - 273.15
const fromCelsius = (c: number, to: Unit) =>
  to === 'C' ? c : to === 'F' ? (c * 9) / 5 + 32 : c + 273.15

const LABELS: Record<Unit, string> = { C: 'Celsius (°C)', F: 'Fahrenheit (°F)', K: 'Kelvin (K)' }

export default function TemperatureConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState<Unit>('C')

  const v = parseFloat(value)
  const valid = value !== '' && Number.isFinite(v)
  const c = valid ? toCelsius(v, from) : NaN

  const units: Unit[] = ['C', 'F', 'K']
  const results = units.filter(u => u !== from)

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Temperature</span>
          <input type="number" inputMode="decimal" value={value} onChange={e => setValue(e.target.value)} className="input-field" placeholder="e.g. 100" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">From</span>
          <select value={from} onChange={e => setFrom(e.target.value as Unit)} className="input-field">
            {units.map(u => <option key={u} value={u}>{LABELS[u]}</option>)}
          </select>
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 space-y-2">
          {results.map(u => (
            <div key={u} className="flex justify-between items-baseline">
              <span className="text-sm text-muted">{LABELS[u]}</span>
              <span className="text-2xl font-bold">{fmt(fromCelsius(c, u))}{u === 'K' ? ' K' : `°${u}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
