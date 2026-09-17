'use client';
import { createContext, useContext, useEffect, useState } from 'react';

/* ---------- API helper ---------- */
export async function api(path, opts = {}) {
  const r = await fetch('/api/' + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

/* ---------- Toast ---------- */
export function toast(msg) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('agh-toast', { detail: msg }));
}

export function Toaster() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    let t;
    const h = (e) => {
      setMsg(e.detail);
      clearTimeout(t);
      t = setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener('agh-toast', h);
    return () => window.removeEventListener('agh-toast', h);
  }, []);
  if (!msg) return null;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-ink/95 text-white text-sm px-5 py-2.5 rounded-full shadow-xl whitespace-nowrap">
      {msg}
    </div>
  );
}

/* ---------- Language (Urdu / English toggle) ---------- */
const LangCtx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('ur');
  useEffect(() => {
    setLangState(localStorage.getItem('agh_lang') || 'ur');
  }, []);
  const setLang = (l) => {
    localStorage.setItem('agh_lang', l);
    setLangState(l);
  };
  const t = (ur, en) => (lang === 'ur' ? ur : en);
  return <LangCtx.Provider value={{ lang, setLang, t, isUr: lang === 'ur' }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

/* ---------- Cart ---------- */
const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem('agh_cart') || '[]'));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem('agh_cart', JSON.stringify(items));
  }, [items, loaded]);

  const add = (item, option, qty = 1) => {
    const key = item.id + '|' + (option?.label || '');
    setItems((prev) => {
      const ex = prev.find((i) => i.key === key);
      if (ex) return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, item.stock) } : i));
      return [
        ...prev,
        {
          key,
          menuId: item.id,
          nameUr: item.nameUr,
          nameEn: item.nameEn,
          image: item.image,
          qty: Math.min(qty, item.stock),
          price: option ? option.price : item.price,
          option: option?.label || '',
          stock: item.stock,
        },
      ];
    });
  };

  const setQty = (key, qty) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(qty, i.stock) } : i))));
  };

  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  return <CartCtx.Provider value={{ items, add, setQty, remove, clear, count, subtotal }}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);

/* ---------- Customer profile ---------- */
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('agh_user') || 'null');
  } catch {
    return null;
  }
}
export function setUser(u) {
  if (u) localStorage.setItem('agh_user', JSON.stringify(u));
  else localStorage.removeItem('agh_user');
}

export function getMyOrderIds() {
  try {
    return JSON.parse(localStorage.getItem('agh_my_orders') || '[]');
  } catch {
    return [];
  }
}
export function pushMyOrderId(id) {
  const list = getMyOrderIds();
  localStorage.setItem('agh_my_orders', JSON.stringify([id, ...list.filter((x) => x !== id)]));
}

export function getFavs() {
  try {
    return JSON.parse(localStorage.getItem('agh_favs') || '[]');
  } catch {
    return [];
  }
}
export function toggleFav(id) {
  const f = getFavs();
  const next = f.includes(id) ? f.filter((x) => x !== id) : [id, ...f];
  localStorage.setItem('agh_favs', JSON.stringify(next));
  return next.includes(id);
}

export const fmt = (n) => 'Rs. ' + Number(n || 0).toLocaleString('en-PK');

export const STATUS_META = {
  placed: { en: 'Order Placed', enDesc: 'Your order has been received', ur: 'آپ کا آرڈر موصول ہو گیا ہے', icon: 'receipt' },
  confirmed: { en: 'Order Confirmed', enDesc: 'Your order has been confirmed', ur: 'آپ کا آرڈر تصدیق ہو گیا ہے', icon: 'check' },
  preparing: { en: 'Preparing', enDesc: 'Your food is being prepared', ur: 'آپ کے کھانے کی تیاری ہو رہی ہے', icon: 'utensils' },
  delivery: { en: 'Out for Delivery', enDesc: 'Arriving at your doorstep soon', ur: 'جلد ہی آپ کے پاس پہنچے گا', icon: 'bike' },
  delivered: { en: 'Delivered', enDesc: 'Your order has been delivered', ur: 'آپ کا آرڈر پہنچا دیا گیا ہے', icon: 'home' },
  cancelled: { en: 'Cancelled', enDesc: 'Your order has been cancelled', ur: 'آپ کا آرڈر منسوخ کر دیا گیا ہے', icon: 'x' },
};
export const STATUS_FLOW = ['placed', 'confirmed', 'preparing', 'delivery', 'delivered'];

export function timeOf(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
