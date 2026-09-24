import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  weight: "700",
  subsets: ["latin"],
});


export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${inter.className} ${garamond.variable} h-full antialiased`}
    >
      <body className="h-full">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
