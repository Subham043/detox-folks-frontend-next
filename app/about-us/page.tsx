import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import AboutHydration from "./_components/AboutHydration";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export const metadata:Metadata = {
  title: 'ParcelCounter | About Us',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default async function About() {

    return <>
        <Breadcrumb name="About Us" />
        <AboutHydration />
    </>
}