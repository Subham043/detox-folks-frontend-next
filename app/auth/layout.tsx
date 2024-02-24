import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { page_routes } from '../utils/page_routes';

export default async function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getServerSession(authOptions)
    if(session){
      redirect(page_routes.home)
    }
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