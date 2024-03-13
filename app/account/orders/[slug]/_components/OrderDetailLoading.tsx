import { Skeleton } from "@/app/_libs/components/ui/skeleton";

export default function OrderDetailLoading() {
    return <>
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="w-full max-w-full flex flex-wrap justify-center items-center">
                    <div className=" w-full bg-white border border-neutral-200 rounded-md px-3 py-3">
                        <div className=" flex flex-wrap justify-between items-start mb-5">
                            <div className="w-full mb-5 lg:mb-0 lg:w-1/3 lg:pr-3">
                                <div className="w-full bg-neutral-100 rounded-md px-3 py-3">
                                    <Skeleton className="h-[200px] w-full rounded-md" />
                                </div>
                            </div>
                            <div className="w-full mb-5 lg:mb-0 lg:w-1/3">
                                <div className="w-full bg-neutral-100 rounded-md px-3 py-3">
                                    <Skeleton className="h-[200px] w-full rounded-md" />
                                </div>
                            </div>
                            <div className="w-full lg:w-1/3 lg:pl-3">
                                <div className="w-full bg-neutral-100 rounded-md px-3 py-3">
                                    <Skeleton className="h-[200px] w-full rounded-md" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col overflow-x-auto lg:overflow-x-hidden">
                            <div className="sm:-mx-12 lg:-mx-8">
                                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-x-auto">
                                        <Skeleton className="h-[200px] w-full rounded-md" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}