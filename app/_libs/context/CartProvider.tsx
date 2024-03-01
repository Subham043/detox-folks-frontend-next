import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { CartType as CartDataType, CartChargeType, CartTaxType, CartCouponType } from "@/app/_libs/utils/types";
import { useQuery } from "@tanstack/react-query";
import { getCartQueryOptions, useCartMutation } from "../utils/query/getCartQuery";

export type CartType = {
    cart: CartDataType[];
    cart_charges: CartChargeType[];
    tax: CartTaxType;
    coupon_applied: CartCouponType|null;
    cart_subtotal: number;
    discount_price: number;
    total_charges: number;
    total_price: number;
    total_tax: number;
}

  
type CartContextType = {
    cart: CartType;
    cartLoading: boolean;
    updateCart: (cartData: CartType) => void;
    fetchCart: () => void;
}


const cartDefaultValues: CartContextType = {
    cart: {
      cart:[],
      cart_charges:[],
      tax: {
        id:0,
        created_at: "",
        updated_at: "",
        tax_in_percentage: 0,
        tax_name: "",
        tax_slug: "",
      },
      coupon_applied: null,
      cart_subtotal: 0, 
      discount_price: 0, 
      total_charges: 0, 
      total_price: 0, 
      total_tax: 0
    },
    updateCart: (cartData: CartType) => {},
    fetchCart: () => {},
    cartLoading: false
};

const CartContext = createContext<CartContextType>(cartDefaultValues);

export const useCartProvider = () => useContext(CartContext);

export default function CartProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { status } = useSession();
    const {
        data,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: getCartQueryOptions.getCartQueryKey,
        queryFn: getCartQueryOptions.getCartQueryFn,
        enabled: status==='authenticated'
    })

    const {update} = useCartMutation();

    const updateCart = async (cartData: CartType) => {
      if(status==='authenticated'){
        const data = {...cartData}
        update({...data});
      }
    }

    return <CartContext.Provider value={{
        cart: (status==='authenticated' && data) ? {...data} : {
          cart:[], 
          cart_charges:[], 
          tax: {
            id:0,
            created_at: "",
            updated_at: "",
            tax_in_percentage: 0,
            tax_name: "",
            tax_slug: "",
          },
          coupon_applied: null,
          cart_subtotal:0, 
          discount_price: 0, 
          total_charges: 0, 
          total_price: 0, 
          total_tax: 0
        },
        cartLoading: isLoading,
        fetchCart: refetch,
        updateCart
      }}>
          {children}
      </CartContext.Provider>
}