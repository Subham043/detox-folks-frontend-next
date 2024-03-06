import Image from "next/image";
import Link from "next/link";
import SearchDialog from "../SearchDialog";
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderCartButton from "./HeaderCartButton";
import { page } from "../../utils/routes/pages";
import MenuDrawer from "./MenuDrawer";

export default function LogoHeader() {
    return <div className="container mx-auto border-b border-gray-200 border-solid">
        <div className="w-full hidden lg:flex flex-wrap justify-between items-center gap-12 py-3">
            <div className="flex flex-1 flex-wrap items-center gap-12">
                <Link href={page.home}>
                    <Image
                        src="https://server-api.parcelcounter.in/storage/general_website_settings_logo/jptM6LCFtgFNp4Z4qu7l2YIXKSJPrmg8Gwz5MbdO.png"
                        alt="Vercel Logo"
                        width={150}
                        height={150}
                        priority
                    />
                </Link>
                <SearchDialog />
            </div>
            <div className="flex flex-wrap items-center gap-5">
                <HeaderLoginButton />
                <HeaderCartButton />
            </div>
        </div>
        <div className="w-full flex flex-wrap justify-between items-center gap-12 py-3 lg:hidden">
            <div className="flex flex-1 flex-wrap justify-between items-center gap-3">
                <Link href={page.home}>
                    <Image
                        src="https://server-api.parcelcounter.in/storage/general_website_settings_logo/jptM6LCFtgFNp4Z4qu7l2YIXKSJPrmg8Gwz5MbdO.png"
                        alt="Vercel Logo"
                        width={150}
                        height={150}
                        priority
                    />
                </Link>
                <MenuDrawer />
            </div>
        </div>
    </div>
}