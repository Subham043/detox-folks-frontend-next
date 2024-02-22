import Breadcrumb from "@/app/components/Breadcrumb";
import { axiosPublic } from "@/app/utils/axios";
import { api_routes } from "@/app/utils/routes";
import { AboutSectionType } from "@/app/utils/types";
import Image from "next/image";

async function getAboutData():Promise<AboutSectionType> {
    try {
        const aboutResponse = await axiosPublic.get(api_routes.about_section);
        
        return aboutResponse.data.about as AboutSectionType;
    } catch (error) {
        throw new Error('Failed to fetch data')
    }
}

export default async function About() {
    const data = await getAboutData()
    return <>
        <Breadcrumb name="About Us" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-center">
                    <div className=" w-[48%]">
                        <h1 className=" text-4xl text-black font-semibold mb-5">{data.heading}</h1>
                        <div dangerouslySetInnerHTML={{__html:data.description}} />
                    </div>
                    <div className=" w-[48%]">
                        <Image className="rounded-lg" priority src={data.image} width={586} height={439} alt="Detoxfolks" title="Detoxfolks" />
                    </div>
                </div>
            </div>
        </div>
    </>
}