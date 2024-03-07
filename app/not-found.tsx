import Link from "next/link";
import { page } from "./_libs/utils/routes/pages";
import Breadcrumb from "./_libs/components/Breadcrumb";
import Image from "next/image";

export default function NotFound() {
    return (
      <div>
        <Breadcrumb name="404" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center items-center">
                    <div className=" w-full lg:w-1/2 text-center">
                        <h1 className=" text-4xl text-black font-semibold mb-5">404 | Not Found</h1>
                        <Image priority src={'/error.png'} width={586} height={439} alt="Detoxfolks-404" title="Detoxfolks-404" className="mx-auto mb-3" />
                        <h3 className=" text-xl text-neutral-500 font-semibold mb-3">Ooopps! this page cant be found.</h3>
                        <p className="mb-7">It looks like nothing was found at this location.</p>
                        <Link href={page.home} className="w-auto px-3 py-3 bg-black text-white rounded-md">Return Home</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }