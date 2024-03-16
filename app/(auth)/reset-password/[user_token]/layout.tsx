import { Metadata } from "next";


export const metadata:Metadata = {
  title: 'ParcelCounter | Reset Password',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default async function ForgotPasswordLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        {children}
      </>
    );
  }