import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import ProductSection from "../_components/ProductSection";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export const metadata:Metadata = {
  title: 'ParcelCounter | Special Products',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

async function getData({slug}:{ slug: string }) {

    switch (slug) {
        case 'is_featured':
            return {
                title: "Exclusive Products",
                slug: "is_featured",
            }
        case 'is_new':
            return {
                title: "Eco-Friendly Products",
                slug: "is_new",
            }
        case 'is_on_sale':
            return {
                title: "On Demand Products",
                slug: "is_on_sale",
            }
    
        default:
            notFound()
    }
}

export default async function SpecialProduct({ params }: { params: { slug: string } }) {
    const data = await getData({slug: params.slug})
    return <>
        <Breadcrumb name={data.title} />
        <ProductSection slug={data.slug} />
    </>
}