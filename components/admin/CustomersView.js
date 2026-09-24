'use client';
import { useState } from 'react';
import {
  Users2,
  Users,
  Award,
  Crown,
  Star,
  Heart,
  Coins,
  Plus,
  Download,
  Search,
  MoreHorizontal,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Tag,
  Send,
  FileText,
  ShoppingBag,
} from 'lucide-react';
import { MOCK_CUSTOMERS } from './data';

export default function CustomersView() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [selectedCustomerId, setSelectedCustomerId] = useState('c1');
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const filteredCustomers = customers.filter((c) => {
    if (tierFilter !== 'All' && c.tier !== tierFilter) return false;
    if (searchQuery) {
      return (
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users2 className="w-5 h-5 text-red-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Customers & Loyalty
            </h1>
          </div>
          <p className="text-[13px] text-stone-500">
            Manage your customer database, loyalty program, and build lasting relationships.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs">
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#911116] hover:bg-[#7D0E12] text-white text-xs font-semibold shadow-xs transition">
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Total Customers</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">1,482</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +22% vs last month
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Loyalty Members</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">892</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +18% vs last month
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Gold Members</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Crown className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-amber-600">248</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +12% vs last month
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Average Rating</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">4.6 / 5</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              +8% from 320 reviews
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Avg. Customer Spend</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Coins className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">Rs. 3,480</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +16% vs last month
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Top Customers (8 cols) + Review Sentiment (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top Customers Cards (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-stone-900 text-sm">Top Customers</h3>
            <span className="text-xs font-semibold text-red-700 hover:underline cursor-pointer">
              View All &gt;
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {customers.slice(0, 5).map((cust, idx) => (
              <div
                key={cust.id}
                onClick={() => setSelectedCustomerId(cust.id)}
                className={`p-3 rounded-xl border text-center cursor-pointer transition flex flex-col justify-between ${
                  selectedCustomerId === cust.id
                    ? 'border-red-600 bg-red-50/40 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div>
                  <div className="relative w-11 h-11 mx-auto mb-1.5">
                    <div className="w-full h-full rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center border-2 border-white shadow-xs">
                      {cust.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-stone-900 font-bold text-[9px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-xs truncate">{cust.name}</h4>
                  <span
                    className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded-full mt-0.5 ${
                      cust.tier === 'Gold'
                        ? 'bg-amber-100 text-amber-800'
                        : cust.tier === 'Silver'
                        ? 'bg-stone-200 text-stone-700'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {cust.tier}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-stone-100">
                  <p className="font-black text-red-700 text-xs">{cust.spent}</p>
                  <p className="text-[10px] text-stone-400">{cust.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Sentiment (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-stone-900 text-sm">Review Sentiment</h3>
            <span className="text-xs text-stone-400">320 reviews</span>
          </div>

          <div className="relative flex items-center justify-center my-1">
            <svg viewBox="0 0 160 160" className="w-32 h-32">
              <circle cx="80" cy="80" r="55" fill="none" stroke="#10B981" strokeWidth="16" strokeDasharray="290 87" strokeDashoffset="0" />
              <circle cx="80" cy="80" r="55" fill="none" stroke="#FBBF24" strokeWidth="16" strokeDasharray="35 342" strokeDashoffset="-290" />
              <circle cx="80" cy="80" r="55" fill="none" stroke="#EF4444" strokeWidth="16" strokeDasharray="18 359" strokeDashoffset="-325" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-black text-stone-900">4.6</span>
              <span className="text-[10px] text-stone-400 font-bold uppercase">Avg Rating</span>
            </div>
          </div>

          <div className="space-y-1 text-xs text-stone-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Positive (85%)</span>
              <span className="font-bold text-stone-800">272 reviews</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Neutral (10%)</span>
              <span className="font-bold text-stone-800">32 reviews</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Negative (5%)</span>
              <span className="font-bold text-stone-800">16 reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: All Customers Table (8 cols) + Right Detail Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* All Customers Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers..."
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs pl-8 pr-3 py-1.5 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-stone-700 text-xs py-1.5 px-2 rounded-lg"
              >
                <option value="All">All Tiers</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </select>
              <select className="bg-stone-50 border border-stone-200 text-stone-700 text-xs py-1.5 px-2 rounded-lg">
                <option>All Segments</option>
              </select>
              <select className="bg-stone-50 border border-stone-200 text-stone-700 text-xs py-1.5 px-2 rounded-lg">
                <option>All Cities</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 font-medium">
                  <th className="py-2.5 px-3 w-8">
                    <input type="checkbox" className="rounded-sm border-stone-300 text-red-600 focus:ring-0" />
                  </th>
                  <th className="py-2.5 px-2">Customer</th>
                  <th className="py-2.5 px-2">Tier</th>
                  <th className="py-2.5 px-2">Total Orders</th>
                  <th className="py-2.5 px-2">Total Spent</th>
                  <th className="py-2.5 px-2">Loyalty Points</th>
                  <th className="py-2.5 px-2">Last Order</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredCustomers.map((cust) => {
                  const isSelected = selectedCustomerId === cust.id;
                  return (
                    <tr
                      key={cust.id}
                      onClick={() => setSelectedCustomerId(cust.id)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-red-50/50' : 'hover:bg-stone-50/80'
                      }`}
                    >
                      <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => setSelectedCustomerId(cust.id)}
                          className="rounded-sm border-stone-300 text-red-600 focus:ring-0"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {cust.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-stone-900 leading-tight">{cust.name}</p>
                            <p className="text-[10px] text-stone-400">{cust.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            cust.tier === 'Gold'
                              ? 'bg-amber-100 text-amber-800'
                              : cust.tier === 'Silver'
                              ? 'bg-stone-200 text-stone-700'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {cust.tier}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-medium text-stone-800">{cust.orders}</td>
                      <td className="py-3 px-2 font-bold text-stone-900">{cust.spent}</td>
                      <td className="py-3 px-2 font-bold text-purple-700">{cust.points} pts</td>
                      <td className="py-3 px-2 text-stone-500">{cust.lastOrder}</td>
                      <td className="py-3 px-2">
                        <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                          {cust.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button className="p-1 text-stone-400 hover:text-stone-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Detail Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3 pb-3 border-b border-stone-100">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-amber-200 text-amber-900 font-black text-lg flex items-center justify-center border-2 border-white shadow-xs">
                  {selectedCustomer.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-stone-900 font-bold text-[10px] flex items-center justify-center border border-white">
                  👑
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-stone-900 text-base leading-tight truncate">
                    {selectedCustomer.name}
                  </h3>
                  <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    {selectedCustomer.tier} Member
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-medium mt-0.5">{selectedCustomer.location}</p>

                <div className="space-y-1 mt-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{selectedCustomer.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button className="py-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition">
                <Send className="w-3 h-3" /> Send Offer
              </button>
              <button className="py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition">
                <FileText className="w-3 h-3" /> Add Note
              </button>
              <button className="py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition">
                <ShoppingBag className="w-3 h-3" /> View Orders
              </button>
            </div>

            {/* 6 Metric Cards */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-stone-400 text-[10px] block font-medium">Total Orders</span>
                <span className="font-bold text-stone-900 text-base">{selectedCustomer.orders}</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-stone-400 text-[10px] block font-medium">Last Order</span>
                <span className="font-bold text-stone-900">{selectedCustomer.lastOrder}</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-stone-400 text-[10px] block font-medium">Avg Order Value</span>
                <span className="font-bold text-stone-900">{selectedCustomer.avgOrder}</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-stone-400 text-[10px] block font-medium">Loyalty Points</span>
                <span className="font-bold text-purple-700">{selectedCustomer.points} pts</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-stone-400 text-[10px] block font-medium">Total Spent</span>
                <span className="font-bold text-red-700">{selectedCustomer.spent}</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-stone-400 text-[10px] block font-medium">Referral Count</span>
                <span className="font-bold text-stone-900">{selectedCustomer.referrals} friends</span>
              </div>
            </div>

            {/* Segments Tags */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Customer Segments
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedCustomer.segments || ['Frequent Diner', 'Family Customer', 'High Spender', 'Loves Biryani', 'Weekend Visitor']).map((seg, idx) => (
                  <span
                    key={idx}
                    className="bg-stone-100 text-stone-700 border border-stone-200 px-2 py-0.5 rounded-full text-[10px] font-medium"
                  >
                    {seg}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
