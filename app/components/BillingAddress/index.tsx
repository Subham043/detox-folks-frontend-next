import AddBillingAddressDialog from "./AddBillingAddressDialog";
import BillingAddressSection from "./BillingAddressSection";

export default function BillingAddress(){

    return <div className="w-full">
        <div className=" flex justify-between items-center mb-5">
            <h3 className=" text-xl text-black font-semibold">Billing Address</h3>
            <AddBillingAddressDialog />
        </div>
        <BillingAddressSection />
    </div>
}