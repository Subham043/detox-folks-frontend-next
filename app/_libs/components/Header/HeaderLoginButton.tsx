"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_libs/hooks/useToast";
import { useState } from "react";
import { page } from "../../utils/routes/pages";

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
    return <>
        {
            status==='unauthenticated' ? 
            <Link href={page.auth.login} className="flex flex-wrap items-center gap-2">
                <Image
                    src="/user.png"
                    alt="Parcelcounter user avatar"
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
                        alt="Parcelcounter user avatar"
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
                    <DropdownMenuItem><Link href={page.account.profile} className="w-full">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={page.account.orders} className="w-full">Orders</Link></DropdownMenuItem>
                    <DropdownMenuItem><button onClick={onLogout} className="w-full text-left" disabled={loading}>Logout</button></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        }
    </>
}