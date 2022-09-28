// eslint-disable
/** @type {import('next').NextConfig} */
const withPwa = require('next-pwa');

const nextConfig = withPwa({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    dest: 'public',
  },
});

module.exports = nextConfig;
