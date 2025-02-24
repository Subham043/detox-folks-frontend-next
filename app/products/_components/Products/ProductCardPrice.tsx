import { IoInformationCircleSharp } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../../../_libs/components/ui/popover";
import { CartType, OrderProductTaxType, ProductPriceType } from "../../../_libs/utils/types";
import { FaCheck } from "react-icons/fa6";

const PriceFactor = ({
    price, discounted_price, tax_in_price, taxes, cart_quantity_specification, product_prices, cart_product_item
}:{
    discount: number | null,
    discounted_price: number,
    tax_in_price: number,
    price: number,
    taxes: OrderProductTaxType[],
    product_prices: ProductPriceType[], 
    cart_quantity_specification: string,
    cart_product_item: CartType[]

}) => {
    return <Popover>
        <PopoverTrigger asChild>
            <button className=" text-neutral-600 font-medium w-full flex justify-center items-center gap-1"><span>₹{price.toFixed(2)} / {cart_quantity_specification}</span> <IoInformationCircleSharp className="mt-0.5" /></button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
            <div className="p-1">
                <div className=" bg-[#ede1d736] px-1 py-2 rounded-sm">
                    <div className="pb-2">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className=" bg-green-600 text-white dark:bg-neutral-900">
                                <tr>
                                    <th scope="col" colSpan={2} className="px-2 py-1 text-center tracking-widest font-normal">Price Break Down</th>
                                </tr>
                            </thead>
                            <tr className="border dark:border-neutral-500">
                                <td className="whitespace-nowrap border-r px-2 py-1 text-left text-xs">
                                    Price
                                </td>
                                <td className="whitespace-nowrap border-r px-2 py-1 text-right text-xs">
                                    ₹{discounted_price.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="border dark:border-neutral-500">
                                <td className="whitespace-nowrap border-r px-2 py-1 text-left text-xs">
                                    Tax Applied<br/>
                                    {taxes.length>0 && <div className="mt-1 flex gap-1">
                                        {
                                            taxes.map(tx => <span className=" bg-[#ede1d7c9] px-1 py-1 text-[#8c6d52] rounded-md" key={tx.id}>{tx.tax_name}({tx.tax_value}%)</span>)
                                        }
                                    </div>}
                                </td>
                                <td className="whitespace-nowrap border-r px-2 py-1 text-right text-xs">
                                    ₹{tax_in_price.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="border dark:border-neutral-500">
                                <td className="whitespace-nowrap border-r px-2 py-1 text-left text-xs">
                                    Total
                                </td>
                                <td className="whitespace-nowrap border-r px-2 py-1 text-right text-xs">
                                    ₹{price.toFixed(2)}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="border-t border-dashed border-gray-500 py-2 pt-1">
                        <h3 className=" text-lg font-semibold mb-2">Bulk Offer:</h3>
                        <ul>
                            {
                                product_prices.map((item, i) => {
                                    return cart_product_item.length>0 && item.min_quantity===cart_product_item[0].product_price.min_quantity ? 
                                    <li key={i}><p className="text-sm flex gap-1 items-start text-red-400"><FaCheck className=" text-base mt-0.5" /> <span>Buy {item.min_quantity}  {cart_quantity_specification} or more at ₹{item.discount_in_price.toFixed(2)} / {cart_quantity_specification}</span></p></li>:
                                    <li key={i}><p className="text-sm flex gap-1 items-start"><IoInformationCircleSharp className=" text-base mt-0.5" /> <span>Buy {item.min_quantity}  {cart_quantity_specification} or more at ₹{item.discount_in_price.toFixed(2)} / {cart_quantity_specification}</span></p></li>
                                }) 
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </PopoverContent>
    </Popover>
}

export default function ProductCardPrice({ 
    taxes,
    product_prices, 
    cart_quantity_specification,
    cart_product_item
}: {
    taxes: OrderProductTaxType[],
    product_prices: ProductPriceType[], 
    cart_quantity_specification: string,
    cart_product_item: CartType[]
}){
    if(cart_product_item.length>0){
        return <PriceFactor taxes={taxes} product_prices={product_prices} cart_product_item={cart_product_item} discount={cart_product_item[0].product_price.discount !== 0 ? cart_product_item[0].product_price.price : null} discounted_price={cart_product_item[0].product_price.discounted_price} tax_in_price={cart_product_item[0].product_price.tax_in_price} price={cart_product_item[0].product_price.discount_in_price} cart_quantity_specification={cart_quantity_specification} />
    }
    if(product_prices.length > 0){
        const priceArr = [...product_prices];
        const price = priceArr.sort(function(a, b){return a.discount_in_price - b.discount_in_price});
        return <PriceFactor taxes={taxes} product_prices={product_prices} cart_product_item={cart_product_item} discount={price[0].discount !== 0 ? price[0].price : null} discounted_price={price[0].discounted_price} tax_in_price={price[0].tax_in_price} price={price[0].discount_in_price} cart_quantity_specification={cart_quantity_specification} />
    }
    return null
}