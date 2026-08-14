// ── Central site config ──
// After buying the real domain, update SITE_URL (or set NEXT_PUBLIC_SITE_URL in Vercel).

export const SITE_NAME = 'CalcMate'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://calc-mates.com'
export const SITE_TAGLINE = 'Free Online Calculators for Everyday Life'
export const SITE_DESCRIPTION =
  'Free, fast, and accurate online calculators. Age calculator, date difference, percentage calculator and more — no signup, no ads walls, works on any device.'
export const CONTACT_EMAIL = 'hello@calc-mates.com'

// ── Publisher ──
// CalcMate is built and maintained by Digimate, a real company. Naming it
// (and linking the two sites) is what ties this site to an accountable
// real-world entity rather than leaving it anonymous.
export const PUBLISHER = {
  name: 'Digimate',
  legalName: '數伴有限公司 (Digimate Co., Ltd.)',
  url: 'https://www.digimate.tw',
  description:
    'A web design and CRM consultancy based in Taichung, Taiwan, working on website design and business process optimisation.',
  location: 'Taichung, Taiwan',
  founder: 'Chen Chien-Yu',
  founderAlias: 'Fish Chen',
} as const

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
  {
    slug: 'ideal-weight-calculator',
    name: 'Ideal Weight Calculator',
    shortName: 'Ideal Weight',
    description:
      'Estimate your ideal body weight from height and sex using the Robinson, Devine, Miller, and Hamwi formulas, plus the healthy weight range for your height.',
    keywords:
      'ideal weight calculator, ideal body weight, healthy weight for height, robinson formula, devine formula, how much should i weigh',
  },
  {
    slug: 'body-fat-calculator',
    name: 'Body Fat Calculator',
    shortName: 'Body Fat',
    description:
      'Estimate your body fat percentage with the U.S. Navy method from a few tape measurements, and see your body fat category and fat mass.',
    keywords:
      'body fat calculator, body fat percentage, us navy body fat, how to measure body fat, body fat category, lean body mass',
  },
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    shortName: 'ROI',
    description:
      'Calculate return on investment as a percentage from your cost and final value, plus the annualized return when you enter a holding period.',
    keywords:
      'roi calculator, return on investment, roi percentage, annualized return calculator, investment return, net profit calculator',
  },
  {
    slug: 'fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    shortName: 'Fuel Cost',
    description:
      'Work out the fuel cost of a trip from the distance, your vehicle’s fuel economy, and the price of fuel, in metric or imperial units.',
    keywords:
      'fuel cost calculator, gas cost calculator, trip fuel cost, cost of driving, petrol cost calculator, fuel consumption cost',
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    shortName: 'Mortgage',
    description:
      'Estimate your full monthly mortgage payment from the home price, down payment, interest rate, and term — including property tax and home insurance.',
    keywords:
      'mortgage calculator, monthly mortgage payment, home loan calculator, mortgage with taxes and insurance, down payment calculator, house payment',
  },
  {
    slug: 'savings-goal-calculator',
    name: 'Savings Goal Calculator',
    shortName: 'Savings Goal',
    description:
      'Find out how much you need to save each month to reach a savings goal by a target date, taking your starting balance and interest into account.',
    keywords:
      'savings goal calculator, how much to save per month, monthly savings calculator, reach savings target, savings plan calculator',
  },
  {
    slug: 'length-converter',
    name: 'Length Converter',
    shortName: 'Length',
    description:
      'Convert lengths and distances between millimetres, centimetres, metres, kilometres, inches, feet, yards, and miles instantly.',
    keywords:
      'length converter, distance converter, cm to inches, feet to meters, miles to km, metric to imperial length, unit converter',
  },
  {
    slug: 'ovulation-calculator',
    name: 'Ovulation Calculator',
    shortName: 'Ovulation',
    description:
      'Estimate your most fertile days, ovulation date, and next period from the first day of your last period and your average cycle length.',
    keywords:
      'ovulation calculator, fertile window calculator, fertility calculator, when do i ovulate, ovulation day, most fertile days',
  },
  {
    slug: 'weight-converter',
    name: 'Weight Converter',
    shortName: 'Weight',
    description:
      'Convert weight and mass between milligrams, grams, kilograms, ounces, pounds, and stones instantly, with every unit shown at once.',
    keywords:
      'weight converter, mass converter, kg to lbs, pounds to kg, grams to ounces, stone to kg, convert weight units',
  },
  {
    slug: 'calories-burned-calculator',
    name: 'Calories Burned Calculator',
    shortName: 'Calories Burned',
    description:
      'Estimate the calories you burn during exercise from your body weight, the activity, and how long you do it, using MET values.',
    keywords:
      'calories burned calculator, calories burned walking, calories burned running, exercise calorie calculator, met calculator, how many calories did i burn',
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    shortName: 'Simple Interest',
    description:
      'Calculate simple interest and the total amount from a principal, annual interest rate, and time period, with the exact formula shown.',
    keywords:
      'simple interest calculator, simple interest formula, principal interest rate time, calculate interest, interest on a loan, total amount with interest',
  },
  {
    slug: 'markup-calculator',
    name: 'Markup Calculator',
    shortName: 'Markup',
    description:
      'Work out selling price, profit, and profit margin from a cost and a markup percentage — and see the difference between markup and margin.',
    keywords:
      'markup calculator, margin calculator, selling price calculator, profit margin, markup vs margin, cost plus pricing',
  },
  {
    slug: 'speed-converter',
    name: 'Speed Converter',
    shortName: 'Speed',
    description:
      'Convert speed between kilometres per hour, miles per hour, metres per second, feet per second, and knots instantly.',
    keywords:
      'speed converter, kmh to mph, mph to kmh, meters per second, knots converter, convert speed units',
  },
  {
    slug: 'day-trading-fee-calculator',
    name: 'Taiwan Stock Day Trading Fee Calculator',
    shortName: 'TW Day Trading Fees',
    description:
      'Calculate brokerage commission, day-trade transaction tax, and the exact breakeven price for a Taiwan Stock Exchange (TWSE) day trade, including broker discounts and minimum fees.',
    keywords:
      'day trading fee calculator, taiwan stock day trade cost, twse day trade tax, 當沖手續費計算, 當沖證交稅, 損益兩平價, brokerage commission calculator taiwan',
  },
]

export const toolUrl = (slug: string) => `${SITE_URL}/${slug}`
