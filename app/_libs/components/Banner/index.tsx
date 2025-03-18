'use client';
import Image from "next/image";
import Slider from "react-slick";

const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    pauseOnHover: true
};

const banners = [
    '/bn1.webp',
    '/bn2.webp',
    '/bn3.webp',
    '/bn4.webp',
    '/bn5.webp',
    '/bn6.webp',
    // '/banner-1.png',
    // '/banner-2.png',
    // '/banner-3.png',
    // '/banner-4.png',
    // '/banner-5.png',
];

export default function Banner(){
    return <div className="w-full pt-5">
        <div className="container mx-auto">
            <Slider {...settings}>
                {
                    banners.map((item, i) => <picture key={i}>
                        <source srcSet={(item.replace(".png", ".webp")).replace("/banner", "/banner")} media="(max-width: 600px)" />
                        <source srcSet={item} media="(max-width: 1920px)" />
                        <source srcSet={item} />
                        <Image
                            src={item}
                            alt={"Parcelcounter Banner_"+(i+1)}
                            className="mx-auto object-contain"
                            width={1280}
                            height={480}
                            priority={i===0}
                        />
                    </picture>)
                }
            </Slider>
        </div>
    </div>
}