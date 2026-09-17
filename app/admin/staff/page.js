'use client';
import { useEffect, useState } from 'react';
import { api, fmt, toast } from '../../../components/store';
import { AdminShell, Modal, Toggle, StatCard } from '../../../components/admin';
import { Icon } from '../../../components/icons';

const ROLES = ['Head Chef', 'BBQ Chef', 'Cook', 'Kitchen Helper', 'Waiter', 'Cashier', 'Delivery Rider', 'Manager'];
const blank = { name: '', role: ROLES[0], phone: '', salary: 25000, status: 'On Duty', joined: new Date().toISOString().slice(0, 10) };

export default function AdminStaff() {
  const [staff, setStaff] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => api('staff').then(setStaff).catch(() => {});
  useEffect(() => { load(); }, []);

  const onDuty = staff.filter((s) => s.status === 'On Duty').length;
  const payroll = staff.reduce((s, x) => s + (+x.salary || 0), 0);

  const save = async (e) => {
    e.preventDefault();
    if (!editing.name.trim()) return toast('Name required');
    const payload = { ...editing, salary: +editing.salary };
    if (editing.id) await api('staff/' + editing.id, { method: 'PUT', body: payload });
    else await api('staff', { method: 'POST', body: payload });
    toast('Staff member saved');
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
    <AdminShell
      title="Staff"
      subtitle="Team, roles, payroll & duty roster"
      actions={<button onClick={() => setEditing({ ...blank })} className="abtn abtn-primary"><Icon name="plus" className="w-4 h-4" /> Add member</button>}
    >
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard icon="users" label="Team size" value={staff.length} sub={`${onDuty} on duty right now`} tone="maroon" />
        <StatCard icon="chart" label="Monthly payroll" value={fmt(payroll)} sub="All active & off-duty staff" tone="gold" />
        <StatCard icon="check" label="On duty" value={`${onDuty}/${staff.length}`} sub="Toggle duty from the table" tone="leaf" />
      </div>

      <div className="acard overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr>
                <th className="ath">Member</th>
                <th className="ath">Role</th>
                <th className="ath">Contact</th>
                <th className="ath text-right">Salary / mo</th>
                <th className="ath">Joined</th>
                <th className="ath">On duty</th>
                <th className="ath text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id} className="arow">
                  <td className="atd">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-[#FBEDED] text-maroon text-[12px] font-extrabold flex items-center justify-center shrink-0">
                        {s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                      </span>
                      <span className="font-bold">{s.name}</span>
                    </div>
                  </td>
                  <td className="atd"><span className="apill bg-[#F3F1EC] text-[#6E675C] border-[#D8D2C6]">{s.role}</span></td>
                  <td className="atd tnum text-[#6E675C]">{s.phone}</td>
                  <td className="atd text-right font-semibold tnum">{fmt(s.salary)}</td>
                  <td className="atd tnum text-[#6E675C]">{s.joined}</td>
                  <td className="atd"><Toggle on={s.status === 'On Duty'} onChange={() => toggle(s)} /></td>
                  <td className="atd text-right whitespace-nowrap">
                    <button onClick={() => setEditing({ ...s })} className="p-2 rounded-lg text-[#6E675C] hover:text-maroon hover:bg-[#FBEDED]"><Icon name="edit" className="w-4 h-4" /></button>
                    <button onClick={() => del(s)} className="p-2 rounded-lg text-[#6E675C] hover:text-[#B3261E] hover:bg-[#FBEDED]"><Icon name="trash" className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? `Edit ${editing.name}` : 'Add staff member'}
        footer={
          <>
            <button onClick={() => setEditing(null)} className="abtn abtn-ghost">Cancel</button>
            <button onClick={save} className="abtn abtn-primary">Save member</button>
          </>
        }
      >
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <div><label className="alabel">Full name</label><input className="afield" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="alabel">Role</label>
                <select className="afield" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })}>
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div><label className="alabel">Phone</label><input className="afield tnum" value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></div>
              <div><label className="alabel">Salary (Rs./month)</label><input type="number" min="0" className="afield tnum" value={editing.salary} onChange={(e) => setEditing({ ...editing, salary: e.target.value })} /></div>
              <div><label className="alabel">Joined</label><input type="date" className="afield tnum" value={editing.joined} onChange={(e) => setEditing({ ...editing, joined: e.target.value })} /></div>
            </div>
            <div className="flex items-center gap-3">
              <Toggle on={editing.status === 'On Duty'} onChange={() => setEditing({ ...editing, status: editing.status === 'On Duty' ? 'Off Duty' : 'On Duty' })} />
              <span className="text-[13px] font-medium">On duty</span>
            </div>
          </form>
        )}
      </Modal>
    </AdminShell>
  );
}
