'use client'
import { useState } from 'react'

type Mode = 'of' | 'is' | 'change'

const fmt = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString('en-US', { maximumFractionDigits: 4 })
    : '—'

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('of')
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const x = parseFloat(a)
  const y = parseFloat(b)
  const hasInput = a !== '' && b !== '' && !isNaN(x) && !isNaN(y)

  let answer = ''
  let detail = ''
  if (hasInput) {
    if (mode === 'of') {
      answer = fmt((x / 100) * y)
      detail = `${fmt(x)}% of ${fmt(y)} = ${answer}`
    } else if (mode === 'is') {
      answer = y === 0 ? '—' : `${fmt((x / y) * 100)}%`
      detail = y === 0 ? 'Cannot divide by zero' : `${fmt(x)} is ${answer} of ${fmt(y)}`
    } else {
      if (x === 0) {
        answer = '—'
        detail = 'Percentage change from zero is undefined'
      } else {
        const change = ((y - x) / Math.abs(x)) * 100
        answer = `${change >= 0 ? '+' : ''}${fmt(change)}%`
        detail = `From ${fmt(x)} to ${fmt(y)} is a ${change >= 0 ? 'increase' : 'decrease'} of ${fmt(Math.abs(change))}%`
      }
    }
  }

  const MODES: { key: Mode; label: string }[] = [
    { key: 'of', label: 'What is X% of Y?' },
    { key: 'is', label: 'X is what % of Y?' },
    { key: 'change', label: '% change from X to Y' },
  ]

  const labels: Record<Mode, [string, string]> = {
    of: ['Percentage (X%)', 'Number (Y)'],
    is: ['Part (X)', 'Whole (Y)'],
    change: ['Original value (X)', 'New value (Y)'],
  }

  return (
    <div className="card">
      <div className="flex flex-wrap gap-2 mb-5">
        {MODES.map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              mode === m.key ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">{labels[mode][0]}</span>
          <input
            type="number"
            inputMode="decimal"
            value={a}
            onChange={e => setA(e.target.value)}
            className="input-field"
            placeholder="e.g. 25"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">{labels[mode][1]}</span>
          <input
            type="number"
            inputMode="decimal"
            value={b}
            onChange={e => setB(e.target.value)}
            className="input-field"
            placeholder="e.g. 200"
          />
        </label>
      </div>

      {hasInput && (
        <div className="mt-6 bg-surface rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">{answer}</p>
          <p className="text-sm text-muted mt-1">{detail}</p>
        </div>
      )}
    </div>
  )
}
