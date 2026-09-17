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

export const STATUS_TONE = {
  placed: 'bg-[#FBF3E1] text-[#8A6A10] border-[#E7CD8A]',
  confirmed: 'bg-[#EDF2FB] text-[#1D4ED8] border-[#B9CDF0]',
  preparing: 'bg-[#FBEDED] text-[#9E1B1E] border-[#E7B9BB]',
  delivery: 'bg-[#F1EDFB] text-[#6D28D9] border-[#CDBCF0]',
  delivered: 'bg-[#EBF4EE] text-[#17703C] border-[#B5D8C0]',
  cancelled: 'bg-[#F3F1EC] text-[#6E675C] border-[#D8D2C6]',
};

export function StatusPill({ status, label }) {
  return (
    <span className={`apill ${STATUS_TONE[status] || STATUS_TONE.cancelled}`}>
      <i className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function Toggle({ on, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className={`relative w-9 h-5 rounded-full transition shrink-0 ${on ? 'bg-leaf' : 'bg-[#D8D2C6]'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-4' : ''}`} />
    </button>
  );
}

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
    <div dir="ltr" className="admin min-h-screen bg-[#F5F2EB] flex items-center justify-center p-6">
      <div className="acard w-full max-w-3xl grid md:grid-cols-[1.1fr_1fr] overflow-hidden !rounded-2xl shadow-xl">
        <div className="pattern-maroon text-white p-10 flex flex-col justify-between min-h-[420px]">
          <div className="flex items-center gap-3">
            <LogoMark className="w-10 h-10" />
            <div>
              <div className="text-[15px] font-extrabold leading-tight">Al Aziz Restaurant</div>
              <div className="urdu text-[11px] text-[#E3B94F] leading-relaxed">العزيز ریسٹورنٹ</div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold leading-snug">Management Console</h1>
            <p className="text-[13px] text-white/70 mt-2 leading-relaxed">
              Menu, orders, inventory and staff — everything your restaurant runs on, in one place.
            </p>
            <div className="flex gap-6 mt-6 text-[12px] text-white/80">
              <span className="flex items-center gap-2"><Icon name="utensils" className="w-4 h-4 text-[#E3B94F]" /> Menu & pricing</span>
              <span className="flex items-center gap-2"><Icon name="box" className="w-4 h-4 text-[#E3B94F]" /> Live inventory</span>
              <span className="flex items-center gap-2"><Icon name="chart" className="w-4 h-4 text-[#E3B94F]" /> Sales insight</span>
            </div>
          </div>
          <div className="text-[11px] text-white/50">Sahiwal, Pakistan · Since 1998</div>
        </div>

        <form onSubmit={submit} className="p-10 bg-white flex flex-col justify-center">
          <h2 className="text-lg font-extrabold text-ink">Sign in</h2>
          <p className="text-[12px] text-[#6E675C] mt-1 mb-6">Use your administrator credentials.</p>
          <label className="alabel">Username</label>
          <input className="afield mb-4" value={u} onChange={(e) => setU(e.target.value)} placeholder="admin" autoFocus />
          <label className="alabel">Password</label>
          <input type="password" className="afield mb-6" value={p} onChange={(e) => setP(e.target.value)} placeholder="••••••••" />
          <button disabled={busy} className="abtn abtn-primary w-full !h-10 disabled:opacity-60">
            {busy ? 'Signing in…' : 'Sign in to console'}
          </button>
          <p className="text-[11px] text-[#9B948A] text-center mt-4">Default — admin / admin123</p>
        </form>
      </div>
    </div>
  );
}

/* ---------- Shell ---------- */
const NAV = [
  {
    group: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: 'chart' },
      { href: '/admin/revenue', label: 'Revenue & Reports', icon: 'cash' },
    ],
  },
  {
    group: 'Management',
    items: [
      { href: '/admin/orders', label: 'Orders', icon: 'receipt' },
      { href: '/admin/menu', label: 'Menu & Pricing', icon: 'utensils' },
      { href: '/admin/inventory', label: 'Inventory', icon: 'box' },
      { href: '/admin/staff', label: 'Staff', icon: 'users' },
    ],
  },
  { group: 'System', items: [{ href: '/admin/settings', label: 'Settings', icon: 'gear' }] },
];

export function AdminShell({ title, subtitle, actions, children }) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    setAuthed(localStorage.getItem('agh_admin') === '1');
  }, []);

  if (authed === null) return null;
  if (!authed) return <AdminLogin onDone={() => setAuthed(true)} />;

  const logout = () => {
    localStorage.removeItem('agh_admin');
    setAuthed(false);
  };

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  const NavItems = ({ mobile = false }) => (
    <>
      {NAV.map((g) => (
        <div key={g.group} className={mobile ? 'flex items-center gap-1' : ''}>
          {!mobile && <div className="px-3 mt-5 mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A6F63]">{g.group}</div>}
          {g.items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={
                mobile
                  ? `chip !py-1.5 !px-3 text-[12px] shrink-0 ${pathname === n.href ? '!bg-white !text-maroon !border-white font-bold' : '!bg-transparent !text-[#D8C6BB] !border-white/20'}`
                  : `flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-[13px] font-medium transition ${
                      pathname === n.href ? 'bg-maroon text-white shadow-md' : 'text-[#D8C6BB] hover:text-white hover:bg-white/5'
                    }`
              }
            >
              <Icon name={n.icon} className="w-4 h-4 shrink-0" />
              {n.label}
            </Link>
          ))}
        </div>
      ))}
    </>
  );

  return (
    <div dir="ltr" className="admin min-h-screen bg-[#F5F2EB] text-ink flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[240px] shrink-0 flex-col bg-[#24090B] sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
          <LogoMark className="w-9 h-9" />
          <div className="min-w-0">
            <div className="text-[14px] font-extrabold text-white leading-tight truncate">Al Aziz Restaurant</div>
            <div className="urdu text-[10px] text-[#E3B94F] leading-relaxed">العزيز ریسٹورنٹ</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto pb-4">
          <NavItems />
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <span className="w-8 h-8 rounded-full bg-[#E3B94F]/15 text-[#E3B94F] flex items-center justify-center text-[13px] font-extrabold">A</span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-bold text-white truncate">Administrator</div>
              <div className="text-[10px] text-[#8A6F63]">Owner account</div>
            </div>
            <Link href="/" title="View website" className="p-1.5 rounded-md text-[#D8C6BB] hover:text-white hover:bg-white/10">
              <Icon name="eye" className="w-4 h-4" />
            </Link>
            <button onClick={logout} title="Logout" className="p-1.5 rounded-md text-[#D8C6BB] hover:text-white hover:bg-white/10">
              <Icon name="logout" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-[#24090B] text-white">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2.5">
            <LogoMark className="w-7 h-7" />
            <span className="text-[13px] font-extrabold">Al Aziz · Admin</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/" className="p-1.5 text-[#D8C6BB]"><Icon name="eye" className="w-4 h-4" /></Link>
            <button onClick={logout} className="p-1.5 text-[#D8C6BB]"><Icon name="logout" className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-4 pb-3">
          <NavItems mobile />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 h-14 px-4 md:px-6 flex items-center gap-3 bg-[#F5F2EB]/85 backdrop-blur border-b border-[#E7E1D5]">
          <div className="min-w-0">
            <div className="text-[15px] font-extrabold text-ink leading-none truncate">{title}</div>
            {subtitle && <div className="hidden sm:block text-[11px] text-[#9B948A] mt-1 truncate">{subtitle}</div>}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden md:inline text-[11px] font-medium text-[#9B948A]">{today}</span>
            {actions}
          </div>
        </header>
        <main className="p-4 md:p-6 pt-32 lg:pt-6 max-w-[1240px]">{children}</main>
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, desc, children, wide = false, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[#24090B]/50 backdrop-blur-[2px] flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className={`acard w-full ${wide ? 'max-w-2xl' : 'max-w-md'} my-8 !rounded-2xl shadow-2xl`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between px-6 py-4 border-b border-[#F0EBE0]">
          <div>
            <h3 className="text-[15px] font-extrabold text-ink">{title}</h3>
            {desc && <p className="text-[12px] text-[#9B948A] mt-0.5">{desc}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 -m-1 rounded-lg text-[#9B948A] hover:text-ink hover:bg-[#F3F1EC]">
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-[#F0EBE0] flex justify-end gap-2 bg-[#FAF8F3] rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Stat card ---------- */
export function StatCard({ icon, label, value, sub, tone = 'maroon' }) {
  const tones = {
    maroon: 'bg-[#FBEDED] text-[#9E1B1E]',
    leaf: 'bg-[#EBF4EE] text-[#17703C]',
    gold: 'bg-[#FBF3E1] text-[#8A6A10]',
    ink: 'bg-[#F3F1EC] text-[#6E675C]',
    blue: 'bg-[#EDF2FB] text-[#1D4ED8]',
    danger: 'bg-[#FBEDED] text-[#B3261E]',
  };
  return (
    <div className="acard p-5">
      <div className="flex items-start justify-between">
        <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#9B948A]">{label}</div>
        <span className={`w-8 h-8 -mt-1 rounded-lg flex items-center justify-center ${tones[tone]}`}>
          <Icon name={icon} className="w-4 h-4" strokeWidth={2} />
        </span>
      </div>
      <div className="text-[24px] font-extrabold text-ink tnum leading-tight mt-1">{value}</div>
      {sub && <div className="text-[11px] font-medium text-[#6E675C] mt-1">{sub}</div>}
    </div>
  );
}

/* ---------- Section card ---------- */
export function SectionCard({ title, desc, action, children, flush = false }) {
  return (
    <div className="acard overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EBE0]">
        <div>
          <h3 className="text-[13px] font-extrabold text-ink">{title}</h3>
          {desc && <p className="text-[11px] text-[#9B948A] mt-0.5">{desc}</p>}
        </div>
        {action}
      </div>
      <div className={flush ? '' : 'p-5'}>{children}</div>
    </div>
  );
}
