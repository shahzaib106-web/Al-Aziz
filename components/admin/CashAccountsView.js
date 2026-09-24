'use client';
import { useState } from 'react';
import {
  Wallet,
  Banknote,
  CreditCard,
  Smartphone,
  TrendingDown,
  Building,
  Calendar,
  ChevronDown,
  Search,
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  FileText,
  DollarSign,
  Receipt,
  Download,
} from 'lucide-react';
import { MOCK_TRANSACTIONS } from './data';

export default function CashAccountsView() {
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [filterType, setFilterType] = useState('All');

  const filteredTxns = transactions.filter((t) => {
    if (filterType !== 'All' && t.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-red-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Cash & Accounts
            </h1>
          </div>
          <p className="text-[13px] text-stone-500">
            Manage your restaurant finances, cash register, expenses and accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200 text-xs shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Mon, 10 Feb 2025</span>
          </div>

          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-stone-200 text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-lg appearance-none pr-7 shadow-xs cursor-pointer"
            >
              <option>Last 7 Days</option>
              <option>Today</option>
              <option>This Month</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 6 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Total Sales */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Total Sales</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-stone-900">Rs. 3,42,650</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +16% vs last week
            </div>
          </div>
        </div>

        {/* Card 2: Cash in Hand */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Cash in Hand</span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Banknote className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-stone-900">Rs. 68,450</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              +8% current balance
            </div>
          </div>
        </div>

        {/* Card 3: Card Payments */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Card Payments</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-stone-900">Rs. 1,28,600</div>
            <div className="text-[11px] text-stone-400 font-medium mt-0.5">
              37% of sales
            </div>
          </div>
        </div>

        {/* Card 4: Online Payments */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Online Payments</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-stone-900">Rs. 95,300</div>
            <div className="text-[11px] text-stone-400 font-medium mt-0.5">
              28% of sales
            </div>
          </div>
        </div>

        {/* Card 5: Total Expenses */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Total Expenses</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-stone-900">Rs. 48,950</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▼ -12% vs last week
            </div>
          </div>
        </div>

        {/* Card 6: Supplier Dues */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Supplier Dues</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Building className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-stone-900">Rs. 1,26,400</div>
            <div className="text-[11px] text-amber-600 font-semibold mt-0.5">
              4 suppliers
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Charts Row (Revenue vs Expenses + Payment Method Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Revenue vs Expenses Grouped Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-stone-900 text-sm">Revenue vs Expenses</h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-stone-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#911116]" /> Revenue (Rs.)
                </span>
                <span className="flex items-center gap-1.5 text-stone-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Expenses (Rs.)
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400">Daily financial breakdown</p>
          </div>

          <div className="mt-4 pt-2">
            <svg viewBox="0 0 520 200" className="w-full h-44 overflow-visible">
              <line x1="30" y1="20" x2="510" y2="20" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="65" x2="510" y2="65" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="110" x2="510" y2="110" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="155" x2="510" y2="155" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="175" x2="510" y2="175" stroke="#E5E0D8" strokeWidth="1" />

              <text x="5" y="24" fontSize="10" fill="#A8A29E">60K</text>
              <text x="5" y="69" fontSize="10" fill="#A8A29E">45K</text>
              <text x="5" y="114" fontSize="10" fill="#A8A29E">30K</text>
              <text x="5" y="159" fontSize="10" fill="#A8A29E">15K</text>
              <text x="18" y="179" fontSize="10" fill="#A8A29E">0</text>

              {/* 4 Feb */}
              <rect x="55" y="90" width="16" height="85" rx="2" fill="#911116" />
              <rect x="73" y="145" width="16" height="30" rx="2" fill="#F59E0B" />
              <text x="72" y="193" fontSize="10" fill="#78716C" textAnchor="middle">4 Feb</text>

              {/* 5 Feb */}
              <rect x="120" y="105" width="16" height="70" rx="2" fill="#911116" />
              <rect x="138" y="150" width="16" height="25" rx="2" fill="#F59E0B" />
              <text x="137" y="193" fontSize="10" fill="#78716C" textAnchor="middle">5 Feb</text>

              {/* 6 Feb */}
              <rect x="185" y="85" width="16" height="90" rx="2" fill="#911116" />
              <rect x="203" y="140" width="16" height="35" rx="2" fill="#F59E0B" />
              <text x="202" y="193" fontSize="10" fill="#78716C" textAnchor="middle">6 Feb</text>

              {/* 7 Feb */}
              <rect x="250" y="65" width="16" height="110" rx="2" fill="#911116" />
              <rect x="268" y="130" width="16" height="45" rx="2" fill="#F59E0B" />
              <text x="267" y="193" fontSize="10" fill="#78716C" textAnchor="middle">7 Feb</text>

              {/* 8 Feb */}
              <rect x="315" y="75" width="16" height="100" rx="2" fill="#911116" />
              <rect x="333" y="145" width="16" height="30" rx="2" fill="#F59E0B" />
              <text x="332" y="193" fontSize="10" fill="#78716C" textAnchor="middle">8 Feb</text>

              {/* 9 Feb */}
              <rect x="380" y="90" width="16" height="85" rx="2" fill="#911116" />
              <rect x="398" y="150" width="16" height="25" rx="2" fill="#F59E0B" />
              <text x="397" y="193" fontSize="10" fill="#78716C" textAnchor="middle">9 Feb</text>

              {/* 10 Feb */}
              <rect x="445" y="55" width="16" height="120" rx="2" fill="#911116" />
              <rect x="463" y="135" width="16" height="40" rx="2" fill="#F59E0B" />
              <text x="462" y="193" fontSize="10" fill="#78716C" textAnchor="middle">10 Feb</text>
            </svg>
          </div>
        </div>

        {/* Payment Method Breakdown Donut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-stone-900 text-sm mb-1">Payment Method Breakdown</h3>
            <p className="text-[11px] text-stone-400">Distribution across transaction channels</p>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <svg viewBox="0 0 160 160" className="w-40 h-40">
              {/* Card 37% */}
              <circle cx="80" cy="80" r="55" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="128 217" strokeDashoffset="0" />
              {/* Online 28% */}
              <circle cx="80" cy="80" r="55" fill="none" stroke="#8B5CF6" strokeWidth="20" strokeDasharray="97 248" strokeDashoffset="-128" />
              {/* Cash 20% */}
              <circle cx="80" cy="80" r="55" fill="none" stroke="#10B981" strokeWidth="20" strokeDasharray="69 276" strokeDashoffset="-225" />
              {/* Credit/Due 10% */}
              <circle cx="80" cy="80" r="55" fill="none" stroke="#F59E0B" strokeWidth="20" strokeDasharray="35 310" strokeDashoffset="-294" />
              {/* Other 5% */}
              <circle cx="80" cy="80" r="55" fill="none" stroke="#94A3B8" strokeWidth="20" strokeDasharray="17 328" strokeDashoffset="-329" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-stone-400 font-bold uppercase">Total Sales</span>
              <span className="text-sm font-black text-stone-900">Rs. 3,42,650</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Cash Payments (20%)</span>
              <span className="font-bold text-stone-900">Rs. 68,450</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> Card Payments (37%)</span>
              <span className="font-bold text-stone-900">Rs. 1,28,600</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Online Payments (28%)</span>
              <span className="font-bold text-stone-900">Rs. 95,300</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Credit / Due (10%)</span>
              <span className="font-bold text-stone-900">Rs. 33,200</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: 6 Intermediate Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs">
          <span className="text-[11px] text-stone-500 font-medium">Invoices Issued</span>
          <div className="text-lg font-bold text-stone-900 mt-1">246</div>
        </div>
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs">
          <span className="text-[11px] text-stone-500 font-medium">Daily Settlement</span>
          <div className="text-lg font-bold text-emerald-600 mt-1">Rs. 3,21,450</div>
        </div>
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs">
          <span className="text-[11px] text-stone-500 font-medium">Cashier Shifts</span>
          <div className="text-lg font-bold text-stone-900 mt-1">3 Active Shifts</div>
        </div>
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs">
          <span className="text-[11px] text-stone-500 font-medium">Payout Summary</span>
          <div className="text-lg font-bold text-stone-900 mt-1">Rs. 82,300</div>
        </div>
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs">
          <span className="text-[11px] text-stone-500 font-medium">Petty Cash</span>
          <div className="text-lg font-bold text-stone-900 mt-1">Rs. 12,450</div>
        </div>
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs">
          <span className="text-[11px] text-stone-500 font-medium">Tax / VAT (15%)</span>
          <div className="text-lg font-bold text-stone-900 mt-1">Rs. 51,400</div>
        </div>
      </div>

      {/* Row 4: Bottom 3 Columns (Recent Transactions + Cash Register + Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Transactions Table (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-stone-200 shadow-xs p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-stone-900 text-sm">Recent Transactions</h3>
            <span className="text-xs font-semibold text-red-700 hover:underline cursor-pointer">
              View All &gt;
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 font-medium">
                  <th className="pb-2">TXN ID</th>
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Description</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Method</th>
                  <th className="pb-2 text-right">Added By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredTxns.map((t) => (
                  <tr key={t.id} className="hover:bg-stone-50/70">
                    <td className="py-2.5 font-bold text-stone-900">{t.id}</td>
                    <td className="py-2.5 text-stone-400">{t.time}</td>
                    <td className="py-2.5 text-stone-800 font-medium">{t.desc}</td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                          t.type === 'Income' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="py-2.5 font-bold text-stone-900">{t.amount}</td>
                    <td className="py-2.5 text-stone-600">{t.method}</td>
                    <td className="py-2.5 text-stone-500 text-right">{t.addedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cash Register Card (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-stone-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-stone-900 text-sm">Cash Register</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Open
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-center my-2">
              <span className="text-[11px] text-stone-400 font-medium">Current Cash in Hand</span>
              <h2 className="text-2xl font-black text-stone-900 mt-0.5">Rs. 68,450</h2>
            </div>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-center justify-between text-stone-500">
                <span>Opening Balance:</span>
                <span className="font-bold text-stone-800">Rs. 20,000</span>
              </div>
              <div className="flex items-center justify-between text-stone-500">
                <span>Total Cash Sales:</span>
                <span className="font-bold text-stone-800">Rs. 68,450</span>
              </div>
              <div className="flex items-center justify-between text-stone-500">
                <span>Expected Cash:</span>
                <span className="font-bold text-stone-800">Rs. 68,450</span>
              </div>
              <div className="flex items-center justify-between text-stone-500 pt-1 border-t border-stone-100">
                <span>Difference:</span>
                <span className="font-bold text-emerald-600">Rs. 0 (Balanced)</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold text-xs shadow-xs transition">
            Close Register
          </button>
        </div>

        {/* Quick Actions (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-stone-200 shadow-xs p-5 flex flex-col justify-between">
          <h3 className="font-bold text-stone-900 text-sm mb-3">Quick Financial Actions</h3>
          <div className="space-y-2 text-xs">
            <button className="w-full p-2.5 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-lg font-semibold text-left transition flex items-center justify-between">
              <span>Daily Settlement</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
            <button className="w-full p-2.5 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-lg font-semibold text-left transition flex items-center justify-between">
              <span>Create Expense</span>
              <Plus className="w-3.5 h-3.5 text-stone-400" />
            </button>
            <button className="w-full p-2.5 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-lg font-semibold text-left transition flex items-center justify-between">
              <span>Add Supplier</span>
              <Building className="w-3.5 h-3.5 text-stone-400" />
            </button>
            <button className="w-full p-2.5 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-lg font-semibold text-left transition flex items-center justify-between">
              <span>Generate Invoice</span>
              <FileText className="w-3.5 h-3.5 text-stone-400" />
            </button>
            <button className="w-full p-2.5 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-lg font-semibold text-left transition flex items-center justify-between">
              <span>Export Reports</span>
              <Download className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
