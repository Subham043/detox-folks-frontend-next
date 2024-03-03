"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCategories from "./ProductCategories";
import ProductDetailTabs from "./ProductDetailTabs";
import ProductPrice from "./ProductPrice";
import ProductSubCategories from "./ProductSubCategories";
import ShareProduct from "./ShareProduct";
import { getProductQueryOptions } from "@/app/_libs/utils/query/getProductQuery";
import { useCart } from "@/app/_libs/hooks/useCart";

type ProductDetailCardProps = { slug: string };

export default function ProductDetailCard({slug}:ProductDetailCardProps) {
   
    const {
        data
    } = useQuery({
        queryKey: getProductQueryOptions.getProductQueryKey(slug),
        queryFn: () => getProductQueryOptions.getProductQueryFn(slug),
    })
    console.log(data)
    const {quantity, cartLoading, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id: data!.id, product_prices: data!.product_prices, min_cart_quantity: data!.min_cart_quantity, cart_quantity_interval: data!.cart_quantity_interval});
    return <>
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start mt-10">
                    <div className=" w-[48%] px-10 py-10 bg-white rounded-md box-border sticky top-10">
                        <iframe className="w-full border-none h-[350px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5026155884916!2d77.5720984750164!3d12.939657687372815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15d352e5431b%3A0x5f069f718b19f2e5!2sDetoxfolks%20Private%20Limited!5e0!3m2!1sen!2sin!4v1697790476586!5m2!1sen!2sin" aria-hidden="false" tabIndex={0}></iframe>
                    </div>
                    <div className=" w-[48%] px-10 py-10 bg-white rounded-md box-border">
                        <h3 className=" text-2xl text-black font-semibold mb-2">{data?.name}</h3>
                        <ProductPrice product_prices={data!.product_prices} cart_product_item={cart_product_item} cart_quantity_specification={data!.cart_quantity_specification} />
                        <ProductCategories categories={data ? data.categories : []} />
                        <ProductSubCategories sub_categories={data ? data.sub_categories : []} />
                        <ShareProduct name={data!.name} slug={data!.slug} />
                        <ProductDetailTabs description={data ? data.description : ''} product_specifications={data ? data.product_specifications : []} />
                    </div>
                </div>
            </div>
        </div>
    </>
}