'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  ChevronDown,
  ShoppingBag,
  Clock,
  Users,
  Package,
  Users2,
  Bike,
  TrendingUp,
  Trophy,
  AlertTriangle,
  ChevronRight,
  MoreHorizontal,
  PlusCircle,
  Plus,
  Tag,
  Globe,
  CheckCircle2,
  ExternalLink,
  Edit,
  FileText,
  Eye,
  Check,
  Printer,
} from 'lucide-react';
import { MOCK_BEST_SELLERS, MOCK_STOCK_ALERTS, MOCK_ORDERS } from './data';
import PrintReceiptModal from './PrintReceiptModal';

export default function DashboardView() {
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [printOrder, setPrintOrder] = useState(null);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printModalMode, setPrintModalMode] = useState('bill');

  const handlePrintOrder = (orderId, mode = 'bill') => {
    const found = MOCK_ORDERS.find((o) => o.id === orderId) || {
      id: orderId,
      customer: { name: 'Customer', phone: '+92 300 1234567' },
      type: 'Dine In',
      table: 'Table 2',
      amount: 'Rs. 1,250',
      amountNum: 1250,
      payment: 'Paid',
      paymentMethod: 'Cash',
      status: 'Completed',
      time: 'Just now',
      notes: 'Standard service',
      items: [
        { name: 'Special Chicken Biryani', variant: 'Full', qty: 2, price: 850 },
        { name: 'Special Naan', variant: 'Garlic', qty: 2, price: 200 },
        { name: 'Raita & Salad', variant: 'Fresh', qty: 1, price: 200 },
      ],
    };
    setPrintOrder(found);
    setPrintModalMode(mode);
    setPrintModalOpen(true);
  };

  return (
    <div className="space-y-5">
      {/* Top Greeting Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl shadow-xs">
            ☀️
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Good Morning, Ahmed!
            </h1>
            <p className="text-[13px] text-stone-500">
              Here's what's happening at Al Aziz Restaurant today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200 text-xs shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-medium">Mon, 10 Feb 2025</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500">10:24 AM</span>
          </div>

          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-stone-200 text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-lg appearance-none pr-7 shadow-xs hover:border-stone-300 cursor-pointer focus:outline-none"
            >
              <option>Last 7 Days</option>
              <option>Today</option>
              <option>This Month</option>
              <option>Last 30 Days</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 7 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
        {/* Card 1: Total Orders */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Total Orders</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">248</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>▲ +12%</span>
              <span className="text-stone-400 font-normal">vs last week</span>
            </div>
          </div>
        </div>

        {/* Card 2: Revenue Today */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Revenue Today</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <span className="font-bold text-xs">Rs.</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">Rs. 48,250</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>▲ +18%</span>
              <span className="text-stone-400 font-normal">vs last week</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pending Orders */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Pending Orders</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">12</div>
            <div className="flex items-center gap-1 text-[11px] text-red-500 font-semibold mt-0.5">
              <span>▼ -25%</span>
              <span className="text-stone-400 font-normal">vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Card 4: Active Staff */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Active Staff</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">14 / 18</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>▲ 78%</span>
              <span className="text-stone-400 font-normal">on duty</span>
            </div>
          </div>
        </div>

        {/* Card 5: Low Stock Items */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Low Stock Items</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-red-600">6</div>
            <div className="text-[11px] text-red-600 font-semibold mt-0.5">
              Needs attention
            </div>
          </div>
        </div>

        {/* Card 6: Total Customers */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Total Customers</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Users2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">1,482</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>▲ +22%</span>
              <span className="text-stone-400 font-normal">this week</span>
            </div>
          </div>
        </div>

        {/* Card 7: Delivery Orders */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Delivery Orders</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Bike className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">86</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>▲ 72%</span>
              <span className="text-stone-400 font-normal">on time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Sales Overview (Chart) + Best Selling Items + Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sales Overview Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-4 bg-red-600 rounded-xs" />
                <h3 className="font-bold text-[15px] text-stone-900">Sales Overview</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8383D]" /> Revenue (Rs.)
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Orders
                  </span>
                </div>
                <div className="relative">
                  <select className="bg-stone-50 border border-stone-200 text-stone-600 text-[11px] font-medium py-1 px-2 pr-6 rounded-md appearance-none">
                    <option>Last 7 Days</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-stone-900">Rs. 3,42,650</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                ↑ 16%
              </span>
            </div>
            <p className="text-[11px] text-stone-400">Total revenue this week</p>
          </div>

          {/* SVG Bar & Spline Chart */}
          <div className="mt-4 pt-2">
            <svg viewBox="0 0 460 200" className="w-full h-44 overflow-visible">
              {/* Horizontal Grid lines */}
              <line x1="30" y1="20" x2="450" y2="20" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="65" x2="450" y2="65" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="110" x2="450" y2="110" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="155" x2="450" y2="155" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="175" x2="450" y2="175" stroke="#E5E0D8" strokeWidth="1" />

              {/* Y-axis Labels */}
              <text x="5" y="24" fontSize="10" fill="#A8A29E" textAnchor="start">60K</text>
              <text x="5" y="69" fontSize="10" fill="#A8A29E" textAnchor="start">45K</text>
              <text x="5" y="114" fontSize="10" fill="#A8A29E" textAnchor="start">30K</text>
              <text x="5" y="159" fontSize="10" fill="#A8A29E" textAnchor="start">15K</text>
              <text x="18" y="179" fontSize="10" fill="#A8A29E" textAnchor="start">0</text>

              {/* Red Revenue Bars */}
              {/* 4 Feb */}
              <rect x="52" y="90" width="22" height="85" rx="3" fill="#B8383D" />
              {/* 5 Feb */}
              <rect x="112" y="105" width="22" height="70" rx="3" fill="#B8383D" />
              {/* 6 Feb */}
              <rect x="172" y="85" width="22" height="90" rx="3" fill="#B8383D" />
              {/* 7 Feb */}
              <rect x="232" y="65" width="22" height="110" rx="3" fill="#B8383D" />
              {/* 8 Feb */}
              <rect x="292" y="75" width="22" height="100" rx="3" fill="#B8383D" />
              {/* 9 Feb */}
              <rect x="352" y="90" width="22" height="85" rx="3" fill="#B8383D" />
              {/* 10 Feb */}
              <rect x="412" y="55" width="22" height="120" rx="3" fill="#B8383D" />

              {/* Yellow Orders Trendline (Spline curve) */}
              <path
                d="M 63 125 Q 123 115, 183 95 T 303 85 T 423 70"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />
              {/* Dots */}
              <circle cx="63" cy="125" r="4.5" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
              <circle cx="123" cy="120" r="4.5" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
              <circle cx="183" cy="95" r="4.5" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
              <circle cx="243" cy="85" r="4.5" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
              <circle cx="303" cy="85" r="4.5" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
              <circle cx="363" cy="90" r="4.5" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
              <circle cx="423" cy="70" r="4.5" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />

              {/* X-axis Labels */}
              <text x="63" y="193" fontSize="10" fill="#78716C" textAnchor="middle">4 Feb</text>
              <text x="123" y="193" fontSize="10" fill="#78716C" textAnchor="middle">5 Feb</text>
              <text x="183" y="193" fontSize="10" fill="#78716C" textAnchor="middle">6 Feb</text>
              <text x="243" y="193" fontSize="10" fill="#78716C" textAnchor="middle">7 Feb</text>
              <text x="303" y="193" fontSize="10" fill="#78716C" textAnchor="middle">8 Feb</text>
              <text x="363" y="193" fontSize="10" fill="#78716C" textAnchor="middle">9 Feb</text>
              <text x="423" y="193" fontSize="10" fill="#78716C" textAnchor="middle">10 Feb</text>
            </svg>
          </div>
        </div>

        {/* Best Selling Items (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-[15px] text-stone-900">Best Selling Items</h3>
            </div>
            <Link href="/admin/menu" className="text-xs font-semibold text-red-700 hover:text-red-800 flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100 space-y-2.5">
            {MOCK_BEST_SELLERS.map((item, idx) => (
              <div key={item.id} className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      idx === 0
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : idx === 1
                        ? 'bg-stone-200 text-stone-700'
                        : idx === 2
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {item.id}
                  </span>
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-stone-100 shrink-0 relative border border-stone-200">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/img/biryani.jpg';
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-stone-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-stone-400">{item.orders} orders</p>
                  </div>
                </div>
                <div className="text-[13px] font-bold text-red-700 shrink-0">
                  {item.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-[15px] text-stone-900">Stock Alerts</h3>
            </div>
            <Link href="/admin/inventory" className="text-xs font-semibold text-red-700 hover:text-red-800 flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100 space-y-2">
            {MOCK_STOCK_ALERTS.map((item, idx) => (
              <div key={idx} className="pt-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/img/biryani.jpg';
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-stone-900 truncate">{item.name}</p>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="font-bold text-red-600">{item.qty}</span>
                      <span className="text-stone-400">· {item.status}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Recent Orders (7 cols) + Staff Attendance (2 cols) + Quick Actions (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Orders (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-[15px] text-stone-900">Recent Orders</h3>
            </div>
            <Link href="/admin/orders" className="text-xs font-semibold text-red-700 hover:text-red-800 flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 font-medium">
                  <th className="pb-2 font-medium">#</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Items</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Time</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { id: '#1042', name: 'Ali Raza', items: '3 items', type: 'Dine In', typeColor: 'bg-red-50 text-red-700', amount: 'Rs. 1,250', status: 'Completed', statusColor: 'bg-emerald-50 text-emerald-700', time: '10:22 AM' },
                  { id: '#1041', name: 'Sarah Khan', items: '2 items', type: 'Delivery', typeColor: 'bg-blue-50 text-blue-700', amount: 'Rs. 980', status: 'Preparing', statusColor: 'bg-amber-50 text-amber-700', time: '10:15 AM' },
                  { id: '#1040', name: 'Ahmed Malik', items: '4 items', type: 'Takeaway', typeColor: 'bg-purple-50 text-purple-700', amount: 'Rs. 1,680', status: 'Completed', statusColor: 'bg-emerald-50 text-emerald-700', time: '10:02 AM' },
                  { id: '#1039', name: 'Fatima Noor', items: '3 items', type: 'Delivery', typeColor: 'bg-blue-50 text-blue-700', amount: 'Rs. 1,150', status: 'Out for Delivery', statusColor: 'bg-sky-50 text-sky-700', time: '09:48 AM' },
                  { id: '#1038', name: 'Imran Sheikh', items: '2 items', type: 'Dine In', typeColor: 'bg-red-50 text-red-700', amount: 'Rs. 920', status: 'Completed', statusColor: 'bg-emerald-50 text-emerald-700', time: '09:35 AM' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50/70">
                    <td className="py-2.5 font-bold text-stone-900">{row.id}</td>
                    <td className="py-2.5 font-medium text-stone-800">{row.name}</td>
                    <td className="py-2.5 text-stone-500">{row.items}</td>
                    <td className="py-2.5">
                      <span className={`${row.typeColor} font-semibold px-2 py-0.5 rounded-md text-[10px]`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="py-2.5 font-bold text-stone-900">{row.amount}</td>
                    <td className="py-2.5">
                      <span className={`${row.statusColor} font-semibold px-2 py-0.5 rounded-md text-[10px]`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-stone-400">{row.time}</td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handlePrintOrder(row.id, 'bill')}
                          className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
                          title="Print Customer Bill"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handlePrintOrder(row.id, 'kot')}
                          className="p-1 rounded text-stone-400 hover:text-[#911116] hover:bg-red-50 transition"
                          title="Print Kitchen Ticket (KOT)"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Attendance Donut (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-[15px] text-stone-900">Staff Attendance</h3>
            </div>
            <Link href="/admin/staff" className="text-xs font-semibold text-red-700 hover:text-red-800 flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Donut Chart */}
          <div className="flex items-center justify-center my-2 relative">
            <svg viewBox="0 0 160 160" className="w-36 h-36">
              {/* Off duty arc (gray) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#E7E5E4"
                strokeWidth="16"
              />
              {/* Absent arc (red) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#EF4444"
                strokeWidth="16"
                strokeDasharray="20 357"
                strokeDashoffset="120"
              />
              {/* On duty arc (green) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#10B981"
                strokeWidth="16"
                strokeDasharray="290 87"
                strokeDashoffset="60"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-extrabold text-stone-900">14/18</span>
              <span className="text-[10px] text-stone-400 font-semibold">On Duty</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between px-2 text-[11px] font-medium text-stone-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> On Duty <strong className="text-stone-900">14</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-stone-300" /> Off Duty <strong className="text-stone-900">3</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Absent <strong className="text-stone-900">1</strong>
            </span>
          </div>

          {/* Avatars */}
          <div className="flex items-center justify-center -space-x-2 mt-3 pt-2 border-t border-stone-100">
            {['AR', 'SK', 'AM', 'FN', 'IS'].map((initials, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full bg-amber-100 border-2 border-white text-amber-900 flex items-center justify-center font-bold text-[10px] shadow-xs"
              >
                {initials}
              </div>
            ))}
            <div className="w-7 h-7 rounded-full bg-stone-100 border-2 border-white text-stone-500 flex items-center justify-center font-bold text-[10px] shadow-xs">
              +9
            </div>
          </div>
        </div>

        {/* Quick Actions (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-500 text-sm font-bold">⚡</span>
            <h3 className="font-bold text-[15px] text-stone-900">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/admin/orders"
              className="p-3 rounded-xl bg-red-50/70 border border-red-100 hover:bg-red-100/60 transition flex flex-col items-center justify-center text-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center mb-1 group-hover:scale-105 transition">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-800">New Order</span>
            </Link>

            <Link
              href="/admin/menu"
              className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 hover:bg-amber-100/60 transition flex flex-col items-center justify-center text-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-1 group-hover:scale-105 transition">
                <PlusCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-800">Add Menu Item</span>
            </Link>

            <Link
              href="/admin/inventory"
              className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 hover:bg-blue-100/60 transition flex flex-col items-center justify-center text-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-1 group-hover:scale-105 transition">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-800">Manage Inventory</span>
            </Link>

            <Link
              href="/admin/staff"
              className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100/60 transition flex flex-col items-center justify-center text-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1 group-hover:scale-105 transition">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-800">Add Staff</span>
            </Link>

            <Link
              href="/admin/promotions"
              className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100/60 transition flex flex-col items-center justify-center text-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-1 group-hover:scale-105 transition">
                <Tag className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-800">Create Promotion</span>
            </Link>

            <Link
              href="/admin/cms"
              className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 hover:bg-rose-100/60 transition flex flex-col items-center justify-center text-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center mb-1 group-hover:scale-105 transition">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-800">Edit Website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Row 4: Website & PWA Status Card */}
      <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Globe className="w-4 h-4 text-red-600" />
          <h3 className="font-bold text-[15px] text-stone-900">Website & PWA Status</h3>
        </div>
        <p className="text-xs text-stone-500 mb-4">
          Your restaurant website and PWA are live and working perfectly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Left: Preview banner card (5 cols) */}
          <div className="md:col-span-5 rounded-xl overflow-hidden border border-stone-200 shadow-xs bg-[#911116] text-white p-3.5 relative flex flex-col justify-between h-40">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold tracking-tight">Al Aziz Restaurant</span>
              <div className="flex items-center gap-2 text-[10px] text-stone-200">
                <span>Home</span>
                <span>Menu</span>
                <span>Cart</span>
                <span>Orders</span>
              </div>
            </div>

            <div className="mt-2">
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Special Offer</span>
              <h4 className="text-lg font-black leading-tight text-white mt-0.5">10% OFF on all orders</h4>
              <button className="mt-2 px-3 py-1 bg-amber-400 text-stone-900 rounded-md font-bold text-[10px] shadow-xs">
                ORDER NOW ›
              </button>
            </div>

            <div className="absolute right-0 bottom-0 w-36 h-36 opacity-30 pointer-events-none rounded-full overflow-hidden">
              <img src="/img/biryani.jpg" alt="Dish" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Middle: Live status info (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                Live
              </span>
              <a
                href="/"
                target="_blank"
                className="font-bold text-sm text-stone-900 hover:text-red-700 flex items-center gap-1"
              >
                al-aziz-restaurant.com <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>
            </div>
            <p className="text-[11px] text-stone-400">Last updated: 10 Feb 2025, 09:30 AM</p>

            <div className="space-y-1.5 text-xs text-stone-700 font-medium pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Website Online</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>PWA Working</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Menu Synced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Orders Integration Active</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Website Actions (3 cols) */}
          <div className="md:col-span-3 space-y-2 border-t md:border-t-0 md:border-l border-stone-100 md:pl-5 pt-3 md:pt-0">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Quick Website Actions
            </span>
            <Link
              href="/admin/cms"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 text-xs font-semibold text-stone-700 border border-stone-100 transition"
            >
              <span className="flex items-center gap-2">
                <Edit className="w-3.5 h-3.5 text-stone-400" /> Edit Home Page
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>
            <Link
              href="/admin/cms"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 text-xs font-semibold text-stone-700 border border-stone-100 transition"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-stone-400" /> Update Content
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>
            <Link
              href="/admin/cms"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 text-xs font-semibold text-stone-700 border border-stone-100 transition"
            >
              <span className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-stone-400" /> Manage Banners
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 text-xs font-semibold text-stone-700 border border-stone-100 transition"
            >
              <span className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-stone-400" /> Preview Website
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Print Bill & KOT Modal */}
      <PrintReceiptModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        order={printOrder}
        initialMode={printModalMode}
      />
    </div>
  );
}
