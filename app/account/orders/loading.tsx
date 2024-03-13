import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import OrderTableLoading from "./_components/OrderTableLoading";

export default function Loading() {
    return <>
        <Breadcrumb name="Orders" />
        <OrderTableLoading />
    </>
}