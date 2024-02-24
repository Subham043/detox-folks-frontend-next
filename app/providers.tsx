"use client";

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
            {children}
        </QueryProviders>
    </SessionProvider>
  );
}
