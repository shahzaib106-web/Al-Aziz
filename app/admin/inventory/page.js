'use client';
import { useEffect, useState } from 'react';
import { api, toast, fmt } from '../../../components/store';
import { AdminShell, Modal, StatCard, SectionCard } from '../../../components/admin';
import { Icon } from '../../../components/icons';

export default function AdminInventory() {
  const [inv, setInv] = useState([]);
  const [editing, setEditing] = useState(null);
  const [restock, setRestock] = useState(null);
  const [restockQty, setRestockQty] = useState(10);

  const load = () => api('inventory').then(setInv).catch(() => {});
  useEffect(load, []);

  const totalValue = inv.reduce((s, i) => s + i.stock * i.cost, 0);
  const low = inv.filter((i) => i.stock <= i.low);

  const adjust = async (item, delta) => {
    const stock = Math.max(0, +(item.stock + delta).toFixed(2));
    await api('inventory/' + item.id, { method: 'PUT', body: { stock } });
    load();
  };

  const doRestock = async () => {
    await api('inventory/' + restock.id, { method: 'PUT', body: { stock: +(restock.stock + Number(restockQty)).toFixed(2) } });
    toast(`${restock.name} restocked +${restockQty} ${restock.unit}`);
    setRestock(null);
    load();
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (editing.isNew) {
      if (!editing.name.trim()) return toast('Name required');
      await api('inventory', { method: 'POST', body: { name: editing.name, unit: editing.unit, stock: +editing.stock || 0, low: +editing.low || 5, cost: +editing.cost || 0 } });
      toast('Ingredient added');
    } else {
      await api('inventory/' + editing.id, { method: 'PUT', body: { name: editing.name, unit: editing.unit, low: +editing.low, cost: +editing.cost } });
      toast('Ingredient updated');
    }
    setEditing(null);
    load();
  };

  return (
    <AdminShell
      title="Inventory"
      subtitle="Raw material stock, thresholds & value"
      actions={<button onClick={() => setEditing({ name: '', unit: 'kg', stock: 0, low: 5, cost: 0, isNew: true })} className="abtn abtn-primary"><Icon name="plus" className="w-4 h-4" /> Add ingredient</button>}
    >
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard icon="box" label="Tracked ingredients" value={inv.length} tone="ink" />
        <StatCard icon="chart" label="Stock value" value={fmt(Math.round(totalValue))} sub="At current cost per unit" tone="leaf" />
        <StatCard icon="flame" label="Below threshold" value={low.length} sub={low.length ? 'Restock recommended' : 'All healthy'} tone={low.length ? 'maroon' : 'leaf'} />
      </div>

      <div className="acard overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr>
                <th className="ath">Ingredient</th>
                <th className="ath">Stock level</th>
                <th className="ath text-right">In stock</th>
                <th className="ath text-right">Threshold</th>
                <th className="ath text-right">Cost / unit</th>
                <th className="ath text-right">Value</th>
                <th className="ath">Status</th>
                <th className="ath text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inv.map((i) => {
                const pct = Math.min(i.stock / (i.low * 3), 1) * 100;
                const isLow = i.stock <= i.low;
                return (
                  <tr key={i.id} className="arow">
                    <td className="atd font-bold">{i.name}</td>
                    <td className="atd w-48">
                      <div className="h-1.5 rounded-full bg-[#F0EBE0]">
                        <div className={`h-full rounded-full ${isLow ? 'bg-maroon' : pct < 55 ? 'bg-gold' : 'bg-leaf'}`} style={{ width: `${pct}%` }} />
                      </div>
                    </td>
                    <td className="atd text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button onClick={() => adjust(i, -1)} className="w-6 h-6 rounded-md border border-[#DDD5C6] bg-white hover:border-maroon hover:text-maroon flex items-center justify-center"><Icon name="minus" className="w-3 h-3" /></button>
                        <span className={`font-bold tnum w-14 text-center ${isLow ? 'text-[#9E1B1E]' : ''}`}>{i.stock} {i.unit}</span>
                        <button onClick={() => adjust(i, 1)} className="w-6 h-6 rounded-md border border-[#DDD5C6] bg-white hover:border-leaf hover:text-leaf flex items-center justify-center"><Icon name="plus" className="w-3 h-3" /></button>
                      </div>
                    </td>
                    <td className="atd text-right tnum text-[#6E675C]">{i.low} {i.unit}</td>
                    <td className="atd text-right tnum text-[#6E675C]">Rs. {i.cost}</td>
                    <td className="atd text-right font-semibold tnum">Rs. {Math.round(i.stock * i.cost).toLocaleString()}</td>
                    <td className="atd">
                      {isLow ? (
                        <span className="apill bg-[#FBEDED] text-[#9E1B1E] border-[#E7B9BB]"><i className="w-1.5 h-1.5 rounded-full bg-current" /> Low stock</span>
                      ) : (
                        <span className="apill bg-[#EBF4EE] text-[#17703C] border-[#B5D8C0]"><i className="w-1.5 h-1.5 rounded-full bg-current" /> Healthy</span>
                      )}
                    </td>
                    <td className="atd text-right whitespace-nowrap">
                      <button onClick={() => { setRestock(i); setRestockQty(10); }} className="abtn abtn-leaf !h-7 !px-3 !text-[11px] mr-1">Restock</button>
                      <button onClick={() => setEditing({ ...i })} className="p-1.5 rounded-lg text-[#6E675C] hover:text-maroon hover:bg-[#FBEDED]"><Icon name="edit" className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={!!restock}
        onClose={() => setRestock(null)}
        title={`Restock ${restock?.name || ''}`}
        desc={`Current level: ${restock?.stock} ${restock?.unit}`}
        footer={
          <>
            <button onClick={() => setRestock(null)} className="abtn abtn-ghost">Cancel</button>
            <button onClick={doRestock} className="abtn abtn-leaf">Add to stock</button>
          </>
        }
      >
        <label className="alabel">Quantity to add ({restock?.unit})</label>
        <input type="number" min="0" className="afield tnum" value={restockQty} onChange={(e) => setRestockQty(e.target.value)} />
      </Modal>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.isNew ? 'Add ingredient' : `Edit ${editing?.name || ''}`}
        footer={
          <>
            <button onClick={() => setEditing(null)} className="abtn abtn-ghost">Cancel</button>
            <button onClick={saveEdit} className="abtn abtn-primary">Save</button>
          </>
        }
      >
        {editing && (
          <form onSubmit={saveEdit} className="space-y-4">
            <div><label className="alabel">Name</label><input className="afield" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="alabel">Unit</label>
                <select className="afield" value={editing.unit} onChange={(e) => setEditing({ ...editing, unit: e.target.value })}>
                  <option value="kg">kg</option><option value="L">L</option><option value="pcs">pcs</option>
                </select>
              </div>
              {editing.isNew ? (
                <div><label className="alabel">Initial stock</label><input type="number" min="0" className="afield tnum" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: e.target.value })} /></div>
              ) : (
                <div><label className="alabel">Low threshold</label><input type="number" min="0" className="afield tnum" value={editing.low} onChange={(e) => setEditing({ ...editing, low: e.target.value })} /></div>
              )}
              {editing.isNew && <div><label className="alabel">Low threshold</label><input type="number" min="0" className="afield tnum" value={editing.low} onChange={(e) => setEditing({ ...editing, low: e.target.value })} /></div>}
              <div><label className="alabel">Cost / unit (Rs.)</label><input type="number" min="0" className="afield tnum" value={editing.cost} onChange={(e) => setEditing({ ...editing, cost: e.target.value })} /></div>
            </div>
          </form>
        )}
      </Modal>
    </AdminShell>
  );
}
