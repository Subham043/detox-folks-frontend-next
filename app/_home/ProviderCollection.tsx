"use client";

import { SessionProvider } from "next-auth/react";
import QueryProviders from "./QueryProviders";
import CartProvider from "../_libs/context/CartProvider";

export default function ProviderCollection({
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
