import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/_libs/components/ui/tabs";
import ProductImageSlider from "./ProductImageSlider";
import ProductVideoSlider from "./ProductVideoSlider";

export default function ProductGalleryTabs({
    product_videos, product_images
}: {
    product_images: string[];
    product_videos: {
        video_id: string;
        video_link: string;
    }[];
}) {
    return <div className="w-full">
        <Tabs defaultValue="photos" className="w-full">
            <TabsList className="w-full border-[0.5px] border-solid border-[#8c6d52] bg-[#8c6d52] text-white border-b-0 rounded-b-none">
                <TabsTrigger className="w-1/2" value="photos">PHOTOS</TabsTrigger>
                <TabsTrigger className="w-1/2" value="videos">VIDEOS</TabsTrigger>
            </TabsList>
            <TabsContent className="mt-0" value="photos">
                <div className="border border-[#8c6d52] rounded-b-sm px-3 lg:px-5 py-3 lg:py-5">
                    <ProductImageSlider images={product_images} />
                </div>
            </TabsContent>
            <TabsContent className="mt-0" value="videos">
                <div className="border border-[#8c6d52] rounded-b-sm px-3 lg:px-5 py-3 lg:py-5">
                    {
                        product_videos.length > 0 ? 
                        <ProductVideoSlider videos={product_videos} /> : 
                        <div className="text-center">
                            <p>No Videos Found</p>
                        </div>
                    }
                </div>
            </TabsContent>
        </Tabs>
    </div>
}