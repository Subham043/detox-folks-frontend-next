"use client";
import { SessionProvider } from "next-auth/react";
import ProviderCollection from "./_home/ProviderCollection";
import QueryProviders from "./_home/QueryProviders";
import CartProvider from "./_libs/context/CartProvider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ProviderCollection>
    //   {children}
    // </ProviderCollection>
    <SessionProvider>
        <QueryProviders>
            <CartProvider>
              {children}
            </CartProvider>
        </QueryProviders>
    </SessionProvider>
  );
}
