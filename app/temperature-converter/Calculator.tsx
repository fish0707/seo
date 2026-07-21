'use client'
import { useState } from 'react'
import { getCategory, convert, fmtConv } from '@/lib/conversions'

const UNITS = getCategory('temperature').units

export default function TemperatureConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState('celsius')

  const v = parseFloat(value)
  const valid = value !== '' && Number.isFinite(v)
  const fromUnit = UNITS.find(u => u.slug === from)!

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Temperature</span>
          <input type="number" inputMode="decimal" value={value} onChange={e => setValue(e.target.value)} className="input-field" placeholder="e.g. 100" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">From</span>
          <select value={from} onChange={e => setFrom(e.target.value)} className="input-field">
            {UNITS.map(u => <option key={u.slug} value={u.slug}>{u.name} ({u.symbol})</option>)}
          </select>
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 space-y-2">
          {UNITS.filter(u => u.slug !== from).map(u => (
            <div key={u.slug} className="flex justify-between items-baseline">
              <span className="text-sm text-muted">{u.name} ({u.symbol})</span>
              <span className="text-2xl font-bold">{fmtConv(convert(v, fromUnit, u))}{u.slug === 'kelvin' ? ' K' : `°${u.symbol.replace('°', '')}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
