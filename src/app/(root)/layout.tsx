import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer";
import { BasketSyncer } from "@/components/basket/basket-syncer";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "Next Ceramic",
    template: "%s | Next Ceramic",
  },
  description: "The best ceramic on the world",
  keywords: ["ceramic", "design", "home"],
  authors: {
    name: "welcome to it",
    url: "",
  },
  openGraph: {
    title: "Next Ceramic",
    description: "The best ceramic on the world",
    images: [{
      url: "",
      width: 1200,
      height: 800,
      alt: ""
    }]
  },
  twitter: {
    title: "Next Ceramic",
    description: "The best ceramic on the world",
    images: [{
      url: "",
      width: 1200,
      height: 800,
      alt: ""
    }]
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
