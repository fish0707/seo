'use client'
import { useState } from 'react'

type Sex = 'male' | 'female'
type Units = 'metric' | 'imperial'

const fmt = (kg: number, units: Units) =>
  !Number.isFinite(kg) ? '—' : units === 'metric'
    ? `${kg.toLocaleString('en-US', { maximumFractionDigits: 1 })} kg`
    : `${(kg / 0.45359237).toLocaleString('en-US', { maximumFractionDigits: 1 })} lb`

export default function IdealWeightCalculator() {
  const [units, setUnits] = useState<Units>('metric')
  const [sex, setSex] = useState<Sex>('male')
  const [cm, setCm] = useState('')
  const [ft, setFt] = useState('')
  const [inch, setInch] = useState('')

  const heightCm = units === 'metric'
    ? parseFloat(cm)
    : ((parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0)) * 2.54
  const valid = heightCm > 0 && Number.isFinite(heightCm)

  // Inches over 5 feet (60 in) — the basis of the classic IBW formulas.
  const inchesOver5ft = valid ? Math.max(0, heightCm / 2.54 - 60) : 0
  const male = sex === 'male'

  const formulas = valid
    ? [
        { name: 'Robinson (1983)', kg: (male ? 52 : 49) + (male ? 1.9 : 1.7) * inchesOver5ft },
        { name: 'Miller (1983)', kg: (male ? 56.2 : 53.1) + (male ? 1.41 : 1.36) * inchesOver5ft },
        { name: 'Devine (1974)', kg: (male ? 50 : 45.5) + 2.3 * inchesOver5ft },
        { name: 'Hamwi (1964)', kg: (male ? 48 : 45.5) + (male ? 2.7 : 2.2) * inchesOver5ft },
      ]
    : []

  const m = valid ? heightCm / 100 : 0
  const healthyLow = valid ? 18.5 * m * m : 0
  const healthyHigh = valid ? 24.9 * m * m : 0

  return (
    <div className="card">
      <div className="flex flex-wrap gap-2 mb-5">
        {(['metric', 'imperial'] as Units[]).map(u => (
          <button key={u} onClick={() => setUnits(u)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${units === u ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'}`}>
            {u === 'metric' ? 'Metric' : 'Imperial'}
          </button>
        ))}
        <div className="flex-1" />
        {(['male', 'female'] as Sex[]).map(s => (
          <button key={s} onClick={() => setSex(s)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${sex === s ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'}`}>
            {s}
          </button>
        ))}
      </div>

      {units === 'metric' ? (
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Height (cm)</span>
          <input type="number" inputMode="decimal" value={cm} onChange={e => setCm(e.target.value)} className="input-field" placeholder="e.g. 175" />
        </label>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-muted mb-1.5 block">Height (ft)</span>
            <input type="number" inputMode="numeric" value={ft} onChange={e => setFt(e.target.value)} className="input-field" placeholder="e.g. 5" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-muted mb-1.5 block">Height (in)</span>
            <input type="number" inputMode="decimal" value={inch} onChange={e => setInch(e.target.value)} className="input-field" placeholder="e.g. 9" />
          </label>
        </div>
      )}

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 space-y-2">
          {formulas.map(f => (
            <div key={f.name} className="flex justify-between text-sm">
              <span className="text-muted">{f.name}</span>
              <span className="font-semibold">{fmt(f.kg, units)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm pt-2 mt-2 border-t border-line">
            <span className="text-muted">Healthy BMI range</span>
            <span className="font-semibold">{fmt(healthyLow, units)} – {fmt(healthyHigh, units)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
