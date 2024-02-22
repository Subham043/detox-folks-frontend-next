import { IconType } from "react-icons";

type ContactCardProps = {
    Icon: IconType;
    title: string;
    description: string;
};

export default function ContactCard({Icon, title, description}:ContactCardProps){
    return <div className=" w-[32%] px-10 py-10 bg-white rounded-md box-border min-h-60">
        <div className="text-center">
            <div className=" bg-black rounded-full relative flex justify-center items-center w-11 h-11 mx-auto">
                <Icon className=" text-white text-2xl" />
            </div>
            <h3 className=" text-black text-xl font-semibold mt-3">{title}</h3>
            <p className=" text-black text-lg mt-3">{description}</p>
        </div>
    </div>
}