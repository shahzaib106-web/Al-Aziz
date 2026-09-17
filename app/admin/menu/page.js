'use client';
import { useEffect, useState } from 'react';
import { api, toast } from '../../../components/store';
import { AdminShell, Modal, Toggle, SectionCard, IMG_OPTIONS } from '../../../components/admin';
import { Icon } from '../../../components/icons';

const blank = { nameUr: '', nameEn: '', desc: '', catId: '', price: 0, halfPrice: '', rating: 4.5, reviews: 0, image: IMG_OPTIONS[0], stock: 20, available: true };

export default function AdminMenu() {
  const [menu, setMenu] = useState([]);
  const [cats, setCats] = useState([]);
  const [filter, setFilter] = useState('');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null);
  const [catModal, setCatModal] = useState(false);
  const [catForm, setCatForm] = useState({ ur: '', en: '', desc: '', image: IMG_OPTIONS[0] });

  const load = () => {
    api('menu').then(setMenu).catch(() => {});
    api('categories').then(setCats).catch(() => {});
  };
  useEffect(() => { load(); }, []);

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
    if (!confirm(`Delete ${m.nameEn} from the menu?`)) return;
    await api('menu/' + m.id, { method: 'DELETE' });
    toast('Item deleted');
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

  const list = menu.filter((m) => (!filter || m.catId === filter) && (!q || (m.nameEn + m.nameUr).toLowerCase().includes(q.toLowerCase())));

  return (
    <AdminShell
      title="Menu & Pricing"
      subtitle={`${menu.length} dishes across ${cats.length} categories`}
      actions={
        <div className="flex gap-2">
          <button onClick={() => setCatModal(true)} className="abtn abtn-ghost">Add category</button>
          <button onClick={() => openEdit(null)} className="abtn abtn-primary"><Icon name="plus" className="w-4 h-4" /> Add item</button>
        </div>
      }
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Icon name="search" className="w-4 h-4 text-[#9B948A] absolute left-3 top-2.5" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes…" className="afield !pl-9" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="afield !w-48">
          <option value="">All categories</option>
          {cats.map((c) => <option key={c.id} value={c.id}>{c.en}</option>)}
        </select>
      </div>

      <div className="acard overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px]">
            <thead>
              <tr>
                <th className="ath">Dish</th>
                <th className="ath">Category</th>
                <th className="ath text-right">Price</th>
                <th className="ath text-right">Rating</th>
                <th className="ath text-right">Stock</th>
                <th className="ath">Available</th>
                <th className="ath text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((m) => (
                <tr key={m.id} className="arow">
                  <td className="atd">
                    <div className="flex items-center gap-3">
                      <img src={m.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-[#E7E1D5]" />
                      <div>
                        <div className="font-bold">{m.nameEn}</div>
                        <div className="urdu text-[11px] text-[#9B948A] leading-relaxed">{m.nameUr}</div>
                      </div>
                    </div>
                  </td>
                  <td className="atd"><span className="apill bg-[#F3F1EC] text-[#6E675C] border-[#D8D2C6]">{cats.find((c) => c.id === m.catId)?.en || '—'}</span></td>
                  <td className="atd text-right">
                    <div className="font-bold tnum">Rs. {m.price}</div>
                    {m.options?.length > 0 && <div className="text-[11px] text-[#9B948A] tnum">Half Rs. {m.options[0].price}</div>}
                  </td>
                  <td className="atd text-right tnum text-[#6E675C]">★ {m.rating}</td>
                  <td className="atd text-right">
                    <span className={`font-bold tnum ${m.stock <= 5 ? 'text-[#9E1B1E]' : 'text-ink'}`}>{m.stock}</span>
                    <span className="text-[11px] text-[#9B948A]"> /day</span>
                  </td>
                  <td className="atd"><Toggle on={m.available} onChange={() => toggleAvail(m)} /></td>
                  <td className="atd text-right whitespace-nowrap">
                    <button onClick={() => openEdit(m)} className="p-2 rounded-lg text-[#6E675C] hover:text-maroon hover:bg-[#FBEDED]" title="Edit"><Icon name="edit" className="w-4 h-4" /></button>
                    <button onClick={() => del(m)} className="p-2 rounded-lg text-[#6E675C] hover:text-[#B3261E] hover:bg-[#FBEDED]" title="Delete"><Icon name="trash" className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={7} className="atd text-center text-[#9B948A] py-10">No dishes match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item modal */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit dish' : 'Add a new dish'}
        desc="Changes go live on the website instantly."
        wide
        footer={
          <>
            <button onClick={() => setEditing(null)} className="abtn abtn-ghost">Cancel</button>
            <button onClick={save} className="abtn abtn-primary">Save dish</button>
          </>
        }
      >
        {editing && (
          <form onSubmit={save} className="grid md:grid-cols-2 gap-4">
            <div><label className="alabel">Name (English)</label><input className="afield" value={editing.nameEn} onChange={(e) => setEditing({ ...editing, nameEn: e.target.value })} /></div>
            <div><label className="alabel">Name (Urdu)</label><input className="afield urdu" dir="rtl" value={editing.nameUr} onChange={(e) => setEditing({ ...editing, nameUr: e.target.value })} /></div>
            <div className="md:col-span-2"><label className="alabel">Description (Urdu)</label><textarea className="afield-area urdu" dir="rtl" rows={2} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} /></div>
            <div><label className="alabel">Category</label>
              <select className="afield" value={editing.catId} onChange={(e) => setEditing({ ...editing, catId: e.target.value })}>
                {cats.map((c) => <option key={c.id} value={c.id}>{c.en}</option>)}
              </select>
            </div>
            <div><label className="alabel">Photo</label>
              <select className="afield" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}>
                {IMG_OPTIONS.map((i) => <option key={i} value={i}>{i.replace('/img/', '').replace('.jpg', '')}</option>)}
              </select>
            </div>
            <div><label className="alabel">Full plate price (Rs.)</label><input type="number" min="0" className="afield tnum" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} /></div>
            <div><label className="alabel">Half plate price (optional)</label><input type="number" min="0" className="afield tnum" value={editing.halfPrice} onChange={(e) => setEditing({ ...editing, halfPrice: e.target.value })} /></div>
            <div><label className="alabel">Daily stock (plates)</label><input type="number" min="0" className="afield tnum" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: e.target.value })} /></div>
            <div><label className="alabel">Rating</label><input type="number" step="0.1" min="0" max="5" className="afield tnum" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: e.target.value })} /></div>
            <div className="md:col-span-2 flex items-center gap-3 pt-1">
              <Toggle on={editing.available} onChange={() => setEditing({ ...editing, available: !editing.available })} />
              <span className="text-[13px] font-medium">Available on the website</span>
            </div>
          </form>
        )}
      </Modal>

      {/* Category modal */}
      <Modal
        open={catModal}
        onClose={() => setCatModal(false)}
        title="Add category"
        desc="A new section on the customer menu."
        footer={
          <>
            <button onClick={() => setCatModal(false)} className="abtn abtn-ghost">Cancel</button>
            <button onClick={addCat} className="abtn abtn-primary">Add category</button>
          </>
        }
      >
        <form onSubmit={addCat} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="alabel">Urdu</label><input className="afield urdu" dir="rtl" value={catForm.ur} onChange={(e) => setCatForm({ ...catForm, ur: e.target.value })} /></div>
            <div><label className="alabel">English</label><input className="afield" value={catForm.en} onChange={(e) => setCatForm({ ...catForm, en: e.target.value })} /></div>
          </div>
          <div><label className="alabel">Description (Urdu)</label><input className="afield-area urdu" dir="rtl" value={catForm.desc} onChange={(e) => setCatForm({ ...catForm, desc: e.target.value })} /></div>
          <div><label className="alabel">Photo</label>
            <select className="afield" value={catForm.image} onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}>
              {IMG_OPTIONS.map((i) => <option key={i} value={i}>{i.replace('/img/', '').replace('.jpg', '')}</option>)}
            </select>
          </div>
        </form>
      </Modal>
    </AdminShell>
  );
}
