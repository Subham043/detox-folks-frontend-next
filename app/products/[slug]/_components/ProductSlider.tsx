'use client';
import Image from "next/image";
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function ProductSlider({images} : {images:string[]}){
    return <div className="w-full pt-5">
        <div className="container mx-auto">
            <Slider {...settings}>
                {
                    images.map((item, i) => 
                    <Image
                        src={item}
                        alt="Vercel Logo"
                        className="mx-auto object-contain"
                        width={1280}
                        height={480}
                        priority
                        key={i}
                    />)
                }
            </Slider>
        </div>
    </div>
}