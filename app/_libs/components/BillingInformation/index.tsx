import AddBillingInformationDialog from "./AddBillingInformationDialog";
import BillingInformationSection from "./BillingInformationSection";

export default function BillingInformation(){

    return <div className="w-full">
        <div className=" flex justify-between items-center mb-5">
            <h3 className=" text-xl text-black font-semibold">Billing Information</h3>
            <AddBillingInformationDialog />
        </div>
        <BillingInformationSection />
    </div>
}