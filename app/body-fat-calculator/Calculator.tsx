'use client'
import { useState } from 'react'

type Sex = 'male' | 'female'

const fmt = (n: number, d = 1) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: d }) : '—'

// American Council on Exercise category bands.
function category(bf: number, sex: Sex): string {
  const bands = sex === 'male'
    ? [[5, 'Essential fat'], [13, 'Athletes'], [17, 'Fitness'], [24, 'Average'], [Infinity, 'Above average']]
    : [[13, 'Essential fat'], [20, 'Athletes'], [24, 'Fitness'], [31, 'Average'], [Infinity, 'Above average']]
  for (const [max, label] of bands as [number, string][]) if (bf <= max) return label
  return '—'
}

export default function BodyFatCalculator() {
  const [sex, setSex] = useState<Sex>('male')
  const [height, setHeight] = useState('')
  const [neck, setNeck] = useState('')
  const [waist, setWaist] = useState('')
  const [hip, setHip] = useState('')
  const [weight, setWeight] = useState('')

  const h = parseFloat(height)
  const n = parseFloat(neck)
  const w = parseFloat(waist)
  const hp = parseFloat(hip)
  const female = sex === 'female'

  const baseValid = h > 0 && n > 0 && w > 0 && (female ? hp > 0 : true)
  // US Navy method (metric, cm). Requires waist-neck (>0) for men, waist+hip-neck for women.
  let bf = NaN
  if (baseValid) {
    if (female) {
      const val = w + hp - n
      if (val > 0) bf = 495 / (1.29579 - 0.35004 * Math.log10(val) + 0.22100 * Math.log10(h)) - 450
    } else {
      const val = w - n
      if (val > 0) bf = 495 / (1.0324 - 0.19077 * Math.log10(val) + 0.15456 * Math.log10(h)) - 450
    }
  }
  const valid = Number.isFinite(bf) && bf > 0 && bf < 75

  const wt = parseFloat(weight)
  const fatMass = valid && wt > 0 ? (bf / 100) * wt : NaN
  const leanMass = valid && wt > 0 ? wt - fatMass : NaN

  return (
    <div className="card">
      <div className="flex gap-2 mb-5">
        {(['male', 'female'] as Sex[]).map(s => (
          <button key={s} onClick={() => setSex(s)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${sex === s ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'}`}>
            {s}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted mb-3">All measurements in centimetres. Measure the neck below the larynx, the waist at the navel{female ? ', and the hips at the widest point' : ''}.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Height (cm)</span>
          <input type="number" inputMode="decimal" value={height} onChange={e => setHeight(e.target.value)} className="input-field" placeholder="e.g. 175" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Neck (cm)</span>
          <input type="number" inputMode="decimal" value={neck} onChange={e => setNeck(e.target.value)} className="input-field" placeholder="e.g. 38" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Waist (cm)</span>
          <input type="number" inputMode="decimal" value={waist} onChange={e => setWaist(e.target.value)} className="input-field" placeholder="e.g. 85" />
        </label>
        {female && (
          <label className="block">
            <span className="text-sm font-medium text-muted mb-1.5 block">Hip (cm)</span>
            <input type="number" inputMode="decimal" value={hip} onChange={e => setHip(e.target.value)} className="input-field" placeholder="e.g. 95" />
          </label>
        )}
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Weight (kg) — optional</span>
          <input type="number" inputMode="decimal" value={weight} onChange={e => setWeight(e.target.value)} className="input-field" placeholder="e.g. 70" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-4xl font-bold">{fmt(bf)}%</p>
          <p className="text-sm font-semibold text-brand mt-1">{category(bf, sex)}</p>
          {Number.isFinite(fatMass) && (
            <div className="grid grid-cols-2 gap-3 text-sm pt-4 mt-4 border-t border-line">
              <div><p className="text-muted">Fat mass</p><p className="font-semibold">{fmt(fatMass)} kg</p></div>
              <div><p className="text-muted">Lean mass</p><p className="font-semibold">{fmt(leanMass)} kg</p></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
