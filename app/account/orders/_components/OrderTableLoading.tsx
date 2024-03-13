export default function OrderTableLoading() {
    return <>
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-col overflow-x-auto lg:overflow-x-hidden">
                    <div className="sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border text-left text-sm font-light">
                                    <thead className="border bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                        <tr>
                                            <th scope="col" className="border-r px-6 py-4">Order ID</th>
                                            <th scope="col" className="border-r px-6 py-4 text-center hidden lg:table-cell">Products</th>
                                            <th scope="col" className="border-r px-6 py-4 text-center">Amount</th>
                                            <th scope="col" className="border-r px-6 py-4 text-center">Order Status</th>
                                            <th scope="col" className="border-r px-6 py-4 text-center hidden lg:table-cell">Payment Mode</th>
                                            <th scope="col" className="border-r px-6 py-4 text-center hidden lg:table-cell">Payment Status</th>
                                            <th scope="col" className="border-r px-6 py-4 text-center">Placed On</th>
                                            <th scope="col" className="border-r px-6 py-4 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className=" border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap border-r px-6 py-4 text-center" colSpan={8}>
                                                <p>Loading...</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}