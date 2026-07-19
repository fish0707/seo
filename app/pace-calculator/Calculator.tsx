'use client'
import { useState } from 'react'

type Unit = 'km' | 'mi'

const pad = (n: number) => String(n).padStart(2, '0')
const fmtPace = (secPerUnit: number) => {
  if (!Number.isFinite(secPerUnit) || secPerUnit <= 0) return '—'
  const m = Math.floor(secPerUnit / 60)
  const s = Math.round(secPerUnit % 60)
  return `${m}:${pad(s)}`
}

export default function PaceCalculator() {
  const [distance, setDistance] = useState('')
  const [unit, setUnit] = useState<Unit>('km')
  const [hh, setHh] = useState('')
  const [mm, setMm] = useState('')
  const [ss, setSs] = useState('')

  const dist = parseFloat(distance)
  const totalSec = (parseInt(hh) || 0) * 3600 + (parseInt(mm) || 0) * 60 + (parseInt(ss) || 0)
  const valid = dist > 0 && totalSec > 0 && Number.isFinite(dist)

  const pacePerUnit = valid ? totalSec / dist : NaN
  // Cross-unit pace: 1 mi = 1.609344 km
  const pacePerOther = valid ? (unit === 'km' ? pacePerUnit * 1.609344 : pacePerUnit / 1.609344) : NaN
  const speed = valid ? dist / (totalSec / 3600) : NaN // units per hour

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Distance</span>
          <div className="flex gap-2">
            <input type="number" inputMode="decimal" value={distance} onChange={e => setDistance(e.target.value)} className="input-field" placeholder="e.g. 10" />
            <select value={unit} onChange={e => setUnit(e.target.value as Unit)} className="input-field !w-auto">
              <option value="km">km</option>
              <option value="mi">mi</option>
            </select>
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Time (hh : mm : ss)</span>
          <div className="flex gap-2 items-center">
            <input type="number" inputMode="numeric" value={hh} onChange={e => setHh(e.target.value)} className="input-field" placeholder="hh" />
            <span className="text-muted">:</span>
            <input type="number" inputMode="numeric" value={mm} onChange={e => setMm(e.target.value)} className="input-field" placeholder="mm" />
            <span className="text-muted">:</span>
            <input type="number" inputMode="numeric" value={ss} onChange={e => setSs(e.target.value)} className="input-field" placeholder="ss" />
          </div>
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-sm text-muted">Pace</p>
          <p className="text-4xl font-bold">{fmtPace(pacePerUnit)} <span className="text-lg font-medium text-muted">/ {unit}</span></p>
          <div className="grid grid-cols-2 gap-3 text-sm pt-4 mt-4 border-t border-line">
            <div><p className="text-muted">Pace / {unit === 'km' ? 'mi' : 'km'}</p><p className="font-semibold">{fmtPace(pacePerOther)}</p></div>
            <div><p className="text-muted">Speed</p><p className="font-semibold">{speed.toFixed(2)} {unit}/h</p></div>
          </div>
        </div>
      )}
    </div>
  )
}
