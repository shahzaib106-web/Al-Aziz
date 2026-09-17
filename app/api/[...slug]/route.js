import { readDB, writeDB } from '../../../lib/db';

export const dynamic = 'force-dynamic';

const LISTS = ['menu', 'categories', 'orders', 'inventory', 'staff'];

const res = (data, status = 200) => Response.json(data, { status });

export async function GET(req, { params }) {
  const db = readDB();
  const [col, id] = params.slug || [];
  if (col === 'settings') return res(db.settings);
  if (!LISTS.includes(col)) return res({ error: 'Not found' }, 404);
  if (id) {
    const item = db[col].find((x) => x.id === id);
    return item ? res(item) : res({ error: 'Not found' }, 404);
  }
  return res(db[col]);
}

export async function POST(req, { params }) {
  const db = readDB();
  const [col] = params.slug || [];
  let body = {};
  try {
    body = await req.json();
  } catch {}

  if (col === 'auth') {
    const { username, password } = body;
    if (username === db.settings.admin.username && password === db.settings.admin.password) return res({ ok: true });
    return res({ error: 'Invalid username or password' }, 401);
  }

  if (col === 'orders') {
    const items = body.items || [];
    if (!items.length) return res({ error: 'Cart is empty' }, 400);
    for (const it of items) {
      const m = db.menu.find((x) => x.id === it.menuId);
      if (!m) return res({ error: 'A menu item is no longer available' }, 400);
      if (!m.available || m.stock < it.qty) return res({ error: `${m.nameEn} is out of stock` }, 409);
    }
    for (const it of items) {
      const m = db.menu.find((x) => x.id === it.menuId);
      m.stock -= it.qty;
      if (m.recipe) {
        for (const [invId, q] of Object.entries(m.recipe)) {
          const inv = db.inventory.find((v) => v.id === invId);
          if (inv) inv.stock = Math.max(0, +(inv.stock - q * it.qty).toFixed(2));
        }
      }
    }
    const order = {
      id: 'AGH' + String(Math.floor(1000 + Math.random() * 9000)),
      items,
      customer: body.customer || {},
      payment: body.payment || 'cod',
      subtotal: body.subtotal || 0,
      deliveryFee: body.deliveryFee || 0,
      total: body.total || 0,
      status: 'placed',
      timeline: { placed: Date.now() },
      createdAt: Date.now(),
    };
    db.orders.unshift(order);
    writeDB();
    return res(order, 201);
  }

  if (!LISTS.includes(col)) return res({ error: 'Not found' }, 404);
  const item = { ...body, id: body.id || col[0] + Date.now().toString(36) };
  db[col].push(item);
  writeDB();
  return res(item, 201);
}

export async function PUT(req, { params }) {
  const db = readDB();
  const [col, id] = params.slug || [];
  let body = {};
  try {
    body = await req.json();
  } catch {}

  if (col === 'settings') {
    db.settings = { ...db.settings, ...body, admin: { ...db.settings.admin, ...(body.admin || {}) } };
    writeDB();
    return res(db.settings);
  }

  if (!LISTS.includes(col) || !id) return res({ error: 'Not found' }, 404);
  const idx = db[col].findIndex((x) => x.id === id);
  if (idx < 0) return res({ error: 'Not found' }, 404);

  if (col === 'orders' && body.status && body.status !== db[col][idx].status) {
    body.timeline = { ...(db[col][idx].timeline || {}), [body.status]: Date.now() };
  }
  db[col][idx] = { ...db[col][idx], ...body };
  writeDB();
  return res(db[col][idx]);
}

export async function DELETE(req, { params }) {
  const db = readDB();
  const [col, id] = params.slug || [];
  if (!LISTS.includes(col) || !id) return res({ error: 'Not found' }, 404);
  db[col] = db[col].filter((x) => x.id !== id);
  writeDB();
  return res({ ok: true });
}
