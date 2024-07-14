import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/_libs/components/ui/tabs";
import { ProductSpecificationType } from "@/app/_libs/utils/types";

export default function ProductDetailTabs({
    description, product_specifications
}: {
    description: string|TrustedHTML;
    product_specifications: ProductSpecificationType[]
}) {
    return <div className="w-full mt-6">
        <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="w-full border-[0.5px] border-solid border-[#8c6d52] bg-[#8c6d52] text-white border-b-0 rounded-b-none">
                <TabsTrigger className="w-1/2" value="specifications">SPECIFICATIONS</TabsTrigger>
                <TabsTrigger className="w-1/2" value="description">DESCRIPTION</TabsTrigger>
            </TabsList>
            <TabsContent className="mt-0" value="specifications">
                <div className="w-full border border-[#8c6d52] rounded-b-sm">
                    <table className="min-w-full text-left text-sm font-light">
                        <tbody>
                            {
                                product_specifications.map((item, i) => <tr className="" key={i}>
                                    <th className="whitespace-nowrap border-r border-[#8c6d52] px-6 py-4 text-left" scope="row">{item.title}</th>
                                    <td className="whitespace-nowrap px-6 py-4 text-right">{item.description}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </TabsContent>
            <TabsContent className="mt-0" value="description">
                <div className="border border-[#8c6d52] px-2 py-4 rounded-b-sm" dangerouslySetInnerHTML={{ __html: description }} />
            </TabsContent>
        </Tabs>
    </div>
}