'use client';
import { useState } from 'react';
import {
  BarChart2,
  Calendar,
  Download,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Utensils,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  FileSpreadsheet,
  Clock,
  Printer,
  ChevronDown,
} from 'lucide-react';
import GoogleSheetsSyncModal from './GoogleSheetsSyncModal';

const HOURLY_SALES = [
  { hour: '11 AM', orders: 8, revenue: 9600 },
  { hour: '12 PM', orders: 18, revenue: 21600 },
  { hour: '1 PM', orders: 34, revenue: 44200 },
  { hour: '2 PM', orders: 28, revenue: 36400 },
  { hour: '3 PM', orders: 12, revenue: 14400 },
  { hour: '4 PM', orders: 6, revenue: 7200 },
  { hour: '5 PM', orders: 9, revenue: 10800 },
  { hour: '6 PM', orders: 14, revenue: 18200 },
  { hour: '7 PM', orders: 22, revenue: 30800 },
  { hour: '8 PM', orders: 38, revenue: 53200 },
  { hour: '9 PM', orders: 42, revenue: 61000 },
  { hour: '10 PM', orders: 30, revenue: 42000 },
  { hour: '11 PM', orders: 16, revenue: 20800 },
];

const TOP_PERFORMING_DISHES = [
  { rank: 1, name: 'Special Chicken Biryani', category: 'Biryani & Pulao', fullSold: 84, halfSold: 58, revenue: 116400, growth: '+14%' },
  { rank: 2, name: 'Desi Murgh Karahi', category: 'Karahi & Handi', fullSold: 42, halfSold: 30, revenue: 86400, growth: '+9%' },
  { rank: 3, name: 'Special Roghni Naan', category: 'Tandoor & Breads', fullSold: 195, halfSold: 0, revenue: 29250, growth: '+22%' },
  { rank: 4, name: 'Beef Seekh Kebab (4 pcs)', category: 'BBQ & Grills', fullSold: 58, halfSold: 0, revenue: 34800, growth: '+5%' },
  { rank: 5, name: 'Mutton Handi (Boneless)', category: 'Karahi & Handi', fullSold: 24, halfSold: 18, revenue: 67200, growth: '+11%' },
  { rank: 6, name: 'Dal Makhani Tadka', category: 'Vegetarian', fullSold: 36, halfSold: 0, revenue: 18000, growth: '-2%' },
];

export default function ReportsView() {
  const [period, setPeriod] = useState('today'); // today, week, month
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [sheetsModalOpen, setSheetsModalOpen] = useState(false);

  const getMetrics = () => {
    switch (period) {
      case 'week':
        return {
          revenue: 'Rs. 984,200',
          orders: '1,280',
          aov: 'Rs. 1,460',
          customers: '890',
          dineInShare: '54%',
          deliveryShare: '36%',
          takeawayShare: '10%',
        };
      case 'month':
        return {
          revenue: 'Rs. 4,120,000',
          orders: '5,420',
          aov: 'Rs. 1,480',
          customers: '3,450',
          dineInShare: '52%',
          deliveryShare: '38%',
          takeawayShare: '10%',
        };
      default:
        return {
          revenue: 'Rs. 148,250',
          orders: '184',
          aov: 'Rs. 1,420',
          customers: '158',
          dineInShare: '56%',
          deliveryShare: '34%',
          takeawayShare: '10%',
        };
    }
  };

  const currentMetrics = getMetrics();

  const handleExportCSV = () => {
    const headers = 'Item,Category,Full Sold,Half Sold,Revenue (PKR),Trend\n';
    const rows = TOP_PERFORMING_DISHES.map(
      (d) => `"${d.name}","${d.category}",${d.fullSold},${d.halfSold},${d.revenue},"${d.growth}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `al-aziz-restaurant-sales-report-${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#911116]">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Reports & Business Analytics
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Al Aziz Restaurant sales performance, portion breakdown, and peak ordering trends.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Period selector */}
          <div className="bg-white p-1 rounded-xl border border-stone-200 shadow-xs flex items-center">
            <button
              onClick={() => setPeriod('today')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                period === 'today' ? 'bg-[#911116] text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setPeriod('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                period === 'week' ? 'bg-[#911116] text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                period === 'month' ? 'bg-[#911116] text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              This Month
            </button>
          </div>

          <button
            onClick={() => setSheetsModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Google Sheets</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{downloadSuccess ? 'Downloaded!' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Gross Sales Revenue</p>
          <p className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">{currentMetrics.revenue}</p>
          <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% vs last period
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Orders Processed</p>
          <p className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">{currentMetrics.orders}</p>
          <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +8.2% order volume
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Average Ticket Size</p>
          <p className="text-2xl font-bold text-amber-800 mt-1 font-mono tabular-nums">{currentMetrics.aov}</p>
          <span className="text-[11px] text-stone-400 mt-0.5 block">Avg basket per customer</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Total Diners & Buyers</p>
          <p className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">{currentMetrics.customers}</p>
          <span className="text-[11px] text-stone-400 mt-0.5 block">Unique patron accounts</span>
        </div>
      </div>

      {/* Channel Breakdown & Peak Hours Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Share */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h2 className="font-bold text-stone-900 text-sm sm:text-base">Order Channel Share</h2>
            <span className="text-[11px] text-stone-400 font-mono">100% Total</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-stone-800">Dine-In Restaurant</span>
                <span className="font-bold text-stone-900 font-mono">{currentMetrics.dineInShare}</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#911116] rounded-full" style={{ width: currentMetrics.dineInShare }}></div>
              </div>
              <p className="text-[10px] text-stone-400 mt-0.5">Family Hall & Main Dining Hall</p>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-stone-800">Direct Home Delivery</span>
                <span className="font-bold text-stone-900 font-mono">{currentMetrics.deliveryShare}</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: currentMetrics.deliveryShare }}></div>
              </div>
              <p className="text-[10px] text-stone-400 mt-0.5">Website & PWA online orders</p>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-stone-800">Takeaway & Counter Pickup</span>
                <span className="font-bold text-stone-900 font-mono">{currentMetrics.takeawayShare}</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: currentMetrics.takeawayShare }}></div>
              </div>
              <p className="text-[10px] text-stone-400 mt-0.5">Walk-in parcel parcels</p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100">
            <h3 className="font-bold text-stone-800 text-xs mb-2">Payment Methods Breakdown</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-stone-50 rounded-lg">
                <span className="text-[10px] text-stone-400 block font-medium">Cash / COD</span>
                <span className="font-bold text-stone-800 font-mono">68%</span>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg">
                <span className="text-[10px] text-stone-400 block font-medium">JazzCash / EasyPaisa</span>
                <span className="font-bold text-stone-800 font-mono">19%</span>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg">
                <span className="text-[10px] text-stone-400 block font-medium">Card POS Terminal</span>
                <span className="font-bold text-stone-800 font-mono">11%</span>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg">
                <span className="text-[10px] text-stone-400 block font-medium">Online Bank</span>
                <span className="font-bold text-stone-800 font-mono">2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Volume Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 shadow-xs p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div>
              <h2 className="font-bold text-stone-900 text-sm sm:text-base">Hourly Rush & Peak Order Volume</h2>
              <p className="text-xs text-stone-400">Order traffic distributed by time of day</p>
            </div>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Peak: 8 PM – 10 PM
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-48 flex items-end justify-between gap-1.5 pt-6 pb-2 px-1">
            {HOURLY_SALES.map((item) => {
              const maxOrders = 45;
              const heightPct = Math.round((item.orders / maxOrders) * 100);
              const isPeak = item.orders >= 30;

              return (
                <div key={item.hour} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition absolute -top-10 bg-stone-900 text-white text-[10px] rounded px-1.5 py-1 whitespace-nowrap pointer-events-none z-10 font-mono">
                    {item.orders} orders · Rs. {item.revenue.toLocaleString()}
                  </div>

                  <div className="w-full bg-stone-100 rounded-t-sm h-36 flex items-end justify-center overflow-hidden">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        isPeak ? 'bg-[#911116] group-hover:bg-[#7B0D12]' : 'bg-amber-500/70 group-hover:bg-amber-600'
                      }`}
                    ></div>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono whitespace-nowrap">{item.hour}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#911116]"></span> Rush Peak Hours
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-500/70"></span> Regular Volume
              </span>
            </div>
            <span className="text-[11px] text-stone-400">Total 13 service hours tracked</span>
          </div>
        </div>
      </div>

      {/* Top Dishes Table with Half/Full Breakdown */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-bold text-stone-900 text-sm sm:text-base">
              Top Selling Dishes & Portion Performance
            </h2>
            <p className="text-xs text-stone-400">
              Detailed sales breakdown highlighting Half vs Full portion preferences
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Dish Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Full Portion</th>
                <th className="py-3 px-4 text-center">Half Portion</th>
                <th className="py-3 px-4 text-right">Gross Revenue</th>
                <th className="py-3 px-4 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans">
              {TOP_PERFORMING_DISHES.map((dish) => (
                <tr key={dish.rank} className="hover:bg-stone-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-stone-400 font-mono">{dish.rank}</td>
                  <td className="py-3.5 px-4 font-bold text-stone-900">{dish.name}</td>
                  <td className="py-3.5 px-4 text-stone-500">{dish.category}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold text-stone-800">
                    {dish.fullSold > 0 ? `${dish.fullSold} sold` : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold text-stone-800">
                    {dish.halfSold > 0 ? `${dish.halfSold} sold` : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-900">
                    Rs. {dish.revenue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        dish.growth.startsWith('+') ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      {dish.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Google Sheets Sync Modal */}
      <GoogleSheetsSyncModal
        isOpen={sheetsModalOpen}
        onClose={() => setSheetsModalOpen(false)}
      />
    </div>
  );
}
