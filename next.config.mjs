/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['ffmpeg-static', 'fluent-ffmpeg']
  },
  webpack: (config) => {
    config.externals.push({
      'ffmpeg-static': 'commonjs ffmpeg-static',
      'fluent-ffmpeg': 'commonjs fluent-ffmpeg'
    });
    return config;
  }
};

export default nextConfig;
