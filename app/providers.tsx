"use client";

import CartProvider from "./_libs/context/CartProvider";
import QueryProviders from "./_home/QueryProviders";
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
