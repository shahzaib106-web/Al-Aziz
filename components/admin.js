'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { api, toast } from './store';
import { Icon, LogoMark } from './icons';

export const IMG_OPTIONS = [
  '/img/chicken-special.jpg',
  '/img/rice.jpg',
  '/img/desi.jpg',
  '/img/mutton-special.jpg',
  '/img/tandoor.jpg',
  '/img/mint.jpg',
  '/img/kheer.jpg',
  '/img/biryani.jpg',
  '/img/mutton-biryani.jpg',
  '/img/karahi.jpg',
  '/img/kebab.jpg',
  '/img/naan.jpg',
  '/img/lassi.jpg',
  '/img/zarda.jpg',
  '/img/chai.jpg',
  '/img/spread.jpg',
];

/* ---------- Login ---------- */
export function AdminLogin({ onDone }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api('auth', { method: 'POST', body: { username: u, password: p } });
      localStorage.setItem('agh_admin', '1');
      onDone();
    } catch (err) {
      toast(err.message);
    }
    setBusy(false);
  };

  return (
    <div dir="ltr" className="min-h-screen bg-cream flex items-center justify-center p-6 pattern-maroon">
      <form onSubmit={submit} className="bg-cream-card rounded-2xl shadow-xl p-8 w-full max-w-sm border border-[#E8DCC3]">
        <div className="flex flex-col items-center mb-6">
          <LogoMark className="w-12 h-12" />
          <h1 className="text-lg font-extrabold text-maroon mt-2">Admin Dashboard</h1>
          <p className="text-xs text-muted mt-1">Al Aziz Restaurant — Management Panel</p>
        </div>
        <label className="label">Username</label>
        <input className="field mb-3" value={u} onChange={(e) => setU(e.target.value)} placeholder="admin" autoFocus />
        <label className="label">Password</label>
        <input type="password" className="field mb-5" value={p} onChange={(e) => setP(e.target.value)} placeholder="••••••••" />
        <button disabled={busy} className="btn-maroon w-full py-3 text-sm tracking-wide disabled:opacity-60">
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
        <p className="text-[11px] text-muted text-center mt-4">Default: admin / admin123</p>
      </form>
    </div>
  );
}

/* ---------- Shell ---------- */
export function AdminShell({ title, children }) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    setAuthed(localStorage.getItem('agh_admin') === '1');
  }, []);

  if (authed === null) return null;
  if (!authed) return <AdminLogin onDone={() => setAuthed(true)} />;

  const nav = [
    { href: '/admin', label: 'Dashboard', icon: 'chart' },
    { href: '/admin/orders', label: 'Orders', icon: 'receipt' },
    { href: '/admin/menu', label: 'Menu & Prices', icon: 'utensils' },
    { href: '/admin/inventory', label: 'Inventory', icon: 'box' },
    { href: '/admin/staff', label: 'Staff', icon: 'users' },
    { href: '/admin/settings', label: 'Settings', icon: 'gear' },
  ];

  const logout = () => {
    localStorage.removeItem('agh_admin');
    setAuthed(false);
  };

  return (
    <div dir="ltr" className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col pattern-maroon text-white sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <LogoMark className="w-9 h-9" />
          <div>
            <div className="text-sm font-extrabold leading-tight">Al Aziz Restaurant</div>
            <div className="text-[10px] text-white/60">Admin Panel</div>
          </div>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === n.href ? 'bg-white text-maroon shadow' : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon name={n.icon} className="w-5 h-5" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 space-y-1 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10">
            <Icon name="eye" className="w-5 h-5" /> View Website
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10">
            <Icon name="logout" className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 pattern-maroon text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-extrabold">Al Aziz Admin</span>
          <button onClick={logout} className="p-1"><Icon name="logout" className="w-5 h-5" /></button>
        </div>
        <div className="flex gap-1 overflow-x-auto no-scrollbar px-3 pb-2">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={`chip !py-1.5 text-xs ${pathname === n.href ? '!bg-white !text-maroon !border-white font-bold' : '!bg-transparent !text-white !border-white/30'}`}>
              {n.label}
            </Link>
          ))}
        </div>
      </div>

      <main className="flex-1 min-w-0 p-4 md:p-8 pt-28 md:pt-8">
        <h1 className="text-xl font-extrabold text-ink mb-6">{title}</h1>
        {children}
      </main>
    </div>
  );
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, children, wide = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className={`bg-cream-card rounded-2xl shadow-xl w-full ${wide ? 'max-w-2xl' : 'max-w-md'} my-8 border border-[#E8DCC3]`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFE5D0]">
          <h3 className="text-sm font-extrabold text-ink">{title}</h3>
          <button onClick={onClose} className="p-1 text-muted hover:text-ink"><Icon name="x" className="w-5 h-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Stat card ---------- */
export function StatCard({ icon, label, value, sub, tone = 'maroon' }) {
  const tones = {
    maroon: 'bg-maroon/10 text-maroon',
    leaf: 'bg-leaf/10 text-leaf',
    gold: 'bg-gold/20 text-[#8A6A10]',
    ink: 'bg-ink/10 text-ink',
  };
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tones[tone]}`}>
        <Icon name={icon} className="w-5 h-5" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <div className="text-lg font-extrabold text-ink leading-tight truncate">{value}</div>
        <div className="text-[11px] text-muted font-medium">{label}</div>
        {sub && <div className="text-[10px] text-leaf font-semibold">{sub}</div>}
      </div>
    </div>
  );
}
