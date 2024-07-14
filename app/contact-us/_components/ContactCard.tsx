import { IconType } from "react-icons";

type ContactCardProps = {
    Icon: IconType;
    title: string;
    description: string;
};

export default function ContactCard({Icon, title, description}:ContactCardProps){
    return <div className="w-full mb-5 last:mb-0 lg:mb-0 lg:w-[32%] px-3 lg:px-10 py-5 lg:py-10 bg-white rounded-md box-border min-h-fit lg:min-h-60">
        <div className="text-center">
            <div className=" bg-[#8c6d52] rounded-full relative flex justify-center items-center w-11 h-11 mx-auto">
                <Icon className=" text-white text-2xl" />
            </div>
            <h3 className=" text-[#8c6d52] text-xl font-semibold mt-3">{title}</h3>
            <p className=" text-[#8c6d52] text-lg mt-3">{description}</p>
        </div>
    </div>
}