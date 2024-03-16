import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import OrderTable from "./_components/OrderTable";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'ParcelCounter | Orders',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default function Orders() {
    return <>
        <Breadcrumb name="Orders" />
        <OrderTable />
    </>
}