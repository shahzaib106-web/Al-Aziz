'use client';
import { useEffect, useState } from 'react';
import { api, toast } from '../../../components/store';
import { AdminShell, Modal, StatCard } from '../../../components/admin';
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
    toast(`${restock.name} restocked +${restockQty}`);
    setRestock(null);
    load();
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    await api('inventory/' + editing.id, {
      method: 'PUT',
      body: { name: editing.name, unit: editing.unit, low: +editing.low, cost: +editing.cost },
    });
    toast('Inventory item updated');
    setEditing(null);
    load();
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!editing.name) return toast('Name required');
    await api('inventory', { method: 'POST', body: { ...editing, stock: +editing.stock || 0, low: +editing.low || 5, cost: +editing.cost || 0 } });
    toast('Inventory item added');
    setEditing(null);
    load();
  };

  return (
    <AdminShell title="Inventory & Stock Management">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <StatCard icon="box" label="Inventory Items" value={inv.length} tone="ink" />
        <StatCard icon="chart" label="Stock Value" value={'Rs. ' + Math.round(totalValue).toLocaleString()} tone="leaf" />
        <StatCard icon="flame" label="Low Stock" value={low.length} tone="gold" />
      </div>

      <button onClick={() => setEditing({ name: '', unit: 'kg', stock: 0, low: 5, cost: 0, isNew: true })} className="btn-maroon px-5 py-2.5 text-sm flex items-center gap-2 mb-5">
        <Icon name="plus" className="w-4 h-4" /> Add Ingredient
      </button>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr>
              <th className="th">Ingredient</th><th className="th">In Stock</th><th className="th">Low Threshold</th><th className="th">Cost / Unit</th><th className="th">Value</th><th className="th">Status</th><th className="th text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inv.map((i) => (
              <tr key={i.id} className="hover:bg-maroon/[.03]">
                <td className="td font-bold">{i.name}</td>
                <td className="td">
                  <div className="flex items-center gap-2">
                    <button onClick={() => adjust(i, -1)} className="w-7 h-7 rounded-md border border-[#D8CCB4] bg-white hover:border-maroon flex items-center justify-center"><Icon name="minus" className="w-3.5 h-3.5" /></button>
                    <span className={`font-extrabold w-14 text-center ${i.stock <= i.low ? 'text-maroon' : ''}`}>{i.stock} {i.unit}</span>
                    <button onClick={() => adjust(i, 1)} className="w-7 h-7 rounded-md border border-[#D8CCB4] bg-white hover:border-leaf flex items-center justify-center"><Icon name="plus" className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
                <td className="td text-muted">{i.low} {i.unit}</td>
                <td className="td">Rs. {i.cost}</td>
                <td className="td font-semibold">Rs. {Math.round(i.stock * i.cost).toLocaleString()}</td>
                <td className="td">
                  {i.stock <= i.low ? (
                    <span className="text-[10px] font-bold text-maroon bg-maroon/10 border border-maroon/30 rounded-full px-2.5 py-1">LOW STOCK</span>
                  ) : (
                    <span className="text-[10px] font-bold text-leaf bg-leaf/10 border border-leaf/30 rounded-full px-2.5 py-1">OK</span>
                  )}
                </td>
                <td className="td text-right whitespace-nowrap">
                  <button onClick={() => { setRestock(i); setRestockQty(10); }} className="text-[11px] font-bold text-leaf border border-leaf/40 bg-leaf/10 rounded-lg px-3 py-1.5 mr-2 hover:bg-leaf hover:text-white">Restock</button>
                  <button onClick={() => setEditing({ ...i })} className="p-2 hover:text-maroon" title="Edit"><Icon name="edit" className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!restock} onClose={() => setRestock(null)} title={`Restock ${restock?.name || ''}`}>
        <div className="space-y-4">
          <div>
            <label className="label">Quantity to add ({restock?.unit})</label>
            <input type="number" min="0" className="field" value={restockQty} onChange={(e) => setRestockQty(e.target.value)} />
          </div>
          <button onClick={doRestock} className="btn-leaf w-full py-2.5 text-sm">Add Stock</button>
        </div>
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.isNew ? 'Add Ingredient' : 'Edit Ingredient'}>
        {editing && (
          <form onSubmit={editing.isNew ? addItem : saveEdit} className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input className="field" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Unit</label>
                <select className="field" value={editing.unit} onChange={(e) => setEditing({ ...editing, unit: e.target.value })}>
                  <option value="kg">kg</option><option value="L">L</option><option value="pcs">pcs</option>
                </select>
              </div>
              {editing.isNew && (
                <div>
                  <label className="label">Initial Stock</label>
                  <input type="number" min="0" className="field" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: e.target.value })} />
                </div>
              )}
              <div>
                <label className="label">Low Threshold</label>
                <input type="number" min="0" className="field" value={editing.low} onChange={(e) => setEditing({ ...editing, low: e.target.value })} />
              </div>
              <div>
                <label className="label">Cost / Unit (Rs.)</label>
                <input type="number" min="0" className="field" value={editing.cost} onChange={(e) => setEditing({ ...editing, cost: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn-maroon w-full py-2.5 text-sm">Save</button>
          </form>
        )}
      </Modal>
    </AdminShell>
  );
}
