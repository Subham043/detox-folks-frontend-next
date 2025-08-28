'use client';
import { useRef } from "react";
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function ProductVideoSlider({videos} : {videos:{
        video_id: string;
        video_link: string;
    }[]}){
    const sliderRef = useRef<any>(null);

    const sliderSettings = {
        ...settings,
        beforeChange: (current: number, next: number) => {
            // Pause the currently playing iframe
            const iframes = document.querySelectorAll("iframe");
            if (iframes[current]) {
                iframes[current].contentWindow?.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
                );
            }
        },
    };

    return <div className="w-full">
        <div className="container mx-auto">
            <Slider 
                ref={sliderRef} 
                {...sliderSettings}
            >
                    {
                        videos.map((item, i) => 
                        <iframe className="w-full border-none h-[350px]" src={item.video_link + '?enablejsapi=1'} aria-hidden="false" tabIndex={0} key={i}></iframe>)
                    }
            </Slider>
        </div>
    </div>
}