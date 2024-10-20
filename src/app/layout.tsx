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

        {/* Thêm ToastContainer ở đây */}
        <ToastContainer
          position="top-right" // Vị trí hiển thị của toast
          autoClose={5000} // Thời gian tự động đóng (ms)
          hideProgressBar={false} // Ẩn thanh tiến trình
          closeOnClick // Đóng khi nhấp vào
          pauseOnHover // Tạm dừng khi di chuột
          draggable // Cho phép kéo toast
          pauseOnFocusLoss // Tạm dừng khi mất tiêu điểm
        />
      </body>
    </html>
  );
}
