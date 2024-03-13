import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import OrderDetailLoading from "./_components/OrderDetailLoading";

export default function Loading() {
    return <>
        <Breadcrumb name={'Order #'} />
        <OrderDetailLoading />
    </>
}