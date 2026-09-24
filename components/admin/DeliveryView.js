'use client';
import { useState } from 'react';
import {
  Bike,
  Search,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  UserCheck,
  Plus,
  DollarSign,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';

const INITIAL_RIDERS = [
  {
    id: 'r-1',
    name: 'Zain Abbas',
    phone: '+92 301 5551234',
    bikeNumber: 'ICT-RI-8842',
    status: 'on_delivery',
    activeOrdersCount: 2,
    completedToday: 14,
    cashCollected: 16800,
    rating: 4.9,
  },
  {
    id: 'r-2',
    name: 'Muhammad Farhan',
    phone: '+92 312 4449876',
    bikeNumber: 'ICT-RI-3120',
    status: 'available',
    activeOrdersCount: 0,
    completedToday: 18,
    cashCollected: 22400,
    rating: 4.8,
  },
  {
    id: 'r-3',
    name: 'Usman Tariq',
    phone: '+92 333 7776543',
    bikeNumber: 'ICT-RI-1904',
    status: 'on_delivery',
    activeOrdersCount: 1,
    completedToday: 11,
    cashCollected: 13200,
    rating: 4.7,
  },
  {
    id: 'r-4',
    name: 'Bilal Gujjar',
    phone: '+92 345 8882319',
    bikeNumber: 'ICT-RI-4491',
    status: 'off_duty',
    activeOrdersCount: 0,
    completedToday: 8,
    cashCollected: 9600,
    rating: 4.9,
  },
];

const INITIAL_DELIVERY_ORDERS = [
  {
    id: '#1041',
    customerName: 'Sarah Khan',
    phone: '+92 321 9876543',
    address: 'House 42, Street 18, Sector F-7/2, Islamabad',
    landmark: 'Near Safa Gold Mall',
    amount: 1950,
    paymentMethod: 'COD',
    status: 'out_for_delivery',
    dispatchTime: '10:35 AM',
    etaMinutes: 12,
    riderId: 'r-1',
    riderName: 'Zain Abbas',
    items: '1x Desi Murgh Karahi (Full), 4x Garlic Naan, 2x Mint Raita',
  },
  {
    id: '#1040',
    customerName: 'Dr. Hamza Aslam',
    phone: '+92 300 8765432',
    address: 'Apartment 4B, Silver Oaks Towers, F-10, Islamabad',
    landmark: 'Opposite F-10 Markaz',
    amount: 3400,
    paymentMethod: 'Paid Online',
    status: 'out_for_delivery',
    dispatchTime: '10:40 AM',
    etaMinutes: 18,
    riderId: 'r-3',
    riderName: 'Usman Tariq',
    items: '2x Special Chicken Biryani, 1x Beef Seekh Kebab Platter, 4x Roghni Naan',
  },
  {
    id: '#1039',
    customerName: 'Waleed Malik',
    phone: '+92 334 1122334',
    address: 'Plaza 14, Main Jinnah Avenue, Blue Area, Islamabad',
    landmark: 'Behind Kulsum International Hospital',
    amount: 1250,
    paymentMethod: 'COD',
    status: 'ready_dispatch',
    dispatchTime: null,
    etaMinutes: 25,
    riderId: 'r-1',
    riderName: 'Zain Abbas',
    items: '1x Chicken Biryani (Half), 1x Dal Makhani, 2x Tandoori Roti',
  },
  {
    id: '#1038',
    customerName: 'Ayesha Siddiqui',
    phone: '+92 315 9988776',
    address: 'Street 9, Sector G-9/3, Islamabad',
    landmark: 'Near Karachi Company Market',
    amount: 2800,
    paymentMethod: 'COD',
    status: 'delivered',
    dispatchTime: '9:50 AM',
    etaMinutes: 0,
    riderId: 'r-2',
    riderName: 'Muhammad Farhan',
    items: '1x Chicken Karahi (Full), 5x Special Naan, 1x 1.5L Coke',
  },
  {
    id: '#1037',
    customerName: 'Kamran Baig',
    phone: '+92 322 4455667',
    address: 'House 112, Sector E-11/2, Islamabad',
    landmark: 'Near MPCHS Gate 2',
    amount: 4600,
    paymentMethod: 'Paid Online',
    status: 'delivered',
    dispatchTime: '9:30 AM',
    etaMinutes: 0,
    riderId: 'r-2',
    riderName: 'Muhammad Farhan',
    items: '2x Mutton Shinwari Handi, 8x Butter Naan, 2x Fresh Salad',
  },
];

export default function DeliveryView() {
  const [orders, setOrders] = useState(INITIAL_DELIVERY_ORDERS);
  const [riders, setRiders] = useState(INITIAL_RIDERS);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignRiderModal, setAssignRiderModal] = useState(null);
  const [selectedRiderForAssign, setSelectedRiderForAssign] = useState('r-2');

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.riderName?.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'all') return matchSearch;
    return matchSearch && o.status === statusFilter;
  });

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleAssignRider = (e) => {
    e.preventDefault();
    if (!assignRiderModal) return;

    const riderObj = riders.find((r) => r.id === selectedRiderForAssign);

    setOrders((prev) =>
      prev.map((o) =>
        o.id === assignRiderModal.id
          ? {
              ...o,
              riderId: riderObj.id,
              riderName: riderObj.name,
              status: 'out_for_delivery',
              dispatchTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : o
      )
    );

    setAssignRiderModal(null);
  };

  const activeDeliveries = orders.filter((o) => o.status === 'out_for_delivery');
  const readyOrders = orders.filter((o) => o.status === 'ready_dispatch');
  const deliveredToday = orders.filter((o) => o.status === 'delivered');
  const totalCodToCollect = activeDeliveries
    .filter((o) => o.paymentMethod === 'COD')
    .reduce((acc, o) => acc + o.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#911116]">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Delivery & Rider Dispatch
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Live delivery tracking, fleet allocation, and COD cash reconciliation for Al Aziz Restaurant.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>GPS Dispatch Active</span>
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">On The Road</p>
          <p className="text-2xl font-bold text-amber-700 mt-1 font-mono tabular-nums">{activeDeliveries.length}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">Active bike dispatches</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Waiting For Rider</p>
          <p className="text-2xl font-bold text-red-600 mt-1 font-mono tabular-nums">{readyOrders.length}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">Packed hot in kitchen</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Delivered Today</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">{deliveredToday.length}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">Avg delivery time: 24 mins</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Pending COD Cash</p>
          <p className="text-xl font-bold text-stone-900 mt-1 font-mono tabular-nums">
            Rs. {totalCodToCollect.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">With riders currently on road</p>
        </div>
      </div>

      {/* Main Grid: Orders & Rider Fleet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Delivery Orders (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, customers, addresses..."
                className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  statusFilter === 'all' ? 'bg-[#911116] text-white shadow-xs' : 'bg-stone-100 text-stone-600'
                }`}
              >
                All ({orders.length})
              </button>
              <button
                onClick={() => setStatusFilter('ready_dispatch')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  statusFilter === 'ready_dispatch' ? 'bg-[#911116] text-white shadow-xs' : 'bg-stone-100 text-stone-600'
                }`}
              >
                Ready ({readyOrders.length})
              </button>
              <button
                onClick={() => setStatusFilter('out_for_delivery')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  statusFilter === 'out_for_delivery' ? 'bg-[#911116] text-white shadow-xs' : 'bg-stone-100 text-stone-600'
                }`}
              >
                On Road ({activeDeliveries.length})
              </button>
              <button
                onClick={() => setStatusFilter('delivered')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  statusFilter === 'delivered' ? 'bg-[#911116] text-white shadow-xs' : 'bg-stone-100 text-stone-600'
                }`}
              >
                Delivered ({deliveredToday.length})
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const isOut = order.status === 'out_for_delivery';
              const isReady = order.status === 'ready_dispatch';
              const isDelivered = order.status === 'delivered';

              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-xl border p-4 sm:p-5 transition shadow-xs space-y-3 ${
                    isOut ? 'border-amber-300 bg-amber-50/20' : isReady ? 'border-red-200' : 'border-stone-200'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm font-mono">{order.id}</span>
                      <span className="text-stone-300">·</span>
                      <span className="font-semibold text-stone-800 text-sm">{order.customerName}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.paymentMethod === 'COD'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {order.paymentMethod}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isOut
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : isReady
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {isOut && '● Out for Delivery'}
                        {isReady && '● Waiting for Rider'}
                        {isDelivered && '✓ Completed'}
                      </span>
                      <span className="font-bold text-stone-900 font-mono text-sm">
                        Rs. {order.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Address and details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-start gap-1.5 text-stone-700">
                        <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{order.address}</p>
                          <p className="text-[11px] text-stone-400">Landmark: {order.landmark}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500 font-mono text-[11px] pl-5">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{order.phone}</span>
                      </div>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100 space-y-1">
                      <p className="text-[11px] text-stone-600 line-clamp-2">
                        <strong className="text-stone-800">Items:</strong> {order.items}
                      </p>
                      {order.riderName && (
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-200/60">
                          <span className="text-stone-500 flex items-center gap-1">
                            <Bike className="w-3 h-3 text-stone-400" />
                            Rider: <strong className="text-stone-800">{order.riderName}</strong>
                          </span>
                          {isOut && (
                            <span className="text-amber-800 font-medium font-mono">
                              ETA ~{order.etaMinutes} mins
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${order.phone}`}
                        className="px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>Call Customer</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      {isReady && (
                        <button
                          onClick={() => setAssignRiderModal(order)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#911116] hover:bg-[#7B0D12] text-white font-semibold shadow-xs flex items-center gap-1 transition"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Dispatch Rider</span>
                        </button>
                      )}

                      {isOut && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'delivered')}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-xs flex items-center gap-1 transition"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Delivered & Collect COD</span>
                        </button>
                      )}

                      {isDelivered && (
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Cash Settled
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Rider Fleet */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
              <h2 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-2">
                <Bike className="w-4 h-4 text-[#911116]" />
                <span>Rider Fleet Status</span>
              </h2>
              <span className="text-[11px] text-stone-400">{riders.filter((r) => r.status !== 'off_duty').length} Active</span>
            </div>

            <div className="space-y-3">
              {riders.map((rider) => (
                <div key={rider.id} className="p-3 rounded-xl border border-stone-100 bg-stone-50/70 space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm leading-tight">{rider.name}</h3>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5">{rider.bikeNumber}</p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rider.status === 'available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rider.status === 'on_delivery'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {rider.status === 'available' && '● Free for Trip'}
                      {rider.status === 'on_delivery' && '● On Delivery'}
                      {rider.status === 'off_duty' && '○ Off Duty'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200/50 text-center font-mono">
                    <div className="bg-white p-1.5 rounded-lg border border-stone-100">
                      <span className="text-[9px] uppercase font-bold text-stone-400 block font-sans">Active</span>
                      <span className="font-bold text-stone-800">{rider.activeOrdersCount}</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg border border-stone-100">
                      <span className="text-[9px] uppercase font-bold text-stone-400 block font-sans">Done Today</span>
                      <span className="font-bold text-emerald-700">{rider.completedToday}</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg border border-stone-100">
                      <span className="text-[9px] uppercase font-bold text-stone-400 block font-sans">COD Held</span>
                      <span className="font-bold text-stone-800 text-[10px]">Rs. {rider.cashCollected.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-stone-400 font-mono">{rider.phone}</span>
                    <a
                      href={`tel:${rider.phone}`}
                      className="text-[11px] font-semibold text-[#911116] hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> Call Rider
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assign Rider Modal */}
      {assignRiderModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-stone-200 shadow-xl space-y-4">
            <h3 className="font-bold text-stone-900 text-base">Assign Rider for Order {assignRiderModal.id}</h3>
            <p className="text-xs text-stone-500">
              Customer: <strong className="text-stone-800">{assignRiderModal.customerName}</strong> ({assignRiderModal.address})
            </p>

            <form onSubmit={handleAssignRider} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Select Delivery Rider</label>
                <select
                  value={selectedRiderForAssign}
                  onChange={(e) => setSelectedRiderForAssign(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium"
                >
                  {riders.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.bikeNumber}) — {r.status === 'available' ? 'Available' : 'Busy with orders'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setAssignRiderModal(null)}
                  className="px-3.5 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#911116] hover:bg-[#7B0D12] text-white font-semibold shadow-xs"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
