'use client';
import { useEffect, useState } from 'react';
import { api, fmt, timeOf, STATUS_META, STATUS_FLOW, toast } from '../../../components/store';
import { AdminShell, SectionCard, StatusPill } from '../../../components/admin';
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
  const filters = ['', ...STATUS_FLOW, 'cancelled'];

  return (
    <AdminShell title="Orders" subtitle="Track, advance and manage every order" actions={
      <span className="apill bg-[#EBF4EE] text-[#17703C] border-[#B5D8C0]"><i className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> Live — auto refresh</span>
    }>
      {/* Filter segmented */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {filters.map((f) => {
          const count = f ? orders.filter((o) => o.status === f).length : orders.length;
          return (
            <button
              key={f || 'all'}
              onClick={() => setFilter(f)}
              className={`apill transition shrink-0 ${filter === f ? 'bg-maroon text-white border-maroon' : 'bg-white text-[#6E675C] border-[#DDD5C6] hover:border-maroon/40 hover:text-maroon'}`}
            >
              {f ? STATUS_META[f].en : 'All orders'}
              <span className={`tnum ${filter === f ? 'text-white/80' : 'text-[#9B948A]'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="acard overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr>
                <th className="ath w-8"></th>
                <th className="ath">Order</th>
                <th className="ath">Customer</th>
                <th className="ath">Items</th>
                <th className="ath">Payment</th>
                <th className="ath text-right">Total</th>
                <th className="ath">Status</th>
                <th className="ath text-right">Update</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr><td colSpan={8} className="atd text-center text-[#9B948A] py-10">No orders in this state.</td></tr>
              )}
              {list.map((o) => (
                <FragmentRow key={o.id} o={o} open={open} setOpen={setOpen} setStatus={setStatus} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function FragmentRow({ o, open, setOpen, setStatus }) {
  const isOpen = open === o.id;
  return (
    <>
      <tr className="arow cursor-pointer" onClick={() => setOpen(isOpen ? null : o.id)}>
        <td className="atd">
          <Icon name="chevR" className={`w-3.5 h-3.5 text-[#9B948A] transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </td>
        <td className="atd">
          <div className="font-bold tnum">#{o.id}</div>
          <div className="text-[11px] text-[#9B948A] tnum">{new Date(o.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · {timeOf(o.createdAt)}</div>
        </td>
        <td className="atd">
          <div className="font-medium">{o.customer?.name || '—'}</div>
          <div className="text-[11px] text-[#9B948A] tnum">{o.customer?.phone}</div>
        </td>
        <td className="atd text-[#6E675C] max-w-[180px] truncate">{o.items.map((i) => `${i.nameEn} ×${i.qty}`).join(', ')}</td>
        <td className="atd text-[#6E675C]">{PAY_LABEL[o.payment] || o.payment}</td>
        <td className="atd text-right font-bold tnum">{fmt(o.total)}</td>
        <td className="atd"><StatusPill status={o.status} label={STATUS_META[o.status]?.en} /></td>
        <td className="atd text-right" onClick={(e) => e.stopPropagation()}>
          <select value={o.status} onChange={(e) => setStatus(o, e.target.value)} className="afield !w-auto !h-8 !text-[12px] font-semibold cursor-pointer">
            {[...STATUS_FLOW, 'cancelled'].map((s) => (
              <option key={s} value={s}>{STATUS_META[s].en}</option>
            ))}
          </select>
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={8} className="atd !py-0 bg-[#FAF8F3]">
            <div className="grid md:grid-cols-2 gap-6 py-5">
              <div>
                <h4 className="alabel">Items</h4>
                <ul className="space-y-1.5">
                  {o.items.map((i, idx) => (
                    <li key={idx} className="flex justify-between text-[13px]">
                      <span className="text-[#6E675C]">{i.nameEn}{i.option ? ` (${i.option})` : ''} <span className="text-[#9B948A]">× {i.qty}</span></span>
                      <span className="font-semibold tnum">{fmt(i.price * i.qty)}</span>
                    </li>
                  ))}
                  <li className="flex justify-between text-[12px] text-[#9B948A] pt-1"><span>Delivery fee</span><span className="tnum">{fmt(o.deliveryFee)}</span></li>
                  <li className="flex justify-between font-extrabold pt-2 border-t border-[#E7E1D5]"><span>Total</span><span className="tnum">{fmt(o.total)}</span></li>
                </ul>
              </div>
              <div>
                <h4 className="alabel">Delivery & payment</h4>
                <p className="text-[13px] font-bold">{o.customer?.name}</p>
                <p className="text-[12px] text-[#6E675C] tnum mt-0.5">{o.customer?.phone}</p>
                <p className="text-[12px] text-[#6E675C] mt-1 leading-relaxed">{o.customer?.address}</p>
                <p className="text-[12px] mt-2"><span className="font-bold">Payment:</span> <span className="text-[#6E675C]">{PAY_LABEL[o.payment] || o.payment}</span></p>
                <h4 className="alabel mt-4">Timeline</h4>
                <ul className="space-y-1">
                  {Object.entries(o.timeline || {}).map(([k, v]) => (
                    <li key={k} className="flex justify-between text-[12px] text-[#6E675C]">
                      <span className="flex items-center gap-1.5"><i className="w-1 h-1 rounded-full bg-maroon" />{STATUS_META[k]?.en || k}</span>
                      <span className="tnum text-[#9B948A]">{timeOf(v)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
