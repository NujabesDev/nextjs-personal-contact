/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enable static image imports
  images: {
    domains: [],
    // This allows using Image component with static imports
    remotePatterns: [],
  },
  
  // We'll handle environment variables via .env.local
  // This fallback helps during development
  env: {
    NEXT_PUBLIC_MAILCHIMP_FORM_URL: process.env.NEXT_PUBLIC_MAILCHIMP_FORM_URL || 'https://mattheww.us13.list-manage.com/subscribe/post?u=9911ecda9191c30d933073fa2&amp;id=383d9bb83d&amp;f_id=00be48e1f0'
  },
  
  // Add this to handle SVG files
  webpack(config) {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
};

export default nextConfig;