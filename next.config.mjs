/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  env: {
    NEXTAUTH_URL: 'https://iqmath.uz'
  },
  images: {
    domains: ['backend.iqmath.uz'] // Tashqi rasm domenini qo‘shamiz
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  swcMinify: true
}

export default nextConfig
