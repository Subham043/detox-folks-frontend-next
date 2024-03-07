import TestimonialSlider from "../_libs/components/TestimonialSlider";

export default function Testimonials(){
    return <div className="w-full pb-10">
    <div className="container">
        <div className="w-full max-w-full text-center px-3 mb-5">
            <h3 className="w-auto text-2xl font-semibold">
                Testimonials
            </h3>
        </div>
        <div className="w-full max-w-full flex flex-wrap justify-center items-start gap-5">
            <div className=" w-full md:w-2/3 lg:w-2/3">
                <TestimonialSlider />
            </div>
        </div>
    </div>
</div>
}