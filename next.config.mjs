/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    
    // Images configuration (uncomment if needed)
    // images: {
    //   domains: ['your-domain.com'],
    //   remotePatterns: [
    //     {
    //       protocol: 'https',
    //       hostname: 'example.com',
    //       pathname: '/images/**',
    //     },
    //   ],
    // },
    
    // Environment variables are better handled with .env.local files
    // This is only needed for server-side variables you want exposed to the client
    env: {
      NEXT_PUBLIC_MAILCHIMP_FORM_URL: process.env.NEXT_PUBLIC_MAILCHIMP_FORM_URL || 'https://mattheww.us13.list-manage.com/subscribe/post?u=9911ecda9191c30d933073fa2&amp;id=383d9bb83d&amp;f_id=00be48e1f0'
    }
  };
  
