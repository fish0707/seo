'use client'
import { useState } from 'react'

const DAY = 86400000
const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })

export default function OvulationCalculator() {
  const [lmp, setLmp] = useState('')
  const [cycle, setCycle] = useState('28')

  const lmpDate = lmp ? new Date(lmp + 'T00:00:00') : null
  const cycleLen = parseInt(cycle) || 28
  const valid = lmpDate != null && !isNaN(lmpDate.getTime()) && cycleLen >= 20 && cycleLen <= 45

  // Ovulation ~14 days before the next period. Fertile window = 5 days before to 1 day after.
  const ovulation = valid ? new Date(lmpDate!.getTime() + (cycleLen - 14) * DAY) : null
  const fertileStart = ovulation ? new Date(ovulation.getTime() - 5 * DAY) : null
  const fertileEnd = ovulation ? new Date(ovulation.getTime() + 1 * DAY) : null
  const nextPeriod = valid ? new Date(lmpDate!.getTime() + cycleLen * DAY) : null

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">First day of last period</span>
          <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} className="input-field" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Average cycle length (days)</span>
          <input type="number" inputMode="numeric" value={cycle} onChange={e => setCycle(e.target.value)} className="input-field" placeholder="28" />
        </label>
      </div>

      {valid && ovulation && fertileStart && fertileEnd && nextPeriod && (
        <div className="mt-6 bg-surface rounded-xl p-5">
          <div className="text-center mb-4">
            <p className="text-sm text-muted">Estimated ovulation day</p>
            <p className="text-2xl font-bold mt-1">{fmtDate(ovulation)}</p>
          </div>
          <div className="space-y-1.5 text-sm pt-4 border-t border-line">
            <div className="flex justify-between"><span className="text-muted">Most fertile window</span><span className="font-semibold text-right">{fmtDate(fertileStart)} – {fmtDate(fertileEnd)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Next period expected</span><span className="font-semibold">{fmtDate(nextPeriod)}</span></div>
          </div>
        </div>
      )}
      {lmp && !valid && (
        <p className="mt-4 text-sm text-muted text-center">Enter a cycle length between 20 and 45 days.</p>
      )}
    </div>
  )
}
