'use client'
import { useState } from 'react'

type Units = 'metric' | 'imperial'

const fmt = (n: number, d = 1) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: d }) : '—'

function category(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-sky-600' }
  if (bmi < 25) return { label: 'Normal weight', color: 'text-emerald-600' }
  if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600' }
  return { label: 'Obese', color: 'text-red-600' }
}

export default function BmiCalculator() {
  const [units, setUnits] = useState<Units>('metric')
  const [cm, setCm] = useState('')
  const [kg, setKg] = useState('')
  const [ft, setFt] = useState('')
  const [inch, setInch] = useState('')
  const [lb, setLb] = useState('')

  let heightM = 0
  let weightKg = 0
  if (units === 'metric') {
    heightM = parseFloat(cm) / 100
    weightKg = parseFloat(kg)
  } else {
    const totalIn = (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0)
    heightM = totalIn * 0.0254
    weightKg = parseFloat(lb) * 0.45359237
  }

  const valid = heightM > 0 && weightKg > 0 && Number.isFinite(heightM) && Number.isFinite(weightKg)
  const bmi = valid ? weightKg / (heightM * heightM) : NaN
  const cat = valid ? category(bmi) : null

  // Healthy weight range (BMI 18.5–24.9) for this height
  const lowKg = valid ? 18.5 * heightM * heightM : 0
  const highKg = valid ? 24.9 * heightM * heightM : 0
  const toDisplayWeight = (k: number) =>
    units === 'metric' ? `${fmt(k)} kg` : `${fmt(k / 0.45359237)} lb`

  return (
    <div className="card">
      <div className="flex gap-2 mb-5">
        {(['metric', 'imperial'] as Units[]).map(u => (
          <button
            key={u}
            onClick={() => setUnits(u)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              units === u ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'
            }`}
          >
            {u === 'metric' ? 'Metric (cm / kg)' : 'Imperial (ft / lb)'}
          </button>
        ))}
      </div>

      {units === 'metric' ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-muted mb-1.5 block">Height (cm)</span>
            <input type="number" inputMode="decimal" value={cm} onChange={e => setCm(e.target.value)} className="input-field" placeholder="e.g. 170" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-muted mb-1.5 block">Weight (kg)</span>
            <input type="number" inputMode="decimal" value={kg} onChange={e => setKg(e.target.value)} className="input-field" placeholder="e.g. 65" />
          </label>
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-muted mb-1.5 block">Height (ft)</span>
            <input type="number" inputMode="numeric" value={ft} onChange={e => setFt(e.target.value)} className="input-field" placeholder="e.g. 5" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-muted mb-1.5 block">Height (in)</span>
            <input type="number" inputMode="decimal" value={inch} onChange={e => setInch(e.target.value)} className="input-field" placeholder="e.g. 7" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-muted mb-1.5 block">Weight (lb)</span>
            <input type="number" inputMode="decimal" value={lb} onChange={e => setLb(e.target.value)} className="input-field" placeholder="e.g. 145" />
          </label>
        </div>
      )}

      {valid && cat && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-4xl font-bold">{fmt(bmi)}</p>
          <p className={`text-sm font-semibold mt-1 ${cat.color}`}>{cat.label}</p>
          <p className="text-sm text-muted mt-3">
            Healthy weight for your height: {toDisplayWeight(lowKg)} – {toDisplayWeight(highKg)}
          </p>
        </div>
      )}
    </div>
  )
}
