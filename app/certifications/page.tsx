import Breadcrumb from "@/app/_libs/components/Breadcrumb";
import { Metadata } from "next";
import CertificateSlider from "./_components/CertificateSlider";

export const metadata:Metadata = {
  title: 'ParcelCounter | Certifications',
  description: 'ParcelCounter is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware.',
}

export default function Contact() {
    return (
        <>
            <Breadcrumb name="Certifications" />
            <div className="w-full py-10">
                <div className="container mx-auto">
                    <CertificateSlider />
                </div>
            </div>
        </>
    );
  }