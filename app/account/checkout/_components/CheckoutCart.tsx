import { useCartProvider } from "@/app/_libs/context/CartProvider";
import CheckoutCartTableCard from "./CheckoutCartTableCard";

export default function CheckoutCart() {
    const {cart} = useCartProvider()

    return <>
        <h3 className=" text-base md:text-xl text-[#8c6d52] font-semibold mb-5">Order Summary</h3>
        <div className="flex flex-col overflow-x-auto lg:overflow-x-hidden">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-left text-sm font-light">
                            <thead className="border bg-[#8c6d52] font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                <tr>
                                    <th scope="col" className="border-r px-6 py-4">Product</th>
                                    <th scope="col" className="border-r px-6 py-4 text-center">Quantity</th>
                                    <th scope="col" className="border-r px-6 py-4 text-center">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.cart.length>0 ? cart.cart.map((item,i) => <CheckoutCartTableCard {...item} key={i} />) :
                                    <tr className=" border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap border-r px-6 py-4 text-center" colSpan={3}>
                                           <p>No items are there in cart. Kindly add one!</p>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}