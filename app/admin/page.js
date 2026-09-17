'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, fmt, timeOf, STATUS_META } from '../../components/store';
import { AdminShell, StatCard, SectionCard, StatusPill } from '../../components/admin';
import { Icon } from '../../components/icons';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    api('orders').then(setOrders).catch(() => {});
    api('menu').then(setMenu).catch(() => {});
    api('inventory').then(setInventory).catch(() => {});
    api('staff').then(setStaff).catch(() => {});
  }, []);

  const active = orders.filter((o) => o.status !== 'cancelled');
  const revenue = active.reduce((s, o) => s + o.total, 0);
  const today = new Date().toDateString();
  const todayOrders = active.filter((o) => new Date(o.createdAt).toDateString() === today);
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length;
  const lowStock = inventory.filter((i) => i.stock <= i.low);
  const outItems = menu.filter((m) => !m.available || m.stock <= 0);
  const avg = active.length ? Math.round(revenue / active.length) : 0;
  const onDuty = staff.filter((s) => s.status === 'On Duty');

  // revenue last 7 days
  const days = Array.from({ length: 7 }, (_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - idx));
    const key = d.toDateString();
    const total = active.filter((o) => new Date(o.createdAt).toDateString() === key).reduce((s, o) => s + o.total, 0);
    return { label: d.toLocaleDateString('en-GB', { weekday: 'short' }), total };
  });
  const max = Math.max(...days.map((d) => d.total), 1);

  const sold = {};
  active.forEach((o) => o.items.forEach((i) => (sold[i.nameEn] = (sold[i.nameEn] || 0) + i.qty)));
  const top = Object.entries(sold).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxTop = top.length ? top[0][1] : 1;

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Restaurant performance at a glance"
      actions={<Link href="/admin/orders" className="abtn abtn-ghost">Manage orders</Link>}
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="chart" label="Gross revenue" value={fmt(revenue)} sub={`${fmt(todayRevenue)} from ${todayOrders.length} orders today`} tone="leaf" />
        <StatCard icon="receipt" label="Orders" value={orders.length} sub={`${pending} currently in progress`} tone="maroon" />
        <StatCard icon="cash" label="Avg. order value" value={fmt(avg)} sub="Across all active orders" tone="blue" />
        <StatCard icon="box" label="Stock alerts" value={lowStock.length} sub={outItems.length ? `${outItems.length} menu items unavailable` : 'All dishes available'} tone="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        {/* Left 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          <SectionCard title="Revenue — last 7 days" desc="Daily gross sales across all channels">
            <div className="flex items-end gap-3 h-36">
              {days.map((d, i) => (
                <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-1.5">
                  <span className="text-[10px] font-bold text-[#6E675C] tnum">{d.total ? Math.round(d.total / 100) / 10 + 'k' : ''}</span>
                  <div
                    className={`w-full rounded-md transition-all ${i === 6 ? 'bg-maroon' : 'bg-maroon/25 hover:bg-maroon/50'}`}
                    style={{ height: `${Math.max((d.total / max) * 100, 2)}%` }}
                    title={fmt(d.total)}
                  />
                  <span className={`text-[10px] font-semibold ${i === 6 ? 'text-maroon' : 'text-[#9B948A]'}`}>{d.label}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Recent orders"
            desc="Latest activity from the ordering website"
            flush
            action={<Link href="/admin/orders" className="text-[12px] font-bold text-maroon hover:underline">View all</Link>}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr><th className="ath">Order</th><th className="ath">Customer</th><th className="ath">Items</th><th className="ath text-right">Total</th><th className="ath">Status</th></tr>
                </thead>
                <tbody>
                  {orders.slice(0, 6).map((o) => (
                    <tr key={o.id} className="arow">
                      <td className="atd">
                        <div className="font-bold tnum">#{o.id}</div>
                        <div className="text-[11px] text-[#9B948A] tnum">{timeOf(o.createdAt)}</div>
                      </td>
                      <td className="atd">
                        <div className="font-medium">{o.customer?.name || '—'}</div>
                        <div className="text-[11px] text-[#9B948A] tnum">{o.customer?.phone}</div>
                      </td>
                      <td className="atd text-[#6E675C]">{o.items.reduce((s, i) => s + i.qty, 0)} items</td>
                      <td className="atd text-right font-bold tnum">{fmt(o.total)}</td>
                      <td className="atd"><StatusPill status={o.status} label={STATUS_META[o.status]?.en} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* Right 1/3 */}
        <div className="space-y-4">
          <SectionCard
            title="Needs attention"
            desc="Low stock & unavailable items"
            flush
            action={<Link href="/admin/inventory" className="text-[12px] font-bold text-maroon hover:underline">Inventory</Link>}
          >
            {lowStock.length === 0 && outItems.length === 0 ? (
              <div className="px-5 py-6 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#EBF4EE] text-leaf flex items-center justify-center"><Icon name="check" className="w-5 h-5" /></div>
                <p className="text-[12px] font-medium text-[#6E675C] mt-2">Everything is stocked and available.</p>
              </div>
            ) : (
              <ul>
                {lowStock.map((i) => (
                  <li key={i.id} className="px-5 py-3 flex items-center justify-between border-t border-[#F0EBE0] first:border-t-0">
                    <span className="text-[13px] font-medium">{i.name}</span>
                    <span className="apill bg-[#FBEDED] text-[#9E1B1E] border-[#E7B9BB] tnum">{i.stock} {i.unit} left</span>
                  </li>
                ))}
                {outItems.map((m) => (
                  <li key={m.id} className="px-5 py-3 flex items-center justify-between border-t border-[#F0EBE0] first:border-t-0">
                    <span className="text-[13px] font-medium">{m.nameEn}</span>
                    <span className="apill bg-[#F3F1EC] text-[#6E675C] border-[#D8D2C6]">Unavailable</span>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard title="Top sellers" desc="By plates sold" flush>
            <ul className="p-5 space-y-3.5">
              {top.map(([name, qty], i) => (
                <li key={name}>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="font-semibold truncate"><span className="text-[#9B948A] mr-1.5 tnum">{i + 1}.</span>{name}</span>
                    <span className="font-bold text-[#6E675C] tnum">{qty}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#F0EBE0]">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${(qty / maxTop) * 100}%` }} />
                  </div>
                </li>
              ))}
              {top.length === 0 && <li className="text-[12px] text-[#9B948A]">No sales recorded yet.</li>}
            </ul>
          </SectionCard>

          <SectionCard title="Team on duty" desc={`${onDuty.length} of ${staff.length} staff active`} flush action={<Link href="/admin/staff" className="text-[12px] font-bold text-maroon hover:underline">Staff</Link>}>
            <ul>
              {onDuty.slice(0, 4).map((s) => (
                <li key={s.id} className="px-5 py-2.5 flex items-center gap-3 border-t border-[#F0EBE0] first:border-t-0">
                  <span className="w-7 h-7 rounded-full bg-[#FBEDED] text-maroon text-[11px] font-extrabold flex items-center justify-center">
                    {s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold truncate">{s.name}</div>
                    <div className="text-[10px] text-[#9B948A]">{s.role}</div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf" />
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </AdminShell>
  );
}
