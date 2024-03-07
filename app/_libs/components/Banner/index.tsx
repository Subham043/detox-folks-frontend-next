'use client';
import Image from "next/image";
import Slider from "react-slick";

const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    pauseOnHover: true
};

const banners = [
    '/banner-1.png',
    '/banner-2.png',
    '/banner-3.png',
    '/banner-4.png',
    '/banner-5.png',
];

export default function Banner(){
    return <div className="w-full pt-5">
        <div className="container mx-auto">
            <Slider {...settings}>
                {
                    banners.map((item, i) => 
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