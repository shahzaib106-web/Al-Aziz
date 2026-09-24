'use client';
import { useState } from 'react';
import {
  Package,
  Calendar,
  ChevronDown,
  Plus,
  Coins,
  AlertTriangle,
  FileText,
  Receipt,
  Search,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from 'lucide-react';
import { MOCK_RAW_MATERIALS } from './data';

export default function InventoryView() {
  const [materials, setMaterials] = useState(MOCK_RAW_MATERIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [addItemModal, setAddItemModal] = useState(false);

  const filteredMaterials = materials.filter((m) => {
    if (selectedCat !== 'All' && m.cat !== selectedCat) return false;
    if (searchQuery) {
      return (
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.supplier.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Package className="w-5 h-5 text-red-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Inventory Management
            </h1>
          </div>
          <p className="text-[13px] text-stone-500">
            Track stock, manage purchases, and monitor ingredient costs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200 text-xs shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Mon, 10 Feb 2025</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500">10:24 AM</span>
          </div>

          <div className="relative">
            <select className="bg-white border border-stone-200 text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-lg appearance-none pr-7 shadow-xs">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => setAddItemModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#911116] hover:bg-[#7D0E12] text-white text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Purchase Order</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Items */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Total Items</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">86</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>▲ +8%</span>
              <span className="text-stone-400 font-normal">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Stock Value */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Total Stock Value</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Coins className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">Rs. 1,48,250</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>▲ +12%</span>
              <span className="text-stone-400 font-normal">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Low Stock Items */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Low Stock Items</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-red-600">6</div>
            <div className="flex items-center gap-1 text-[11px] text-red-600 font-semibold mt-0.5">
              <span>▼ -25%</span>
              <span className="text-stone-400 font-normal">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Pending Purchase Orders */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Pending Purchase Orders</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">4</div>
            <div className="text-[11px] text-stone-500 font-medium mt-0.5">
              Rs. 42,800 total value
            </div>
          </div>
        </div>

        {/* Card 5: Total Ingredient Cost */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Total Ingredient Cost</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Receipt className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">Rs. 78,650</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <span>▲ +10%</span>
              <span className="text-stone-400 font-normal">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Charts Row (Stock Value Trend + Stock Movement + Low Stock Alerts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Stock Value Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-stone-900 text-sm">Stock Value Trend</h3>
              <div className="relative">
                <select className="bg-stone-50 border border-stone-200 text-stone-600 text-xs py-1 px-2.5 pr-6 rounded-md appearance-none">
                  <option>Last 30 Days</option>
                </select>
                <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-stone-900">Rs. 1,48,250</span>
              <span className="text-xs font-bold text-emerald-600">↑ 12% vs last month</span>
            </div>
          </div>

          {/* Area SVG Chart */}
          <div className="mt-4 pt-2">
            <svg viewBox="0 0 460 180" className="w-full h-40 overflow-visible">
              <defs>
                <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#911116" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#911116" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="30" y1="20" x2="450" y2="20" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="65" x2="450" y2="65" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="110" x2="450" y2="110" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="150" x2="450" y2="150" stroke="#E5E0D8" strokeWidth="1" />

              <text x="5" y="24" fontSize="10" fill="#A8A29E">200K</text>
              <text x="5" y="69" fontSize="10" fill="#A8A29E">150K</text>
              <text x="5" y="114" fontSize="10" fill="#A8A29E">100K</text>
              <text x="18" y="154" fontSize="10" fill="#A8A29E">0</text>

              {/* Shaded Area */}
              <polygon
                points="40,130 95,115 155,100 215,80 275,85 335,65 395,50 440,40 440,150 40,150"
                fill="url(#stockGrad)"
              />
              {/* Path Line */}
              <polyline
                points="40,130 95,115 155,100 215,80 275,85 335,65 395,50 440,40"
                fill="none"
                stroke="#911116"
                strokeWidth="2.5"
              />

              {/* Dots */}
              <circle cx="40" cy="130" r="4" fill="#911116" stroke="#FFF" strokeWidth="2" />
              <circle cx="155" cy="100" r="4" fill="#911116" stroke="#FFF" strokeWidth="2" />
              <circle cx="275" cy="85" r="4" fill="#911116" stroke="#FFF" strokeWidth="2" />
              <circle cx="395" cy="50" r="4" fill="#911116" stroke="#FFF" strokeWidth="2" />
              <circle cx="440" cy="40" r="4" fill="#911116" stroke="#FFF" strokeWidth="2" />

              <text x="40" y="168" fontSize="10" fill="#78716C">12 Jan</text>
              <text x="140" y="168" fontSize="10" fill="#78716C">19 Jan</text>
              <text x="240" y="168" fontSize="10" fill="#78716C">26 Jan</text>
              <text x="340" y="168" fontSize="10" fill="#78716C">02 Feb</text>
              <text x="440" y="168" fontSize="10" fill="#78716C" textAnchor="end">10 Feb</text>
            </svg>
          </div>
        </div>

        {/* Stock Movement Grouped Bar Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-stone-900 text-sm">Stock Movement</h3>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="flex items-center gap-1 text-stone-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Inward
                </span>
                <span className="flex items-center gap-1 text-stone-600">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Outward
                </span>
                <span className="flex items-center gap-1 text-stone-600">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Waste
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400">Daily movement in kg/units</p>
          </div>

          {/* Grouped Bar Chart */}
          <div className="mt-4 pt-2">
            <svg viewBox="0 0 380 180" className="w-full h-40 overflow-visible">
              <line x1="20" y1="30" x2="370" y2="30" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="80" x2="370" y2="80" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="130" x2="370" y2="130" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="150" x2="370" y2="150" stroke="#E5E0D8" strokeWidth="1" />

              {/* 2 Feb */}
              <rect x="40" y="60" width="12" height="90" rx="2" fill="#10B981" />
              <rect x="54" y="80" width="12" height="70" rx="2" fill="#EF4444" />
              <rect x="68" y="135" width="12" height="15" rx="2" fill="#FBBF24" />
              <text x="60" y="168" fontSize="10" fill="#78716C" textAnchor="middle">2 Feb</text>

              {/* 4 Feb */}
              <rect x="110" y="45" width="12" height="105" rx="2" fill="#10B981" />
              <rect x="124" y="70" width="12" height="80" rx="2" fill="#EF4444" />
              <rect x="138" y="130" width="12" height="20" rx="2" fill="#FBBF24" />
              <text x="130" y="168" fontSize="10" fill="#78716C" textAnchor="middle">4 Feb</text>

              {/* 6 Feb */}
              <rect x="180" y="70" width="12" height="80" rx="2" fill="#10B981" />
              <rect x="194" y="60" width="12" height="90" rx="2" fill="#EF4444" />
              <rect x="208" y="140" width="12" height="10" rx="2" fill="#FBBF24" />
              <text x="200" y="168" fontSize="10" fill="#78716C" textAnchor="middle">6 Feb</text>

              {/* 8 Feb */}
              <rect x="250" y="40" width="12" height="110" rx="2" fill="#10B981" />
              <rect x="264" y="65" width="12" height="85" rx="2" fill="#EF4444" />
              <rect x="278" y="135" width="12" height="15" rx="2" fill="#FBBF24" />
              <text x="270" y="168" fontSize="10" fill="#78716C" textAnchor="middle">8 Feb</text>

              {/* 10 Feb */}
              <rect x="320" y="55" width="12" height="95" rx="2" fill="#10B981" />
              <rect x="334" y="75" width="12" height="75" rx="2" fill="#EF4444" />
              <rect x="348" y="138" width="12" height="12" rx="2" fill="#FBBF24" />
              <text x="340" y="168" fontSize="10" fill="#78716C" textAnchor="middle">10 Feb</text>
            </svg>
          </div>
        </div>

        {/* Low Stock Alerts (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-stone-900 text-sm">Low Stock Alerts</h3>
            </div>
            <span className="text-xs font-semibold text-red-700 hover:underline cursor-pointer">
              View All &gt;
            </span>
          </div>

          <div className="divide-y divide-stone-100 space-y-2">
            {[
              { name: 'Basmati Rice', qty: '3 kg left', status: 'Reorder soon' },
              { name: 'Chicken (Fresh)', qty: '5 kg left', status: 'Reorder soon' },
              { name: 'Cooking Oil', qty: '2 bottles left', status: 'Low stock' },
              { name: 'Tomatoes', qty: '4 kg left', status: 'Reorder soon' },
              { name: 'Onions', qty: '6 kg left', status: 'Low stock' },
            ].map((alert, idx) => (
              <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-stone-900">{alert.name}</p>
                  <p className="text-[10px] text-red-600 font-bold">{alert.qty} <span className="text-stone-400 font-normal">· {alert.status}</span></p>
                </div>
                <button className="px-2 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded text-[10px] font-bold">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Raw Materials & Ingredients Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-stone-900 text-sm">Raw Materials & Ingredients</h3>
            <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {materials.length}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            {/* Search */}
            <div className="relative w-48 sm:w-56">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials..."
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs pl-8 pr-3 py-1.5 rounded-lg focus:outline-none"
              />
            </div>

            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-700 text-xs py-1.5 px-2 rounded-lg"
            >
              <option value="All">All Categories</option>
              <option value="Grains">Grains</option>
              <option value="Meat">Meat</option>
              <option value="Oil & Spices">Oil & Spices</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
            </select>

            <select className="bg-stone-50 border border-stone-200 text-stone-700 text-xs py-1.5 px-2 rounded-lg">
              <option>All Suppliers</option>
            </select>

            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#911116] hover:bg-[#7D0E12] text-white text-xs font-bold rounded-lg shadow-xs transition shrink-0">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 font-medium">
                <th className="py-2.5 px-3 w-8">
                  <input type="checkbox" className="rounded-sm border-stone-300 text-red-600 focus:ring-0" />
                </th>
                <th className="py-2.5 px-2">#</th>
                <th className="py-2.5 px-2">Item / Ingredient</th>
                <th className="py-2.5 px-2">SKU / Barcode</th>
                <th className="py-2.5 px-2">Category</th>
                <th className="py-2.5 px-2">Unit</th>
                <th className="py-2.5 px-2">Current Stock</th>
                <th className="py-2.5 px-2">Reorder Level</th>
                <th className="py-2.5 px-2">Last Purchase Price</th>
                <th className="py-2.5 px-2">Supplier</th>
                <th className="py-2.5 px-2">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredMaterials.map((m) => (
                <tr key={m.id} className="hover:bg-stone-50/80 transition">
                  <td className="py-3 px-3">
                    <input type="checkbox" className="rounded-sm border-stone-300 text-red-600 focus:ring-0" />
                  </td>
                  <td className="py-3 px-2 text-stone-400 font-medium">{m.id}</td>
                  <td className="py-3 px-2">
                    <span className="font-bold text-stone-900">{m.name}</span>
                  </td>
                  <td className="py-3 px-2 text-stone-400">{m.sku}</td>
                  <td className="py-3 px-2">
                    <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {m.cat}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-stone-500 font-medium">{m.unit}</td>
                  <td className="py-3 px-2">
                    <span className={`font-bold ${m.low ? 'text-red-600' : 'text-stone-900'}`}>
                      {m.stock} {m.unit}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-stone-500">{m.reorder} {m.unit}</td>
                  <td className="py-3 px-2 font-medium text-stone-800">{m.price}</td>
                  <td className="py-3 px-2 text-red-700 font-medium hover:underline cursor-pointer">{m.supplier}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        m.low ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="p-1 text-stone-400 hover:text-stone-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Bottom 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* Purchase Orders Table (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-stone-900 text-sm">Purchase Orders</h3>
              <span className="text-xs font-semibold text-red-700 hover:underline cursor-pointer">
                View All &gt;
              </span>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-stone-900">PO-1042</p>
                  <p className="text-[11px] text-stone-400">Al Noor Traders · 3 items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">Rs. 18,500</p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Received</span>
                </div>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-stone-900">PO-1041</p>
                  <p className="text-[11px] text-stone-400">Fresh Foods Co. · 2 items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">Rs. 12,400</p>
                  <span className="text-[10px] text-blue-700 font-semibold">In Transit</span>
                </div>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-stone-900">PO-1040</p>
                  <p className="text-[11px] text-stone-400">National Foods · 4 items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">Rs. 6,800</p>
                  <span className="text-[10px] text-amber-700 font-semibold">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown Donut (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-stone-900 text-sm">Cost Breakdown</h3>
          </div>

          <div className="relative flex items-center justify-center my-1">
            <svg viewBox="0 0 160 160" className="w-32 h-32">
              <circle cx="80" cy="80" r="55" fill="none" stroke="#911116" strokeWidth="18" strokeDasharray="110 235" strokeDashoffset="0" />
              <circle cx="80" cy="80" r="55" fill="none" stroke="#F59E0B" strokeWidth="18" strokeDasharray="80 265" strokeDashoffset="-110" />
              <circle cx="80" cy="80" r="55" fill="none" stroke="#10B981" strokeWidth="18" strokeDasharray="60 285" strokeDashoffset="-190" />
              <circle cx="80" cy="80" r="55" fill="none" stroke="#3B82F6" strokeWidth="18" strokeDasharray="35 310" strokeDashoffset="-250" />
              <circle cx="80" cy="80" r="55" fill="none" stroke="#A855F7" strokeWidth="18" strokeDasharray="60 285" strokeDashoffset="-285" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-stone-400 font-bold uppercase">Total</span>
              <span className="text-xs font-black text-stone-900">Rs. 78,650</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 text-[10px] text-stone-600 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#911116]" /> Meat 32%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Grains 24%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10B981]" /> Veg 18%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3B82F6]" /> Dairy 10%</span>
          </div>
        </div>

        {/* Recent Stock Movements (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-stone-900 text-sm">Stock Movements</h3>
              <span className="text-xs font-semibold text-red-700 hover:underline cursor-pointer">
                View All &gt;
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-emerald-700 font-bold">+50 kg Basmati Rice</span>
                <span className="text-[10px] text-stone-400">PO-1042</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-red-600 font-bold">-5 kg Chicken Fresh</span>
                <span className="text-[10px] text-stone-400">Kitchen</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-red-600 font-bold">-3 kg Tomatoes</span>
                <span className="text-[10px] text-stone-400">Kitchen</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-amber-600 font-bold">-2 kg Onions</span>
                <span className="text-[10px] text-stone-400">Waste</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-emerald-700 font-bold">+20 ltr Cooking Oil</span>
                <span className="text-[10px] text-stone-400">Restock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-stone-200 shadow-xs flex flex-col justify-between">
          <h3 className="font-bold text-stone-900 text-xs mb-2">Quick Actions</h3>
          <div className="space-y-1.5 text-xs">
            <button className="w-full py-1.5 px-2 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-lg font-semibold text-left transition">
              Receive Stock
            </button>
            <button className="w-full py-1.5 px-2 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-lg font-semibold text-left transition">
              Issue Stock
            </button>
            <button className="w-full py-1.5 px-2 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-lg font-semibold text-left transition">
              Adjust Stock
            </button>
            <button className="w-full py-1.5 px-2 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-lg font-semibold text-left transition">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
