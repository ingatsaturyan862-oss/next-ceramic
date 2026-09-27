import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer";
import { BasketSyncer } from "@/components/basket/basket-syncer";
import { Metadata } from "next";

const baseUrl = "https://next-ceramic-seven.vercel.app"


export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: {
    default: "Next Ceramic",
    template: "%s | Next Ceramic",
  },
  description: "The best ceramic on the world",
  keywords: ["ceramic", "design", "home"],
  authors: {
    name: "Next Ceramic",
    url: "",
  },
  openGraph: {  //ervuma hxman nkar@,vernagir@
    title: "Next Ceramic",
    description: "The best ceramic on the world",
    url: baseUrl,
    siteName: "Next Ceramic",
    images: [
      {
        url: baseUrl + "/og.jpg",
        width: 1200,
        height: 800,
        alt: ""
      },
    ]
  },
  twitter: {
    title: "Next Ceramic",
    description: "The best ceramic on the world",
    images: [
      {
        url: baseUrl + "/og.jpg",
        width: 1200,
        height: 800,
        alt: ""
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BasketSyncer />
    </>
  );
}
