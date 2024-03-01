import LinkHeader from "./LinkHeader";
import LogoHeader from "./LogoHeader";
import TopHeader from "./TopHeader";

export default function Header() {
    return <div className="w-full">
        <TopHeader />
        <LogoHeader />
        <LinkHeader />
    </div>
}