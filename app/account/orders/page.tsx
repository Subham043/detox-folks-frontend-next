import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import OrderTable from "./_components/OrderTable";

export default function Orders() {
    return <>
        <Breadcrumb name="Orders" />
        <OrderTable />
    </>
}