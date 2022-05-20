const path = require('path');
const withPWA = require('next-pwa');
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: '@import "~@styles/variables.scss";',
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    // TODO: Remove/Replace once proper backend URL is available
    domains: ['picsum.photos'],
  },
  i18n,
});
