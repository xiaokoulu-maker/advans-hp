/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 旧静的HTMLのURLからNextのクリーンURLへ 301 リダイレクト（SEO継承）
  async redirects() {
    return [
      { source: '/index.html', destination: '/', statusCode: 301 },
      { source: '/company.html', destination: '/company', statusCode: 301 },
      { source: '/contact.html', destination: '/contact', statusCode: 301 },
      { source: '/services/web.html', destination: '/services/web', statusCode: 301 },
      { source: '/services/meo.html', destination: '/services/meo', statusCode: 301 },
      { source: '/services/aiblog.html', destination: '/services/aiblog', statusCode: 301 },
      { source: '/services/ads.html', destination: '/services/ads', statusCode: 301 },
      { source: '/services/ai.html', destination: '/services/ai', statusCode: 301 },
      { source: '/services/recruit.html', destination: '/services/recruit', statusCode: 301 },
    ];
  },
};

export default nextConfig;
