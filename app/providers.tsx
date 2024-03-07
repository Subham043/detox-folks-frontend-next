import ProviderCollection from "./_home/ProviderCollection";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProviderCollection>
      {children}
    </ProviderCollection>
  );
}
