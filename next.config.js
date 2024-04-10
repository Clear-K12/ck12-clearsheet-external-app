/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
    domains:['assets.underwatermath.com','app.underwatermath.com', 'uwm.cleark12.com','ecgdevstorage.blob.core.windows.net','ecgprodstorage.blob.core.windows.net','ecgcmsstorage.blob.core.windows.net']},
  experimental: {
    forceSwcTransforms: true,
  },
}
