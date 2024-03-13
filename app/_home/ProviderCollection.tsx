"use client";

import { SessionProvider } from "next-auth/react";
import QueryProviders from "./QueryProviders";
import CartProvider from "../_libs/context/CartProvider";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProviderCollection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <ProgressBar
        height="4px"
        color="#a8a8a8"
        options={{ showSpinner: true }}
        shallowRouting
      />
    <SessionProvider>
        <QueryProviders>
            <CartProvider>
              {children}
            </CartProvider>
        </QueryProviders>
    </SessionProvider>
    </>
  );
}
