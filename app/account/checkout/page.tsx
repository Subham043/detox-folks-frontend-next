import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import CheckoutOrder from "./_components/CheckoutOrder";
import dynamic from 'next/dynamic';
const MultiStepCheckout = dynamic(() => import('./_components/MultiStepCheckout'), {
    ssr: false,
});

export default function Checkout() {
    return <>
        <Breadcrumb name="Checkout" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start">
                    <div className=" w-full mb-5 lg:mb-0 lg:w-[68%] bg-white rounded-md box-border">
                        <MultiStepCheckout />
                    </div>
                    <div className=" w-full lg:w-[30%] px-5 py-5 bg-white rounded-md box-border sticky top-10">
                        <CheckoutOrder />
                    </div>
                </div>
            </div>
        </div>
    </>
}