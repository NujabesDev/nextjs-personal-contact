import './globals.css';

// Metadata API for Next.js 15
export const metadata = {
  title: "Matthew's Website",
  description: "Personal contact website by Matthew Witkowski",
  themeColor: '#131313',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/gtea.webp',
    apple: '/gtea.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}