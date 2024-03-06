import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import { page } from '../_libs/utils/routes/pages';
import { authOptions } from '../_libs/utils/contants/authOptions';

export default async function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getServerSession(authOptions)
    if(session){
      redirect(page.home)
    }
    return (
      <>
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex justify-center items-center">
                    <div className=" w-full lg:w-1/3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }