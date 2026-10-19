import { Quiz } from '../types';

export const QUIZZES_DATA: Quiz[] = [
  {
    id: 'quiz-budgeting',
    title: 'Budgeting & 50/30/20 Mastery',
    topic: 'Budgeting & Expense Management',
    category: 'budgeting',
    description: 'Test your understanding of budgeting frameworks, tracking expenses, and splitting wants from needs.',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 'b1',
        topic: 'Budgeting',
        question: 'Under the 50/30/20 budgeting rule, what category does your monthly electricity and grocery bill fall under?',
        options: [
          'Wants (Discretionary)',
          'Needs (Essential)',
          'Savings & Debt Elimination',
          'Luxury Sinking Fund'
        ],
        correctIndex: 1,
        explanation: 'Electricity and basic groceries are basic survival necessities, which belong to the 50% "Needs" bucket.'
      },
      {
        id: 'b2',
        topic: 'Budgeting',
        question: 'What is the primary benefit of "paying yourself first"?',
        options: [
          'You buy luxury clothes before paying monthly rent',
          'You guarantee that savings are prioritized before emotional spending occurs',
          'You delay tax payments to the government',
          'You immediately spend your entire paycheck on dining out'
        ],
        correctIndex: 1,
        explanation: 'Paying yourself first ensures your savings and investment goals are automatically met before any discretionary spending begins.'
      },
      {
        id: 'b3',
        topic: 'Budgeting',
        question: 'Rhea earns ₹40,000 per month. How much should she ideally limit her "Wants" (eating out, hobbies, subscriptions) to?',
        options: [
          '₹8,000 (20%)',
          '₹12,000 (30%)',
          '₹20,000 (50%)',
          '₹28,000 (70%)'
        ],
        correctIndex: 1,
        explanation: 'The 30% wants guideline suggests 0.30 × ₹40,000 = ₹12,000 maximum for lifestyle and discretionary expenditures.'
      },
      {
        id: 'b4',
        topic: 'Budgeting',
        question: 'What is a "sinking fund"?',
        options: [
          'A failed startup investment that lost all money',
          'Money saved gradually for an anticipated future expense (e.g. annual insurance premium, festival shopping)',
          'Borrowing money from friends without interest',
          'A bank penalty for insufficient balance'
        ],
        correctIndex: 1,
        explanation: 'A sinking fund is a designated savings pool built month-by-month for known upcoming expenses so you do not derail your monthly cash flow.'
      }
    ]
  },
  {
    id: 'quiz-saving',
    title: 'Emergency Funds & Smart Savings',
    topic: 'Saving Money',
    category: 'saving',
    description: 'Check how well you know emergency fund sizing, liquid assets, and saving principles.',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 's1',
        topic: 'Saving',
        question: 'How many months of essential living expenses should a typical emergency fund hold?',
        options: [
          '1 to 2 weeks',
          '1 month only',
          '3 to 6 months',
          '10 to 15 years'
        ],
        correctIndex: 2,
        explanation: 'Financial planners generally recommend 3 to 6 months of mandatory living expenses to weather sudden illness, job loss, or emergencies.'
      },
      {
        id: 's2',
        topic: 'Saving',
        question: 'Where should your emergency fund be stored?',
        options: [
          'Volatile cryptocurrency tokens',
          'Locked 10-year illiquid property investment',
          'A liquid savings account or short-term fixed deposit',
          'A lottery ticket scheme'
        ],
        correctIndex: 2,
        explanation: 'Emergency money must prioritize immediate accessibility (liquidity) and safety of principal over aggressive returns.'
      },
      {
        id: 's3',
        topic: 'Saving',
        question: 'What is the psychological 24-hour rule in personal finance?',
        options: [
          'Withdraw all bank cash within 24 hours of pay day',
          'Wait 24 hours before buying non-essential items to curb impulse shopping',
          'Pay off bank loans within 24 hours',
          'Never sleep for more than 24 hours without checking stock prices'
        ],
        correctIndex: 1,
        explanation: 'Waiting 24 hours breaks the emotional dopamine rush of impulse shopping and allows rational evaluation of the purchase.'
      },
      {
        id: 's4',
        topic: 'Saving',
        question: 'If your essential monthly living cost is ₹25,000, what is your target 4-month emergency cushion?',
        options: [
          '₹50,000',
          '₹75,000',
          '₹1,00,000',
          '₹2,50,000'
        ],
        correctIndex: 2,
        explanation: '4 months × ₹25,000 per month = ₹1,00,000 total emergency fund target.'
      }
    ]
  },
  {
    id: 'quiz-inflation',
    title: 'Inflation & Purchasing Power Check',
    topic: 'Understanding Inflation',
    category: 'inflation',
    description: 'Examine your grasp of inflation rates, real vs nominal returns, and protecting your wealth.',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 'i1',
        topic: 'Inflation',
        question: 'If inflation in India averages 6% per year, what happens to the purchasing power of ₹10,000 kept in cash at home?',
        options: [
          'It increases by 6% because paper currency becomes rarer',
          'It stays completely identical forever',
          'It decreases, meaning ₹10,000 buys fewer goods and services each year',
          'It automatically doubles every 6 years'
        ],
        correctIndex: 2,
        explanation: 'Inflation steadily erodes purchasing power. When prices increase, each rupee purchases less than it did in previous years.'
      },
      {
        id: 'i2',
        topic: 'Inflation',
        question: 'If a bank fixed deposit gives 6.5% interest, and inflation is 5.5%, what is the real return (before taxes)?',
        options: [
          '12.0%',
          '1.0%',
          '−1.0%',
          '6.0%'
        ],
        correctIndex: 1,
        explanation: 'Real Return = Nominal Interest Rate − Inflation Rate. Here: 6.5% − 5.5% = +1.0%.'
      },
      {
        id: 'i3',
        topic: 'Inflation',
        question: 'Which of the following assets has historically been most effective at beating inflation over long periods (10+ years)?',
        options: [
          'Physical currency notes under a pillow',
          'Zero-interest checking account',
          'A diversified portfolio of equity index funds & productive businesses',
          'Used mobile phones and luxury cars'
        ],
        correctIndex: 2,
        explanation: 'Equities represent ownership in businesses that can increase product prices and revenue with inflation, historically outperforming inflation over decades.'
      },
      {
        id: 'i4',
        topic: 'Inflation',
        question: 'What is "shrinkflation"?',
        options: [
          'When bank interest rates suddenly shrink to zero',
          'When a manufacturer reduces the size or quantity of a product while keeping the price unchanged',
          'When your total income shrinks due to high taxation',
          'When governments burn paper notes to shrink the money supply'
        ],
        correctIndex: 1,
        explanation: 'Shrinkflation is a covert form of inflation where product package sizes decrease (e.g. 100g biscuit packet reduced to 80g) for the same price.'
      }
    ]
  },
  {
    id: 'quiz-simple-interest',
    title: 'Simple Interest Calculations & Concepts',
    topic: 'Simple Interest',
    category: 'interest',
    description: 'Calculate simple interest, identify principal and rates, and apply the I = (P×R×T)/100 formula.',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 'si1',
        topic: 'Simple Interest',
        question: 'What is the formula for calculating Simple Interest (SI)?',
        options: [
          'SI = P × (1 + R)^T',
          'SI = (P × R × T) / 100',
          'SI = P / (R × T)',
          'SI = (P + R) × T'
        ],
        correctIndex: 1,
        explanation: 'Simple Interest is calculated with SI = (Principal × Rate × Time) / 100.'
      },
      {
        id: 'si2',
        topic: 'Simple Interest',
        question: 'Aman lends ₹20,000 for 2 years at an annual simple interest rate of 5%. What is the total interest earned?',
        options: [
          '₹1,000',
          '₹2,000',
          '₹4,000',
          '₹22,000'
        ],
        correctIndex: 1,
        explanation: 'SI = (20,000 × 5 × 2) / 100 = 200,000 / 100 = ₹2,000.'
      },
      {
        id: 'si3',
        topic: 'Simple Interest',
        question: 'In simple interest, does the interest amount earned in Year 5 differ from the interest earned in Year 1 on the same deposit?',
        options: [
          'Yes, Year 5 earns significantly more because interest accumulates',
          'No, the annual interest earned remains identical each year because it is calculated only on the original principal',
          'Yes, Year 5 earns less due to government amortization',
          'It depends on the day of the week the loan was initiated'
        ],
        correctIndex: 1,
        explanation: 'In simple interest, interest is strictly computed on the initial principal, so the interest earned each year is constant.'
      },
      {
        id: 'si4',
        topic: 'Simple Interest',
        question: 'If you invest ₹50,000 at 10% simple interest per annum, how many years will it take to earn ₹25,000 in interest?',
        options: [
          '2.5 years',
          '5 years',
          '7.5 years',
          '10 years'
        ],
        correctIndex: 1,
        explanation: 'T = (SI × 100) / (P × R) = (25,000 × 100) / (50,000 × 10) = 2,500,000 / 500,000 = 5 years.'
      }
    ]
  },
  {
    id: 'quiz-compound-interest',
    title: 'Compound Interest & Exponential Growth',
    topic: 'Compound Interest',
    category: 'interest',
    description: 'Master compound interest mathematics, the Rule of 72, and the power of time.',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 'ci1',
        topic: 'Compound Interest',
        question: 'Why does compound interest generate substantially more wealth over time than simple interest?',
        options: [
          'Because the bank pays double the nominal rate',
          'Because interest is calculated on both the original principal and the previously accumulated interest',
          'Because compound interest loans are completely tax-exempt',
          'Because simple interest decreases every year'
        ],
        correctIndex: 1,
        explanation: 'Compound interest reinvests your returns, allowing you to earn "interest on top of interest", creating an exponential snowball curve.'
      },
      {
        id: 'ci2',
        topic: 'Compound Interest',
        question: 'According to the Rule of 72, how many years will it take for an investment to double at a 12% annual compounding rate?',
        options: [
          '4 years',
          '6 years',
          '8 years',
          '12 years'
        ],
        correctIndex: 1,
        explanation: 'Years to double = 72 ÷ Interest Rate = 72 ÷ 12 = 6 years.'
      },
      {
        id: 'ci3',
        topic: 'Compound Interest',
        question: 'Between annual, quarterly, and monthly compounding at the same nominal rate (e.g. 10%), which will yield the highest final balance?',
        options: [
          'Annual compounding',
          'Quarterly compounding',
          'Monthly compounding',
          'All three produce the exact same amount'
        ],
        correctIndex: 2,
        explanation: 'More frequent compounding periods (monthly) calculate and add interest to your balance sooner, generating higher effective annual returns.'
      },
      {
        id: 'ci4',
        topic: 'Compound Interest',
        question: 'What is the single most important factor determining the outcome of compound interest?',
        options: [
          'The day of the month you open your account',
          'Time (investing duration / starting early)',
          'Hiring an expensive stockbroker',
          'Switching bank branches every year'
        ],
        correctIndex: 1,
        explanation: 'Because compounding is exponential, the exponent is Time (T). Starting early gives compounding the runway to multiply wealth dramatically.'
      }
    ]
  },
  {
    id: 'quiz-credit-scores',
    title: 'Credit Scores & CIBIL Literacy',
    topic: 'Credit Scores & Responsible Borrowing',
    category: 'credit',
    description: 'Test your understanding of credit bureaus, CIBIL scores, credit card limits, and debt health.',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 'cs1',
        topic: 'Credit Scores',
        question: 'What is the score range typically used by credit bureaus in India (like CIBIL and Experian)?',
        options: [
          '0 to 100',
          '100 to 500',
          '300 to 900',
          '500 to 1,500'
        ],
        correctIndex: 2,
        explanation: 'Credit scores in India range from 300 to 900. A score of 750 or higher is widely viewed as excellent by lenders.'
      },
      {
        id: 'cs2',
        topic: 'Credit Scores',
        question: 'What happens if you only pay the "Minimum Amount Due" on your credit card statement each month?',
        options: [
          'Your remaining balance is forgiven by the bank as a loyalty reward',
          'You avoid late fees, but the unpaid balance incurs steep interest (often 36-45% per annum)',
          'Your credit score automatically increases to 900',
          'The bank doubles your credit limit within 48 hours'
        ],
        correctIndex: 1,
        explanation: 'Paying only the minimum due avoids late payment penalty fees, but the rest of your balance is hit with high interest charges of 3-3.5% per month (36-45% APR).'
      },
      {
        id: 'cs3',
        topic: 'Credit Scores',
        question: 'To maintain an excellent credit score, what is the recommended maximum credit utilization ratio?',
        options: [
          'Below 30% of your credit limit',
          'Exactly 50% of your credit limit',
          'Between 80% and 95%',
          '100% of your credit limit every month'
        ],
        correctIndex: 0,
        explanation: 'Using under 30% of your total credit limit proves to credit bureaus that you are not credit-hungry or living beyond your means.'
      },
      {
        id: 'cs4',
        topic: 'Credit Scores',
        question: 'Which of the following is typically considered "Good Debt"?',
        options: [
          'A personal loan with 28% interest used to buy designer fashion',
          'A high-interest credit card balance spent on clubbing',
          'An affordable low-interest student education loan that boosts your career earning potential',
          'Borrowing from an unregulated instant lending app for sports betting'
        ],
        correctIndex: 2,
        explanation: 'Good debt is an investment that increases your long-term income, net worth, or career prospects at affordable, manageable interest rates.'
      }
    ]
  },
  {
    id: 'quiz-financial-iq-comprehensive',
    title: 'Financial IQ Championship Test',
    topic: 'Comprehensive Financial Literacy',
    category: 'comprehensive',
    description: 'The ultimate 6-question challenge spanning budgeting, saving, inflation, interest, and credit scores.',
    timeLimitMinutes: 7,
    questions: [
      {
        id: 'c1',
        topic: 'Budgeting',
        question: 'Under the 50/30/20 rule, if your monthly in-hand salary is ₹60,000, how much should be allocated to savings and investments?',
        options: [
          '₹6,000',
          '₹12,000',
          '₹18,000',
          '₹30,000'
        ],
        correctIndex: 1,
        explanation: '20% of ₹60,000 = 0.20 × ₹60,000 = ₹12,000.'
      },
      {
        id: 'c2',
        topic: 'Saving',
        question: 'Why should an emergency fund not be invested in high-risk stocks?',
        options: [
          'Because stock market rules prohibit savings',
          'Because stock prices fluctuate, and you might be forced to sell at a major loss during a market crash when an emergency strikes',
          'Because banks do not allow stock investors to open accounts',
          'Because emergency funds must always be in cash coins'
        ],
        correctIndex: 1,
        explanation: 'An emergency fund requires capital preservation and liquidity. You cannot risk your emergency money being down 30% right when you lose your job.'
      },
      {
        id: 'c3',
        topic: 'Inflation',
        question: 'If prices double every 12 years, what is the approximate average annual inflation rate according to the Rule of 72?',
        options: [
          '3%',
          '6%',
          '10%',
          '12%'
        ],
        correctIndex: 1,
        explanation: 'Rule of 72: Rate = 72 ÷ Years to double = 72 ÷ 12 = 6%.'
      },
      {
        id: 'c4',
        topic: 'Simple Interest',
        question: 'What is the simple interest on ₹1,00,000 at 7% per annum for 3 years?',
        options: [
          '₹7,000',
          '₹14,000',
          '₹21,000',
          '₹28,000'
        ],
        correctIndex: 2,
        explanation: 'SI = (100,000 × 7 × 3) / 100 = 2,100,000 / 100 = ₹21,000.'
      },
      {
        id: 'c5',
        topic: 'Compound Interest',
        question: 'Which investor gains the greatest advantage from compounding?',
        options: [
          'The investor who invests the largest single lump sum at age 55',
          'The investor who starts investing regular amounts at age 20 and lets it compound for 35 years',
          'The investor who tries to time stock market highs and lows daily',
          'The investor who keeps all earnings in a 0% checking account'
        ],
        correctIndex: 1,
        explanation: 'Starting early gives compounding the longest exponential curve, resulting in the highest wealth multiplication.'
      },
      {
        id: 'c6',
        topic: 'Credit Scores',
        question: 'What is the most effective way to build and maintain a 750+ CIBIL credit score over time?',
        options: [
          'Apply for 10 credit cards in one month',
          'Consistently pay 100% of your bills on time and keep credit utilization below 30%',
          'Never take any loan or credit card in your life',
          'Max out your credit card limit every month'
        ],
        correctIndex: 1,
        explanation: 'A spotless payment history and low credit utilization (<30%) account for the vast majority of your credit score calculation.'
      }
    ]
  }
];
