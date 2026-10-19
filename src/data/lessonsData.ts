import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  {
    id: 'budgeting-basics',
    topic: 'Budgeting & Expense Management',
    title: 'Budgeting Basics: The 50/30/20 Rule',
    subtitle: 'Master the art of allocating every rupee so your money works for your future.',
    category: 'budgeting',
    readTimeMinutes: 5,
    difficulty: 'Beginner',
    icon: 'PieChart',
    objectives: [
      'Understand the fundamental difference between fixed needs, flexible wants, and future savings.',
      'Apply the classic 50/30/20 framework to any monthly income or student allowance.',
      'Learn how tracking daily micro-expenses prevents month-end financial stress.'
    ],
    overview: 'A budget is not a financial straitjacket that prevents you from having fun—it is a proactive spending plan that gives you permission to spend without guilt while guaranteeing your future security.',
    keyConcepts: [
      {
        title: '50% for Needs (Essentials)',
        description: 'Mandatory expenses required for basic survival: rent or hostel fees, groceries, utility bills, basic commuting, and minimum insurance.',
        highlight: 'Non-negotiable expenses that keep life running smoothly.'
      },
      {
        title: '30% for Wants (Lifestyle)',
        description: 'Discretionary expenses that bring joy: eating out with friends, Netflix or Spotify subscriptions, shopping for casual clothes, weekend trips, and hobbies.',
        highlight: 'Enjoy your hard-earned money without exceeding 30% of net income.'
      },
      {
        title: '20% for Savings & Debt Elimination',
        description: 'Building your emergency safety net, monthly SIP mutual funds, recurring deposits, or paying off high-interest personal debt.',
        highlight: 'Pay yourself first before spending the rest.'
      }
    ],
    relatableExample: {
      scenario: 'Aarav earns ₹30,000 per month from his first corporate job or internship stipend. Instead of wondering where his money disappeared at the end of the month, he uses the 50/30/20 method:',
      calculation: '• Needs (50%): ₹15,000 for room rent, shared groceries, metro pass, electricity.\n• Wants (30%): ₹9,000 for weekend dining, movie tickets, and clothes.\n• Savings (20%): ₹6,000 directly auto-debited into an index mutual fund SIP & emergency savings.',
      takeaway: 'In just 1 year, Aarav effortlessly builds a financial cushion of ₹72,000 while enjoying every weekend guilt-free.'
    },
    proTip: 'Automate your savings! Schedule your 20% savings transfer within 24 hours of receiving your income so you never get tempted to spend it.',
    knowledgeCheck: {
      question: 'Under the 50/30/20 budget framework, if you receive a monthly stipend of ₹20,000, how much should be allocated to savings and investments?',
      options: [
        '₹2,000 (10%)',
        '₹4,000 (20%)',
        '₹6,000 (30%)',
        '₹10,000 (50%)'
      ],
      correctIndex: 1,
      explanation: 'Under the 50/30/20 rule, 20% of net income goes towards savings and investments. 20% of ₹20,000 is 0.20 × ₹20,000 = ₹4,000.'
    }
  },
  {
    id: 'saving-money',
    topic: 'Saving & Emergency Funds',
    title: 'Saving Money: Build Your Financial Fortress',
    subtitle: 'Why building a liquid emergency cushion is your first defensive line in finance.',
    category: 'saving',
    readTimeMinutes: 6,
    difficulty: 'Beginner',
    icon: 'ShieldCheck',
    objectives: [
      'Learn why an emergency fund prevents high-interest debt traps.',
      'Determine how many months of living expenses you need in reserve.',
      'Discover high-yield savings accounts and liquid mutual funds for parking emergency cash.'
    ],
    overview: 'Saving money is the foundation of financial independence. Without a cash reserve, any sudden car repair, medical emergency, or job transition forces people into predatory credit card debt.',
    keyConcepts: [
      {
        title: 'The Emergency Cushion (3 to 6 Months)',
        description: 'Calculate your bare-bones monthly needs (rent + food + utilities). Aim to save 3 to 6 months of this amount in a safe, instantly accessible place.',
        highlight: 'Target: 3-6 months of essential living costs.'
      },
      {
        title: 'Pay Yourself First',
        description: 'Most people spend first and try to save whatever is left over at the end of the month (which is usually zero). Flip the formula: Income − Savings = Spending.',
        highlight: 'Save before you spend, not after.'
      },
      {
        title: 'Liquidity vs Yield',
        description: 'An emergency fund is insurance, not an aggressive investment. Keep it in a high-interest savings account, short-term fixed deposit, or overnight liquid fund where you can withdraw in minutes.',
        highlight: 'Safety and rapid accessibility outweigh chasing high risk.'
      }
    ],
    relatableExample: {
      scenario: 'Priya faces a sudden laptop motherboard burnout right before her college final exams, costing ₹18,000 for immediate repair.',
      calculation: '• Scenario A (No Emergency Fund): She borrows from a high-interest instant loan app charging 36% APR, struggling for 8 months to repay ₹24,000+.\n• Scenario B (Emergency Fund): She withdraws ₹18,000 from her dedicated savings stash, pays cash on the spot, and replenishes it gradually over the next 3 months.',
      takeaway: 'Emergency funds turn financial disasters into minor temporary inconveniences.'
    },
    proTip: 'Keep your emergency fund in a separate bank account from your daily UPI/debit card account so you are not tempted to tap it for everyday shopping.',
    knowledgeCheck: {
      question: 'What is the primary purpose of an emergency fund?',
      options: [
        'To speculate on high-risk crypto tokens and fast penny stocks',
        'To cover unexpected crises (medical, repairs) without taking high-interest debt',
        'To pay for luxury vacation packages and holiday gifts',
        'To lock away money for 30 years without any withdrawal access'
      ],
      correctIndex: 1,
      explanation: 'An emergency fund exists as an accessible financial shield against unexpected hardships, preventing you from borrowing at high interest rates.'
    }
  },
  {
    id: 'understanding-inflation',
    topic: 'Inflation & Purchasing Power',
    title: 'Understanding Inflation: The Silent Wealth Destroyer',
    subtitle: 'Why keeping cash hidden in your mattress actually makes you poorer every year.',
    category: 'inflation',
    readTimeMinutes: 5,
    difficulty: 'Beginner',
    icon: 'TrendingUp',
    objectives: [
      'Understand how inflation diminishes purchasing power over time.',
      'Distinguish between nominal returns and real (inflation-adjusted) returns.',
      'Identify investment assets that historically outpace inflation.'
    ],
    overview: 'Inflation is the general rise in prices of goods and services over time. If a movie ticket costs ₹150 today and ₹165 next year, inflation is 10%. Keeping money in cash or low-interest accounts loses purchasing power steadily.',
    keyConcepts: [
      {
        title: 'Purchasing Power Erosion',
        description: 'Money has no intrinsic value; its value lies in what it can buy. If prices rise 6% annually, ₹100 buys 6% fewer groceries next year.',
        highlight: 'Cash sitting idle silently shrinks in buying power.'
      },
      {
        title: 'Nominal vs Real Returns',
        description: 'If your bank savings account pays 3% interest, but inflation is 6%, your real purchasing power return is 3% − 6% = −3% per year!',
        highlight: 'Real Return = Nominal Interest Rate − Inflation Rate.'
      },
      {
        title: 'Beating Inflation',
        description: 'To grow wealth, investments must yield more than prevailing inflation after taxes (e.g., diversified equity index funds, diversified mutual funds, gold, and real estate).',
        highlight: 'Growth assets protect your future standard of living.'
      }
    ],
    relatableExample: {
      scenario: 'In 2014, a plate of street pav bhaji or dosa cost ₹50. Today, the same plate costs ₹110 in the same neighborhood.',
      calculation: 'If Uncle Ramesh stashed ₹1,00,000 cash under his wardrobe 10 years ago at 6% annual inflation, that ₹1,00,000 today only buys what ₹55,800 bought back then. He lost over 44% of his real wealth without spending a single rupee!',
      takeaway: 'Investing is not about becoming ultra-rich; it is a necessity just to avoid becoming poorer.'
    },
    proTip: 'Whenever evaluating an investment return, always subtract 5-6% for inflation. If an asset promises 7%, you are really only gaining ~1-2% in true purchasing power.',
    knowledgeCheck: {
      question: 'If an investment provides a 7% nominal annual return and inflation is 5%, what is your approximate real annual return?',
      options: [
        '12% per year',
        '2% per year',
        '0% per year',
        '−2% per year'
      ],
      correctIndex: 1,
      explanation: 'Real return = Nominal return − Inflation rate. Here, 7% − 5% = 2% real annual gain in purchasing power.'
    }
  },
  {
    id: 'simple-interest',
    topic: 'Simple Interest',
    title: 'Simple Interest: The Foundation of Borrowing and Lending',
    subtitle: 'Learn how basic interest is calculated on the original principal sum.',
    category: 'interest',
    readTimeMinutes: 5,
    difficulty: 'Beginner',
    icon: 'Calculator',
    objectives: [
      'Master the classic formula: Simple Interest = (P × R × T) / 100.',
      'Understand where simple interest is applied in banking and short-term debt.',
      'Compare fixed linear interest growth with compounding curves.'
    ],
    overview: 'Simple interest is calculated solely on the principal amount borrowed or deposited. It does not earn interest on previous interest payments. Understanding simple interest is the first mathematical step in evaluating loans.',
    keyConcepts: [
      {
        title: 'The Universal Formula',
        description: 'I = (P × R × T) / 100, where P is Principal (original sum), R is the Annual Interest Rate (%), and T is Time (in years).',
        highlight: 'Total repayment = Principal + Simple Interest.'
      },
      {
        title: 'Linear Constant Growth',
        description: 'Because interest is only computed on the original balance, the interest earned each year remains constant throughout the loan tenure.',
        highlight: 'Year 1 earns ₹500, Year 2 earns ₹500, Year 10 earns ₹500.'
      },
      {
        title: 'When It Applies',
        description: 'Commonly used in informal loans, short-term bonds, government treasury bills, and certain automobile financing schemes.',
        highlight: 'Predictable and straightforward to calculate.'
      }
    ],
    relatableExample: {
      scenario: 'You lend ₹10,000 to a friend starting a campus merchandise store for 3 years at 8% simple interest per year.',
      calculation: '• Principal (P) = ₹10,000\n• Rate (R) = 8%\n• Time (T) = 3 years\n• Interest = (10,000 × 8 × 3) / 100 = ₹2,400.\n• Total Amount repaid = ₹10,000 + ₹2,400 = ₹12,400.',
      takeaway: 'Your money produced ₹800 each year with zero variation.'
    },
    proTip: 'When borrowing, simple interest is favorable for borrowers compared to compounding, as debt does not snowball on unpaid accumulated interest.',
    knowledgeCheck: {
      question: 'How much simple interest is earned on a principal of ₹50,000 at 6% annual interest over 2 years?',
      options: [
        '₹3,000',
        '₹6,000',
        '₹12,000',
        '₹56,000'
      ],
      correctIndex: 1,
      explanation: 'Interest = (P × R × T) / 100 = (50,000 × 6 × 2) / 100 = 600,000 / 100 = ₹6,000.'
    }
  },
  {
    id: 'compound-interest',
    topic: 'Compound Interest',
    title: 'Compound Interest: The 8th Wonder of the World',
    subtitle: 'Harness the exponential snowball effect that transforms small consistent savings into wealth.',
    category: 'interest',
    readTimeMinutes: 7,
    difficulty: 'Intermediate',
    icon: 'Sparkles',
    objectives: [
      'Grasp why compound interest earns "interest on top of interest".',
      'Discover the Rule of 72 to quickly estimate how fast money doubles.',
      'See why starting 5 years earlier makes a bigger difference than investing double the money later.'
    ],
    overview: 'Albert Einstein famously called compound interest the eighth wonder of the world: "He who understands it, earns it; he who does not, pays it." Unlike simple interest, compound interest reinvests previous earnings so your money accelerates exponentially.',
    keyConcepts: [
      {
        title: 'Interest on Interest (Exponential Growth)',
        description: 'In year one, you earn interest on your principal. In year two, you earn interest on your principal PLUS your year one interest. Over decades, this creates an unstoppable curve.',
        highlight: 'Snowball effect: each turn gathers more momentum.'
      },
      {
        title: 'The Rule of 72',
        description: 'A mental math trick to calculate how many years it takes to double your money: Divide 72 by the annual interest rate (%). At 12% return, 72 ÷ 12 = 6 years to double your investment!',
        highlight: 'Years to Double = 72 ÷ Annual Interest Rate.'
      },
      {
        title: 'Compounding Frequency',
        description: 'Interest can compound annually, quarterly, monthly, or daily. The more frequently interest compounds, the faster your balance expands.',
        highlight: 'Monthly compounding beats annual compounding.'
      }
    ],
    relatableExample: {
      scenario: 'Neha and Rohan both want to build a retirement corpus at an expected 12% annual mutual fund return:',
      calculation: '• Neha starts at age 20: Invests ₹2,000/month for just 10 years (until age 30, total invested: ₹2.4 Lakhs), then stops adding money and lets it grow until age 60.\n• Rohan starts at age 30: Invests ₹2,000/month continuously for 30 years (until age 60, total invested: ₹7.2 Lakhs).\n• At age 60: Neha has over ₹2.3 Crores, while Rohan has approximately ₹70 Lakhs!',
      takeaway: 'Neha invested 3 times LESS money than Rohan, yet ended up with over 3 times MORE wealth simply by starting 10 years earlier.'
    },
    proTip: 'Time in the market beats timing the market. Even a tiny ₹500 or ₹1,000 SIP started in college has monumental compounding power over a 30-year horizon.',
    knowledgeCheck: {
      question: 'According to the Rule of 72, approximately how many years will it take for your savings to double at an annual interest rate of 8%?',
      options: [
        '6 years',
        '9 years',
        '12 years',
        '15 years'
      ],
      correctIndex: 1,
      explanation: 'Using the Rule of 72: 72 ÷ 8 = 9 years to double your investment balance.'
    }
  },
  {
    id: 'credit-scores',
    topic: 'Credit Scores & Borrowing',
    title: 'Credit Scores & Responsible Borrowing',
    subtitle: 'Understand CIBIL scores, credit cards, and how to borrow smartly without falling into debt traps.',
    category: 'credit',
    readTimeMinutes: 6,
    difficulty: 'Intermediate',
    icon: 'CreditCard',
    objectives: [
      'Understand how credit bureaus (CIBIL, Experian) score creditworthiness between 300 and 900.',
      'Master the 5 key factors that influence your score: payment history, credit utilization, and credit age.',
      'Differentiate between Good Debt (leverage for value creation) and Toxic Debt (high-interest consumer traps).'
    ],
    overview: 'Your credit score is your financial reputation score. Landlords, banks, and mortgage lenders check this 3-digit number to decide whether to lend to you, and at what interest rate. A high score can save you lakhs of rupees in interest.',
    keyConcepts: [
      {
        title: 'The 300 to 900 Scale',
        description: 'Scores range from 300 to 900. A score of 750+ is considered excellent and grants you fast approvals, premium credit cards, and the lowest loan interest rates.',
        highlight: 'Target: Keep your score consistently above 750.'
      },
      {
        title: 'The 30% Credit Utilization Rule',
        description: 'Using too much of your available credit limit signals financial distress. If your credit card limit is ₹1,00,000, keep your statement balance below ₹30,000.',
        highlight: 'Utilization = (Total Balance ÷ Total Limit) × 100.'
      },
      {
        title: 'Good Debt vs Bad Debt',
        description: 'Good debt pays for an appreciating asset or career advancement at low interest (student education loan, affordable home loan). Bad debt finances depreciating lifestyle luxuries at high interest (credit card rollover at 42% APR).',
        highlight: 'Never finance today’s luxury on tomorrow’s promise.'
      }
    ],
    relatableExample: {
      scenario: 'Vikram and Karan both apply for a ₹30 Lakh home loan for 20 years:',
      calculation: '• Vikram has a 780 CIBIL score: Bank offers 8.5% interest rate. Total interest paid over 20 years = ₹32.4 Lakhs.\n• Karan has a 640 score due to late credit card payments: Bank charges 10.5% interest rate. Total interest paid = ₹41.9 Lakhs.',
      takeaway: 'Vikram saves ₹9.5 Lakhs in pure cash interest over the life of the loan simply by keeping a healthy credit score!'
    },
    proTip: 'Always pay your credit card bill in full before the due date. Paying just the "minimum due" triggers brutal 36% to 45% annual interest on the remaining balance.',
    knowledgeCheck: {
      question: 'If you have a credit card with a ₹60,000 monthly limit, what is the recommended maximum balance you should keep to maintain a healthy credit utilization ratio?',
      options: [
        '₹18,000 (30%)',
        '₹30,000 (50%)',
        '₹55,000 (90%)',
        '₹60,000 (100%)'
      ],
      correctIndex: 0,
      explanation: 'Financial advisors recommend keeping credit utilization below 30%. For a ₹60,000 limit, 30% of ₹60,000 is ₹18,000.'
    }
  }
];
