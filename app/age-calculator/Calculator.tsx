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

export default function AgeCalculator() {
  const [dob, setDob] = useState('')
  const [asOf, setAsOf] = useState('')

  const birth = dob ? new Date(dob + 'T00:00:00') : null
  const ref = asOf ? new Date(asOf + 'T00:00:00') : new Date()
  const valid = birth !== null && !isNaN(birth.getTime()) && birth <= ref

  let result = null
  if (valid && birth) {
    const { years, months, days } = diffYMD(birth, ref)
    const totalDays = utcDays(birth, ref)
    let nextBirthday = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday <= ref) {
      nextBirthday = new Date(ref.getFullYear() + 1, birth.getMonth(), birth.getDate())
    }
    result = {
      years,
      months,
      days,
      totalDays,
      totalWeeks: Math.floor(totalDays / 7),
      totalMonths: years * 12 + months,
      daysToBirthday: utcDays(ref, nextBirthday),
      weekday: birth.toLocaleDateString('en-US', { weekday: 'long' }),
    }
  }

  return (
    <div className="card">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Date of birth</span>
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="input-field"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Age at date (optional, defaults to today)</span>
          <input
            type="date"
            value={asOf}
            onChange={e => setAsOf(e.target.value)}
            className="input-field"
          />
        </label>
      </div>

      {dob && !valid && (
        <p className="mt-4 text-sm text-red-600">Please enter a valid date of birth that is not in the future.</p>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-surface rounded-xl p-5 text-center">
            <p className="text-sm text-muted mb-1">Your exact age</p>
            <p className="text-3xl font-bold">
              {result.years} <span className="text-lg font-medium text-muted">years</span>{' '}
              {result.months} <span className="text-lg font-medium text-muted">months</span>{' '}
              {result.days} <span className="text-lg font-medium text-muted">days</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              [result.totalMonths.toLocaleString(), 'total months'],
              [result.totalWeeks.toLocaleString(), 'total weeks'],
              [result.totalDays.toLocaleString(), 'total days'],
              [String(result.daysToBirthday), 'days to next birthday'],
            ].map(([v, label]) => (
              <div key={label} className="bg-surface rounded-xl py-3 px-2">
                <p className="font-semibold">{v}</p>
                <p className="text-xs text-muted mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted text-center">You were born on a {result.weekday}.</p>
        </div>
      )}
    </div>
  )
}
