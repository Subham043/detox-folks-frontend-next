"use client";
import { getOrderQueryOptions } from "@/app/_libs/utils/query/getOrderQuery";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
export default function OrderDetail({ slug }: {  slug: number }) {
    const {
        data
    } = useQuery({
        queryKey: getOrderQueryOptions.getOrderQueryKey(slug),
        queryFn: () => getOrderQueryOptions.getOrderQueryFn(slug),
    })

    return <>
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="w-full max-w-full flex flex-wrap justify-center items-center">
                    <div className=" w-full bg-white border border-neutral-200 rounded-md px-3 py-3">
                        <div className=" flex flex-wrap justify-between items-start mb-5">
                            <div className="w-1/3 pr-3">
                                <div className="w-full bg-neutral-100 rounded-md px-3 py-3">
                                    <table className="w-full">
                                        <tbody className="w-full">
                                            <tr>
                                                <th className="text-left pb-2">Order Id</th>
                                                <td className="text-right pb-2 text-neutral-600">#{data?.id}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left pb-2">Order Time</th>
                                                <td className="text-right pb-2 text-neutral-600">{data?.created_at}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left pb-2">Order Status</th>
                                                <td className="text-right pb-2 text-neutral-600">{data?.statuses[data?.statuses.length-1].status}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left pb-2">Ordered From</th>
                                                <td className="text-right pb-2 text-neutral-600">{data?.order_mode}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-1/3">
                                <div className="w-full bg-neutral-100 rounded-md px-3 py-3">
                                    <table className="w-full">
                                        <tbody className="w-full">
                                            <tr>
                                                <th className="text-left pb-2">Payment Mode</th>
                                                <td className="text-right pb-2 text-neutral-600">{data?.payment.mode}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left pb-2">Payment Status</th>
                                                <td className="text-right pb-2 text-neutral-600">{data?.payment.status}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left pb-2">Sub Total</th>
                                                <td className="text-right pb-2 text-neutral-600">₹{data?.subtotal}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left pb-2">Delivery Charges</th>
                                                <td className="text-right pb-2 text-neutral-600">FREE</td>
                                            </tr>
                                            <tr>
                                                <th className="text-left pb-2">Total</th>
                                                <td className="text-right pb-2 text-neutral-600">₹{data?.total_price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-1/3 pl-3">
                                <div className="w-full bg-neutral-100 rounded-md px-3 py-3">
                                    <h4 className="text-base font-semibold mb-2">Delivery Location</h4>
                                    <p className="text-neutral-600 mb-2">{data?.name}<br/> {data?.email}, {data?.phone}</p>
                                    <p className="text-neutral-600">{data?.address}, {data?.city}, {data?.state} - {data?.pin}, {data?.country}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:overflow-x-auto md:overflow-x-hidden">
                            <div className="sm:-mx-12 lg:-mx-8">
                                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border text-left text-sm font-light">
                                            <thead className="border bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                                <tr>
                                                    <th scope="col" className="border-r px-6 py-4">Product</th>
                                                    <th scope="col" className="border-r px-6 py-4 text-center">Price</th>
                                                    <th scope="col" className="border-r px-6 py-4 text-center">Quantity</th>
                                                    <th scope="col" className="border-r px-6 py-4 text-center">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data && data.products.length>0 ? data.products.map((item,i) => <tr className=" border-b dark:border-neutral-500" key={i}>
                                                        <td className="whitespace-nowrap border-r px-6 py-4">
                                                            <div className="flex flex-wrap justify-start items-center gap-2">
                                                                <Image src={item.image} alt="" width={70} height={70} />
                                                                <div className=" flex-1">
                                                                    <h3 className=" text-base font-semibold">{item.name}</h3>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                                                            <p className=" text-neutral-500 font-semibold">₹{item.discount_in_price}/{item.unit}</p>
                                                        </td>
                                                        <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                                                            <p className=" text-neutral-500 font-semibold">{item.quantity} {item.unit}</p>
                                                        </td>
                                                        <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                                                            <h3 className=" text-base font-semibold">₹{item.amount}</h3>
                                                        </td>
                                                    </tr>) :
                                                    <tr className=" border-b dark:border-neutral-500">
                                                        <td className="whitespace-nowrap border-r px-6 py-4 text-center" colSpan={3}>
                                                            <p>No items available!</p>
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}