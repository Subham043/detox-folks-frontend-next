import { IoInformationCircleSharp } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CartType, ProductPriceType } from "../utils/types";
import { FaCheck } from "react-icons/fa6";

const PriceFactor = ({
    price, discount, cart_quantity_specification, product_prices, cart_product_item
}:{
    discount: number | null,
    price: number,
    product_prices: ProductPriceType[], 
    cart_quantity_specification: string,
    cart_product_item: CartType[]

}) => {
    return <Popover>
        <PopoverTrigger asChild>
            <button className=" text-neutral-600 font-medium w-full flex justify-center items-center gap-1"><span>₹{price} / {cart_quantity_specification}</span> <IoInformationCircleSharp /></button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
            <div className="p-1">
                <div className=" bg-gray-100 px-1 py-2 rounded-sm">
                    <div className=" border-b border-dashed border-gray-500 pb-2">
                        <p className=" text-sm text-green-600 mb-1">Note: Prices Are Inclusive Of GST.</p>
                        <h3 className=" text-lg font-semibold">Bulk Offer:</h3>
                    </div>
                    <div className="py-2">
                        <ul>
                            {
                                product_prices.map((item, i) => {
                                    return cart_product_item.length>0 && item.min_quantity===cart_product_item[0].product_price.min_quantity ? 
                                    <li key={i}><p className="text-sm flex gap-1 items-start text-red-400"><FaCheck className=" text-base mt-1" /> <span>Buy {item.min_quantity}  {cart_quantity_specification} or more at ₹{item.discount_in_price} / {cart_quantity_specification}</span></p></li>:
                                    <li key={i}><p className="text-sm flex gap-1 items-start"><IoInformationCircleSharp className=" text-base mt-1" /> <span>Buy {item.min_quantity}  {cart_quantity_specification} or more at ₹{item.discount_in_price} / {cart_quantity_specification}</span></p></li>
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
    product_prices, 
    cart_quantity_specification,
    cart_product_item
}: {
    product_prices: ProductPriceType[], 
    cart_quantity_specification: string,
    cart_product_item: CartType[]
}){
    if(cart_product_item.length>0){
        return <PriceFactor product_prices={product_prices} cart_product_item={cart_product_item} discount={cart_product_item[0].product_price.discount !== 0 ? cart_product_item[0].product_price.price : null} price={cart_product_item[0].product_price.discount_in_price} cart_quantity_specification={cart_quantity_specification} />
    }
    if(product_prices.length > 0){
        const priceArr = [...product_prices];
        const price = priceArr.sort(function(a, b){return a.discount_in_price - b.discount_in_price});
        return <PriceFactor product_prices={product_prices} cart_product_item={cart_product_item} discount={price[0].discount !== 0 ? price[0].price : null} price={price[0].discount_in_price} cart_quantity_specification={cart_quantity_specification} />
    }
    return null
}