import Breadcrumb from "@/app/components/Breadcrumb";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

export default function Profile() {
    return <>
        <Breadcrumb name="Profile" />
        <div className="w-full py-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start">
                    <div className=" w-[48%] px-5 py-5 bg-white rounded-md box-border">
                        <h3 className=" text-xl text-black font-semibold mb-5">Your Profile</h3>
                        <ProfileForm />
                    </div>
                    <div className=" w-[48%] px-5 py-5 bg-white rounded-md box-border">
                        <h3 className=" text-xl text-black font-semibold mb-5">Password Setting</h3>
                        <PasswordForm />
                    </div>
                </div>
            </div>
        </div>
    </>
}