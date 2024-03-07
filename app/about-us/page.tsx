import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import AboutHydration from "./_components/AboutHydration";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export default async function About() {

    return <>
        <Breadcrumb name="About Us" />
        <AboutHydration />
    </>
}