import { BiSelectMultiple } from "react-icons/bi";

export default function CheckoutOrder() {
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
                                        <h3 className=" text-base font-semibold">₹73</h3>
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
                                        <h3 className=" text-base font-semibold">₹73</h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-2 px-1">
                        <button className=" mb-2 w-full bg-black text-sm text-white text-center px-5 py-3 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><BiSelectMultiple /> <span>Place Order</span></button>
                        <p className=" text-sm text-red-400">
                            You have realized a minimum savings of 20% - 25% on your standard purchase when compared to retail price.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}