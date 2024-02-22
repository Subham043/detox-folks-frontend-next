import CopyrightFooter from "./CopyrightFooter";
import MainFooter from "./MainFooter";
import PolicyFooter from "./PolicyFooter";

export default function Footer() {
    return <div className="w-full bg-gray-100">
        <PolicyFooter />
        <MainFooter />
        <CopyrightFooter />
    </div>
}