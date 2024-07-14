import CopyrightFooter from "./CopyrightFooter";
import MainFooter from "./MainFooter";
import PolicyFooter from "./PolicyFooter";

export default function Footer() {
    return <div className="w-full bg-[#ede1d736]">
        <PolicyFooter />
        <MainFooter />
        <CopyrightFooter />
    </div>
}