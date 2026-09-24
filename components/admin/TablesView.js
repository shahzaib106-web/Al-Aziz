'use client';
import { useState } from 'react';
import {
  Armchair,
  Plus,
  Users,
  Clock,
  Receipt,
  Printer,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  Eye,
  Filter,
  DollarSign,
  X,
  RefreshCw,
} from 'lucide-react';
import PrintReceiptModal from './PrintReceiptModal';

const INITIAL_TABLES = [
  {
    id: 't-01',
    number: 'Table 1',
    section: 'Family Hall (1st Floor)',
    capacity: 6,
    status: 'occupied',
    seatedTime: '10:45 AM',
    elapsedMinutes: 45,
    guestsCount: 5,
    currentOrder: {
      orderId: '#1044',
      itemsCount: 4,
      total: 'Rs. 4,200',
      items: '1x Desi Murgh Karahi, 1x Chicken Biryani (Full), 4x Roghni Naan, 2x Cold Drinks',
      waiter: 'Imran Khan',
    },
  },
  {
    id: 't-02',
    number: 'Table 2',
    section: 'Family Hall (1st Floor)',
    capacity: 8,
    status: 'occupied',
    seatedTime: '11:10 AM',
    elapsedMinutes: 20,
    guestsCount: 7,
    currentOrder: {
      orderId: '#1045',
      itemsCount: 6,
      total: 'Rs. 7,650',
      items: '2x Special Chicken Biryani, 1x Mutton Handi, 6x Garlic Naan, 1x Salad Platter',
      waiter: 'Tariq Mehmood',
    },
  },
  {
    id: 't-03',
    number: 'Table 3',
    section: 'Main Dining Hall',
    capacity: 4,
    status: 'available',
    seatedTime: null,
    elapsedMinutes: 0,
    guestsCount: 0,
    currentOrder: null,
  },
  {
    id: 't-04',
    number: 'Table 4',
    section: 'Main Dining Hall',
    capacity: 4,
    status: 'occupied',
    seatedTime: '10:20 AM',
    elapsedMinutes: 70,
    guestsCount: 4,
    currentOrder: {
      orderId: '#1042',
      itemsCount: 3,
      total: 'Rs. 2,480',
      items: '1x Chicken Biryani, 2x Special Naan, 1x Chicken Karahi (Half)',
      waiter: 'Imran Khan',
    },
  },
  {
    id: 't-05',
    number: 'Table 5',
    section: 'Main Dining Hall',
    capacity: 2,
    status: 'cleaning',
    seatedTime: null,
    elapsedMinutes: 0,
    guestsCount: 0,
    currentOrder: null,
  },
  {
    id: 't-06',
    number: 'Table 6',
    section: 'Courtyard Terrace',
    capacity: 4,
    status: 'reserved',
    seatedTime: null,
    elapsedMinutes: 0,
    guestsCount: 4,
    reservation: {
      customerName: 'Sheikh Waqas',
      phone: '+92 321 7894561',
      time: '1:30 PM (Lunch)',
      notes: 'Terrace garden corner table preferred',
    },
    currentOrder: null,
  },
  {
    id: 't-07',
    number: 'Table 7',
    section: 'Courtyard Terrace',
    capacity: 4,
    status: 'available',
    seatedTime: null,
    elapsedMinutes: 0,
    guestsCount: 0,
    currentOrder: null,
  },
  {
    id: 't-08',
    number: 'VIP Majlis 1',
    section: 'VIP Lounge',
    capacity: 12,
    status: 'occupied',
    seatedTime: '11:00 AM',
    elapsedMinutes: 30,
    guestsCount: 11,
    currentOrder: {
      orderId: '#1043',
      itemsCount: 8,
      total: 'Rs. 14,800',
      items: '2x Mutton Shinwari, 3x Chicken Biryani (Full), 1x BBQ Platter, 12x Naan',
      waiter: 'Babar Ali',
    },
  },
  {
    id: 't-09',
    number: 'VIP Majlis 2',
    section: 'VIP Lounge',
    capacity: 10,
    status: 'available',
    seatedTime: null,
    elapsedMinutes: 0,
    guestsCount: 0,
    currentOrder: null,
  },
];

export default function TablesView() {
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeBillModal, setActiveBillModal] = useState(null);
  const [seatGuestModal, setSeatGuestModal] = useState(null);
  const [addTableModal, setAddTableModal] = useState(false);
  const [printOrder, setPrintOrder] = useState(null);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printModalMode, setPrintModalMode] = useState('bill');

  // New Table Form
  const [newTable, setNewTable] = useState({
    number: '',
    section: 'Main Dining Hall',
    capacity: 4,
  });

  // Seat Guest Form
  const [guestForm, setGuestForm] = useState({
    guestsCount: 2,
    waiter: 'Imran Khan',
  });

  const sections = ['all', 'Main Dining Hall', 'Family Hall (1st Floor)', 'Courtyard Terrace', 'VIP Lounge'];

  const filteredTables = tables.filter((t) => {
    const matchSection = selectedSection === 'all' || t.section === selectedSection;
    const matchStatus = selectedStatus === 'all' || t.status === selectedStatus;
    return matchSection && matchStatus;
  });

  const totalSeats = tables.reduce((acc, t) => acc + t.capacity, 0);
  const occupiedTables = tables.filter((t) => t.status === 'occupied');
  const occupiedSeats = occupiedTables.reduce((acc, t) => acc + t.guestsCount, 0);
  const availableTables = tables.filter((t) => t.status === 'available');

  const handleMarkClean = (tableId) => {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, status: 'available' } : t))
    );
  };

  const handleSeatGuests = (e) => {
    e.preventDefault();
    if (!seatGuestModal) return;

    setTables((prev) =>
      prev.map((t) => {
        if (t.id === seatGuestModal.id) {
          return {
            ...t,
            status: 'occupied',
            seatedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            elapsedMinutes: 1,
            guestsCount: Number(guestForm.guestsCount) || 2,
            currentOrder: {
              orderId: `#${Math.floor(1000 + Math.random() * 9000)}`,
              itemsCount: 0,
              total: 'Rs. 0',
              items: 'Order in progress...',
              waiter: guestForm.waiter,
            },
          };
        }
        return t;
      })
    );

    setSeatGuestModal(null);
  };

  const handleClearTable = (tableId) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              status: 'cleaning',
              seatedTime: null,
              elapsedMinutes: 0,
              guestsCount: 0,
              currentOrder: null,
            }
          : t
      )
    );
    setActiveBillModal(null);
  };

  const handleAddTableSubmit = (e) => {
    e.preventDefault();
    if (!newTable.number.trim()) return;

    const created = {
      id: `t-${Date.now()}`,
      number: newTable.number,
      section: newTable.section,
      capacity: Number(newTable.capacity) || 4,
      status: 'available',
      seatedTime: null,
      elapsedMinutes: 0,
      guestsCount: 0,
      currentOrder: null,
    };

    setTables((prev) => [...prev, created]);
    setNewTable({ number: '', section: 'Main Dining Hall', capacity: 4 });
    setAddTableModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#911116]">
              <Armchair className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Tables & Dine-In Management
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Al Aziz Restaurant live seating floor plan, running orders, and table turnaround times.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setAddTableModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#911116] hover:bg-[#7B0D12] text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Dining Table</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Total Tables</p>
          <p className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">{tables.length}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">{totalSeats} Total Dining Seats</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Occupied Tables</p>
          <p className="text-2xl font-bold text-amber-700 mt-1 font-mono tabular-nums">
            {occupiedTables.length} <span className="text-xs text-stone-400 font-normal">/ {tables.length}</span>
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">{occupiedSeats} Seated Guests Right Now</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Available Ready</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">
            {availableTables.length}
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">Ready for walk-in guests</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Active Dine-in Value</p>
          <p className="text-xl font-bold text-[#911116] mt-1 font-mono tabular-nums">
            Rs. {occupiedTables.reduce((acc, t) => acc + (parseInt(t.currentOrder?.total?.replace(/[^0-9]/g, '') || 0)), 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">Running unpaid table tickets</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Sections */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedSection === sec
                  ? 'bg-[#911116] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {sec === 'all' ? 'All Sections' : sec}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full md:w-auto justify-end">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
              selectedStatus === 'all' ? 'bg-stone-800 text-white' : 'text-stone-500 hover:bg-stone-100'
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => setSelectedStatus('occupied')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
              selectedStatus === 'occupied' ? 'bg-amber-700 text-white' : 'text-amber-800 hover:bg-amber-50'
            }`}
          >
            ● Seated
          </button>
          <button
            onClick={() => setSelectedStatus('available')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
              selectedStatus === 'available' ? 'bg-emerald-700 text-white' : 'text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            ● Free
          </button>
          <button
            onClick={() => setSelectedStatus('reserved')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
              selectedStatus === 'reserved' ? 'bg-blue-700 text-white' : 'text-blue-800 hover:bg-blue-50'
            }`}
          >
            ● Reserved
          </button>
          <button
            onClick={() => setSelectedStatus('cleaning')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
              selectedStatus === 'cleaning' ? 'bg-purple-700 text-white' : 'text-purple-800 hover:bg-purple-50'
            }`}
          >
            ● Cleaning
          </button>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTables.map((table) => {
          const isOccupied = table.status === 'occupied';
          const isAvailable = table.status === 'available';
          const isReserved = table.status === 'reserved';
          const isCleaning = table.status === 'cleaning';

          return (
            <div
              key={table.id}
              className={`rounded-xl border transition-all shadow-xs flex flex-col justify-between overflow-hidden ${
                isOccupied
                  ? 'bg-amber-50/40 border-amber-200'
                  : isAvailable
                  ? 'bg-white border-stone-200 hover:border-emerald-300'
                  : isReserved
                  ? 'bg-blue-50/30 border-blue-200'
                  : 'bg-purple-50/30 border-purple-200'
              }`}
            >
              {/* Card Top */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base flex items-center gap-1.5">
                      {table.number}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium mt-0.5">{table.section}</p>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isOccupied
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : isAvailable
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : isReserved
                        ? 'bg-blue-100 text-blue-900 border-blue-300'
                        : 'bg-purple-100 text-purple-900 border-purple-300'
                    }`}
                  >
                    {isOccupied && '● Seated'}
                    {isAvailable && '● Available'}
                    {isReserved && '● Reserved'}
                    {isCleaning && '● Cleaning'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-500 mt-2.5">
                  <span className="flex items-center gap-1 font-mono">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    <span>{table.capacity} Seats</span>
                  </span>

                  {isOccupied && (
                    <span className="flex items-center gap-1 font-mono text-amber-800">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{table.elapsedMinutes}m ({table.seatedTime})</span>
                    </span>
                  )}
                </div>

                {/* Specific Status Details */}
                {isOccupied && table.currentOrder && (
                  <div className="mt-3.5 p-2.5 bg-white/90 rounded-lg border border-amber-200/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-stone-700">Order {table.currentOrder.orderId}</span>
                      <span className="text-[#911116] font-bold font-mono">{table.currentOrder.total}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{table.currentOrder.items}</p>
                    <p className="text-[10px] text-stone-400">Server: {table.currentOrder.waiter}</p>
                  </div>
                )}

                {isReserved && table.reservation && (
                  <div className="mt-3.5 p-2.5 bg-white/90 rounded-lg border border-blue-200 text-xs space-y-1">
                    <div className="font-semibold text-blue-950 flex items-center justify-between">
                      <span>{table.reservation.customerName}</span>
                      <span className="text-[10px] text-blue-700 font-mono">{table.reservation.time}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-stone-400" /> {table.reservation.phone}
                    </p>
                    <p className="text-[10px] text-stone-500 italic">{table.reservation.notes}</p>
                  </div>
                )}

                {isCleaning && (
                  <div className="mt-3.5 p-2.5 bg-white/90 rounded-lg border border-purple-200 text-xs flex items-center justify-between">
                    <span className="text-purple-900 font-medium">Table needs sanitization</span>
                    <button
                      onClick={() => handleMarkClean(table.id)}
                      className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[11px] transition"
                    >
                      Mark Ready
                    </button>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-stone-50/90 border-t border-stone-200/80 flex items-center justify-between gap-2">
                {isAvailable && (
                  <button
                    onClick={() => {
                      setSeatGuestModal(table);
                      setGuestForm({ guestsCount: table.capacity, waiter: 'Imran Khan' });
                    }}
                    className="w-full py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Seat Walk-in Guests</span>
                  </button>
                )}

                {isOccupied && (
                  <>
                    <button
                      onClick={() => setActiveBillModal(table)}
                      className="flex-1 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold transition flex items-center justify-center gap-1"
                    >
                      <Receipt className="w-3.5 h-3.5 text-stone-600" />
                      <span>View Bill</span>
                    </button>
                    <button
                      onClick={() => handleClearTable(table.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#911116] hover:bg-[#7B0D12] text-white text-xs font-semibold shadow-xs transition"
                    >
                      Close Out
                    </button>
                  </>
                )}

                {isReserved && (
                  <button
                    onClick={() => {
                      setSeatGuestModal(table);
                      setGuestForm({ guestsCount: table.capacity, waiter: 'Babar Ali' });
                    }}
                    className="w-full py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition"
                  >
                    Check In Reservation
                  </button>
                )}

                {isCleaning && (
                  <button
                    onClick={() => handleMarkClean(table.id)}
                    className="w-full py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold transition flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Table Ready & Clean</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View Bill / Settlement Modal */}
      {activeBillModal && activeBillModal.currentOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-stone-900 text-base">{activeBillModal.number} — Current Bill</h3>
                <p className="text-xs text-stone-500">Order ID: {activeBillModal.currentOrder.orderId}</p>
              </div>
              <button
                onClick={() => setActiveBillModal(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Section:</span>
                <span className="font-medium text-stone-900">{activeBillModal.section}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Seated Time:</span>
                <span className="font-medium text-stone-900">{activeBillModal.seatedTime} ({activeBillModal.elapsedMinutes} mins ago)</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Assigned Server:</span>
                <span className="font-medium text-stone-900">{activeBillModal.currentOrder.waiter}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Total Amount:</span>
                <span className="text-[#911116] font-mono">{activeBillModal.currentOrder.total}</span>
              </div>
            </div>

            <div className="text-xs text-stone-500">
              <p className="font-semibold text-stone-700 mb-1">Ordered Items:</p>
              <p className="p-2.5 bg-stone-100 rounded-lg">{activeBillModal.currentOrder.items}</p>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 border-t border-stone-100">
              <button
                onClick={() => {
                  const rawItems = (activeBillModal.currentOrder.items || '').split(',').map((str) => {
                    const trimmed = str.trim();
                    const match = trimmed.match(/^(\d+)x\s*(.*)$/);
                    if (match) {
                      return {
                        qty: parseInt(match[1], 10),
                        name: match[2].trim(),
                        variant: 'Standard',
                        price: 650,
                      };
                    }
                    return {
                      qty: 1,
                      name: trimmed,
                      variant: 'Standard',
                      price: 550,
                    };
                  });

                  const totalNum = parseInt(
                    (activeBillModal.currentOrder.total || '0').replace(/[^0-9]/g, ''),
                    10
                  ) || 2000;

                  const tableOrder = {
                    id: activeBillModal.currentOrder.orderId || `#TBL-${activeBillModal.id}`,
                    type: 'Dine In',
                    table: activeBillModal.number,
                    amount: activeBillModal.currentOrder.total,
                    amountNum: totalNum,
                    subtotal: Math.round(totalNum / 1.08),
                    tax: Math.round(totalNum - totalNum / 1.08),
                    time: activeBillModal.seatedTime || 'Just now',
                    customer: {
                      name: `Guest (${activeBillModal.number})`,
                      phone: 'Dine-In Table Guest',
                    },
                    payment: 'Paid',
                    paymentMethod: 'Cash',
                    status: 'Ready',
                    notes: `Server: ${activeBillModal.currentOrder.waiter || 'Staff'} · Section: ${activeBillModal.section}`,
                    items: rawItems.length > 0 ? rawItems : [
                      { name: 'Special Chicken Biryani', variant: 'Full', qty: 2, price: 850 },
                      { name: 'Special Roghni Naan', variant: 'Butter', qty: 4, price: 120 },
                    ],
                  };

                  setPrintOrder(tableOrder);
                  setPrintModalMode('bill');
                  setPrintModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-stone-300 text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
                title="Print Guest Bill / KOT"
              >
                <Printer className="w-3.5 h-3.5 text-stone-600" />
                <span>Print Receipt & KOT</span>
              </button>
              <button
                onClick={() => handleClearTable(activeBillModal.id)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#911116] hover:bg-[#7B0D12] text-white shadow-xs"
              >
                Mark Paid & Clear Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Seat Guests Modal */}
      {seatGuestModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">Seat Guests at {seatGuestModal.number}</h3>
              <button
                onClick={() => setSeatGuestModal(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSeatGuests} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max={seatGuestModal.capacity + 2}
                  value={guestForm.guestsCount}
                  onChange={(e) => setGuestForm({ ...guestForm, guestsCount: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                />
                <span className="text-[10px] text-stone-400 mt-0.5 block">Max recommended: {seatGuestModal.capacity}</span>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Assigned Waiter</label>
                <select
                  value={guestForm.waiter}
                  onChange={(e) => setGuestForm({ ...guestForm, waiter: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium"
                >
                  <option value="Imran Khan">Imran Khan (Main Hall)</option>
                  <option value="Tariq Mehmood">Tariq Mehmood (Family Hall)</option>
                  <option value="Babar Ali">Babar Ali (VIP Majlis)</option>
                  <option value="Zubair Ahmed">Zubair Ahmed (Terrace)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setSeatGuestModal(null)}
                  className="px-3.5 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-xs"
                >
                  Confirm & Open Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Table Modal */}
      {addTableModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">Add New Dining Table</h3>
              <button
                onClick={() => setAddTableModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTableSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Table Identifier</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Table 10 or VIP Majlis 3"
                  value={newTable.number}
                  onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Section</label>
                <select
                  value={newTable.section}
                  onChange={(e) => setNewTable({ ...newTable, section: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium"
                >
                  <option value="Main Dining Hall">Main Dining Hall</option>
                  <option value="Family Hall (1st Floor)">Family Hall (1st Floor)</option>
                  <option value="Courtyard Terrace">Courtyard Terrace</option>
                  <option value="VIP Lounge">VIP Lounge</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Seating Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-stone-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setAddTableModal(false)}
                  className="px-3.5 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#911116] hover:bg-[#7B0D12] text-white font-semibold shadow-xs"
                >
                  Create Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Print Receipt / KOT Modal */}
      <PrintReceiptModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        order={printOrder}
        initialMode={printModalMode}
      />
    </div>
  );
}
