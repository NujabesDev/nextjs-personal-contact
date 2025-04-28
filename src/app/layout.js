export const metadata = {
  title: "Matthew's Website",
  description: "Personal contact website by Matthew Witkowski",
  themeColor: '#131313',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}