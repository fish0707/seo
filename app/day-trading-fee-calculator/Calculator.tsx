'use client'
import { useState } from 'react'

type Direction = 'long' | 'short' // long: buy then sell same day. short: sell then buy back same day.

// Brokerage commission, per leg (buy and sell each pay this). TWSE-listed
// standard rate; almost every broker discounts it, which is why the discount
// field exists rather than being baked in.
const FEE_RATE = 0.001425
// Securities transaction tax, day-trade rate — half the standard 0.3% rate,
// and only applies when the buy and sell happen on the same day in the same
// stock. It is charged on the sell leg only.
const DAY_TRADE_TAX_RATE = 0.0015
const NORMAL_TAX_RATE = 0.003

const money = (n: number) =>
  Number.isFinite(n)
    ? Math.round(n).toLocaleString('en-US')
    : '—'

export default function DayTradingFeeCalculator() {
  const [direction, setDirection] = useState<Direction>('long')
  const [buyPrice, setBuyPrice] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [shares, setShares] = useState('1000')
  const [discountPct, setDiscountPct] = useState('60')
  const [minFee, setMinFee] = useState('20')
  const [isDayTrade, setIsDayTrade] = useState(true)

  const buy = parseFloat(buyPrice)
  const sell = parseFloat(sellPrice)
  const qty = parseFloat(shares)
  const discount = parseFloat(discountPct) / 100
  const floor = parseFloat(minFee)

  const valid =
    buy > 0 && sell > 0 && qty > 0 &&
    Number.isFinite(discount) && discount > 0 && discount <= 1 &&
    Number.isFinite(floor) && floor >= 0

  let buyFee = 0, sellFee = 0, tax = 0, totalCost = 0
  let grossPL = 0, netPL = 0, breakevenMove = 0, breakevenPrice = 0

  if (valid) {
    const rawBuyFee = buy * qty * FEE_RATE * discount
    const rawSellFee = sell * qty * FEE_RATE * discount
    buyFee = Math.max(Math.round(rawBuyFee), floor)
    sellFee = Math.max(Math.round(rawSellFee), floor)

    // Tax is charged on whichever leg is the actual sale: for a long trade
    // that's the exit (sell), for a short trade the sale happens first, at entry.
    const taxRate = isDayTrade ? DAY_TRADE_TAX_RATE : NORMAL_TAX_RATE
    const saleLegPrice = direction === 'long' ? sell : buy
    tax = Math.round(saleLegPrice * qty * taxRate)

    totalCost = buyFee + sellFee + tax

    const priceMove = direction === 'long' ? sell - buy : buy - sell
    grossPL = priceMove * qty
    netPL = Math.round(grossPL - totalCost)

    // Breakeven: how far price has to move, per share, just to cover fees and
    // tax — computed independently of the entered exit price.
    breakevenMove = totalCost / qty
    breakevenPrice = direction === 'long' ? buy + breakevenMove : buy - breakevenMove
  }

  return (
    <div className="card">
      <div className="flex flex-wrap gap-2 mb-5">
        {([['long', 'Buy first (long)'], ['short', 'Sell first (short)']] as [Direction, string][]).map(
          ([k, label]) => (
            <button
              key={k}
              onClick={() => setDirection(k)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                direction === k ? 'bg-brand text-white' : 'bg-surface text-muted hover:text-ink'
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">
            {direction === 'long' ? 'Buy price (NT$)' : 'Sell price (NT$)'}
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={buyPrice}
            onChange={e => setBuyPrice(e.target.value)}
            className="input-field"
            placeholder="e.g. 100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">
            {direction === 'long' ? 'Sell price (NT$)' : 'Buy-back price (NT$)'}
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={sellPrice}
            onChange={e => setSellPrice(e.target.value)}
            className="input-field"
            placeholder="e.g. 102"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">Shares</span>
          <input
            type="number"
            inputMode="numeric"
            value={shares}
            onChange={e => setShares(e.target.value)}
            className="input-field"
            placeholder="e.g. 1000"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">
            Broker commission discount (%)
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={discountPct}
            onChange={e => setDiscountPct(e.target.value)}
            className="input-field"
            placeholder="e.g. 60 for a 6-fold (6折) discount"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted mb-1.5 block">
            Minimum commission per leg (NT$)
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={minFee}
            onChange={e => setMinFee(e.target.value)}
            className="input-field"
            placeholder="e.g. 20"
          />
        </label>
        <label className="flex items-end pb-2.5">
          <span className="flex items-center gap-2 text-sm font-medium text-muted">
            <input
              type="checkbox"
              checked={isDayTrade}
              onChange={e => setIsDayTrade(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-brand"
            />
            Same-day day trade (halved transaction tax)
          </span>
        </label>
      </div>

      {valid && (
        <div className="mt-6 bg-surface rounded-xl p-5 space-y-2">
          <div className="flex justify-between text-sm text-muted">
            <span>Buy-side commission</span>
            <span>NT${money(buyFee)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted">
            <span>Sell-side commission</span>
            <span>NT${money(sellFee)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted">
            <span>Securities transaction tax {isDayTrade ? '(day-trade, 0.15%)' : '(standard, 0.3%)'}</span>
            <span>NT${money(tax)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium pt-2 border-t border-line">
            <span>Total cost</span>
            <span>NT${money(totalCost)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted pt-2 border-t border-line">
            <span>Gross P&amp;L</span>
            <span>NT${money(grossPL)}</span>
          </div>
          <div
            className={`flex justify-between text-lg font-semibold ${
              netPL >= 0 ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            <span>Net P&amp;L after costs</span>
            <span>NT${money(netPL)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted pt-2 border-t border-line">
            <span>Breakeven price move</span>
            <span>NT${breakevenMove.toFixed(3)} / share</span>
          </div>
          <div className="flex justify-between text-sm text-muted">
            <span>Breakeven price</span>
            <span>NT${breakevenPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
