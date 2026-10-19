import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  Sparkles,
  PieChart,
  HelpCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Info,
  DollarSign,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Currency, UserProgress } from '../../types';
import { formatCurrency, formatCompactNumber } from '../../utils/formatters';

interface CalculatorsViewProps {
  currency: Currency;
  onSimulationRun: () => void;
  onAskTutorWithCalculation: (text: string) => void;
}

export const CalculatorsView: React.FC<CalculatorsViewProps> = ({
  currency,
  onSimulationRun,
  onAskTutorWithCalculation,
}) => {
  const [activeTab, setActiveTab] = useState<'compound' | 'inflation' | 'budget'>('compound');

  // Compound Interest State
  const [initialAmount, setInitialAmount] = useState<number>(25000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [annualRate, setAnnualRate] = useState<number>(12);
  const [durationYears, setDurationYears] = useState<number>(15);
  const [frequency, setFrequency] = useState<number>(12); // 12 = monthly, 4 = quarterly, 1 = annually

  // Inflation Calculator State
  const [inflationPresentAmount, setInflationPresentAmount] = useState<number>(100000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [inflationYears, setInflationYears] = useState<number>(10);

  // 50/30/20 Calculator State
  const [monthlyIncome, setMonthlyIncome] = useState<number>(35000);

  // Compound Interest Math Calculation
  const compoundResults = useMemo(() => {
    const P = Math.max(0, initialAmount);
    const PMT = Math.max(0, monthlyContribution);
    const r = Math.max(0, annualRate) / 100;
    const t = Math.max(1, durationYears);
    const n = frequency; // periods per year

    // Periodic rate
    const i = r / n;
    const totalPeriods = n * t;

    // Future Value of initial principal
    const fvPrincipal = P * Math.pow(1 + i, totalPeriods);

    // Future Value of periodic contributions
    const fvAnnuity = i > 0 ? (PMT * (Math.pow(1 + i, totalPeriods) - 1)) / i : PMT * totalPeriods;

    const totalBalance = fvPrincipal + fvAnnuity;
    const totalInvested = P + PMT * totalPeriods;
    const totalGrowth = Math.max(0, totalBalance - totalInvested);

    // Rule of 72
    const yearsToDouble = r > 0 ? (72 / (r * 100)).toFixed(1) : '∞';

    // Year-by-year data points for chart
    const chartData = [];
    for (let y = 0; y <= t; y++) {
      const periods = n * y;
      const fvP = P * Math.pow(1 + i, periods);
      const fvA = i > 0 ? (PMT * (Math.pow(1 + i, periods) - 1)) / i : PMT * periods;
      const balance = fvP + fvA;
      const invested = P + PMT * periods;
      const growth = Math.max(0, balance - invested);

      chartData.push({
        year: `Yr ${y}`,
        invested: Math.round(invested),
        growth: Math.round(growth),
        balance: Math.round(balance),
      });
    }

    return {
      totalBalance,
      totalInvested,
      totalGrowth,
      yearsToDouble,
      chartData,
    };
  }, [initialAmount, monthlyContribution, annualRate, durationYears, frequency]);

  // Inflation Math
  const inflationResults = useMemo(() => {
    const P = Math.max(0, inflationPresentAmount);
    const r = Math.max(0, inflationRate) / 100;
    const t = Math.max(1, inflationYears);

    // Future cost of the same basket of goods
    const futureCost = P * Math.pow(1 + r, t);

    // Purchasing power of current cash in future
    const purchasingPower = P / Math.pow(1 + r, t);

    const chartData = [];
    for (let y = 0; y <= t; y += Math.max(1, Math.floor(t / 5))) {
      const cost = P * Math.pow(1 + r, y);
      const power = P / Math.pow(1 + r, y);
      chartData.push({
        year: `Year ${y}`,
        cost: Math.round(cost),
        purchasingPower: Math.round(power),
      });
    }

    return {
      futureCost,
      purchasingPower,
      lossInPower: P - purchasingPower,
      chartData,
    };
  }, [inflationPresentAmount, inflationRate, inflationYears]);

  // 50/30/20 Budget Math
  const budgetResults = useMemo(() => {
    const income = Math.max(0, monthlyIncome);
    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    return {
      needs,
      wants,
      savings,
    };
  }, [monthlyIncome]);

  return (
    <div className="space-y-6 md:space-y-8 pb-12">
      {/* Top Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => {
            setActiveTab('compound');
            onSimulationRun();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === 'compound'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Compound Interest</span>
        </button>

        <button
          onClick={() => setActiveTab('inflation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === 'inflation'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Inflation Impact</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === 'budget'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>50/30/20 Budget Allocator</span>
        </button>
      </div>

      {/* TAB 1: COMPOUND INTEREST CALCULATOR */}
      {activeTab === 'compound' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Investment Parameters</h3>
                    <p className="text-xs text-slate-500">Fine-tune your compounding growth</p>
                  </div>
                </div>
              </div>

              {/* Input 1: Initial Amount */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <label htmlFor="initial-amount">Initial Investment (Lump Sum)</label>
                  <span className="text-emerald-700 font-extrabold text-sm">
                    {formatCurrency(initialAmount, currency)}
                  </span>
                </div>
                <input
                  id="initial-amount"
                  type="range"
                  min="0"
                  max="1000000"
                  step="5000"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:bg-white outline-hidden"
                  />
                </div>
              </div>

              {/* Input 2: Monthly Contribution */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <label htmlFor="monthly-contribution">Monthly SIP / Contribution</label>
                  <span className="text-emerald-700 font-extrabold text-sm">
                    {formatCurrency(monthlyContribution, currency)}/mo
                  </span>
                </div>
                <input
                  id="monthly-contribution"
                  type="range"
                  min="0"
                  max="100000"
                  step="500"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:bg-white outline-hidden"
                  />
                </div>
              </div>

              {/* Input 3: Annual Interest Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <label htmlFor="annual-rate">Expected Annual Return (%)</label>
                  <span className="text-emerald-700 font-extrabold text-sm">{annualRate}%</span>
                </div>
                <input
                  id="annual-rate"
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>Benchmarks:</span>
                  <button
                    type="button"
                    onClick={() => setAnnualRate(7)}
                    className="underline hover:text-emerald-700 cursor-pointer"
                  >
                    FD (7%)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setAnnualRate(12)}
                    className="underline hover:text-emerald-700 cursor-pointer"
                  >
                    Index/Nifty (12%)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setAnnualRate(15)}
                    className="underline hover:text-emerald-700 cursor-pointer"
                  >
                    Flexi-cap (15%)
                  </button>
                </div>
              </div>

              {/* Input 4: Investment Duration */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <label htmlFor="duration-years">Duration (Years)</label>
                  <span className="text-emerald-700 font-extrabold text-sm">{durationYears} Years</span>
                </div>
                <input
                  id="duration-years"
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={durationYears}
                  onChange={(e) => setDurationYears(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Input 5: Compounding Frequency */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Compounding Frequency</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Monthly', val: 12 },
                    { label: 'Quarterly', val: 4 },
                    { label: 'Annually', val: 1 },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setFrequency(item.val)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        frequency === item.val
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results & Visual Chart (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* 3 Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Total Invested
                  </span>
                  <p className="mt-1 text-xl md:text-2xl font-extrabold text-slate-900">
                    {formatCompactNumber(compoundResults.totalInvested, currency)}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {formatCurrency(compoundResults.totalInvested, currency)}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                    Est. Wealth Growth
                  </span>
                  <p className="mt-1 text-xl md:text-2xl font-extrabold text-emerald-600">
                    {formatCompactNumber(compoundResults.totalGrowth, currency)}
                  </p>
                  <p className="text-[11px] text-emerald-700/80 mt-1">
                    {compoundResults.totalInvested > 0
                      ? `${(
                          (compoundResults.totalGrowth / compoundResults.totalInvested) *
                          100
                        ).toFixed(0)}% ROI`
                      : '0% ROI'}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-4 rounded-2xl shadow-md">
                  <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
                    Estimated Final Corpus
                  </span>
                  <p className="mt-1 text-xl md:text-2xl font-black text-emerald-300">
                    {formatCompactNumber(compoundResults.totalBalance, currency)}
                  </p>
                  <p className="text-[11px] text-emerald-100 mt-1">
                    After {durationYears} Years
                  </p>
                </div>
              </div>

              {/* Chart Box */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      Projected Wealth Accumulation Curve
                    </h4>
                    <p className="text-xs text-slate-500">
                      See how compounding exponential growth accelerates over time
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                      Invested
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Total Balance
                    </span>
                  </div>
                </div>

                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={compoundResults.chartData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => formatCompactNumber(v, currency)}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderRadius: '12px',
                          color: '#fff',
                          border: 'none',
                          fontSize: '12px',
                        }}
                        formatter={(value: any, name: any) => [
                          formatCurrency(Number(value), currency),
                          name === 'balance' ? 'Total Corpus' : 'Invested Principal',
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#059669"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#balanceGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="invested"
                        stroke="#94a3b8"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        fillOpacity={1}
                        fill="url(#investedGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Rule of 72 & Ask AI Banner */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="p-1 rounded bg-amber-100 text-amber-800 font-bold">Rule of 72</span>
                    <span>
                      At {annualRate}% annual return, your money doubles approximately every{' '}
                      <strong className="text-slate-900 font-bold">{compoundResults.yearsToDouble} years</strong>.
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      onAskTutorWithCalculation(
                        `How would investing ${formatCurrency(monthlyContribution, currency)} per month at ${annualRate}% return compare against keeping it in a regular bank savings account?`
                      )
                    }
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
                  >
                    Analyze with AI Tutor →
                  </button>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 rounded-2xl bg-slate-100/70 text-slate-500 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
                <p>
                  <strong>Educational Illustration Only:</strong> Returns are calculated based on hypothetical compound
                  interest models and constant contributions. Real-world market investments are subject to market volatility,
                  taxes, and inflation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INFLATION IMPACT CALCULATOR */}
      {activeTab === 'inflation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Inflation Parameters</h3>
                <p className="text-xs text-slate-500">Calculate purchasing power erosion</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Current Cost / Cash Amount</label>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={inflationPresentAmount}
                onChange={(e) => setInflationPresentAmount(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <input
                type="number"
                value={inflationPresentAmount}
                onChange={(e) => setInflationPresentAmount(Math.max(0, Number(e.target.value) || 0))}
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-amber-500 outline-hidden"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label>Annual Inflation Rate (%)</label>
                <span className="text-amber-800">{inflationRate}%</span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label>Time Horizon (Years)</label>
                <span className="text-amber-800">{inflationYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={inflationYears}
                onChange={(e) => setInflationYears(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h4 className="font-extrabold text-slate-900 text-base">
              The Cost of Inaction: Inflation Results
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <span className="text-xs font-bold text-amber-900 uppercase">
                  Future Cost of the Same Goods
                </span>
                <p className="text-2xl font-extrabold text-amber-950 mt-1">
                  {formatCurrency(inflationResults.futureCost, currency)}
                </p>
                <p className="text-xs text-amber-800 mt-1">
                  What costs {formatCurrency(inflationPresentAmount, currency)} today will cost this in {inflationYears} years.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                <span className="text-xs font-bold text-rose-900 uppercase">
                  Purchasing Power of Cash
                </span>
                <p className="text-2xl font-extrabold text-rose-950 mt-1">
                  {formatCurrency(inflationResults.purchasingPower, currency)}
                </p>
                <p className="text-xs text-rose-800 mt-1">
                  If kept in 0% cash, your money loses {formatCurrency(inflationResults.lossInPower, currency)} in buying power!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                How to Protect Against Inflation:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Invest in growth assets (equity index funds, mutual funds) with nominal returns above {inflationRate}%.</li>
                <li>Avoid holding excess cash reserves beyond your 3 to 6 month emergency fund.</li>
                <li>Upgrade skills periodically to ensure your income growth outpaces annual inflation.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 50/30/20 BUDGET ALLOCATOR */}
      {activeTab === 'budget' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                <PieChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Monthly Income</h3>
                <p className="text-xs text-slate-500">Enter your net in-hand earnings</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label>Net Monthly Income</label>
                <span className="text-teal-700 font-extrabold text-sm">
                  {formatCurrency(monthlyIncome, currency)}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="300000"
                step="2500"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value) || 0))}
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-teal-500 outline-hidden"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <h4 className="font-extrabold text-slate-900 text-base">
              Your Recommended Monthly Budget Blueprint
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  50% Needs
                </span>
                <p className="text-xl font-black text-slate-900 mt-1">
                  {formatCurrency(budgetResults.needs, currency)}
                </p>
                <p className="text-xs text-slate-500 mt-1">Rent, groceries, utilities, commuting, insurance.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[11px] font-bold text-amber-700 uppercase">
                  30% Wants
                </span>
                <p className="text-xl font-black text-amber-900 mt-1">
                  {formatCurrency(budgetResults.wants, currency)}
                </p>
                <p className="text-xs text-amber-800 mt-1">Dining out, hobbies, subscriptions, clothing.</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-700 uppercase">
                  20% Savings
                </span>
                <p className="text-xl font-black text-emerald-900 mt-1">
                  {formatCurrency(budgetResults.savings, currency)}
                </p>
                <p className="text-xs text-emerald-800 mt-1">Mutual fund SIPs, emergency stash, debt paydown.</p>
              </div>
            </div>

            {/* Visual Proportion Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Needs (50%)</span>
                <span>Wants (30%)</span>
                <span>Savings (20%)</span>
              </div>
              <div className="w-full h-3 rounded-full flex overflow-hidden shadow-inner">
                <div className="bg-slate-700 h-full w-[50%]" title="Needs: 50%" />
                <div className="bg-amber-400 h-full w-[30%]" title="Wants: 30%" />
                <div className="bg-emerald-500 h-full w-[20%]" title="Savings: 20%" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
