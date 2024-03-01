import Breadcrumb from "../_libs/components/Breadcrumb";
import MainSection from "./_components/MainSection";

export default function Products({
    searchParams
  }: {
    searchParams?: { 
        category: string | undefined 
    };
  }) {
    return <>
        <Breadcrumb name="Products" />
        <MainSection searchParams={searchParams} />
    </>
}