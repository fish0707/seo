'use client'
import { useState } from 'react'

type Sex = 'male' | 'female'
type Units = 'metric' | 'imperial'

const fmt = (n: number) => (Number.isFinite(n) ? Math.round(n).toLocaleString('en-US') : '—')

const ACTIVITY: { label: string; factor: number }[] = [
  { label: 'Sedentary (little or no exercise)', factor: 1.2 },
  { label: 'Light (1–3 days/week)', factor: 1.375 },
  { label: 'Moderate (3–5 days/week)', factor: 1.55 },
  { label: 'Active (6–7 days/week)', factor: 1.725 },
  { label: 'Very active (hard exercise + physical job)', factor: 1.9 },
]

export default function CalorieCalculator() {
  const [units, setUnits] = useState<Units>('metric')
  const [sex, setSex] = useState<Sex>('male')
  const [age, setAge] = useState('')
  const [cm, setCm] = useState('')
  const [kg, setKg] = useState('')
  const [ft, setFt] = useState('')
  const [inch, setInch] = useState('')
  const [lb, setLb] = useState('')
  const [activity, setActivity] = useState(1.55)

  const a = parseFloat(age)
  let heightCm = 0
  let weightKg = 0
  if (units === 'metric') {
    heightCm = parseFloat(cm)
    weightKg = parseFloat(kg)
  } else {
    heightCm = ((parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0)) * 2.54
    weightKg = parseFloat(lb) * 0.45359237
  }

  const valid = a > 0 && heightCm > 0 && weightKg > 0 && [a, heightCm, weightKg].every(Number.isFinite)

  // Mifflin-St Jeor BMR
  const bmr = valid ? 10 * weightKg + 6.25 * heightCm - 5 * a + (sex === 'male' ? 5 : -161) : NaN
  const tdee = valid ? bmr * activity : NaN

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

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Age</span>
          <input type="number" inputMode="numeric" value={age} onChange={e => setAge(e.target.value)} className="input-field" placeholder="e.g. 30" />
        </label>
        {units === 'metric' ? (
          <>
            <label className="block">
              <span className="text-sm font-medium text-muted mb-1.5 block">Height (cm)</span>
              <input type="number" inputMode="decimal" value={cm} onChange={e => setCm(e.target.value)} className="input-field" placeholder="e.g. 175" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-muted mb-1.5 block">Weight (kg)</span>
              <input type="number" inputMode="decimal" value={kg} onChange={e => setKg(e.target.value)} className="input-field" placeholder="e.g. 70" />
            </label>
          </>
        ) : (
          <>
            <label className="block">
              <span className="text-sm font-medium text-muted mb-1.5 block">Height (ft / in)</span>
              <div className="flex gap-2">
                <input type="number" inputMode="numeric" value={ft} onChange={e => setFt(e.target.value)} className="input-field" placeholder="ft" />
                <input type="number" inputMode="decimal" value={inch} onChange={e => setInch(e.target.value)} className="input-field" placeholder="in" />
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-muted mb-1.5 block">Weight (lb)</span>
              <input type="number" inputMode="decimal" value={lb} onChange={e => setLb(e.target.value)} className="input-field" placeholder="e.g. 155" />
            </label>
          </>
        )}
      </div>

      <label className="block mt-4">
        <span className="text-sm font-medium text-muted mb-1.5 block">Activity level</span>
        <select value={activity} onChange={e => setActivity(parseFloat(e.target.value))} className="input-field">
          {ACTIVITY.map(x => <option key={x.factor} value={x.factor}>{x.label}</option>)}
        </select>
      </label>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5">
          <div className="text-center mb-4">
            <p className="text-sm text-muted">Daily calories to maintain weight (TDEE)</p>
            <p className="text-4xl font-bold">{fmt(tdee)} <span className="text-lg font-medium text-muted">kcal</span></p>
            <p className="text-xs text-muted mt-1">BMR: {fmt(bmr)} kcal/day</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-line">
            <div><p className="text-muted">Lose weight (−0.5 kg/wk)</p><p className="font-semibold">{fmt(tdee - 500)} kcal</p></div>
            <div><p className="text-muted">Gain weight (+0.5 kg/wk)</p><p className="font-semibold">{fmt(tdee + 500)} kcal</p></div>
          </div>
        </div>
      )}
    </div>
  )
}
