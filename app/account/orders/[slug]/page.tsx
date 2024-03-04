import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import OrderDetail from "./_components/OrderDetail";

export default function OrderDetailMain({ params }: { params: { slug: number } }) {
    return <>
        <Breadcrumb name={'Order #'+params.slug} />
        <OrderDetail slug={params.slug} />
    </>
}