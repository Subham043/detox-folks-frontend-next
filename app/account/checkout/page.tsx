import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import CheckoutCart from "./_components/CheckoutCart";
import CheckoutOrder from "./_components/CheckoutOrder";

export default function Checkout() {
    return <>
        <Breadcrumb name="Checkout" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start">
                    <div className=" w-full lg:w-[68%] px-5 py-5 bg-white rounded-md box-border">
                        <h3 className=" text-xl text-black font-semibold mb-5">Your Cart</h3>
                        <CheckoutCart />
                    </div>
                    <div className=" w-full lg:w-[30%] px-5 py-5 bg-white rounded-md box-border sticky top-10">
                        <h3 className=" text-xl text-black font-semibold mb-5">Your Order</h3>
                        <CheckoutOrder />
                    </div>
                </div>
            </div>
        </div>
    </>
}