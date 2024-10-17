import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { IngredientsProvider } from "../context/ingredients_context";
import { OccasionProvider } from "../context/occasion_context";
import { SessionProvider } from "next-auth/react";

import Header from "../components/header";
import Footer from "../components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MealHunt",
  description: "Welcome to MealHunt!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <IngredientsProvider>
            <OccasionProvider>
              <Header />
              {children}
              <Footer />
            </OccasionProvider>
          </IngredientsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
