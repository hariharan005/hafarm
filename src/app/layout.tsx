import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Testimonials from "./sections/Testimonials";
import Carousel from "./components/Carousel";
import WhatsApp from "./sections/WhatsApp";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HAFarm",
  description: "Fresh, organic vegetables and fruits delivered to your table",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <Hero />
        <About />
        <Carousel />
        <WhatsApp />
        <Testimonials />
        <Footer />
        {children}
        {/* Global Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
