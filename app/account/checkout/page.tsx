import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import CheckoutOrder from "./_components/CheckoutOrder";
import dynamic from 'next/dynamic';
const Spinner = dynamic(() => import('@/app/_libs/components/Spinner'));
import { Metadata } from "next";
const MultiStepCheckout = dynamic(() => import('./_components/MultiStepCheckout'), {
    ssr: false,
    loading: () => <div className="w-full m-auto text-center"><Spinner type="default" color="black" /></div>
});

export const metadata:Metadata = {
  title: 'ParcelCounter | Checkout',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default function Checkout() {
    return <>
        <Breadcrumb name="Checkout" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start">
                    <div className=" w-full mb-5 lg:mb-0 lg:w-[68%] bg-white rounded-md box-border">
                        <MultiStepCheckout />
                    </div>
                    <div className=" w-full lg:w-[30%] px-3 lg:px-5 py-3 lg:py-5 bg-white rounded-md box-border sticky top-10">
                        <CheckoutOrder />
                    </div>
                </div>
            </div>
        </div>
    </>
}