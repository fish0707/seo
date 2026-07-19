// ── Central site config ──
// After buying the real domain, update SITE_URL (or set NEXT_PUBLIC_SITE_URL in Vercel).

export const SITE_NAME = 'CalcMate'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://calcmate-tools.vercel.app'
export const SITE_TAGLINE = 'Free Online Calculators for Everyday Life'
export const SITE_DESCRIPTION =
  'Free, fast, and accurate online calculators. Age calculator, date difference, percentage calculator and more — no signup, no ads walls, works on any device.'
export const CONTACT_EMAIL = 'hello@calcmate.example' // TODO: replace with real inbox before AdSense review

export type Tool = {
  slug: string
  name: string
  shortName: string
  description: string
  keywords: string
}

export const TOOLS: Tool[] = [
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortName: 'Age',
    description:
      'Calculate your exact age in years, months, and days from your date of birth. Also shows total days lived and a countdown to your next birthday.',
    keywords:
      'age calculator, how old am i, calculate age from date of birth, exact age in years months days, birthday countdown',
  },
  {
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    shortName: 'Date Difference',
    description:
      'Count the days, weeks, months, and years between any two dates. Perfect for deadlines, anniversaries, project timelines, and countdowns.',
    keywords:
      'date difference calculator, days between dates, how many days until, date duration calculator, weeks between two dates',
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortName: 'Percentage',
    description:
      'Work out percentages instantly: what is X% of Y, X is what percent of Y, and percentage increase or decrease between two numbers.',
    keywords:
      'percentage calculator, percent of a number, percentage increase calculator, percentage decrease, what percent is x of y',
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    shortName: 'BMI',
    description:
      'Calculate your Body Mass Index from height and weight in metric or imperial units, see your WHO weight category, and the healthy weight range for your height.',
    keywords:
      'bmi calculator, body mass index, calculate bmi, healthy weight range, bmi chart, am i overweight',
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    shortName: 'Tip',
    description:
      'Work out the tip and total for any bill, split it between any number of people, and round the total up or down to a clean amount.',
    keywords:
      'tip calculator, gratuity calculator, how much to tip, split the bill calculator, tip and split, 15 18 20 percent tip',
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    shortName: 'Discount',
    description:
      'Find the sale price and money saved from a percentage discount, stack a second discount, and see the effective total percentage off.',
    keywords:
      'discount calculator, sale price calculator, percent off calculator, how much will i save, final price after discount, stacked discount',
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    shortName: 'Loan',
    description:
      'Calculate the monthly payment, total interest, and total cost of a loan or mortgage from the amount, annual interest rate, and term.',
    keywords:
      'loan calculator, monthly payment calculator, mortgage payment calculator, amortization, total interest paid, car loan calculator',
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    shortName: 'Compound Interest',
    description:
      'See how savings or investments grow over time with compound interest and optional regular contributions, at any compounding frequency.',
    keywords:
      'compound interest calculator, investment growth calculator, savings calculator with monthly contribution, future value, interest compounded monthly',
  },
  {
    slug: 'calorie-calculator',
    name: 'Calorie Calculator',
    shortName: 'Calorie',
    description:
      'Estimate your daily calorie needs (TDEE) from age, sex, height, weight, and activity level using the Mifflin-St Jeor equation, with targets for losing or gaining weight.',
    keywords:
      'calorie calculator, tdee calculator, daily calorie needs, maintenance calories, how many calories to lose weight, bmr calculator',
  },
]

export const toolUrl = (slug: string) => `${SITE_URL}/${slug}`
