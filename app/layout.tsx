"use client";

import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import QueryProviders from "./home/QueryProviders";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
      <SessionProvider>
        <QueryProviders>
          <Header />
          <div className="w-full bg-gray-100">
              {children}
          </div>
          <Footer />
        </QueryProviders>
      </SessionProvider>
      <ToastContainer />
      </body>
    </html>
  );
}
