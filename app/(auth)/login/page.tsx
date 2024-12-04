"use client";

import Link from "next/link";
import { page } from "@/app/_libs/utils/routes/pages";
import LoginWithEmail from "./_components/LoginWithEmail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_libs/components/ui/tabs";
import LoginWithPhone from "./_components/LoginWithPhone";

export default function Login() {
    return <>
        <div className="rounded-md bg-white w-full py-3 border border-gray-300">
            <h4 className="text-center text-2xl px-5 font-bold mb-2">Welcome!</h4>
            <p className="text-center text-gray-500 px-5 text-md mb-5">Use Your Credentials To Access</p>
            <Tabs defaultValue="phone" className="w-full">
                <TabsList className="w-full border-[0.5px] border-solid border-[#b8a497] bg-[#b8a497] text-white border-b-0 rounded-none">
                    <TabsTrigger className="w-1/2" value="phone">Login With Phone</TabsTrigger>
                    <TabsTrigger className="w-1/2" value="email">Login With Email</TabsTrigger>
                </TabsList>
                <TabsContent className="mt-0" value="email">
                    <div className="w-full rounded-b-sm p-3 px-5">
                        <LoginWithEmail />
                    </div>
                </TabsContent>
                <TabsContent className="mt-0" value="phone">
                    <div className="w-full rounded-b-sm p-3 px-5">
                        <LoginWithPhone />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
        <div className="rounded-md bg-white w-full px-5 py-4 border border-gray-300 mt-3">
            <div className="text-center">
                <Link href={page.auth.forgot_password} className="text-center text-gray-500 text-md">Forgot Your Password? <span className=" font-bold text-[#8c6d52]">Reset Here</span></Link><br/>
                <Link href={page.auth.register} className="text-center text-gray-500 text-md">Don&apos;t Have Any Account? <span className=" font-bold text-[#8c6d52]">Register Here</span></Link>
            </div>
        </div>
    </> 
}