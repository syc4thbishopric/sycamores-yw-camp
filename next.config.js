const withPWA = require("next-pwa")({
    dest: 'public',
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === "development"
});

module.exports = withPWA({
    env: {
        LDW_KEY: process.env.LDW_KEY,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
})