'use client'
import { useState } from 'react'

const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const DAY = 86400000

export default function DueDateCalculator() {
  const [lmp, setLmp] = useState('')
  const [cycle, setCycle] = useState('28')

  const lmpDate = lmp ? new Date(lmp + 'T00:00:00') : null
  const cycleLen = parseInt(cycle) || 28
  const valid = lmpDate != null && !isNaN(lmpDate.getTime())

  // Naegele's rule: LMP + 280 days, adjusted for cycle length (vs 28-day default).
  const dueDate = valid ? new Date(lmpDate!.getTime() + (280 + (cycleLen - 28)) * DAY) : null

  // Gestational age today.
  let weeks = 0
  let days = 0
  let trimester = ''
  if (valid) {
    const conceptionRef = lmpDate!.getTime()
    const elapsed = Math.floor((Date.now() - conceptionRef) / DAY)
    if (elapsed >= 0) {
      weeks = Math.floor(elapsed / 7)
      days = elapsed % 7
      trimester = weeks < 13 ? 'First trimester' : weeks < 27 ? 'Second trimester' : 'Third trimester'
    }
  }
  const conception = valid ? new Date(lmpDate!.getTime() + (cycleLen - 14) * DAY) : null

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">First day of last period (LMP)</span>
          <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} className="input-field" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Average cycle length (days)</span>
          <input type="number" inputMode="numeric" value={cycle} onChange={e => setCycle(e.target.value)} className="input-field" placeholder="28" />
        </label>
      </div>

      {valid && dueDate && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-sm text-muted">Estimated due date</p>
          <p className="text-2xl font-bold mt-1">{fmtDate(dueDate)}</p>
          {weeks > 0 && (
            <p className="text-sm text-muted mt-3">
              You are about <span className="font-semibold text-ink">{weeks} weeks, {days} day{days === 1 ? '' : 's'}</span> along — {trimester}
            </p>
          )}
          {conception && (
            <p className="text-xs text-muted mt-1">Estimated conception: {conception.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          )}
        </div>
      )}
    </div>
  )
}
