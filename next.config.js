/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '/brunch-vip',
  images: {
    formats: ['image/avif', 'image/webp'],
    // Se usar imagens remotas, adicione "domains" aqui. Público local não precisa.
  },
}

module.exports = nextConfig

