import { useCartProvider } from "@/app/_libs/context/CartProvider";
import CheckoutCartTableCard from "./CheckoutCartTableCard";

export default function CheckoutCart() {
    const {cart} = useCartProvider()

    return <>
        <div className="flex flex-col sm:overflow-x-auto md:overflow-x-hidden">
            <div className="sm:-mx-12 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-left text-sm font-light">
                            <thead className="border bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                <tr>
                                    <th scope="col" className="border-r px-6 py-4">Product</th>
                                    <th scope="col" className="border-r px-6 py-4 text-center">Quantity</th>
                                    <th scope="col" className="border-r px-6 py-4 text-center">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.cart.map((item,i) => <CheckoutCartTableCard {...item} key={i} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}