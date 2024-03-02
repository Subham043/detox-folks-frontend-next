import { useEffect, useState } from "react";
import { FaBasketShopping } from "react-icons/fa6";
import debounce from 'lodash.debounce'

type CartQuantityType = {
    quantity:number;
    min_cart_quantity:number;
    loading:boolean;
    incrementQuantity:()=>void;
    decrementQuantity:()=>void;
    changeQuantity:(val:number)=>void;
}

export default function ProductCardCartBtn({quantity, min_cart_quantity, loading, incrementQuantity, decrementQuantity, changeQuantity}:CartQuantityType){
    const [qnt, setQnt] = useState(quantity);

    useEffect(() => {
        setQnt(quantity);
      return () => {}
    }, [quantity])

    const debouncedQuatity = debounce(changeQuantity, 500);
    
    const handleChangeQuantity = (val: any) => {
        const data = parseInt(val);
        if(data<min_cart_quantity || isNaN(data)){
            setQnt(min_cart_quantity);
            debouncedQuatity(min_cart_quantity)
        }else{
            setQnt(data);
            debouncedQuatity(data)
        }
    }

    return <>
        {quantity===0 ? 
            <button title="Add to Cart" disabled={loading} onClick={()=>incrementQuantity()} className=" mt-2 mx-auto w-full bg-black text-sm text-white text-center px-3 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><FaBasketShopping /> <span>ADD</span></button> :
            <div className=" flex flex-wrap justify-center items-center gap-1 mt-2">
                <button title="Quantity Minus" disabled={loading} onClick={()=>decrementQuantity()} className=" inline-block bg-neutral-800 text-white px-3 py-1 text-base font-semibold rounded-sm">-</button>
                <input type="text" inputMode="numeric" value={qnt} disabled={loading} readOnly={loading} onChange={(e)=>handleChangeQuantity(e.target.value)} className=" min-w-16 inline-block bg-gray-200 px-1 py-1 text-base font-semibold rounded-sm flex-1 text-center" />
                <button title="Quantity Plus" disabled={loading} onClick={()=>incrementQuantity()} className=" inline-block bg-neutral-800 text-white px-3 py-1 text-base font-semibold rounded-sm">+</button>
            </div>
        }
    </>
}