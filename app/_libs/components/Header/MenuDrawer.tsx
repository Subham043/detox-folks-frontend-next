"use client";
import { IoMdMenu } from "react-icons/io";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { page } from "../../utils/routes/pages";
import Image from "next/image";
import { FaClipboardList, FaHome, FaInfoCircle, FaUserCircle } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { LiaBookSolid } from "react-icons/lia";
import { FaHeadphones } from "react-icons/fa6";
import { IoBagCheckOutline, IoLogIn, IoLogOutSharp } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../../hooks/useToast";
import { useEffect, useState } from "react";

export default function MenuDrawer(){
    const pathname = usePathname();
	const searchParams = useSearchParams();
    const {status} = useSession();
    const router = useRouter();
    const { toastSuccess } = useToast();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const closeSidebar = () => setIsOpen(false)
    const onLogout = async (event: any) => {
        event.preventDefault()
        setLoading(true);
        try {
            await signOut({
                redirect: false,
                callbackUrl: page.auth.login
            });
            router.push(page.auth.login);
            toastSuccess("Logged Out Successfully.");
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => closeSidebar(), [pathname, searchParams]);
    return <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
            <button className="bg-black text-white px-3 py-2 rounded-sm"><IoMdMenu className="text-xl" /></button>
        </SheetTrigger>
        <SheetContent className="p-0" side='left'>
            <SheetHeader>
                <div className="w-full text-center border-b border-dashed pt-3 pb-5 border-gray-300">
                    <Link href={page.home} className="w-full">
                        <Image
                            src="/logo.webp"
                            alt="Parcelcounter Logo"
                            width={150}
                            height={150}
                            className="mx-auto"
                        />
                    </Link>
                </div>
                <div className="w-full pt-5 text-left px-3">
                    <ul>
                        <li className="mb-4"><Link href={page.home} className="flex items-center gap-3 text-lg font-semibold text-black"><FaHome /> Home</Link></li>
                        <li className="mb-4"><Link href={page.about} className="flex items-center gap-3 text-lg font-semibold text-black"><FaInfoCircle /> About Us</Link></li>
                        <li className="mb-4"><Link href={page.products} className="flex items-center gap-3 text-lg font-semibold text-black"><FiPackage /> Products</Link></li>
                        <li className="mb-4"><Link href={page.blogs} className="flex items-center gap-3 text-lg font-semibold text-black"><LiaBookSolid /> Blogs</Link></li>
                        <li className="mb-4"><Link href={page.contact} className="flex items-center gap-3 text-lg font-semibold text-black"><FaHeadphones /> Contact Us</Link></li>
                        {
                            status==='unauthenticated' ? 
                            <li className="mb-4"><Link href={page.auth.login} className="flex items-center gap-3 text-lg font-semibold text-black"><IoLogIn /> Login</Link></li> : 
                            <>
                                <li className="mb-4"><Link href={page.account.checkout} className="flex items-center gap-3 text-lg font-semibold text-black"><IoBagCheckOutline /> Checkout</Link></li>
                                <li className="mb-4"><Link href={page.account.orders} className="flex items-center gap-3 text-lg font-semibold text-black"><FaClipboardList /> Order</Link></li>
                                <li className="mb-4"><Link href={page.account.profile} className="flex items-center gap-3 text-lg font-semibold text-black"><FaUserCircle /> Profile</Link></li>
                                <li className="mb-4"><button onClick={onLogout} disabled={loading} className="flex items-center gap-3 text-lg font-semibold text-black"><IoLogOutSharp /> Logout</button></li>
                            </>
                        }
                    </ul>
                </div>
            </SheetHeader>
        </SheetContent>
  </Sheet>
}