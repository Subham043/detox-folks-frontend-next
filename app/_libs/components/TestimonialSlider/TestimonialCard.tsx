import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { TestimonialType } from "../../utils/types";

export default function TestimonialCard({name, message, star, image}:TestimonialType){
    return <div>
        <div className="w-full text-center bg-black px-5 py-5 rounded-md">
            <FaQuoteLeft className=" text-3xl text-white mx-auto mb-3" />
            <p className=" text-white italic mb-3">{message}</p>
            <h3 className=" text-white text-lg font-semibold uppercase">{name}</h3>
            <div className="flex justify-center items-center w-full mb-5">
                {
                    Array.from({ length: star }, (value, index) => <FaStar className=" text-yellow-500 text-lg" key={index} />)
                }
            </div>
            <div className=" w-full relative flex justify-center items-center">
                <div className=" w-20 h-20 bg-gray-300 flex justify-center items-center rounded-full">
                    <Image src={image} alt={name} title={name} width={100} height={100} className=" w-16 h-16 rounded-full mx-auto" />
                </div>
            </div>
        </div>
    </div>
}