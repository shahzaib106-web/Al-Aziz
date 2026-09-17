'use client';
import { useEffect, useState } from 'react';
import { api, toast } from '../../../components/store';
import { AdminShell, Modal, IMG_OPTIONS } from '../../../components/admin';
import { Icon } from '../../../components/icons';

const blank = { nameUr: '', nameEn: '', desc: '', catId: '', price: 0, halfPrice: '', rating: 4.5, reviews: 0, image: IMG_OPTIONS[0], stock: 20, available: true };

export default function AdminMenu() {
  const [menu, setMenu] = useState([]);
  const [cats, setCats] = useState([]);
  const [filter, setFilter] = useState('');
  const [editing, setEditing] = useState(null); // item form or null
  const [catModal, setCatModal] = useState(false);
  const [catForm, setCatForm] = useState({ ur: '', en: '', desc: '', image: IMG_OPTIONS[0] });

  const load = () => {
    api('menu').then(setMenu).catch(() => {});
    api('categories').then(setCats).catch(() => {});
  };
  useEffect(load, []);

  const openEdit = (m) => {
    if (m) {
      const half = m.options?.find((o) => o.price !== m.price);
      setEditing({ ...m, halfPrice: half ? half.price : '' });
    } else {
      setEditing({ ...blank, catId: cats[0]?.id || '' });
    }
  };

  const save = async (e) => {
    e.preventDefault();
    const f = editing;
    if (!f.nameEn.trim() || !f.nameUr.trim() || !f.catId) return toast('Name and category are required');
    const options = f.halfPrice ? [{ label: 'Half Plate', price: +f.halfPrice }, { label: 'Full Plate', price: +f.price }] : [];
    const payload = {
      nameUr: f.nameUr, nameEn: f.nameEn, desc: f.desc, catId: f.catId,
      price: +f.price, options, rating: +f.rating, reviews: +f.reviews || 0,
      image: f.image, stock: +f.stock, available: !!f.available,
    };
    try {
      if (f.id) await api('menu/' + f.id, { method: 'PUT', body: payload });
      else await api('menu', { method: 'POST', body: payload });
      toast('Menu item saved');
      setEditing(null);
      load();
    } catch (err) {
      toast(err.message);
    }
  };

  const del = async (m) => {
    if (!confirm(`Delete ${m.nameEn}?`)) return;
    await api('menu/' + m.id, { method: 'DELETE' });
    toast('Deleted');
    load();
  };

  const toggleAvail = async (m) => {
    await api('menu/' + m.id, { method: 'PUT', body: { available: !m.available } });
    load();
  };

  const addCat = async (e) => {
    e.preventDefault();
    if (!catForm.ur.trim() || !catForm.en.trim()) return toast('Category name required');
    await api('categories', { method: 'POST', body: { ...catForm, desc: catForm.desc || catForm.en } });
    toast('Category added');
    setCatModal(false);
    setCatForm({ ur: '', en: '', desc: '', image: IMG_OPTIONS[0] });
    load();
  };

  const list = filter ? menu.filter((m) => m.catId === filter) : menu;

  return (
    <AdminShell title="Menu & Price Management">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <select className="field !w-44" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Categories</option>
          {cats.map((c) => <option key={c.id} value={c.id}>{c.en} — {c.ur}</option>)}
        </select>
        <button onClick={() => openEdit(null)} className="btn-maroon px-5 py-2.5 text-sm flex items-center gap-2"><Icon name="plus" className="w-4 h-4" /> Add Menu Item</button>
        <button onClick={() => setCatModal(true)} className="btn-leaf px-5 py-2.5 text-sm flex items-center gap-2"><Icon name="plus" className="w-4 h-4" /> Add Category</button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr>
              <th className="th">Item</th><th className="th">Category</th><th className="th">Price</th><th className="th">Rating</th><th className="th">Stock</th><th className="th">Available</th><th className="th text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id} className="hover:bg-maroon/[.03]">
                <td className="td">
                  <div className="flex items-center gap-3">
                    <img src={m.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-[#E8DCC3]" />
                    <div>
                      <div className="font-bold">{m.nameEn}</div>
                      <div className="urdu text-[11px] text-muted leading-relaxed">{m.nameUr}</div>
                    </div>
                  </div>
                </td>
                <td className="td text-muted">{cats.find((c) => c.id === m.catId)?.en || '—'}</td>
                <td className="td font-bold text-maroon">Rs. {m.price}{m.options?.length ? <div className="text-[10px] text-muted font-normal">Half Rs. {m.options[0].price}</div> : null}</td>
                <td className="td">★ {m.rating}</td>
                <td className="td">
                  <span className={`font-bold ${m.stock <= 5 ? 'text-maroon' : 'text-ink'}`}>{m.stock}</span>
                  <span className="text-[10px] text-muted"> plates</span>
                </td>
                <td className="td">
                  <button onClick={() => toggleAvail(m)} className={`relative w-10 h-5.5 h-6 rounded-full transition ${m.available ? 'bg-leaf' : 'bg-[#D8CCB4]'}`}>
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${m.available ? 'left-[18px]' : 'left-0.5'}`} />
                  </button>
                </td>
                <td className="td text-right whitespace-nowrap">
                  <button onClick={() => openEdit(m)} className="p-2 text-ink hover:text-maroon" title="Edit"><Icon name="edit" className="w-4 h-4" /></button>
                  <button onClick={() => del(m)} className="p-2 text-ink hover:text-maroon" title="Delete"><Icon name="trash" className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Item modal */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit Menu Item' : 'Add Menu Item'} wide>
        {editing && (
          <form onSubmit={save} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Name (English)</label>
              <input className="field" value={editing.nameEn} onChange={(e) => setEditing({ ...editing, nameEn: e.target.value })} />
            </div>
            <div>
              <label className="label">Name (Urdu)</label>
              <input className="field urdu" dir="rtl" value={editing.nameUr} onChange={(e) => setEditing({ ...editing, nameUr: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Description (Urdu)</label>
              <textarea className="field urdu" dir="rtl" rows={2} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} />
            </div>
            <div>
              <label className="label">Category</label>
              <select className="field" value={editing.catId} onChange={(e) => setEditing({ ...editing, catId: e.target.value })}>
                {cats.map((c) => <option key={c.id} value={c.id}>{c.en}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Image</label>
              <select className="field" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}>
                {IMG_OPTIONS.map((i) => <option key={i} value={i}>{i.replace('/img/', '').replace('.jpg', '')}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Full Plate Price (Rs.)</label>
              <input type="number" min="0" className="field" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
            </div>
            <div>
              <label className="label">Half Plate Price (optional)</label>
              <input type="number" min="0" className="field" value={editing.halfPrice} onChange={(e) => setEditing({ ...editing, halfPrice: e.target.value })} />
            </div>
            <div>
              <label className="label">Stock (plates/day)</label>
              <input type="number" min="0" className="field" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: e.target.value })} />
            </div>
            <div>
              <label className="label">Rating</label>
              <input type="number" step="0.1" min="0" max="5" className="field" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: e.target.value })} />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <input type="checkbox" id="avail" checked={editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} className="w-4 h-4 accent-[#17703C]" />
              <label htmlFor="avail" className="text-sm font-medium">Available on website</label>
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditing(null)} className="px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink">Cancel</button>
              <button type="submit" className="btn-maroon px-6 py-2.5 text-sm">Save Item</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Category modal */}
      <Modal open={catModal} onClose={() => setCatModal(false)} title="Add Category">
        <form onSubmit={addCat} className="space-y-4">
          <div>
            <label className="label">Category (Urdu)</label>
            <input className="field urdu" dir="rtl" value={catForm.ur} onChange={(e) => setCatForm({ ...catForm, ur: e.target.value })} />
          </div>
          <div>
            <label className="label">Category (English)</label>
            <input className="field" value={catForm.en} onChange={(e) => setCatForm({ ...catForm, en: e.target.value })} />
          </div>
          <div>
            <label className="label">Description (Urdu)</label>
            <input className="field urdu" dir="rtl" value={catForm.desc} onChange={(e) => setCatForm({ ...catForm, desc: e.target.value })} />
          </div>
          <div>
            <label className="label">Image</label>
            <select className="field" value={catForm.image} onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}>
              {IMG_OPTIONS.map((i) => <option key={i} value={i}>{i.replace('/img/', '').replace('.jpg', '')}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-maroon w-full py-2.5 text-sm">Add Category</button>
        </form>
      </Modal>
    </AdminShell>
  );
}
