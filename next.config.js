/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // This allows serving local files directly
  },
  // Add static file serving configuration
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|jpg|jpeg|png|gif)$/i,
      type: 'asset/resource',
    })
    return config
  },
  // Configure external directory for static files
  async headers() {
    return [
      {
        source: '/api/media/:path*',
        headers: [
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ]
  },
  // Add this configuration
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: '/api/media/:path*',
      },
    ]
  },
  // Remove any rewrites or redirects
}

module.exports = nextConfig 