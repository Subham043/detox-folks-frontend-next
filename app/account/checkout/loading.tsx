import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import { Skeleton } from "@/app/_libs/components/ui/skeleton";

export default function Loading() {
    return <>
        <Breadcrumb name="Checkout" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start">
                    <div className=" w-full mb-5 lg:mb-0 lg:w-[68%] bg-white rounded-md box-border">
                        <Skeleton className="h-[400px] w-full rounded-md" />
                    </div>
                    <div className=" w-full lg:w-[30%] px-3 lg:px-5 py-3 lg:py-5 bg-white rounded-md box-border sticky top-10">
                        <Skeleton className="h-[200px] w-full rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    </>
}