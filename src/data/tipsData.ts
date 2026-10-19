export interface FinancialTip {
  id: string;
  title: string;
  tip: string;
  category: string;
  readTime: string;
  authorNote: string;
}

export const FINANCIAL_TIPS: FinancialTip[] = [
  {
    id: 'tip-1',
    title: 'The 24-Hour Rule for Impulse Purchases',
    tip: 'Before buying any non-essential item over ₹1,500, wait 24 hours. Most emotional purchase impulses fade within a day, saving an average student or young professional ₹15,000+ each year.',
    category: 'Budgeting',
    readTime: '1 min',
    authorNote: 'Breaks emotional dopamine spending habits.'
  },
  {
    id: 'tip-2',
    title: 'Compound Interest: Time > Timing',
    tip: 'Investing ₹2,000 monthly starting at age 20 yields vastly more wealth by age 50 than starting with ₹5,000 monthly at age 35. You cannot buy back lost compounding time.',
    category: 'Compound Interest',
    readTime: '1 min',
    authorNote: 'The exponential curve needs runway to explode.'
  },
  {
    id: 'tip-3',
    title: 'Inflation: The Silent 6% Wealth Leak',
    tip: 'If inflation in India averages 6% per year, ₹1,00,000 kept idle in a locker will only have the purchasing power of roughly ₹55,000 in 10 years. Always let money work faster than inflation.',
    category: 'Inflation',
    readTime: '1 min',
    authorNote: 'Real return = Nominal interest minus inflation.'
  },
  {
    id: 'tip-4',
    title: 'The 30% Credit Utilization Benchmark',
    tip: 'Keep your credit card balance below 30% of your total limit. If your card limit is ₹50,000, try to spend under ₹15,000 before the statement generation date to maintain an outstanding credit/CIBIL score above 750.',
    category: 'Credit Scores',
    readTime: '1 min',
    authorNote: 'Demonstrates financial self-restraint to bureaus.'
  },
  {
    id: 'tip-5',
    title: 'Build a 3-Month Emergency Shield',
    tip: 'Before jumping into speculative investments, keep 3 to 6 months of mandatory living expenses in a liquid savings account or recurring deposit for unforeseen moments.',
    category: 'Saving',
    readTime: '1 min',
    authorNote: 'Turns emergencies into manageable inconveniences.'
  },
  {
    id: 'tip-6',
    title: 'Beware of "Minimum Amount Due" Traps',
    tip: 'Credit card companies love when you pay just the minimum amount due because the remaining balance accrues 36% to 45% annual interest. Always pay the "Total Amount Due" in full.',
    category: 'Credit Scores',
    readTime: '1 min',
    authorNote: 'Avoid revolving high-interest debt at all costs.'
  }
];
