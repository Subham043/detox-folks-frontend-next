"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductPriceType } from "../utils/types";
import { useSession } from "next-auth/react";
import { useToast } from "./useToast";
import { useCartProvider } from "../context/CartProvider";
import { axiosPublic } from "../utils/axios";
import { api } from "../utils/routes/api";

type CartInput = {
    product_id: number;
    product_price_id: number;
    quantity: number;
    amount: number;
    color: string|null;
}

export function useCart({
    id,
    product_prices,
    cart_quantity_interval,
    min_cart_quantity
}:{
    id: number,
    product_prices: ProductPriceType[],
    cart_quantity_interval: number,
    min_cart_quantity: number,
}){

    const { cart, cartLoading, updateCart } = useCartProvider();
    const [quantity, setQuantity] = useState<number>(0);
    const [color, setColor] = useState<string|null>(null);
    const [cartItemLoading, setCartItemLoading] = useState<boolean>(false);
    const { status } = useSession();
    const { toastSuccess, toastError } = useToast();

    const cart_product_item = useMemo(
      () => cart.cart.filter(item=>item.product.id===id),
      [id, cart],
    )

    useEffect(() => {
        setQuantity(cart_product_item.length===0 ? 0 : cart_product_item[0].quantity)
        setColor(cart_product_item.length===0 ? null : cart_product_item[0].color)
        return () => {}
    }, [cart_product_item])

    const loginHandler = useCallback((msg:string) => {
      toastError(msg);
      // displayLogin();
    }, [toastError])

    const addItemCart = useCallback(async (data: CartInput) => {
      if(status==='authenticated'){
          setCartItemLoading(true);
          try {
            const response = await axiosPublic.post(api.cart_create, data);
            updateCart({cart: [...cart.cart, response.data.cart], cart_charges: [...response.data.cart_charges], coupon_applied: response.data.coupon_applied, cart_subtotal:response.data.cart_subtotal, discount_price: response.data.discount_price, total_charges: response.data.total_charges, total_price: response.data.total_price});
            toastSuccess("Item added to cart.");
          } catch (error: any) {
            console.log(error);
            toastError("Something went wrong. Please try again later!");
          }finally{
            setCartItemLoading(false);
          }
      }else{
        loginHandler("Please log in to add the item to cart.");
      }
  }, [cart, loginHandler, status, toastError, toastSuccess, updateCart])
  
  const updateItemCart = useCallback(async ({cartItemId, ...data}: CartInput & {cartItemId:number}) => {
      if(status==='authenticated'){
          setCartItemLoading(true);
          try {
            const response = await axiosPublic.post(api.cart_update + `/${cartItemId}`, data);
            var cartItemIndex = cart.cart.findIndex(function(c) { 
              return c.id == cartItemId; 
            });
            const old_cart = cart.cart;
            old_cart[cartItemIndex] = response.data.cart;
            const updatedCartValue = {
              cart: [...old_cart], 
              cart_charges: [...response.data.cart_charges], 
              coupon_applied: response.data.coupon_applied,
              cart_subtotal:response.data.cart_subtotal, 
              discount_price: response.data.discount_price, 
              total_charges: response.data.total_charges, 
              total_price: response.data.total_price, 
            }
            updateCart({...updatedCartValue});
            // toastSuccess("Item quantity updated in cart.");
          } catch (error: any) {
            console.log(error);
            toastError("Something went wrong. Please try again later!");
          }finally{
            setCartItemLoading(false);
          }
      }else{
        loginHandler("Please log in to update the item in cart.");
      }
  }, [cart, loginHandler, status, toastError, updateCart])

  const deleteItemCart = useCallback(async (data: number) => {
    if(status==='authenticated'){
        setCartItemLoading(true);
        try {
          const response = await axiosPublic.delete(api.cart_delete + `/${data}`);
            const removedItemArray = cart.cart.filter(item => item.id !== data);
            updateCart({cart: [...removedItemArray], cart_charges: [...response.data.cart_charges], coupon_applied: response.data.coupon_applied, cart_subtotal:response.data.cart_subtotal, discount_price: response.data.discount_price, total_charges: response.data.total_charges, total_price: response.data.total_price});
            toastSuccess("Item removed from cart.");
        } catch (error: any) {
          console.log(error);
          toastError("Something went wrong. Please try again later!");
        }finally{
          setCartItemLoading(false);
        }
    }else{
      loginHandler("Please log in to remove the item from cart.");
    }
  }, [cart, loginHandler, status, toastError, toastSuccess, updateCart])

    const incrementQuantity = useCallback((color?: string|null) => {
        const cart_product = cart_product_item;
        const priceArr = [...product_prices];
        const price_des_quantity = priceArr.sort(function(a, b){return b.min_quantity - a.min_quantity});
        const price = price_des_quantity.filter(item=>(quantity+cart_quantity_interval)>=item.min_quantity).length>0 ? price_des_quantity.filter(item=>(quantity+cart_quantity_interval)>=item.min_quantity)[0] : price_des_quantity[price_des_quantity.length-1];
        if(cart_product.length===0){
            addItemCart({
                product_id: id,
                color: color ?? null,
                product_price_id: price.id,
                quantity: min_cart_quantity,
                amount: (min_cart_quantity)*price.discount_in_price,
            })
        }else{
            updateItemCart({
                cartItemId: cart_product[0].id,
                product_id: id,
                color: color ?? null,
                product_price_id: price.id,
                quantity: quantity+cart_quantity_interval,
                amount: (quantity+cart_quantity_interval)*price.discount_in_price,
            })
        }
    }, [addItemCart, cart_product_item, cart_quantity_interval, id, min_cart_quantity, product_prices, quantity, updateItemCart]);
    
    const changeQuantity = useCallback((value:number, color?: string|null) => {
        const cart_product = cart_product_item;
        const priceArr = [...product_prices];
        const price_des_quantity = priceArr.sort(function(a, b){return b.min_quantity - a.min_quantity});
        const price = price_des_quantity.filter(item=>(value)>=item.min_quantity).length>0 ? price_des_quantity.filter(item=>(value)>=item.min_quantity)[0] : price_des_quantity[price_des_quantity.length-1];
        updateItemCart({
            cartItemId: cart_product[0].id,
            product_id: id,
            color: color ?? null,
            product_price_id: price.id,
            quantity: value,
            amount: (value)*price.discount_in_price,
        })
    }, [cart_product_item, id, product_prices, updateItemCart]);
    
    const decrementQuantity = useCallback((color?: string|null) => {
        const cart_product = cart_product_item;
        const priceArr = [...product_prices];
        const price_des_quantity = priceArr.sort(function(a, b){return b.min_quantity - a.min_quantity});
        const price = price_des_quantity.filter(item=>(Math.max(0, quantity-cart_quantity_interval))>=item.min_quantity).length>0 ? price_des_quantity.filter(item=>(Math.max(0, quantity-cart_quantity_interval))>=item.min_quantity)[0] : price_des_quantity[price_des_quantity.length-1];
        if(cart_product.length!==0 && Math.max(0, quantity-cart_quantity_interval)!==0){
            updateItemCart({
                cartItemId: cart_product[0].id,
                product_id: id,
                color: color ?? null,
                product_price_id: price.id,
                quantity: Math.max(0, quantity-cart_quantity_interval),
                amount: (Math.max(0, quantity-cart_quantity_interval))*price.discount_in_price,
            })
        }else{
            deleteItemCart(cart_product[0].id)
        }
    }, [cart_product_item, cart_quantity_interval, deleteItemCart, id, product_prices, quantity, updateItemCart]);

    return {
        color: color ?? null,
        quantity,
        cartLoading,
        cartItemLoading,
        cart_product_item,
        incrementQuantity,
        changeQuantity,
        decrementQuantity,
        deleteItemCart
    };
}