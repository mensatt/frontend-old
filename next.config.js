const path = require('path');
const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: '@import "~@styles/variables.scss";',
  },
  images: {
    domains: ['dev-api.mensatt.de', 'api.mensatt.de'],
    loader: 'custom',
  },
  i18n,
});
