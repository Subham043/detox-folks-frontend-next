import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import ProductDetailCard from "./ProductDetailCard";

export default async function DetailSection({ params }: { params: { slug: string } }) {
   
    return <>
        <Breadcrumb name="Products" />
        <ProductDetailCard slug={params.slug} />
    </>
}