"use client";

import { page_routes } from "@/app/utils/page_routes";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/useToast";
import { useState } from "react";

export default function HeaderLoginButton() {
    const {status, data} = useSession();
    const router = useRouter();
    const { toastSuccess } = useToast();
    const [loading, setLoading] = useState(false);
    const onLogout = async (event: any) => {
        event.preventDefault()
        setLoading(true);
        try {
            await signOut({
                redirect: false,
                callbackUrl: page_routes.auth.login
            });
            router.push(page_routes.auth.login);
            toastSuccess("Logged Out Successfully.");
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return <>
        {
            status==='unauthenticated' ? 
            <Link href={page_routes.auth.login} className="flex flex-wrap items-center gap-2">
                <Image
                    src="/user.png"
                    alt="Vercel Logo"
                    className=" rounded-full"
                    width={40}
                    height={40}
                    priority
                />
                <p>
                    Login
                </p>
            </Link> :
            <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-wrap items-center gap-2">
                    <Image
                        src="/user.png"
                        alt="Vercel Logo"
                        className=" rounded-full"
                        width={40}
                        height={40}
                        priority
                    />
                    <p>
                        {data?.user.name}
                    </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem><Link href={page_routes.account.profile} className="w-full">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={page_routes.account.profile} className="w-full">Orders</Link></DropdownMenuItem>
                    <DropdownMenuItem><button onClick={onLogout} className="w-full text-left" disabled={loading}>Logout</button></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        }
    </>
}