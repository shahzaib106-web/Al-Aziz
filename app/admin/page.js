'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, fmt, timeOf, STATUS_META } from '../../components/store';
import { AdminShell, StatCard } from '../../components/admin';

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
  const today = new Date();
  const todayRevenue = active.filter((o) => new Date(o.createdAt).toDateString() === today.toDateString()).reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length;
  const lowStock = inventory.filter((i) => i.stock <= i.low);
  const outItems = menu.filter((m) => !m.available || m.stock <= 0);

  const sold = {};
  active.forEach((o) => o.items.forEach((i) => (sold[i.nameEn] = (sold[i.nameEn] || 0) + i.qty)));
  const top = Object.entries(sold).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const onDuty = staff.filter((s) => s.status === 'On Duty').length;

  return (
    <AdminShell title="Dashboard">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="chart" label="Total Revenue" value={fmt(revenue)} sub={`${fmt(todayRevenue)} today`} tone="leaf" />
        <StatCard icon="receipt" label="Total Orders" value={orders.length} sub={`${pending} in progress`} tone="maroon" />
        <StatCard icon="box" label="Low Stock Alerts" value={lowStock.length} sub={outItems.length ? `${outItems.length} menu items out` : ''} tone="gold" />
        <StatCard icon="users" label="Staff On Duty" value={`${onDuty}/${staff.length}`} tone="ink" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        {/* Recent orders */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFE5D0]">
            <h3 className="text-sm font-extrabold">Recent Orders</h3>
            <Link href="/admin/orders" className="text-[11px] font-bold text-maroon hover:underline">View All</Link>
          </div>
          <table className="w-full">
            <thead>
              <tr><th className="th">Order</th><th className="th">Customer</th><th className="th">Total</th><th className="th">Status</th></tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((o) => (
                <tr key={o.id}>
                  <td className="td font-bold">#{o.id}<div className="text-[10px] text-muted font-normal">{timeOf(o.createdAt)}</div></td>
                  <td className="td">{o.customer?.name || '—'}</td>
                  <td className="td font-semibold">{fmt(o.total)}</td>
                  <td className="td"><span className={`text-[10px] font-bold border rounded-full px-2 py-0.5 ${o.status === 'delivered' ? 'bg-leaf/10 text-leaf border-leaf/30' : o.status === 'cancelled' ? 'bg-maroon/10 text-maroon border-maroon/30' : 'bg-gold/15 text-[#8A6A10] border-gold/40'}`}>{STATUS_META[o.status]?.en}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          {/* Low stock */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFE5D0]">
              <h3 className="text-sm font-extrabold">Low Stock Alerts</h3>
              <Link href="/admin/inventory" className="text-[11px] font-bold text-maroon hover:underline">Manage</Link>
            </div>
            {lowStock.length === 0 ? (
              <p className="text-xs text-muted px-5 py-4">All ingredients sufficiently stocked.</p>
            ) : (
              <ul className="divide-y divide-[#EFE5D0]">
                {lowStock.map((i) => (
                  <li key={i.id} className="px-5 py-3 flex items-center justify-between text-sm">
                    <span className="font-medium">{i.name}</span>
                    <span className="text-[11px] font-bold text-maroon bg-maroon/10 border border-maroon/30 rounded-full px-2.5 py-0.5">{i.stock} {i.unit} left</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Top sellers */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-[#EFE5D0]"><h3 className="text-sm font-extrabold">Top Selling Items</h3></div>
            <ul className="divide-y divide-[#EFE5D0]">
              {top.map(([name, qty], i) => (
                <li key={name} className="px-5 py-3 flex items-center justify-between text-sm">
                  <span className="font-medium"><span className="text-muted mr-2">#{i + 1}</span>{name}</span>
                  <span className="text-[11px] font-bold text-leaf bg-leaf/10 border border-leaf/30 rounded-full px-2.5 py-0.5">{qty} sold</span>
                </li>
              ))}
              {top.length === 0 && <li className="px-5 py-4 text-xs text-muted">No sales yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
