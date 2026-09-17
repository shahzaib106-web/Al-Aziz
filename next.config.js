/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  experimental: {
    // Disable the client-side router cache so navigations always resolve
    // against the current deployment instead of stale chunk references
    // (fixes "Application error" when clicking tabs after a new deploy).
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};
