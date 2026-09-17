const P = {
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9 21v-6h6v6" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  cart: <><circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" /><path d="M3 4h2l2.6 12h10.2l2.2-8H6" /></>,
  receipt: <><path d="M6 2h12v20l-2-1.5L14 22l-2-1.5L10 22l-2-1.5L6 22V2z" /><path d="M9 7h6M9 11h6M9 15h4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-5.5 8-5.5S18.5 17 20 21" /></>,
  bell: <><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 19a2 2 0 0 0 4 0" /></>,
  heart: <path d="M12 20.5S4 15 4 9.5A4.5 4.5 0 0 1 12 6.6a4.5 4.5 0 0 1 8 2.9c0 5.5-8 11-8 11z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  back: <path d="M19 12H5m6-7-7 7 7 7" />,
  chevR: <path d="m9 6 6 6-6 6" />,
  chevL: <path d="m15 6-6 6 6 6" />,
  phone: <path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />,
  gear: <><circle cx="12" cy="12" r="3.2" /><path d="M12 2.5v3M12 18.5v3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M2.5 12h3M18.5 12h3M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></>,
  pin: <><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></>,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  bike: <><circle cx="6" cy="17" r="3.4" /><circle cx="18" cy="17" r="3.4" /><path d="M6 17h5l2.5-6H17M13 6h2.5L18 17" /><path d="M9 11h4" /></>,
  box: <><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></>,
  edit: <><path d="M4 20h4L20 8l-4-4L4 16v4z" /><path d="m13.5 6.5 4 4" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" /><path d="M10 11v6M14 11v6" /></>,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  cash: <><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6 9.5h.01M18 14.5h.01" /></>,
  bank: <><path d="M3 9.5 12 4l9 5.5H3z" /><path d="M5 10v8M9.7 10v8M14.3 10v8M19 10v8M3 18h18v2.5H3z" /></>,
  wallet: <><path d="M3 7a2 2 0 0 1 2-2h14v3" /><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="16.5" cy="13.5" r="1.2" /></>,
  flame: <path d="M12 2.5s6 5 6 11a6 6 0 0 1-12 0c0-2.5 1.2-4.6 2.6-6.4.5 1.4 1.4 2.4 2.4 2.9-.4-2.6.2-5.4 1-7.5z" />,
  users: <><circle cx="9" cy="8.5" r="3.5" /><path d="M2.5 20c1.2-3.5 4-5 6.5-5s5.3 1.5 6.5 5" /><circle cx="17" cy="9.5" r="2.8" /><path d="M16 15.2c2.3.2 4.5 1.6 5.5 4.3" /></>,
  chart: <><path d="M4 20V4" /><path d="M4 20h16" /><path d="M8.5 16v-5M13 16V7.5M17.5 16v-3" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  utensils: <><path d="M7 2.5v8M4.5 2.5V8a2.5 2.5 0 0 0 5 0V2.5" /><path d="M7 10.5v11" /><path d="M17 2.5c-2 2.5-2.5 6-2.5 8.5 0 1.5 1 2.5 2.5 2.5v8" /></>,
  sparkle: <path d="M12 3l1.9 5.6L20 10l-6.1 1.4L12 17l-1.9-5.6L4 10l6.1-1.4L12 3z" />,
};

export function Icon({ name, className = 'w-5 h-5', strokeWidth = 1.8, fill = 'none' }) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {P[name] || null}
    </svg>
  );
}

export function Star({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.8l2.8 6 6.6.7-4.9 4.4 1.4 6.5L12 17l-5.9 3.4 1.4-6.5-4.9-4.4 6.6-.7 2.8-6z" />
    </svg>
  );
}

export function LogoMark({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="none" stroke="#E3B94F" strokeWidth="1.6" strokeLinecap="round">
        <path d="M24 6c2 4 6 5 6 9a6 6 0 0 1-12 0c0-4 4-5 6-9z" />
        <path d="M12 16c1.4 2.6 4 3.2 4 6a4 4 0 0 1-8 0c0-2.8 2.6-3.4 4-6z" />
        <path d="M36 16c1.4 2.6 4 3.2 4 6a4 4 0 0 1-8 0c0-2.8 2.6-3.4 4-6z" />
        <path d="M10 34h28M14 39h20" />
        <path d="M16 30c1-2.5 4-4 8-4s7 1.5 8 4" />
      </g>
    </svg>
  );
}
