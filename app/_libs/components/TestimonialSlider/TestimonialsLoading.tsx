import { Skeleton } from "@/app/_libs/components/ui/skeleton";

export default function TestimonialsLoading(){
    return <div className="w-full max-w-full flex flex-wrap justify-center items-center">
        {Array.from(Array(1).keys()).map(i => <div className=" w-full shrink-0" key={i}>
            <div className=" w-full px-1 text-center mb-3">
                    <Skeleton className="h-[400px] w-full rounded-md" />
            </div>
        </div>)}
    </div>
}