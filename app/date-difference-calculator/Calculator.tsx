'use client'
import { useState } from 'react'

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear()
  let months = to.getMonth() - from.getMonth()
  let days = to.getDate() - from.getDate()
  if (days < 0) {
    months--
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }
  return { years, months, days }
}

const utcDays = (a: Date, b: Date) =>
  Math.floor(
    (Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) -
      Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) /
      86400000
  )

export default function DateDifferenceCalculator() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [includeEnd, setIncludeEnd] = useState(false)

  let result = null
  if (start && end) {
    let a = new Date(start + 'T00:00:00')
    let b = new Date(end + 'T00:00:00')
    if (!isNaN(a.getTime()) && !isNaN(b.getTime())) {
      if (a > b) [a, b] = [b, a]
      const extra = includeEnd ? 1 : 0
      const totalDays = utcDays(a, b) + extra
      const { years, months, days } = diffYMD(a, b)
      result = {
        totalDays,
        weeks: Math.floor(totalDays / 7),
        weekDays: totalDays % 7,
        years,
        months,
        days: days + extra,
      }
    }
  }

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Start date</span>
          <input type="date" value={start} onChange={e => setStart(e.target.value)} className="input-field" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">End date</span>
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="input-field" />
        </label>
      </div>
      <label className="flex items-center gap-2 mt-4 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={includeEnd}
          onChange={e => setIncludeEnd(e.target.checked)}
          className="w-4 h-4 accent-brand"
        />
        Include the end date in the count (adds 1 day)
      </label>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-surface rounded-xl p-5 text-center">
            <p className="text-sm text-muted mb-1">Difference</p>
            <p className="text-3xl font-bold">
              {result.totalDays.toLocaleString()}{' '}
              <span className="text-lg font-medium text-muted">days</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-surface rounded-xl py-3 px-2">
              <p className="font-semibold">
                {result.weeks.toLocaleString()} weeks{result.weekDays > 0 && ` ${result.weekDays} days`}
              </p>
              <p className="text-xs text-muted mt-0.5">in weeks</p>
            </div>
            <div className="bg-surface rounded-xl py-3 px-2">
              <p className="font-semibold">
                {result.years > 0 && `${result.years} yr `}
                {result.months > 0 && `${result.months} mo `}
                {result.days} d
              </p>
              <p className="text-xs text-muted mt-0.5">in years / months / days</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
