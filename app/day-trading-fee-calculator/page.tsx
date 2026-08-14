import type { Metadata } from 'next'
import { TOOLS, toolUrl } from '@/lib/site'
import ToolShell, { type Faq, type Source } from '@/components/ToolShell'
import { KeyNumbers, Pitfalls, RefTable, WorkedExample } from '@/components/content'
import Calculator from './Calculator'

const tool = TOOLS.find(t => t.slug === 'day-trading-fee-calculator')!

export const metadata: Metadata = {
  title: 'Taiwan Stock Day Trading Fee Calculator — TWSE Commission, Tax & Breakeven',
  description:
    'Calculate the exact brokerage commission, day-trade transaction tax, and breakeven price for a Taiwan Stock Exchange (TWSE) day trade, including broker discounts and minimum fees per leg.',
  keywords: tool.keywords,
  alternates: { canonical: toolUrl(tool.slug) },
  openGraph: {
    title: 'Taiwan Stock Day Trading Fee Calculator — TWSE Commission, Tax & Breakeven',
    description: tool.description,
    url: toolUrl(tool.slug),
  },
}

const faqs: Faq[] = [
  {
    q: 'How much does a Taiwan stock day trade cost in fees?',
    a: 'Two brokerage commissions (one on the buy, one on the sell) plus one securities transaction tax on the sell leg. The standard commission rate is 0.1425% per leg, almost always discounted by the broker, with a minimum fee per leg (commonly NT$20). The tax is 0.15% for a same-day day trade — half the standard 0.3% rate that applies to an ordinary sale.',
  },
  {
    q: 'Why is the day-trade tax half the normal rate?',
    a: 'Taiwan cut the securities transaction tax on same-day day trades from 0.3% to 0.15% to encourage liquidity. It only applies when the buy and sell happen on the same trading day in the same stock — an ordinary sale held overnight or longer pays the full 0.3% rate. Tax incentives can be extended, changed, or allowed to lapse by future legislation, so confirm the current rate with your broker or the Taiwan Stock Exchange before relying on it.',
  },
  {
    q: 'What is the breakeven price in day trading?',
    a: 'The price the stock has to move, per share, just to cover commissions and tax — before you make a single dollar of actual profit. It is calculated independently of your entry and exit prices: total fees and tax, divided by the number of shares. A trade that "wins" by less than the breakeven move is a loss once costs are included.',
  },
  {
    q: 'Does a broker discount change the tax as well as the commission?',
    a: 'No. Broker discounts only apply to the commission (0.1425% rate), which is negotiable between broker and client. The transaction tax is set by law and cannot be discounted — every broker charges the same 0.15% day-trade rate or 0.3% standard rate.',
  },
  {
    q: 'Why is there a minimum fee per leg?',
    a: 'Most Taiwanese brokers set a floor (commonly NT$20) below which they will not discount the commission further, because the trade size is too small for the percentage rate to cover their own costs. On a small trade this minimum can dominate the total cost, which is why it is a separate input here rather than folded into the discount.',
  },
  {
    q: 'Can I use this for a short (sell-first) day trade?',
    a: 'Yes. Switch to "Sell first (short)" and the tax calculation moves to the correct leg — the transaction tax is always charged on the sale, and in a short trade the sale happens at entry, not at exit. Getting this backwards only changes the result by the small amount the two prices differ, but the formula is only correct when it is applied to the right leg.',
  },
]

const sources: Source[] = [
  {
    label: 'Fee schedule and related regulations',
    publisher: 'Taiwan Stock Exchange (TWSE)',
    href: 'https://www.twse.com.tw/en/',
  },
  {
    label: 'Securities Transaction Tax Act',
    publisher: 'Laws & Regulations Database of the Republic of China (Taiwan)',
    href: 'https://law.moj.gov.tw/ENG/LawClass/LawAll.aspx?pcode=G0340064',
  },
]

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      sources={sources}
      article={
        <>
          <h2>Two commissions, one tax, every trade</h2>
          <p>
            A day trade is a round trip — buy and sell the same stock on the same day — and Taiwan
            charges for both legs of it. The broker takes a commission on the buy and another on the
            sell. The government takes a securities transaction tax once, on whichever leg is the
            actual sale. None of this is optional or negotiable away entirely: the commission rate can
            be discounted, but the tax cannot.
          </p>

          <KeyNumbers
            items={[
              { value: '0.1425%', label: 'Standard commission rate, per leg' },
              { value: '0.15%', label: 'Day-trade transaction tax (sell leg)' },
              { value: '0.3%', label: 'Standard transaction tax (non-day-trade sale)' },
              { value: 'NT$20', label: 'Typical minimum commission per leg' },
            ]}
          />

          <h2>Working example</h2>
          <p>
            Buy 1,000 shares at NT$100, sell at NT$102 the same day, with a 60% broker discount
            (6折) and a NT$20 minimum per leg:
          </p>
          <WorkedExample
            title="1,000 shares, NT$100 → NT$102, 60% discount, same-day"
            steps={[
              { label: 'Buy commission: 100 × 1,000 × 0.1425% × 0.6', value: 'NT$86' },
              { label: 'Sell commission: 102 × 1,000 × 0.1425% × 0.6', value: 'NT$87' },
              { label: 'Day-trade tax: 102 × 1,000 × 0.15%', value: 'NT$153' },
              { label: 'Total cost', value: 'NT$326' },
              { label: 'Gross profit: (102 − 100) × 1,000', value: 'NT$2,000' },
            ]}
            result="Net profit after costs: NT$1,674 — costs consumed about 16% of the gross move."
          />
          <p>
            The same trade without the day-trade tax cut — held overnight instead — would pay NT$306
            in tax instead of NT$153, since the standard 0.3% rate applies. The commission is unchanged
            either way; only the tax leg moves.
          </p>

          <h2>The breakeven price is not zero</h2>
          <p>
            Because both legs carry a commission and the sale carries a tax, a day trade needs the
            price to move in your favor by more than nothing just to come out even. That breakeven
            move is what the calculator reports separately from your entered exit price — it is a
            property of the trade size and cost structure, not of how the trade actually went.
          </p>
          <p>
            On a small trade, the minimum fee per leg can matter more than the percentage rate. Two
            NT$20 minimums plus tax on a 100-share trade at NT$50 is a much larger fraction of the
            position than the same math on a 1,000-share trade at NT$100 — the percentage rate never
            even engages, because the calculated commission falls below the floor.
          </p>

          <Pitfalls
            items={[
              {
                title: 'Comparing gross P&L instead of net',
                body: 'A trade that "made money" on the raw price difference can still be a net loss once both commissions and the tax are subtracted — especially on a tight stop where the price barely covered the breakeven move.',
              },
              {
                title: 'Forgetting the tax is charged on the sale, not the buy',
                body: 'For a short (sell-first) trade, the tax applies to the entry price, not the exit. Using the wrong leg understates or overstates the tax depending on which way the price moved between entry and exit.',
              },
              {
                title: 'Assuming the day-trade tax rate never changes',
                body: 'The 0.15% rate is a policy incentive, not a permanent feature of the tax code. Confirm the current rate before trading — this calculator uses the rate current at the time it was written and does not fetch it live.',
              },
            ]}
          />

          <h2>Minimum tick sizes</h2>
          <p>
            TWSE prices move in fixed increments that widen as the price rises, which is why exchange
            quotes never show fractions smaller than the applicable tick — worth knowing when setting
            an entry or stop price.
          </p>
          <RefTable
            caption="TWSE minimum price movement (tick size) by price band"
            head={['Price (NT$)', 'Tick size']}
            rows={[
              ['Under 10', '0.01'],
              ['10 – 50', '0.05'],
              ['50 – 100', '0.1'],
              ['100 – 500', '0.5'],
              ['500 – 1,000', '1'],
              ['1,000 and above', '5'],
            ]}
          />
        </>
      }
    >
      <Calculator />
    </ToolShell>
  )
}
