import "./globals.css";

export const metadata = {
  title: "Ayush | Official Links",
  description: "My premium link portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
