import { axiosPublic } from "../axios";
import { api } from "../routes/api";
import { TestimonialType } from "../types";

const getTestimonialQueryKey = ["testimonials"];

const getTestimonialQueryFn: () => Promise<TestimonialType[]> = async () => {
    const response = await axiosPublic.get(api.testimonial);
    return response.data.testimonial as TestimonialType[];
}

export const getTestimonialQueryOptions = {
    getTestimonialQueryKey,
    getTestimonialQueryFn,
}