import type { ReactNode } from 'react'

// Presentational building blocks for tool-page articles. They exist so each
// page can carry material suited to its own subject — a worked example here, a
// reference table there — instead of every page repeating the same shape.

export function WorkedExample({ title, steps, result }: {
  title: string
  steps: { label: string; value: string }[]
  result: string
}) {
  return (
    <div className="not-prose my-6 rounded-xl border border-line bg-surface p-5">
      <p className="text-sm font-semibold text-ink mb-3">{title}</p>
      <dl className="space-y-1.5 text-sm">
        {steps.map(s => (
          <div key={s.label} className="flex justify-between gap-4">
            <dt className="text-muted">{s.label}</dt>
            <dd className="font-medium text-ink text-right tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 pt-3 border-t border-line text-sm font-semibold text-brand">{result}</p>
    </div>
  )
}

export function RefTable({ caption, head, rows }: {
  caption?: string
  head: string[]
  rows: (string | number)[][]
}) {
  return (
    <div className="not-prose my-6">
      {caption && <p className="text-sm font-semibold text-ink mb-2">{caption}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-line rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-surface text-left">
              {head.map(h => <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 ? 'bg-surface/50' : ''}>
                {r.map((c, j) => (
                  <td key={j} className="px-4 py-2 border-t border-line tabular-nums">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Pitfalls({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="not-prose my-6 space-y-3">
      {items.map(it => (
        <div key={it.title} className="rounded-xl border-l-4 border-amber-400 bg-amber-50/60 px-4 py-3">
          <p className="text-sm font-semibold text-ink">{it.title}</p>
          <p className="text-sm text-slate-700 mt-1 leading-relaxed">{it.body}</p>
        </div>
      ))}
    </div>
  )
}

export function KeyNumbers({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="not-prose my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map(it => (
        <div key={it.label} className="rounded-xl border border-line p-4 text-center">
          <p className="text-xl font-bold text-ink tabular-nums">{it.value}</p>
          <p className="text-xs text-muted mt-1 leading-snug">{it.label}</p>
        </div>
      ))}
    </div>
  )
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl bg-surface border border-line px-5 py-4">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  )
}
