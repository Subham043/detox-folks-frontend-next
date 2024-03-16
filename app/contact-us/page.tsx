import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import { MdLocationOn, MdOutlineAlternateEmail, MdOutlinePhoneIphone } from "react-icons/md";
import ContactCard from "./_components/ContactCard";
import ContactForm from "./_components/ContactForm";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: 'ParcelCounter | Contact Us',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default function Contact() {
    return (
        <>
            <Breadcrumb name="Contact Us" />
            <div className="w-full py-10">
                <div className="container mx-auto">
                    <div className="flex flex-wrap justify-between items-start">
                        <ContactCard Icon={MdLocationOn} title="Head Office" description="2, OVH ROAD, BASAVANAGUDI, BENGALURU, Pin - 560004" />
                        <ContactCard Icon={MdOutlinePhoneIphone} title="Phone Number" description="9380911495" />
                        <ContactCard Icon={MdOutlineAlternateEmail} title="Support Mail" description="detoxfolks@gmail.com" />
                    </div>
                    <div className="flex flex-wrap justify-between items-start mt-10">
                        <div className=" w-full mb-5 lg:mb-0 lg:w-[48%] px-3 lg:px-10 py-5 lg:py-10 bg-white rounded-md box-border">
                            <iframe className="w-full border-none h-[350px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5026155884916!2d77.5720984750164!3d12.939657687372815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15d352e5431b%3A0x5f069f718b19f2e5!2sDetoxfolks%20Private%20Limited!5e0!3m2!1sen!2sin!4v1697790476586!5m2!1sen!2sin" aria-hidden="false" tabIndex={0}></iframe>
                        </div>
                        <div className=" w-full lg:w-[48%] px-3 lg:px-10 py-5 lg:py-10 bg-white rounded-md box-border">
                            <h3 className=" text-xl text-black font-semibold mb-5">Drop Your Thoughts</h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }