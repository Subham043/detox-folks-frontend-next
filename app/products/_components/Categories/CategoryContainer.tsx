"use client";

import { useEffect, useState } from "react";
import Categories from "./Categories";
import { Dialog, DialogContent, DialogTrigger } from "@/app/_libs/components/ui/dialog";
import { usePathname, useSearchParams } from "next/navigation";
import { MdCategory } from "react-icons/md";

export default function CategoryContainer() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const searchParam = useSearchParams();

    const closeSidebar = () => setIsOpen(false)

    useEffect(() => closeSidebar(), [pathname, searchParam]);
    
    return <>
        <div className="w-full hidden lg:block">
            <Categories />
        </div>
        <div className="w-full block lg:hidden">
            <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
                <DialogTrigger asChild>
                    <button className=" text-sm md:text-base py-1 px-3 pr-3 bg-black text-white text-center font-semibold rounded-sm transition-all hover:bg-gray-600 fixed bottom-5 -right-1 z-10 flex gap-1 items-center" onClick={()=>setIsOpen(true)}><MdCategory /> Categories</button>
                </DialogTrigger>
                <DialogContent className="p-0">
                    <div className=" w-full">
                        <Categories />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </>
}