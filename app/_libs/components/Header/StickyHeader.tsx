"use client";

import { useEffect, useRef, useState } from "react";
import SearchDialog from "../SearchDialog";
import HeaderCartButton from "./HeaderCartButton";
import HeaderLoginButton from "./HeaderLoginButton";

export default function StickyHeader() {
    const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
    const headerRef = useRef<HTMLDivElement>(null);

    // handle scroll event
    const handleScroll = (elTopOffset:number, elHeight:number) => {
        if (window.pageYOffset > (elTopOffset + elHeight)) {
            setSticky({ isSticky: true, offset: elHeight });
        }  
        if ((window.pageYOffset) < (elTopOffset + elHeight + 142)) {
            setSticky({ isSticky: false, offset: 0 });
        }
    };

    // add/remove scroll event listener
    useEffect(() => {
        let header = headerRef.current!.getBoundingClientRect();
        const handleScrollEvent = () => {
            handleScroll(header.top, header.height)
        }

        window.addEventListener('scroll', handleScrollEvent);

        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

    return <div className=" w-full">
        <div className={`w-full ${sticky.isSticky ? ' fixed top-0 bg-white z-50 block shadow-md sticky-header-animation' : 'static hidden'}`} ref={headerRef}>
            <div className="container mx-auto">
                <div className="w-full flex-wrap justify-between items-center gap-12 py-3 hidden lg:flex">
                    <SearchDialog />
                    <div className="flex flex-wrap items-center gap-5">
                        <HeaderLoginButton />
                        <HeaderCartButton />
                    </div>
                </div>
                <div className="w-full flex-wrap justify-between items-center gap-3 py-3 flex lg:hidden">
                    <SearchDialog />
                    <HeaderCartButton />
                </div>
            </div>
        </div>
    </div>
}