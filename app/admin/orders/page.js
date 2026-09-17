'use client';
import { useEffect, useState } from 'react';
import { api, fmt, timeOf, STATUS_META, STATUS_FLOW, toast } from '../../../components/store';
import { AdminShell } from '../../../components/admin';
import { Icon } from '../../../components/icons';

const PAY_LABEL = { cod: 'Cash on Delivery', bank: 'Bank Transfer', jazzcash: 'JazzCash / Easypaisa' };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(null);

  const load = () => api('orders').then(setOrders).catch(() => {});
  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  const setStatus = async (o, status) => {
    await api('orders/' + o.id, { method: 'PUT', body: { status } });
    toast(`Order #${o.id} → ${STATUS_META[status].en}`);
    load();
  };

  const list = filter ? orders.filter((o) => o.status === filter) : orders;

  return (
    <AdminShell title="Order Management">
      <div className="flex flex-wrap gap-2 mb-5">
        <button onClick={() => setFilter('')} className={`chip text-xs ${!filter ? '!bg-maroon !text-white !border-maroon font-bold' : ''}`}>All ({orders.length})</button>
        {STATUS_FLOW.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`chip text-xs ${filter === s ? '!bg-maroon !text-white !border-maroon font-bold' : ''}`}>
            {STATUS_META[s].en} ({orders.filter((o) => o.status === s).length})
          </button>
        ))}
        <button onClick={() => setFilter('cancelled')} className={`chip text-xs ${filter === 'cancelled' ? '!bg-maroon !text-white !border-maroon font-bold' : ''}`}>
          Cancelled ({orders.filter((o) => o.status === 'cancelled').length})
        </button>
      </div>

      <div className="space-y-3">
        {list.length === 0 && <p className="text-sm text-muted py-10 text-center">No orders in this state.</p>}
        {list.map((o) => (
          <div key={o.id} className="card overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 px-5 py-4">
              <button onClick={() => setOpen(open === o.id ? null : o.id)} className="flex items-center gap-3 flex-1 min-w-0 text-left">
                <Icon name={open === o.id ? 'chevR' : 'chevR'} className={`w-4 h-4 text-muted transition-transform ${open === o.id ? 'rotate-90' : ''}`} />
                <div>
                  <div className="text-sm font-extrabold">#{o.id}</div>
                  <div className="text-[11px] text-muted">{new Date(o.createdAt).toLocaleString()} · {timeOf(o.createdAt)}</div>
                </div>
                <div className="hidden sm:block text-sm text-muted truncate">{o.customer?.name} · {o.customer?.phone}</div>
              </button>
              <div className="text-sm font-extrabold text-maroon">{fmt(o.total)}</div>
              <select
                value={o.status}
                onChange={(e) => setStatus(o, e.target.value)}
                className={`field !w-auto !py-2 text-xs font-bold ${o.status === 'delivered' ? '!border-leaf !text-leaf' : o.status === 'cancelled' ? '!border-maroon !text-maroon' : ''}`}
              >
                {[...STATUS_FLOW, 'cancelled'].map((s) => (
                  <option key={s} value={s}>{STATUS_META[s].en}</option>
                ))}
              </select>
            </div>
            {open === o.id && (
              <div className="px-5 pb-5 pt-1 border-t border-[#EFE5D0] grid md:grid-cols-2 gap-5">
                <div>
                  <h4 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Items</h4>
                  <ul className="space-y-1.5 text-sm">
                    {o.items.map((i, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{i.nameEn}{i.option ? ` (${i.option})` : ''} × {i.qty}</span>
                        <span className="font-semibold">{fmt(i.price * i.qty)}</span>
                      </li>
                    ))}
                    <li className="flex justify-between text-muted text-xs pt-1"><span>Delivery fee</span><span>{fmt(o.deliveryFee)}</span></li>
                    <li className="flex justify-between font-bold pt-1 border-t border-[#EFE5D0]"><span>Total</span><span>{fmt(o.total)}</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Customer & Payment</h4>
                  <p className="text-sm font-semibold">{o.customer?.name}</p>
                  <p className="text-xs text-muted mt-0.5">{o.customer?.phone}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{o.customer?.address}</p>
                  <p className="text-xs mt-2"><span className="font-bold">Payment:</span> {PAY_LABEL[o.payment] || o.payment}</p>
                  <h4 className="text-[11px] font-bold text-muted uppercase tracking-wider mt-4 mb-2">Timeline</h4>
                  <ul className="space-y-1 text-xs text-muted">
                    {Object.entries(o.timeline || {}).map(([k, v]) => (
                      <li key={k} className="flex justify-between"><span>{STATUS_META[k]?.en || k}</span><span>{new Date(v).toLocaleTimeString()}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
