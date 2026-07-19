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
  {
    slug: 'sales-tax-calculator',
    name: 'Sales Tax Calculator',
    shortName: 'Sales Tax',
    description:
      'Add sales tax to a price to get the tax amount and total, or work backwards from a tax-inclusive total to find the pre-tax price and tax paid.',
    keywords:
      'sales tax calculator, add tax to price, reverse sales tax calculator, price plus tax, tax inclusive total, how much is tax',
  },
  {
    slug: 'salary-calculator',
    name: 'Salary Calculator',
    shortName: 'Salary',
    description:
      'Convert pay between hourly, daily, weekly, monthly, and annual amounts based on your hours per week and weeks worked per year.',
    keywords:
      'salary calculator, hourly to annual salary, annual to hourly, convert wage, yearly salary from hourly, hourly wage calculator',
  },
  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    shortName: 'GPA',
    description:
      'Calculate your weighted grade point average on a 4.0 scale from your course grades and credit hours, with each course counted by its weight.',
    keywords:
      'gpa calculator, grade point average calculator, weighted gpa, 4.0 scale gpa, calculate gpa from credits, college gpa',
  },
  {
    slug: 'due-date-calculator',
    name: 'Pregnancy Due Date Calculator',
    shortName: 'Due Date',
    description:
      'Estimate your pregnancy due date from your last menstrual period using Naegele’s rule, adjusted for your cycle length, plus how many weeks along you are.',
    keywords:
      'due date calculator, pregnancy due date, estimated delivery date, naegele rule, how many weeks pregnant, edd calculator',
  },
  {
    slug: 'hours-calculator',
    name: 'Hours Calculator',
    shortName: 'Hours',
    description:
      'Work out the time between a start and end time, subtract an unpaid break, and get the duration in hours and minutes and as a decimal for timesheets.',
    keywords:
      'hours calculator, time duration calculator, hours between two times, work hours calculator, timesheet calculator, time card calculator',
  },
  {
    slug: 'pace-calculator',
    name: 'Pace Calculator',
    shortName: 'Pace',
    description:
      'Calculate your running pace per kilometre or mile from distance and time, and see your average speed for training and race planning.',
    keywords:
      'pace calculator, running pace calculator, pace per km, pace per mile, average speed calculator, marathon pace',
  },
  {
    slug: 'temperature-converter',
    name: 'Temperature Converter',
    shortName: 'Temperature',
    description:
      'Convert temperatures instantly between Celsius, Fahrenheit, and Kelvin, with the exact conversion formulas shown for each pair.',
    keywords:
      'temperature converter, celsius to fahrenheit, fahrenheit to celsius, kelvin converter, c to f, convert temperature',
  },
]

export const toolUrl = (slug: string) => `${SITE_URL}/${slug}`
