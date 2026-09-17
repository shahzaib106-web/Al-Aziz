'use client';
import { useEffect } from 'react';

/* Route-level error boundary.
   Catches any client-side exception during rendering/navigation — including
   stale-chunk failures after a new deployment — and recovers automatically
   (one guarded reload). For non-deployment errors it shows a clean card with
   a retry button instead of Next's generic crash screen. */

const KEY = 'agh_err_boundary_ts';

function looksLikeDeployError(err) {
  const msg = `${err?.name || ''} ${err?.message || ''}`;
  return /chunk|loading css|failed to load|load failed|hydration|invalid hook|Minified React/i.test(msg);
}

export default function RouteError({ error, reset }) {
  useEffect(() => {
    if (looksLikeDeployError(error)) {
      const now = Date.now();
      const last = Number(sessionStorage.getItem(KEY) || 0);
      if (now - last > 10000) {
        sessionStorage.setItem(KEY, String(now));
        window.location.reload();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div dir="ltr" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ background: '#FFFBF2', border: '1px solid #E8DCC3', borderRadius: 16, padding: 32, maxWidth: 360, textAlign: 'center', boxShadow: '0 1px 3px rgba(90,60,20,0.10)' }}>
        <div style={{ fontSize: 28 }}>⚠️</div>
        <h2 style={{ margin: '12px 0 6px', fontSize: 16, fontWeight: 800, color: '#26211C' }}>Something went wrong</h2>
        <p style={{ margin: 0, fontSize: 13, color: '#8B8272' }}>The page hit a temporary error. Try again — it usually resolves instantly.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
          <button
            onClick={() => reset()}
            style={{ height: 42, padding: '0 20px', borderRadius: 12, border: '1px solid #D8CCB4', background: '#fff', fontSize: 13, fontWeight: 700, color: '#26211C', cursor: 'pointer' }}
          >
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{ height: 42, padding: '0 20px', borderRadius: 12, border: 'none', background: '#9E1B1E', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  );
}
