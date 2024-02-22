export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex justify-center items-center">
                    <div className=" w-1/3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }