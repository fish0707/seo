'use client'
import { useState } from 'react'

type Row = { id: number; name: string; grade: string; credits: string }

// Standard US 4.0 scale letter → grade points.
const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, A: 4.0, 'A-': 3.7,
  'B+': 3.3, B: 3.0, 'B-': 2.7,
  'C+': 2.3, C: 2.0, 'C-': 1.7,
  'D+': 1.3, D: 1.0, 'D-': 0.7,
  F: 0.0,
}
const GRADES = Object.keys(GRADE_POINTS)

let nextId = 3

export default function GpaCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { id: 0, name: '', grade: 'A', credits: '3' },
    { id: 1, name: '', grade: 'B+', credits: '4' },
    { id: 2, name: '', grade: 'A-', credits: '3' },
  ])

  const update = (id: number, field: keyof Row, value: string) =>
    setRows(rs => rs.map(r => (r.id === id ? { ...r, [field]: value } : r)))
  const addRow = () => setRows(rs => [...rs, { id: nextId++, name: '', grade: 'A', credits: '3' }])
  const removeRow = (id: number) => setRows(rs => rs.filter(r => r.id !== id))

  let totalCredits = 0
  let totalPoints = 0
  for (const r of rows) {
    const c = parseFloat(r.credits)
    if (c > 0 && r.grade in GRADE_POINTS) {
      totalCredits += c
      totalPoints += c * GRADE_POINTS[r.grade]
    }
  }
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : NaN

  return (
    <div className="card">
      <div className="space-y-3">
        {rows.map((r, idx) => (
          <div key={r.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
            <input
              value={r.name}
              onChange={e => update(r.id, 'name', e.target.value)}
              className="input-field !py-2"
              placeholder={`Course ${idx + 1} (optional)`}
            />
            <select value={r.grade} onChange={e => update(r.id, 'grade', e.target.value)} className="input-field !py-2 !w-auto">
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <input
              type="number"
              inputMode="decimal"
              value={r.credits}
              onChange={e => update(r.id, 'credits', e.target.value)}
              className="input-field !py-2 w-20"
              placeholder="cr"
              aria-label="Credits"
            />
            <button
              onClick={() => removeRow(r.id)}
              className="text-muted hover:text-red-500 px-2 text-lg leading-none disabled:opacity-30"
              disabled={rows.length <= 1}
              aria-label="Remove course"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button onClick={addRow} className="mt-3 text-sm font-medium text-brand hover:underline">
        + Add course
      </button>

      {totalCredits > 0 && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-4xl font-bold">{gpa.toFixed(2)}</p>
          <p className="text-sm text-muted mt-1">
            GPA across {totalCredits} credit{totalCredits === 1 ? '' : 's'}
          </p>
        </div>
      )}
    </div>
  )
}
