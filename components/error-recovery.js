'use client';
import { useEffect } from 'react';

/* Global recovery from stale-chunk errors.
   After a new deployment (or dev-server restart), any page that is still open
   references JS/CSS chunks that no longer exist on the server. Clicking a link
   then fails with "Loading chunk … failed" / ChunkLoadError and Next.js shows
   the generic "Application error" screen. This handler detects those failures
   and reloads the page once (guarded against reload loops), so the user gets a
   seamless refresh instead of an error. */
const KEY = 'agh_chunk_reload_ts';
const LOOP_GUARD_MS = 10000;

function isChunkError(e) {
  const msg =
    (e?.message || '') +
    ' ' +
    (e?.error?.message || '') +
    ' ' +
    (e?.error?.name || '') +
    ' ' +
    (e?.reason?.message || '');
  return (
    e?.error?.name === 'ChunkLoadError' ||
    /loading chunk|load chunk|chunkload|loading css chunk|failed to load chunk/i.test(msg)
  );
}

export function ChunkErrorRecovery() {
  useEffect(() => {
    const reloadOnce = () => {
      const now = Date.now();
      const last = Number(sessionStorage.getItem(KEY) || 0);
      if (now - last < LOOP_GUARD_MS) return; // avoid reload loops
      sessionStorage.setItem(KEY, String(now));
      window.location.reload();
    };
    const onError = (e) => {
      if (isChunkError(e)) reloadOnce();
    };
    const onRejection = (e) => {
      if (isChunkError(e) || /loading chunk|chunkload/i.test(String(e?.reason?.message || ''))) reloadOnce();
    };
    // Final safety net: if Next's crash screen text ever renders, recover.
    const poll = setInterval(() => {
      const txt = document.body?.textContent || '';
      if (/Application error|client-side exception has occurred/.test(txt)) reloadOnce();
    }, 400);
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      clearInterval(poll);
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);
  return null;
}
