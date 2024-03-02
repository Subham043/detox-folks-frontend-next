import Breadcrumb from "../_libs/components/Breadcrumb";
import MainSection from "./_components/Sections/MainSection";

export default function Products({
    searchParams
  }: {
    searchParams?: { 
        category: string | undefined,
        category_id: string | undefined,
        sub_category: string | undefined,
        sub_category_id: string | undefined,
    };
  }) {
    return <>
        <Breadcrumb name="Products" />
        <MainSection searchParams={searchParams} />
    </>
}