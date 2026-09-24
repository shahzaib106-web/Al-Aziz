'use client';
import { useState, useEffect } from 'react';
import {
  ChefHat,
  Clock,
  AlertTriangle,
  CheckCircle,
  Volume2,
  VolumeX,
  Maximize2,
  Filter,
  Flame,
  Check,
  RotateCcw,
  Bell,
  UtensilsCrossed,
} from 'lucide-react';

export default function KitchenDisplayView() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [stationFilter, setStationFilter] = useState('All');

  const [tickets, setTickets] = useState([
    {
      id: '#1048',
      table: 'Table 4',
      type: 'Dine-in',
      orderTime: '10:18 AM',
      elapsedSeconds: 372, // 6m 12s
      station: 'Karahi & Rice',
      server: 'Ali Khan',
      status: 'In Prep',
      items: [
        { name: 'Chicken Biryani', portion: 'Half', qty: 1, notes: 'Less spicy, extra raita', done: false },
        { name: 'Special Naan', portion: 'Plain', qty: 2, notes: 'Hot & crispy', done: true },
        { name: 'Chicken Karahi', portion: 'Full', qty: 1, notes: 'Boneless, butter on top', done: false },
      ],
    },
    {
      id: '#1047',
      table: 'Delivery #D-12',
      type: 'Delivery',
      orderTime: '10:10 AM',
      elapsedSeconds: 885, // 14m 45s
      station: 'BBQ & Grill',
      server: 'FoodPanda Rider Waiting',
      status: 'In Prep',
      items: [
        { name: 'Beef Seekh Kebab (4 pcs)', qty: 1, notes: 'With mint chutney', done: false },
        { name: 'Chicken Tikka Boti', qty: 1, notes: 'Extra masala', done: false },
        { name: 'Roghani Naan', qty: 3, notes: 'Sesame seeds', done: true },
        { name: 'Fresh Mint Lemonade', qty: 2, notes: 'Chilled', done: true },
      ],
    },
    {
      id: '#1046',
      table: 'Pickup #P-04',
      type: 'Takeaway',
      orderTime: '09:58 AM',
      elapsedSeconds: 1570, // 26m 10s (Overdue!)
      station: 'Biryani Station',
      server: 'Customer at Counter',
      status: 'Overdue',
      items: [
        { name: 'Chicken Biryani (Double)', qty: 2, notes: 'Extra leg piece if possible', done: false },
        { name: 'Dal Makhani', qty: 1, notes: '', done: false },
        { name: 'Raita & Salad', qty: 2, notes: '', done: true },
      ],
    },
    {
      id: '#1045',
      table: 'Table 2',
      type: 'Dine-in',
      orderTime: '10:22 AM',
      elapsedSeconds: 160, // 2m 40s
      station: 'Karahi & Rice',
      server: 'Usman Tariq',
      status: 'New',
      items: [
        { name: 'Mutton Kunna', qty: 1, notes: 'Traditional clay pot', done: false },
        { name: 'Garlic Naan', qty: 2, notes: 'Extra butter', done: false },
      ],
    },
    {
      id: '#1044',
      table: 'Table 8',
      type: 'Dine-in',
      orderTime: '10:05 AM',
      elapsedSeconds: 1140, // 19m
      station: 'Tandoor & Breads',
      server: 'Bilal Ahmed',
      status: 'Ready',
      items: [
        { name: 'Special Naan', qty: 4, notes: 'Hot from tandoor', done: true },
        { name: 'Chicken Achari Handi', qty: 1, notes: 'Mild', done: true },
      ],
    },
  ]);

  // Timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets((prev) =>
        prev.map((t) => ({ ...t, elapsedSeconds: t.elapsedSeconds + 1 }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleItemDone = (ticketId, itemIdx) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const newItems = [...t.items];
          newItems[itemIdx].done = !newItems[itemIdx].done;
          return { ...t, items: newItems };
        }
        return t;
      })
    );
  };

  const markTicketReady = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: 'Ready',
              items: t.items.map((i) => ({ ...i, done: true })),
            }
          : t
      )
    );
  };

  const bumpTicket = (ticketId) => {
    setTickets((prev) => prev.filter((t) => t.id !== ticketId));
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredTickets = tickets.filter((t) => {
    if (stationFilter === 'All') return true;
    return t.station.toLowerCase().includes(stationFilter.toLowerCase());
  });

  return (
    <div className="space-y-5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-red-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Live Kitchen Display System (KDS)
            </h1>
          </div>
          <p className="text-[13px] text-stone-500">
            Real-time kitchen order tickets, prep stations, order timers and status controls.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync Active</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Audio ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span>Muted</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.();
              } else {
                document.exitFullscreen?.();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Screen KDS</span>
          </button>
        </div>
      </div>

      {/* KDS Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-stone-500">Active Tickets</span>
            <div className="text-xl font-black text-stone-900">{tickets.length}</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-bold">
            <Flame className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-stone-500">Avg Prep Time</span>
            <div className="text-xl font-black text-stone-900">18 mins</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-stone-500">Overdue (&gt;20m)</span>
            <div className="text-xl font-black text-red-600">
              {tickets.filter((t) => t.elapsedSeconds > 1200).length}
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-stone-500">Completed Today</span>
            <div className="text-xl font-black text-emerald-600">84</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Station Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Karahi & Rice', 'BBQ & Grill', 'Biryani Station', 'Tandoor & Breads'].map((station) => (
          <button
            key={station}
            onClick={() => setStationFilter(station)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition shrink-0 ${
              stationFilter === station
                ? 'bg-[#911116] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {station}
          </button>
        ))}
      </div>

      {/* KDS Kitchen Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTickets.map((t) => {
          const isOverdue = t.elapsedSeconds > 1200; // > 20 mins
          const isWarning = t.elapsedSeconds > 600 && !isOverdue; // 10-20 mins
          const isReady = t.status === 'Ready';

          return (
            <div
              key={t.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col justify-between transition ${
                isReady
                  ? 'border-emerald-300 ring-2 ring-emerald-500/20'
                  : isOverdue
                  ? 'border-red-400 ring-2 ring-red-500/20'
                  : isWarning
                  ? 'border-amber-300'
                  : 'border-stone-200'
              }`}
            >
              {/* Ticket Top Bar */}
              <div
                className={`p-3 text-white flex items-center justify-between ${
                  isReady
                    ? 'bg-emerald-700'
                    : isOverdue
                    ? 'bg-red-700 animate-pulse'
                    : isWarning
                    ? 'bg-amber-600'
                    : 'bg-stone-900'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm">{t.id}</span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold uppercase">
                      {t.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 font-medium">{t.table}</p>
                </div>

                {/* Live Timer */}
                <div className="text-right">
                  <div className="font-mono text-base font-black tracking-tight">
                    {formatTimer(t.elapsedSeconds)}
                  </div>
                  <p className="text-[10px] text-white/70">{t.orderTime}</p>
                </div>
              </div>

              {/* Station & Server Info */}
              <div className="px-3 py-1.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-semibold text-stone-700">{t.station}</span>
                <span>{t.server}</span>
              </div>

              {/* Items Checkable List */}
              <div className="p-3.5 space-y-2 flex-1">
                {t.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleItemDone(t.id, idx)}
                    className={`p-2 rounded-lg border text-xs cursor-pointer transition flex items-start gap-2.5 ${
                      item.done
                        ? 'bg-emerald-50/60 border-emerald-200 line-through text-stone-400'
                        : 'bg-stone-50/60 border-stone-200 hover:border-stone-300 text-stone-900 font-medium'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        item.done
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {item.done && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-1 flex-wrap">
                        <span className="font-bold flex items-center gap-1.5">
                          {item.qty}x {item.name}
                          {item.portion && (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300">
                              {item.portion}
                            </span>
                          )}
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-[10px] text-red-600 font-normal mt-0.5">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ticket Footer Actions */}
              <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center gap-2">
                {isReady ? (
                  <button
                    onClick={() => bumpTicket(t.id)}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Dispatched / Bump Ticket</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => markTicketReady(t.id)}
                      className="flex-1 py-2 bg-[#911116] hover:bg-[#7D0E12] text-white font-bold rounded-lg text-xs shadow-xs transition"
                    >
                      Mark All Ready
                    </button>
                    <button
                      onClick={() => bumpTicket(t.id)}
                      className="px-2.5 py-2 bg-white border border-stone-200 hover:bg-stone-100 text-stone-600 rounded-lg text-xs font-semibold transition"
                      title="Bump ticket"
                    >
                      Bump
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
