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
            <TabsList className="w-full border-[0.5px] border-solid border-gray-400 border-b-0 rounded-b-none">
                <TabsTrigger className="w-1/2" value="specifications">SPECIFICATIONS</TabsTrigger>
                <TabsTrigger className="w-1/2" value="description">DESCRIPTION</TabsTrigger>
            </TabsList>
            <TabsContent className="mt-0" value="specifications">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light">
                        <tbody>
                            {
                                product_specifications.map((item, i) => <tr className="border border-gray-400" key={i}>
                                    <th className="whitespace-nowrap border-r border-gray-400 px-6 py-4 text-left" scope="row">{item.title}</th>
                                    <td className="whitespace-nowrap border-r border-gray-400 px-6 py-4 text-right">{item.description}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </TabsContent>
            <TabsContent className="mt-0" value="description">
                <div className="border border-gray-400 px-2 py-4" dangerouslySetInnerHTML={{ __html: description }} />
            </TabsContent>
        </Tabs>
    </div>
}