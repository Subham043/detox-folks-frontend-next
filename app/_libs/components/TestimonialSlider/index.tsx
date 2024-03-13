'use client';
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";
import { useQuery } from "@tanstack/react-query";
import { getTestimonialQueryOptions } from "../../utils/query/getTestimonialQuery";
import TestimonialsLoading from "./TestimonialsLoading";

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

export default function TestimonialSlider(){
    const {
        data,
        isFetching,
        isRefetching
    } = useQuery({
        queryKey: getTestimonialQueryOptions.getTestimonialQueryKey,
        queryFn: getTestimonialQueryOptions.getTestimonialQueryFn,
    })

    return <div className="w-full">
        {(isFetching || isRefetching) ? <TestimonialsLoading /> :
        <Slider {...settings}>
            {
                (data ? data : []).map((item, i) => <TestimonialCard {...item} key={i} />)
            }
        </Slider>}
    </div>
}