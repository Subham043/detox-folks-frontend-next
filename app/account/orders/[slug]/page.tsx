import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import OrderDetail from "./_components/OrderDetail";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'ParcelCounter | Order',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

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