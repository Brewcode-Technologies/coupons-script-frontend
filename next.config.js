/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'coupons-script-backend-production.up.railway.app',
      'res.cloudinary.com',
      'images.unsplash.com',
    ],
  },
}

module.exports = nextConfig
