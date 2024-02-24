import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import Providers from "./providers";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metaData:Metadata = {
  title: 'ParcelCounter'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Providers>
            <Header />
            <div className="w-full bg-gray-100">
                {children}
            </div>
            <Footer />
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
