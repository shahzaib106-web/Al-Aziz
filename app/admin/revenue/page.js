'use client';
import { useEffect, useMemo, useState } from 'react';
import { api, fmt } from '../../../components/store';
import { AdminShell, StatCard } from '../../../components/admin';
import { Icon } from '../../../components/icons';

/* Cost model: use a menu item's recipe cost when defined, otherwise
   estimate 35% of the billed unit price. Cancelled orders are excluded. */
const COST_RATE = 0.35;
const MAROON = [158, 27, 30];
const GOLD = [227, 185, 79];

const PERIODS = [
  { id: 'daily', label: 'Daily', count: 14, unit: 'day' },
  { id: 'weekly', label: 'Weekly', count: 12, unit: 'week' },
  { id: 'monthly', label: 'Monthly', count: 12, unit: 'month' },
  { id: 'yearly', label: 'Yearly', count: 5, unit: 'year' },
];

function bucketKey(date, unit) {
  const d = new Date(date);
  if (unit === 'day') return d.toDateString();
  if (unit === 'week') {
    const w = new Date(d);
    w.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return w.toDateString();
  }
  if (unit === 'month') return `${d.getFullYear()}-${d.getMonth()}`;
  return String(d.getFullYear());
}

function bucketLabel(date, unit) {
  const d = new Date(date);
  if (unit === 'day') return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (unit === 'week') return 'Wk ' + d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (unit === 'month') return d.toLocaleDateString('en-GB', { month: 'short' }) + ' ’' + String(d.getFullYear()).slice(2);
  return String(d.getFullYear());
}

const fmtShort = (n) => (n >= 100000 ? 'Rs ' + Math.round(n / 1000) + 'k' : n >= 10000 ? 'Rs ' + (n / 1000).toFixed(1) + 'k' : 'Rs ' + Math.round(n));

export default function AdminRevenue() {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [periodId, setPeriodId] = useState('daily');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api('orders').then(setOrders).catch(() => {});
    api('menu').then(setMenu).catch(() => {});
  }, []);

  const period = PERIODS.find((p) => p.id === periodId);

  const menuById = useMemo(() => Object.fromEntries(menu.map((m) => [m.id, m])), [menu]);

  const unitCost = (it) => {
    const m = menuById[it.menuId];
    if (m?.recipe?.length) return m.recipe.reduce((s, r) => s + Number(r.cost || 0), 0);
    return (Number(it.price) || 0) * COST_RATE;
  };
  const orderCost = (o) => (o.items || []).reduce((s, it) => s + unitCost(it) * (it.qty || 1), 0);

  const buckets = useMemo(() => {
    const active = orders.filter((o) => o.status !== 'cancelled');
    const out = [];
    const now = new Date();
    for (let i = period.count - 1; i >= 0; i--) {
      const d = new Date(now);
      if (period.unit === 'day') d.setDate(d.getDate() - i);
      if (period.unit === 'week') d.setDate(d.getDate() - ((d.getDay() + 6) % 7) - i * 7);
      if (period.unit === 'month') d.setDate(1), d.setMonth(d.getMonth() - i);
      if (period.unit === 'year') d.setFullYear(d.getFullYear() - i);
      const key = bucketKey(d, period.unit);
      const inBucket = active.filter((o) => bucketKey(o.createdAt, period.unit) === key);
      const revenue = inBucket.reduce((s, o) => s + (o.total || 0), 0);
      const cost = Math.round(inBucket.reduce((s, o) => s + orderCost(o), 0));
      out.push({ key, label: bucketLabel(d, period.unit), orders: inBucket.length, revenue, cost });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, menuById, periodId]);

  const totals = useMemo(() => {
    const revenue = buckets.reduce((s, b) => s + b.revenue, 0);
    const cost = buckets.reduce((s, b) => s + b.cost, 0);
    const count = buckets.reduce((s, b) => s + b.orders, 0);
    const profit = revenue - cost;
    return { revenue, cost, profit, count, margin: revenue ? Math.round((profit / revenue) * 100) : 0 };
  }, [buckets]);

  const maxVal = Math.max(...buckets.map((b) => Math.max(b.revenue, b.cost)), 1);
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((f) => ({ f, value: maxVal * f }));

  /* ---------- PDF export ---------- */
  const exportPDF = async () => {
    setBusy(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const W = doc.internal.pageSize.getWidth();
      const H = doc.internal.pageSize.getHeight();

      // Header band
      doc.setFillColor(...MAROON);
      doc.rect(0, 0, W, 64, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(17);
      doc.text('Al Aziz Restaurant', 36, 28);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Revenue & Cost Report — ${period.label} view`, 36, 45);
      doc.text('Generated ' + new Date().toLocaleString('en-GB'), W - 36, 28, { align: 'right' });

      // KPI boxes
      const kpis = [
        ['Revenue', fmt(totals.revenue)],
        ['Estimated Cost', fmt(totals.cost)],
        ['Profit', fmt(totals.profit)],
        ['Margin', totals.margin + '%'],
      ];
      const kw = (W - 72 - 3 * 12) / 4;
      kpis.forEach(([label, value], i) => {
        const x = 36 + i * (kw + 12);
        doc.setFillColor(245, 242, 235);
        doc.setDrawColor(231, 225, 213);
        doc.roundedRect(x, 80, kw, 44, 6, 6, 'FD');
        doc.setTextColor(110, 103, 92);
        doc.setFontSize(8.5);
        doc.text(label.toUpperCase(), x + 12, 97);
        doc.setTextColor(31, 27, 22);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text(value, x + 12, 115);
        doc.setFont('helvetica', 'normal');
      });

      // Chart
      const cx = 56, cw = W - 112, cy = 150, ch = 180;
      doc.setDrawColor(220, 214, 200);
      gridLines.forEach((g) => {
        const y = cy + ch - g.f * ch;
        doc.setLineDashPattern([2, 3], 0);
        doc.line(cx, y, cx + cw, y);
        doc.setLineDashPattern([], 0);
        doc.setFontSize(7);
        doc.setTextColor(155, 148, 138);
        doc.text(fmtShort(g.value), cx - 6, y + 3, { align: 'right' });
      });
      const colW = cw / buckets.length;
      const barW = Math.min(16, colW * 0.3);
      buckets.forEach((b, i) => {
        const x0 = cx + i * colW + colW / 2;
        const hR = (b.revenue / maxVal) * ch;
        const hC = (b.cost / maxVal) * ch;
        doc.setFillColor(...MAROON);
        doc.rect(x0 - barW - 1, cy + ch - hR, barW, Math.max(hR, 0.5), 'F');
        doc.setFillColor(...GOLD);
        doc.rect(x0 + 1, cy + ch - hC, barW, Math.max(hC, 0.5), 'F');
        doc.setFontSize(6.6);
        doc.setTextColor(110, 103, 92);
        doc.text(b.label, x0, cy + ch + 12, { align: 'center' });
      });
      // Legend
      doc.setFillColor(...MAROON); doc.rect(cx, cy - 16, 8, 8, 'F');
      doc.setTextColor(31, 27, 22); doc.setFontSize(8); doc.text('Revenue', cx + 12, cy - 9);
      doc.setFillColor(...GOLD); doc.rect(cx + 70, cy - 16, 8, 8, 'F');
      doc.text('Estimated Cost', cx + 82, cy - 9);

      // Table
      let y = cy + ch + 34;
      const cols = [36, W * 0.35, W * 0.5, W * 0.65, W * 0.8];
      const heads = ['Period', 'Orders', 'Revenue', 'Est. Cost', 'Profit'];
      doc.setFillColor(36, 9, 11);
      doc.rect(36, y - 12, W - 72, 18, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      heads.forEach((h, i) => doc.text(h, i === 0 ? cols[0] + 8 : cols[i] + (i === 1 ? 40 : 60), y, { align: i === 0 ? 'left' : 'right' }));
      y += 16;
      doc.setFont('helvetica', 'normal');
      buckets.forEach((b, i) => {
        if (i % 2 === 0) {
          doc.setFillColor(245, 242, 235);
          doc.rect(36, y - 10, W - 72, 15, 'F');
        }
        doc.setTextColor(31, 27, 22);
        doc.setFontSize(8);
        doc.text(b.label, cols[0] + 8, y);
        doc.text(String(b.orders), cols[1] + 40, y, { align: 'right' });
        doc.text(fmt(b.revenue), cols[2] + 60, y, { align: 'right' });
        doc.text(fmt(b.cost), cols[3] + 60, y, { align: 'right' });
        doc.setTextColor(b.revenue - b.cost >= 0 ? 23 : 179, b.revenue - b.cost >= 0 ? 112 : 38, b.revenue - b.cost >= 0 ? 60 : 30);
        doc.text(fmt(b.revenue - b.cost), cols[4] + 60, y, { align: 'right' });
        y += 15;
      });

      doc.setTextColor(155, 148, 138);
      doc.setFontSize(7);
      doc.text('Costs estimated from recipes where defined; otherwise 35% of billed price. Cancelled orders excluded.', 36, H - 24);

      doc.save(`al-aziz-revenue-${periodId}.pdf`);
    } finally {
      setBusy(false);
    }
  };

  const exportBtn = (
    <button onClick={exportPDF} disabled={busy} className="abtn abtn-primary disabled:opacity-60">
      <Icon name="download" className="w-4 h-4" />
      {busy ? 'Preparing…' : 'Export PDF'}
    </button>
  );

  return (
    <AdminShell title="Revenue & Reports" subtitle="Track revenue against estimated food cost across periods." actions={exportBtn}>
      {/* Period selector */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {PERIODS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPeriodId(p.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition border ${
              periodId === p.id ? 'bg-maroon text-white border-maroon shadow-sm' : 'bg-white text-ink/70 border-[#DDD5C6] hover:border-maroon/50'
            }`}
          >
            {p.label}
          </button>
        ))}
        <span className="text-xs text-muted ml-auto hidden md:block">
          Last {period.count} {period.unit === 'day' ? 'days' : period.unit === 'week' ? 'weeks' : period.unit === 'month' ? 'months' : 'years'} · cancelled orders excluded
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard label="Revenue" value={fmt(totals.revenue)} icon="cash" tone="maroon" sub={`${totals.count} orders`} />
        <StatCard label="Estimated Cost" value={fmt(totals.cost)} icon="utensils" tone="gold" sub="recipe or 35% rate" />
        <StatCard label="Profit" value={fmt(totals.profit)} icon="chart" tone={totals.profit >= 0 ? 'leaf' : 'danger'} sub="revenue − cost" />
        <StatCard label="Margin" value={totals.margin + '%'} icon="sparkle" tone="ink" sub="of revenue kept" />
      </div>

      {/* Chart card */}
      <div className="acard p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-ink">Revenue vs Cost</h2>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-muted">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-maroon inline-block" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gold inline-block" /> Cost</span>
          </div>
        </div>

        <div className="relative" style={{ height: 240 }}>
          {/* gridlines */}
          {gridLines.map((g) => (
            <div key={g.f} className="absolute left-14 right-0 border-t border-dashed border-[#DDD5C6]" style={{ top: `${(1 - g.f) * 100}%` }}>
              <span className="absolute -left-14 -top-2 w-12 text-right text-[10px] text-muted tabular-nums">{fmtShort(g.value)}</span>
            </div>
          ))}
          {/* bars */}
          <div className="absolute inset-y-0 left-14 right-0 flex items-end">
            {buckets.map((b) => (
              <div key={b.key} className="flex-1 flex items-end justify-center gap-[3px] h-full group relative" title={`${b.label} — Revenue ${fmt(b.revenue)} · Cost ${fmt(b.cost)} · ${b.orders} order(s)`}>
                <div className="w-[38%] max-w-[18px] bg-maroon rounded-t-sm group-hover:brightness-110 transition" style={{ height: `${(b.revenue / maxVal) * 100}%`, minHeight: b.revenue ? 2 : 0 }} />
                <div className="w-[38%] max-w-[18px] bg-gold rounded-t-sm group-hover:brightness-110 transition" style={{ height: `${(b.cost / maxVal) * 100}%`, minHeight: b.cost ? 2 : 0 }} />
              </div>
            ))}
          </div>
        </div>
        {/* x labels */}
        <div className="ml-14 flex mt-2">
          {buckets.map((b) => (
            <div key={b.key} className="flex-1 text-center text-[10px] text-muted truncate px-0.5">{b.label}</div>
          ))}
        </div>
        <p className="text-[11px] text-muted mt-4">
          Costs are estimated from item recipes where defined, otherwise {Math.round(COST_RATE * 100)}% of the billed price. Add recipe costs under Menu &amp; Pricing for exact figures.
        </p>
      </div>

      {/* Table */}
      <div className="acard overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E7E1D5] flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink">{period.label} breakdown</h2>
          <span className="text-[11px] text-muted">{totals.count} orders total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="ath text-left">Period</th>
                <th className="ath text-right">Orders</th>
                <th className="ath text-right">Revenue</th>
                <th className="ath text-right">Est. Cost</th>
                <th className="ath text-right">Profit</th>
              </tr>
            </thead>
            <tbody>
              {buckets.map((b) => (
                <tr key={b.key} className="arow">
                  <td className="atd font-semibold text-ink">{b.label}</td>
                  <td className="atd text-right tnum">{b.orders}</td>
                  <td className="atd text-right tnum">{fmt(b.revenue)}</td>
                  <td className="atd text-right tnum">{fmt(b.cost)}</td>
                  <td className={`atd text-right tnum font-bold ${b.revenue - b.cost >= 0 ? 'text-[#17703C]' : 'text-[#B3261E]'}`}>{fmt(b.revenue - b.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
