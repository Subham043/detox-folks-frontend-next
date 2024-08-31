import { useEffect, useState } from "react";
import { FaBasketShopping } from "react-icons/fa6";
import Spinner from "@/app/_libs/components/Spinner";
import { ProductColorType } from "@/app/_libs/utils/types";
import { Dialog, DialogContent } from "@/app/_libs/components/ui/dialog";
import { CiEdit } from "react-icons/ci";

type CartQuantityType = {
    product_id:number;
    product_name:string;
    quantity:number;
    color:string|null;
    min_cart_quantity:number;
    loading:boolean;
    incrementQuantity:(color?: string | null)=>void;
    decrementQuantity:(color?: string | null)=>void;
    changeQuantity:(val:number, color?: string | null)=>void;
    colors: ProductColorType[];
}

function AddBtn({loading, incrementQuantity}:{loading:boolean, incrementQuantity:()=>void}){
    return <button title="Add to Cart" disabled={loading} onClick={()=>incrementQuantity()} className=" mt-2 mx-auto w-full bg-[#8c6d52] text-sm text-white text-center px-3 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600">
        {loading ? <Spinner type="small" />: <><FaBasketShopping /> <span>ADD</span></>}
    </button>
}

function EditBtn({setIsOpen}:{setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    return <button title="Edit Quantity" onClick={()=>setIsOpen(true)} className=" w-auto bg-[#8c6d52] text-sm text-white text-center px-3 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600">
        <><CiEdit /></>
    </button>
}

function CartBtn({setIsOpen, loading, quantity, color, incrementQuantity, decrementQuantity}:{setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; loading: boolean; quantity: number; color: string | null; incrementQuantity: (color?: string | null) => void; decrementQuantity: (color?: string | null) => void}){
    return <div className=" flex flex-1 flex-wrap justify-center items-center gap-1">
        <button title="Quantity Minus" disabled={loading} onClick={()=>decrementQuantity(color)} className=" inline-block bg-[#8c6d52] text-white px-3 py-1 text-base font-semibold rounded-sm transition-all hover:bg-gray-600">
            {loading ? <Spinner type="small" />: <>-</>}
        </button>
        <p onClick={() => setIsOpen(true)} className=" min-w-16 inline-block bg-[#ede1d7] px-1 py-1 text-base font-semibold rounded-sm flex-1 text-center focus-within:outline-[#8c6d52] focus:outline-[#8c6d52] focus-visible:outline-[#8c6d52] text-[#8c6d52]">{quantity}</p>
        <button title="Quantity Plus" disabled={loading} onClick={()=>incrementQuantity(color)} className=" inline-block bg-[#8c6d52] text-white px-3 py-1 text-base font-semibold rounded-sm transition-all hover:bg-gray-600">
            {loading ? <Spinner type="small" />: <>+</>}
        </button>
    </div>
}

function CartEditorBtn({loading, quantity, color, incrementQuantity, decrementQuantity, handleValueChange}:{loading: boolean; quantity: number; color: string | null; incrementQuantity: (color?: string | null) => void; decrementQuantity: (color?: string | null) => void; handleValueChange: (val:number) => void}){
    const[value, setValue] = useState<number>(0);

    useEffect(() => {
        setValue(quantity);
    }, [quantity])

    useEffect(() => {
        handleValueChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return <div className=" flex flex-wrap justify-center items-center gap-1">
        <button title="Quantity Minus" disabled={loading} onClick={()=>decrementQuantity(color)} className=" inline-block bg-[#8c6d52] text-white px-3 py-1 text-base font-semibold rounded-sm transition-all hover:bg-gray-600">
            {loading ? <Spinner type="small" />: <>-</>}
        </button>
        <input type="text" inputMode="numeric" value={value} disabled={loading} readOnly={loading} onChange={(e) => setValue(isNaN(parseInt(e.target.value ?? 0)) ? 0 : parseInt(e.target.value ?? 0))} className=" min-w-16 inline-block bg-[#ede1d7] px-1 py-1 text-base font-semibold rounded-sm flex-1 text-center focus-within:outline-[#8c6d52] focus:outline-[#8c6d52] focus-visible:outline-[#8c6d52] text-[#8c6d52]" />
        <button title="Quantity Plus" disabled={loading} onClick={()=>incrementQuantity(color)} className=" inline-block bg-[#8c6d52] text-white px-3 py-1 text-base font-semibold rounded-sm transition-all hover:bg-gray-600">
            {loading ? <Spinner type="small" />: <>+</>}
        </button>
    </div>
}

function CartQuantityModalBtn({setIsOpen, loading, quantity, color, incrementQuantity, decrementQuantity}:{setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; loading: boolean; quantity: number; color: string | null; incrementQuantity: (color?: string | null) => void; decrementQuantity: (color?: string | null) => void}){
    return <div className=" flex flex-1 gap-2 items-center justify-start mt-2">
        <EditBtn setIsOpen={setIsOpen} />
        <CartBtn setIsOpen={setIsOpen} loading={loading} quantity={quantity} color={color} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
    </div>
}

function CartQuantityModal({isOpen, color, colors, setIsOpen, quantity, min_cart_quantity, loading, product_name, incrementQuantity, decrementQuantity, changeQuantity}:CartQuantityType & {isOpen:boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const [selectedColor, setSelectedColor] = useState<string|null>(null);
    const [quantityValue, setQuantityValue] = useState<number>(0);
    useEffect(() => {
        if(color) setSelectedColor(color);
    }, [color])

    const handleValueChange = (value: number) => {
        setQuantityValue(value);
    };
    const updateQuantity = () => {
        // if(quantityValue < min_cart_quantity)
        changeQuantity(quantityValue, selectedColor ?? null);
        setIsOpen(false);
    }

    useEffect(() => {
        if(quantity < 1 && colors.length===0) {
            setIsOpen(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity])
    
    return <>
        <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
            <DialogContent className="p-0">
                <div className=" w-full">
                    <div className=" w-full px-3 pt-3">
                        <h5 className=" text-lg text-[#8c6d52] font-semibold text-ellipsis">{product_name}</h5>
                        <p className="text-sm text-green-700"><code className="text-black">Minimum Cart Quantity: </code>{min_cart_quantity}</p>
                    </div>
                    {colors.length>0 && <div className=" w-full px-3 border-t border-solid border-gray-200 pt-3 pb-3 mt-3">
                        <p className="text-sm font-bold mb-3">Pick a Color :</p>
                        <div className="w-full flex-wrap flex items-center gap-2">
                            {colors.map((color) => <div className={`flex items-center w-auto mb-2 p-1 cursor-pointer ${selectedColor===color.code ? 'border border-solid border-gray-300 bg-gray-100 rounded-sm' : ''}`} key={color.id} onClick={() => setSelectedColor(color.code ?? null)}>
                                <div className={`inline-flex gap-2 w-auto`}>
                                    <div className={` w-6 h-6 rounded-sm`} style={{backgroundColor: color.code ? color.code : 'transparent'}} /> 
                                    <span>{color.name}</span>
                                </div>
                            </div>)}
                        </div>
                    </div>}
                    {
                        quantity===0 ? ((colors.length===0 || selectedColor!==null) && <div className=" w-full px-3 flex justify-between items-center gap-3 border-t border-solid border-gray-200 pt-3 pb-3 mt-3">
                            <AddBtn loading={loading} incrementQuantity={() => incrementQuantity(selectedColor)} />
                        </div>) : <div  className=" w-full px-3 flex justify-between items-center gap-3 border-t border-solid border-gray-200 pt-3 pb-3 mt-3">
                            <CartEditorBtn loading={loading} quantity={quantity} color={selectedColor} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} handleValueChange={handleValueChange} />
                            {(quantity >= min_cart_quantity && quantityValue >= min_cart_quantity) && <button className="w-auto bg-[#8c6d52] text-sm text-white text-center px-3 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600" disabled={loading} onClick={updateQuantity}>
                                {
                                    loading ? <Spinner type="small" /> : <>UPDATE</>
                                }
                            </button>}
                        </div>
                    }
                </div>
            </DialogContent>
        </Dialog>
    </>
}

export default function ProductCardCartBtn2({quantity, color, colors, product_id, product_name, min_cart_quantity, loading, incrementQuantity, decrementQuantity, changeQuantity}:CartQuantityType){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return <div>
        {quantity===0 ? 
            (colors.length===0 ? <AddBtn loading={loading} incrementQuantity={() => incrementQuantity(null)} /> : <AddBtn loading={loading} incrementQuantity={() => setIsOpen(true)} />) : 
            <CartQuantityModalBtn setIsOpen={setIsOpen} loading={loading} quantity={quantity} color={color} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
        }
        <CartQuantityModal isOpen={isOpen} setIsOpen={setIsOpen} colors={colors} color={color} product_id={product_id} product_name={product_name} quantity={quantity} min_cart_quantity={min_cart_quantity} loading={loading} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} />
    </div>
}