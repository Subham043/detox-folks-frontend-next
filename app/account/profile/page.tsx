import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import ProfileForm from "./_components/ProfileForm";
import PasswordForm from "./_components/PasswordForm";
import BillingInformation from "@/app/_libs/components/BillingInformation";
import BillingAddress from "@/app/_libs/components/BillingAddress";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'ParcelCounter | Profile',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default function Profile() {
    return <>
        <Breadcrumb name="Profile" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start">
                    <div className="w-full mb-5 lg:mb-0 lg:w-[48%] px-5 py-5 bg-white rounded-md box-border">
                        <h3 className=" text-xl text-black font-semibold mb-5">Your Profile</h3>
                        <ProfileForm />
                    </div>
                    <div className="w-full mb-5 lg:mb-0 lg:w-[48%] px-5 py-5 bg-white rounded-md box-border">
                        <h3 className=" text-xl text-black font-semibold mb-5">Password Setting</h3>
                        <PasswordForm />
                    </div>
                </div>
                <div className="flex flex-wrap justify-between items-start mt-5">
                    <div className="w-full mb-5 lg:mb-0 lg:w-[48%] px-5 py-5 bg-white rounded-md box-border">
                        <BillingInformation />
                    </div>
                    <div className="w-full lg:w-[48%] px-5 py-5 bg-white rounded-md box-border">
                        <BillingAddress />
                    </div>
                </div>
            </div>
        </div>
    </>
}