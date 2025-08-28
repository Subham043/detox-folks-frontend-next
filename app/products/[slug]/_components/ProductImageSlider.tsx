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

export default function ProductImageSlider({images} : {images:string[]}){
    return <div className="w-full">
        <div className="container mx-auto">
            <Slider {...settings}>
                {
                    images.map((item, i) => 
                    <Image
                        src={item}
                        alt={"Parcelcounter Product_"+(i+1)}
                        className="mx-auto object-contain"
                        width={1280}
                        height={480}
                        priority={i===0}
                        key={i}
                    />)
                }
            </Slider>
        </div>
    </div>
}