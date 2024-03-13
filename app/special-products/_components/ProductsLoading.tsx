import { Skeleton } from "@/app/_libs/components/ui/skeleton";

export default function ProductsLoading(){
    return <div className="w-full max-w-full flex flex-wrap justify-start items-start">
        {Array.from(Array(10).keys()).map(i => <div className=" w-full md:w-1/3 lg:w-1/5 shrink-0" key={i}>
            <div className=" w-full px-1 text-center mb-3">
                <div className=" bg-white px-3 py-4 rounded-sm">
                    <Skeleton className="h-[200px] w-full rounded-md" />
                    <Skeleton className="h-4 w-full mt-3" />
                    <Skeleton className="h-4 w-full mt-3" />
                    <Skeleton className="h-4 w-full mt-3" />
                </div>
            </div>
        </div>)}
    </div>
}