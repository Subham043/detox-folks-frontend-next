import { Skeleton } from "@/app/_libs/components/ui/skeleton";

export default function BillingAddressLoading(){
    return <div className="w-full max-w-full flex flex-wrap gap-5 justify-between items-start mb-5">
        {Array.from(Array(4).keys()).map(i => <div className="w-full lg:w-[48%] shrink-0" key={i}>
            <div className=" w-full px-1 text-center mb-3">
                <Skeleton className="h-[120px] w-full rounded-sm" />
            </div>
        </div>)}
    </div>
}