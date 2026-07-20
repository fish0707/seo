'use client'
import { useState } from 'react'

type Units = 'metric' | 'imperial'

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'
const fmt = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '—'

export default function FuelCostCalculator() {
  const [units, setUnits] = useState<Units>('metric')
  const [distance, setDistance] = useState('')
  const [economy, setEconomy] = useState('')
  const [price, setPrice] = useState('')

  const d = parseFloat(distance)
  const eco = parseFloat(economy)
  const p = parseFloat(price)
  const valid = d > 0 && eco > 0 && p > 0 && [d, eco, p].every(Number.isFinite)

  // Metric: economy is L/100km, price per litre. Imperial: economy is mpg, price per gallon.
  let fuelUsed = 0
  if (valid) fuelUsed = units === 'metric' ? (d / 100) * eco : d / eco
  const total = valid ? fuelUsed * p : NaN
  const perUnit = valid ? total / d : NaN

  const volLabel = units === 'metric' ? 'litres' : 'gallons'
  const distLabel = units === 'metric' ? 'km' : 'mile'

  return (
    <div className="card">
      <div className="flex gap-2 mb-5">
        {(['metric', 'imperial'] as Units[]).map(u => (
          <button key={u} onClick={() => setUnits(u)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${units === u ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'}`}>
            {u === 'metric' ? 'Metric (km · L/100km)' : 'Imperial (mi · mpg)'}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Distance ({units === 'metric' ? 'km' : 'miles'})</span>
          <input type="number" inputMode="decimal" value={distance} onChange={e => setDistance(e.target.value)} className="input-field" placeholder={units === 'metric' ? 'e.g. 300' : 'e.g. 200'} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">{units === 'metric' ? 'Fuel use (L/100km)' : 'Fuel economy (mpg)'}</span>
          <input type="number" inputMode="decimal" value={economy} onChange={e => setEconomy(e.target.value)} className="input-field" placeholder={units === 'metric' ? 'e.g. 7.5' : 'e.g. 32'} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Price per {volLabel === 'litres' ? 'litre' : 'gallon'}</span>
          <input type="number" inputMode="decimal" value={price} onChange={e => setPrice(e.target.value)} className="input-field" placeholder="e.g. 1.75" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-4xl font-bold">${money(total)}</p>
          <p className="text-sm text-muted mt-1">Total fuel cost for the trip</p>
          <div className="grid grid-cols-2 gap-3 text-sm pt-4 mt-4 border-t border-line">
            <div><p className="text-muted">Fuel used</p><p className="font-semibold">{fmt(fuelUsed)} {volLabel}</p></div>
            <div><p className="text-muted">Cost per {distLabel}</p><p className="font-semibold">${money(perUnit)}</p></div>
          </div>
        </div>
      )}
    </div>
  )
}
