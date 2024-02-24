"use client";

import CartProvider from "./context/CartProvider";
import QueryProviders from "./home/QueryProviders";
import { SessionProvider } from "next-auth/react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
        <QueryProviders>
            <CartProvider>
              {children}
            </CartProvider>
        </QueryProviders>
    </SessionProvider>
  );
}
