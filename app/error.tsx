'use client'

import Image from "next/image"
import Breadcrumb from "./_libs/components/Breadcrumb"

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <Breadcrumb name="Error" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center items-center">
                    <div className=" w-full lg:w-1/2 text-center">
                        <h1 className=" text-4xl text-black font-semibold mb-5">Error</h1>
                        <Image priority src={'/error.png'} width={586} height={439} alt="Detoxfolks-Error" title="Detoxfolks-Error" className="mx-auto mb-3" />
                        <h3 className=" text-xl text-neutral-500 font-semibold mb-3">Ooopps! Something went wrong!.</h3>
                        <button className="w-auto px-3 py-3 bg-black text-white rounded-md" onClick={() => reset()}>Try again</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}