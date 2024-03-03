import Image from "next/image";

export default function CheckoutCartTableCard() {
    return <>
        <tr className=" border-b dark:border-neutral-500">
            <td className="whitespace-nowrap border-r px-6 py-4">
                <div className="flex flex-wrap justify-start items-center gap-2">
                    <Image src='https://server-api.parcelcounter.in/storage/products/GSQFXX0vKcFDPhafuJDAHAMRGf1RGble0RL1uWfI.png' alt="" width={70} height={70} />
                    <div className=" flex-1">
                        <h3 className=" text-base font-semibold">9x12 Full Size Silver Pouch</h3>
                        <p className=" text-neutral-500 font-semibold">₹73/packets</p>
                    </div>
                </div>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                <div className=" flex flex-wrap justify-center items-center gap-1">
                    <button className=" inline-block bg-gray-200 px-2 py-0.5 text-base font-semibold rounded-sm">-</button>
                    <input type="text" defaultValue={1} className=" w-16 max-w-16 inline-block bg-gray-200 px-2 py-0.5 text-base font-semibold rounded-sm flex-1 text-center" />
                    <button className=" inline-block bg-gray-200 px-2 py-0.5 text-base font-semibold rounded-sm">+</button>
                </div>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 text-center">
                <h3 className=" text-base font-semibold">₹73</h3>
            </td>
        </tr>
    </>
}