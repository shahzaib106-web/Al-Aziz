'use client';
import { useEffect, useState } from 'react';
import { api, fmt, toast } from '../../../components/store';
import { AdminShell, Modal } from '../../../components/admin';
import { Icon } from '../../../components/icons';

const ROLES = ['Head Chef', 'BBQ Chef', 'Cook', 'Kitchen Helper', 'Waiter', 'Cashier', 'Delivery Rider', 'Manager'];
const blank = { name: '', role: ROLES[0], phone: '', salary: 25000, status: 'On Duty', joined: new Date().toISOString().slice(0, 10) };

export default function AdminStaff() {
  const [staff, setStaff] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => api('staff').then(setStaff).catch(() => {});
  useEffect(load, []);

  const save = async (e) => {
    e.preventDefault();
    if (!editing.name.trim()) return toast('Name required');
    const payload = { ...editing, salary: +editing.salary };
    if (editing.id) await api('staff/' + editing.id, { method: 'PUT', body: payload });
    else await api('staff', { method: 'POST', body: payload });
    toast('Staff saved');
    setEditing(null);
    load();
  };

  const del = async (s) => {
    if (!confirm(`Remove ${s.name} from staff?`)) return;
    await api('staff/' + s.id, { method: 'DELETE' });
    toast('Removed');
    load();
  };

  const toggle = async (s) => {
    await api('staff/' + s.id, { method: 'PUT', body: { status: s.status === 'On Duty' ? 'Off Duty' : 'On Duty' } });
    load();
  };

  return (
    <AdminShell title="Staff Management">
      <button onClick={() => setEditing({ ...blank })} className="btn-maroon px-5 py-2.5 text-sm flex items-center gap-2 mb-5">
        <Icon name="plus" className="w-4 h-4" /> Add Staff Member
      </button>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {staff.map((s) => (
          <div key={s.id} className="card p-5">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-maroon/10 text-maroon flex items-center justify-center font-extrabold">
                {s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-extrabold truncate">{s.name}</div>
                <div className="text-[11px] text-muted font-medium">{s.role}</div>
              </div>
              <span className={`text-[10px] font-bold border rounded-full px-2.5 py-1 ${s.status === 'On Duty' ? 'bg-leaf/10 text-leaf border-leaf/30' : 'bg-ink/5 text-muted border-[#D8CCB4]'}`}>
                {s.status}
              </span>
            </div>
            <div className="mt-4 space-y-1.5 text-xs text-muted">
              <div className="flex justify-between"><span>Phone</span><span className="font-semibold text-ink">{s.phone}</span></div>
              <div className="flex justify-between"><span>Salary</span><span className="font-semibold text-ink">{fmt(s.salary)}/mo</span></div>
              <div className="flex justify-between"><span>Joined</span><span className="font-semibold text-ink">{s.joined}</span></div>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-[#EFE5D0]">
              <button onClick={() => toggle(s)} className="flex-1 text-[11px] font-bold border border-leaf/40 text-leaf bg-leaf/10 rounded-lg py-2 hover:bg-leaf hover:text-white">
                {s.status === 'On Duty' ? 'Mark Off Duty' : 'Mark On Duty'}
              </button>
              <button onClick={() => setEditing({ ...s })} className="p-2 border border-[#D8CCB4] rounded-lg hover:border-maroon hover:text-maroon"><Icon name="edit" className="w-4 h-4" /></button>
              <button onClick={() => del(s)} className="p-2 border border-[#D8CCB4] rounded-lg hover:border-maroon hover:text-maroon"><Icon name="trash" className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit Staff' : 'Add Staff Member'}>
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input className="field" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Role</label>
                <select className="field" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })}>
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="field" value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
              </div>
              <div>
                <label className="label">Salary (Rs./month)</label>
                <input type="number" min="0" className="field" value={editing.salary} onChange={(e) => setEditing({ ...editing, salary: e.target.value })} />
              </div>
              <div>
                <label className="label">Joined</label>
                <input type="date" className="field" value={editing.joined} onChange={(e) => setEditing({ ...editing, joined: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="label !mb-0">Status</label>
              <select className="field !w-36" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                <option>On Duty</option><option>Off Duty</option>
              </select>
            </div>
            <button type="submit" className="btn-maroon w-full py-2.5 text-sm">Save</button>
          </form>
        )}
      </Modal>
    </AdminShell>
  );
}
