"use client";

import { Dispatch, SetStateAction, useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import CheckoutCart from './CheckoutCart'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { BiSelectMultiple } from 'react-icons/bi';
import BillingInformation from '@/app/_libs/components/BillingInformation';
import BillingAddress from '@/app/_libs/components/BillingAddress';

const styleConfig = {
    activeBgColor: '#848484',
    activeTextColor: '#ffffff',
    completedBgColor: '#222222',
    completedTextColor: '#ffffff',
    inactiveBgColor: '#e0e0e0',
    inactiveTextColor: '#222',
    size: '2em',
    circleFontSize: '1rem',
    labelFontSize: '0.875rem',
    borderRadius: '50%',
    fontWeight: 500,
}

const CheckOutStep = ({setActiveStep}:{setActiveStep: Dispatch<SetStateAction<number>>}) => {
    return <div className='w-full'>
        <CheckoutCart />
        <div className={` flex flex-wrap justify-end items-center mt-2`}>
            <button onClick={()=>setActiveStep(1)} className=" w-1/5 bg-black text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><span>Billing Address</span> <FaLongArrowAltRight /></button>
        </div>
    </div>
}

const BillingInformationStep = ({setActiveStep}:{setActiveStep: Dispatch<SetStateAction<number>>}) => {
    return <div className='w-full'>
        <BillingInformation />
        <div className={` flex flex-wrap justify-between items-center mt-2`}>
            <button onClick={()=>setActiveStep(0)} className=" w-1/5 bg-black text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><FaLongArrowAltLeft /> <span>Order Summary</span></button>
            <button onClick={()=>setActiveStep(2)} className=" w-1/5 bg-black text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><span>Billing Address</span> <FaLongArrowAltRight /></button>
        </div>
    </div>
}

const BillingAddressStep = ({setActiveStep}:{setActiveStep: Dispatch<SetStateAction<number>>}) => {
    return <div className='w-full'>
        <BillingAddress />
        <div className={` flex flex-wrap justify-between items-center mt-2`}>
            <button onClick={()=>setActiveStep(1)} className=" w-1/5 bg-black text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><FaLongArrowAltLeft /> <span>Billing Address</span></button>
            <button onClick={()=>setActiveStep(3)} className=" w-1/5 bg-black text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><span>Payment</span> <FaLongArrowAltRight /></button>
        </div>
    </div>
}

const PaymentStep = ({setActiveStep}:{setActiveStep: Dispatch<SetStateAction<number>>}) => {
    return <div className='w-full'>
        <CheckoutCart />
        <div className={` flex flex-wrap justify-between items-center mt-2`}>
            <button onClick={()=>setActiveStep(2)} className=" w-1/5 bg-black text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><FaLongArrowAltLeft /> <span>Billing Address</span></button>
            <button onClick={()=>setActiveStep(3)} className=" w-1/5 bg-black text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold"><BiSelectMultiple /> <span>Place Order</span></button>
        </div>
    </div>
}

const ActiveComponent = ({activeStep, setActiveStep}:{activeStep:number, setActiveStep: Dispatch<SetStateAction<number>>}) => {
    switch (activeStep) {
        case 0:
            return <CheckOutStep setActiveStep={setActiveStep} />
        case 1:
            return <BillingInformationStep setActiveStep={setActiveStep} />
        case 2:
            return <BillingAddressStep setActiveStep={setActiveStep} />
        case 3:
            return <PaymentStep setActiveStep={setActiveStep} />
        default:
            return <CheckOutStep setActiveStep={setActiveStep} />
    }
}

export default function MultiStepCheckout() {
    const [activeStep, setActiveStep] = useState<number>(0);
    return <div className='w-full'>
        <div className=' px-5 pt-5'>
            <Stepper activeStep={activeStep} styleConfig={styleConfig}>
                <Step label="Order Summary" />
                <Step label="Billing Information" />
                <Step label="Delivery Address" />
                <Step label="Payment" />
            </Stepper>
        </div>
        <div className=' border-t border-dashed border-gray-400 pt-3'>
            <div className=' px-5 pb-5'>
                <ActiveComponent activeStep={activeStep} setActiveStep={setActiveStep} />
            </div>
        </div>
    </div>
}