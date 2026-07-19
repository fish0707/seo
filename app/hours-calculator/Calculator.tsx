'use client'
import { useState } from 'react'

// Parse "HH:MM" into minutes since midnight.
const toMinutes = (t: string): number | null => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t)
  if (!m) return null
  const h = parseInt(m[1]), min = parseInt(m[2])
  if (h > 23 || min > 59) return null
  return h * 60 + min
}

export default function HoursCalculator() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [breakMin, setBreakMin] = useState('')

  const s = toMinutes(start)
  const e = toMinutes(end)
  const brk = parseFloat(breakMin) || 0
  const valid = s != null && e != null

  let total = 0
  if (valid) {
    // Handle overnight shifts by wrapping past midnight.
    let diff = e! - s!
    if (diff < 0) diff += 24 * 60
    total = Math.max(0, diff - brk)
  }
  const h = Math.floor(total / 60)
  const m = Math.round(total % 60)
  const decimal = total / 60

  return (
    <div className="card">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Start time</span>
          <input type="time" value={start} onChange={e => setStart(e.target.value)} className="input-field" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">End time</span>
          <input type="time" value={end} onChange={e => setEnd(e.target.value)} className="input-field" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Break (minutes)</span>
          <input type="number" inputMode="numeric" value={breakMin} onChange={e => setBreakMin(e.target.value)} className="input-field" placeholder="e.g. 30" />
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-4xl font-bold">{h}h {m}m</p>
          <p className="text-sm text-muted mt-1">{decimal.toFixed(2)} hours (decimal)</p>
          {e! - s! < 0 && <p className="text-xs text-muted mt-2">Overnight shift detected — end time is on the next day.</p>}
        </div>
      )}
    </div>
  )
}
