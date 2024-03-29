"use client";

import { useCartProvider } from "@/app/_libs/context/CartProvider"

export default function CheckoutOrder() {
    const {cart} = useCartProvider()

    return <>
        <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className=" bg-green-600 text-white dark:bg-neutral-900">
                                <tr>
                                    <th scope="col" colSpan={2} className="px-6 py-4 text-center tracking-widest font-normal">Note: Prices are inclusive of GST.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border dark:border-neutral-500">
                                    <td className="whitespace-nowrap border-r px-6 py-4 text-left">
                                        <h3 className=" text-base font-semibold">Sub Total</h3>
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 text-right">
                                        <h3 className=" text-base font-semibold">₹{cart.cart_subtotal}</h3>
                                    </td>
                                </tr>
                                <tr className="border dark:border-neutral-500">
                                    <td className="whitespace-nowrap border-r px-6 py-4 text-left">
                                        <h3 className=" text-base font-semibold">Delivery Charges</h3>
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 text-right">
                                        <h3 className=" text-base font-semibold">FREE</h3>
                                    </td>
                                </tr>
                                <tr className="border dark:border-neutral-500">
                                    <td className="whitespace-nowrap border-r px-6 py-4 text-left">
                                        <h3 className=" text-base font-semibold">Total</h3>
                                    </td>
                                    <td className="whitespace-nowrap border-r px-6 py-4 text-right">
                                        <h3 className=" text-base font-semibold">₹{cart.total_price}</h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-2 px-1">
                        <p className=" text-sm text-red-400">
                            You have realized a minimum savings of 20% - 25% on your standard purchase when compared to retail price.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}