/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 output: 'export',
  trailingSlash: true,
  images: {
    loader: 'imgix',
    path: '/',
  }
}

module.exports = nextConfig
