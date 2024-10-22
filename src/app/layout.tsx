import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "primereact/resources/themes/saga-orange/theme.css";
import "react-toastify/dist/ReactToastify.css";

import { PrimeReactProvider } from "primereact/api";
import { IngredientsProvider } from "../context/ingredients_context";
import { OccasionProvider } from "../context/occasion_context";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bonheur+Royale&display=swap"
          rel="stylesheet"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Cormorant:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrimeReactProvider>
          <SessionProvider>
            <IngredientsProvider>
              <OccasionProvider>
                <Header />
                {children}
                <Footer />
              </OccasionProvider>
            </IngredientsProvider>
          </SessionProvider>
        </PrimeReactProvider>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
        />
      </body>
    </html>
  );
}
