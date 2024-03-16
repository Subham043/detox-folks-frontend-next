import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import OrderDetail from "./_components/OrderDetail";

export default function OrderDetailMain({ params, searchParams }: { 
    params: { slug: number }, 
    searchParams?: { 
        order_placed: string | undefined,
    } 
}) {
    return <>
        <Breadcrumb name={'Order #'+params.slug} />
        <OrderDetail slug={params.slug} searchParams={searchParams} />
    </>
}