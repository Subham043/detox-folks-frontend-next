import Link from "next/link";

type BreadcrumbProps = {
    name: string;
};

export default function Breadcrumb({name}:BreadcrumbProps){
    return <div className=" w-full bg-[url('/hero.webp')] relative z-0 bg-center bg-no-repeat bg-cover px-2 py-12 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[-1] before:bg-[#00000052]">
        <div className="container mx-auto">
            <div className=" text-center">
                <h2 className=" text-4xl font-bold text-white">{name}</h2>
                <p className=" mt-2 text-white text-lg"><Link href='/' className=" text-gray-200">Home</Link> &gt; {name}</p>
            </div>
        </div>
    </div>
}