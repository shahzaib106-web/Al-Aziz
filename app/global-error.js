'use client';

/* Root-level error boundary (required to replace Next's generic
   "Application error: a client-side exception has occurred" screen).
   Must render its own <html>/<body>. */

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#F6EFE0', fontFamily: 'Poppins, sans-serif' }}>
        <div dir="ltr" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#FFFBF2', border: '1px solid #E8DCC3', borderRadius: 16, padding: 32, maxWidth: 360, textAlign: 'center', boxShadow: '0 1px 3px rgba(90,60,20,0.10)' }}>
            <div style={{ fontSize: 28 }}>⚠️</div>
            <h2 style={{ margin: '12px 0 6px', fontSize: 16, fontWeight: 800, color: '#26211C' }}>Something went wrong</h2>
            <p style={{ margin: 0, fontSize: 13, color: '#8B8272' }}>
              A temporary error occurred{error?.message ? `: ${error.message}` : '.'} Reloading fixes it in almost all cases.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
              <button
                onClick={() => {
                  try {
                    reset();
                  } catch {
                    window.location.reload();
                  }
                }}
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
      </body>
    </html>
  );
}
