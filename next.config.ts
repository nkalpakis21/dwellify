import type { NextConfig } from 'next';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yourdomain.com'],
  },
}

module.exports = nextConfig

