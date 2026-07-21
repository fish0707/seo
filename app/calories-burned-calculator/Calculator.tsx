'use client'
import { useState } from 'react'

type Units = 'metric' | 'imperial'

const fmt = (n: number) => (Number.isFinite(n) ? Math.round(n).toLocaleString('en-US') : '—')

// Approximate MET values for common activities.
const ACTIVITIES: { label: string; met: number }[] = [
  { label: 'Walking (moderate, 5 km/h)', met: 3.5 },
  { label: 'Walking (brisk, 6.5 km/h)', met: 5.0 },
  { label: 'Running (9.5 km/h)', met: 9.8 },
  { label: 'Cycling (moderate)', met: 7.5 },
  { label: 'Swimming (moderate)', met: 7.0 },
  { label: 'Hiking', met: 6.0 },
  { label: 'Weightlifting (vigorous)', met: 6.0 },
  { label: 'HIIT / circuit training', met: 8.0 },
  { label: 'Yoga', met: 2.5 },
  { label: 'Dancing', met: 5.0 },
  { label: 'Jump rope', met: 12.3 },
  { label: 'Rowing (moderate)', met: 7.0 },
  { label: 'Elliptical trainer', met: 5.0 },
  { label: 'Basketball', met: 6.5 },
  { label: 'Soccer', met: 7.0 },
]

export default function CaloriesBurnedCalculator() {
  const [units, setUnits] = useState<Units>('metric')
  const [weight, setWeight] = useState('')
  const [minutes, setMinutes] = useState('')
  const [met, setMet] = useState(ACTIVITIES[0].met)

  const w = parseFloat(weight)
  const weightKg = units === 'metric' ? w : w * 0.45359237
  const mins = parseFloat(minutes)
  const valid = weightKg > 0 && mins > 0 && Number.isFinite(weightKg) && Number.isFinite(mins)

  // kcal = MET × weight(kg) × time(hours)
  const calories = valid ? met * weightKg * (mins / 60) : NaN
  const perMin = valid ? calories / mins : NaN

  return (
    <div className="card">
      <div className="flex gap-2 mb-5">
        {(['metric', 'imperial'] as Units[]).map(u => (
          <button key={u} onClick={() => setUnits(u)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${units === u ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'}`}>
            {u === 'metric' ? 'kg' : 'lb'}
          </button>
        ))}
      </div>

      <label className="block">
        <span className="text-sm font-medium text-muted mb-1.5 block">Activity</span>
        <select value={met} onChange={e => setMet(parseFloat(e.target.value))} className="input-field">
          {ACTIVITIES.map(a => <option key={a.label} value={a.met}>{a.label}</option>)}
        </select>
      </label>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Your weight ({units === 'metric' ? 'kg' : 'lb'})</span>
          <input type="number" inputMode="decimal" value={weight} onChange={e => setWeight(e.target.value)} className="input-field" placeholder={units === 'metric' ? 'e.g. 70' : 'e.g. 155'} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Duration (minutes)</span>
          <input type="number" inputMode="numeric" value={minutes} onChange={e => setMinutes(e.target.value)} className="input-field" placeholder="e.g. 30" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-4xl font-bold">{fmt(calories)} <span className="text-lg font-medium text-muted">kcal</span></p>
          <p className="text-sm text-muted mt-1">≈ {fmt(perMin)} kcal per minute</p>
        </div>
      )}
    </div>
  )
}
