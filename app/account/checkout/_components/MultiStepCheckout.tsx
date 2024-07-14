"use client";

import { Dispatch, SetStateAction, useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import CheckoutCart from './CheckoutCart'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { BiSelectMultiple } from 'react-icons/bi';
import BillingInformation from '@/app/_libs/components/BillingInformation';
import BillingAddress from '@/app/_libs/components/BillingAddress';
import PaymantCard from './PaymantCard';
import { useCartProvider } from '@/app/_libs/context/CartProvider';
import { axiosPublic } from '@/app/_libs/utils/axios';
import { api } from '@/app/_libs/utils/routes/api';
import { useToast } from '@/app/_libs/hooks/useToast';
import { Skeleton } from '@/app/_libs/components/ui/skeleton';
import Spinner from '@/app/_libs/components/Spinner';
import { useRouter } from 'next/navigation';
import { page } from '@/app/_libs/utils/routes/pages';
import VerifyPaymentLoading from './VerifyPaymentLoading';

const styleConfig = {
    activeBgColor: '#848484',
    activeTextColor: '#ffffff',
    completedBgColor: '#8c6d52',
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
    const {cart, cartLoading} = useCartProvider()
    return <div className='w-full'>
        {cartLoading ? <>
            <div className=' px-3 lg:px-5'>
                <Skeleton className='h-[300px] w-full rounded-md' />
            </div>
        </> : <>
            <div className=' px-3 lg:px-5'>
                <CheckoutCart />
            </div>
            {cart.cart.length>0 && <div className=' border-t border-dashed border-gray-400 pt-3'>
                <div className=' px-3 lg:px-5 pb-5'>
                    <div className={` flex flex-wrap justify-end items-center mt-2`}>
                        <button onClick={()=>setActiveStep(1)} className="  w-auto lg:w-1/5 bg-[#8c6d52] text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600"><span>Billing Address</span> <FaLongArrowAltRight /></button>
                    </div>
                </div>
            </div>}
        </>}
    </div>
}

const BillingInformationStep = ({setActiveStep, selectedBillingInformation, setSelectedBillingInformation}:{
    setActiveStep: Dispatch<SetStateAction<number>>,
    selectedBillingInformation:number|undefined, 
    setSelectedBillingInformation: Dispatch<SetStateAction<number|undefined>>,
}) => {
    return <div className='w-full'>
        <div className=' px-3 lg:px-5'>
            <BillingInformation title='Select Billing Information' selectionAvailable={true} selectedItem={selectedBillingInformation} setSelectedItem={setSelectedBillingInformation} />
        </div>
        <div className=' border-t border-dashed border-gray-400 pt-3'>
            <div className=' px-3 lg:px-5 pb-5'>
                <div className={` flex flex-wrap justify-between items-center mt-2`}>
                    <button onClick={()=>setActiveStep(0)} className=" w-auto lg:w-1/5 bg-[#8c6d52] text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600"><FaLongArrowAltLeft /> <span>Order Summary</span></button>
                    {selectedBillingInformation && <button onClick={()=>setActiveStep(2)} className="  w-auto lg:w-1/5 bg-[#8c6d52] text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600"><span>Billing Address</span> <FaLongArrowAltRight /></button>}
                </div>
            </div>
        </div>
    </div>
}

const BillingAddressStep = ({setActiveStep, selectedBillingAddress, setSelectedBillingAddress}:{
    setActiveStep: Dispatch<SetStateAction<number>>,
    selectedBillingAddress:number|undefined, 
    setSelectedBillingAddress: Dispatch<SetStateAction<number|undefined>>,
}) => {
    return <div className='w-full'>
        <div className=' px-3 lg:px-5'>
            <BillingAddress title='Select Delivery Address' selectionAvailable={true} selectedItem={selectedBillingAddress} setSelectedItem={setSelectedBillingAddress} />
        </div>
        <div className=' border-t border-dashed border-gray-400 pt-3'>
            <div className=' px-3 lg:px-5 pb-5'>
                <div className={` flex flex-wrap justify-between items-center mt-2`}>
                    <button onClick={()=>setActiveStep(1)} className="  w-auto lg:w-1/5 bg-[#8c6d52] text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600"><FaLongArrowAltLeft /> <span>Billing Address</span></button>
                    {selectedBillingAddress && <button onClick={()=>setActiveStep(3)} className="  w-auto lg:w-1/5 bg-[#8c6d52] text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600"><span>Payment</span> <FaLongArrowAltRight /></button>}
                </div>
            </div>
        </div>
    </div>
}

const PaymentStep = ({setActiveStep, selectedPaymentMode, setSelectedPaymentMode, acceptTerms, setAcceptTerms, includeGst, setIncludeGst, paymentHandler, paymentLoading}:{
    setActiveStep: Dispatch<SetStateAction<number>>,
    selectedPaymentMode: 'Cash On Delivery'|'Online - Phonepe'|'Online - Razorpay'|'Online - PayU'|'Online - CashFree',
    setSelectedPaymentMode: Dispatch<SetStateAction<'Cash On Delivery'|'Online - Phonepe'|'Online - Razorpay'|'Online - PayU'|'Online - CashFree'>>,
    acceptTerms: boolean,
    setAcceptTerms: Dispatch<SetStateAction<boolean>>,
    includeGst: boolean,
    setIncludeGst: Dispatch<SetStateAction<boolean>>,
    paymentHandler: () => Promise<void>,
    paymentLoading: boolean,
}) => {
    return <div className='w-full'>
        <div className=' px-3 lg:px-5'>
            <PaymantCard
                selectedPaymentMode={selectedPaymentMode} 
                setSelectedPaymentMode={setSelectedPaymentMode} 
            />
            <div className=' w-full mb-5'>
                <label className=" w-full flex flex-wrap justify-start items-center gap-5 mt-5 cursor-pointer">
                    <input type="checkbox" checked={includeGst} onChange={(e)=>setIncludeGst(e.target.checked)} className=" w-5 h-5 accent-black" />
                    <p className=" text-neutral-500">Use GST Invoice.</p>
                </label>
                <label className=" w-full flex flex-wrap justify-start items-center gap-5 mt-3 cursor-pointer">
                    <input type="checkbox" checked={acceptTerms} onChange={(e)=>setAcceptTerms(e.target.checked)} className=" w-5 h-5 accent-black" />
                    <p className=" text-neutral-500">I accept the <span className=" text-[#8c6d52] font-semibold">Terms & Conditions</span></p>
                </label>
            </div>
        </div>
        <div className=' border-t border-dashed border-gray-400 pt-3'>
            <div className=' px-3 lg:px-5 pb-5'>
                <div className={` flex flex-wrap justify-between items-center mt-2`}>
                    <button onClick={()=>setActiveStep(2)} disabled={paymentLoading} className="  w-auto lg:w-1/5 bg-[#8c6d52] text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600"><FaLongArrowAltLeft /> <span>Billing Address</span></button>
                    {acceptTerms && <button onClick={paymentHandler} disabled={paymentLoading} className="  w-auto lg:w-1/5 bg-[#8c6d52] text-sm text-white text-center px-1 py-2 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600">
                        {paymentLoading ? <Spinner type='small' /> : <><BiSelectMultiple /> <span>Place Order</span></>}
                    </button>}
                </div>
            </div>
        </div>
    </div>
}

const ActiveComponent = ({activeStep, setActiveStep, selectedBillingInformation, setSelectedBillingInformation, selectedBillingAddress, setSelectedBillingAddress, selectedPaymentMode, setSelectedPaymentMode, acceptTerms, setAcceptTerms, includeGst, setIncludeGst, paymentHandler, paymentLoading}:{
    activeStep:number, 
    setActiveStep: Dispatch<SetStateAction<number>>,
    selectedBillingInformation:number|undefined, 
    setSelectedBillingInformation: Dispatch<SetStateAction<number|undefined>>,
    selectedBillingAddress:number|undefined, 
    setSelectedBillingAddress: Dispatch<SetStateAction<number|undefined>>,
    selectedPaymentMode: 'Cash On Delivery'|'Online - Phonepe'|'Online - Razorpay'|'Online - PayU'|'Online - CashFree',
    setSelectedPaymentMode: Dispatch<SetStateAction<'Cash On Delivery'|'Online - Phonepe'|'Online - Razorpay'|'Online - PayU'|'Online - CashFree'>>,
    acceptTerms: boolean,
    setAcceptTerms: Dispatch<SetStateAction<boolean>>,
    includeGst: boolean,
    setIncludeGst: Dispatch<SetStateAction<boolean>>,
    paymentHandler: () => Promise<void>
    paymentLoading: boolean,
}) => {
    switch (activeStep) {
        case 0:
            return <CheckOutStep setActiveStep={setActiveStep} />
        case 1:
            return <BillingInformationStep setActiveStep={setActiveStep} selectedBillingInformation={selectedBillingInformation} setSelectedBillingInformation={setSelectedBillingInformation} />
        case 2:
            return <BillingAddressStep setActiveStep={setActiveStep} selectedBillingAddress={selectedBillingAddress} setSelectedBillingAddress={setSelectedBillingAddress} />
        case 3:
            return <PaymentStep 
                        setActiveStep={setActiveStep} 
                        selectedPaymentMode={selectedPaymentMode} 
                        setSelectedPaymentMode={setSelectedPaymentMode} 
                        acceptTerms={acceptTerms}
                        setAcceptTerms={setAcceptTerms}
                        includeGst={includeGst}
                        setIncludeGst={setIncludeGst}
                        paymentHandler={paymentHandler}
                        paymentLoading={paymentLoading}
                    />
        default:
            return <CheckOutStep setActiveStep={setActiveStep} />
    }
}

export default function MultiStepCheckout() {
    const router = useRouter();
    const {fetchCart} = useCartProvider()
    const {toastSuccess, toastError} = useToast();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [selectedBillingInformation, setSelectedBillingInformation] = useState<number|undefined>();
    const [selectedBillingAddress, setSelectedBillingAddress] = useState<number|undefined>();
    const [selectedPaymentMode, setSelectedPaymentMode] = useState<'Cash On Delivery'|'Online - Phonepe'|'Online - Razorpay'|'Online - PayU'|'Online - CashFree'>('Online - Phonepe');
    const [acceptTerms, setAcceptTerms] = useState<boolean>(true);
    const [includeGst, setIncludeGst] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [verifyPaymentLoading, setVerifyPaymentLoading] = useState<boolean>(false);

    const paymentWindow = (link:string, order_id:number) => {
        if(typeof window === 'undefined') return;
        const win = window.open(link, "_blank", "resizable=yes, scrollbars=yes, titlebar=yes, width=800, height=600");
        if(win){
            const timer = setInterval(function() { 
                if(win.closed) {
                    clearInterval(timer);
                    verifyPayment(order_id);
                }
            }, 1000);
        }
    }

    const verifyPayment = async (order_id:number) => {
        setVerifyPaymentLoading(true);
        try {
            const response = await axiosPublic.get(api.place_order_detail+`/${order_id}`);
            if(response.data.order.payment.status==='PAID'){
                fetchCart();
                toastSuccess('Order placed successfully.');
                router.push(page.account.orders + `/${order_id}`);
            }
        } catch (error) {
            toastError('Something went wrong. Please try again.');
        }finally {
            setVerifyPaymentLoading(false);
        }
    }

    const paymentHandler = async () => {
        setLoading(true);
        try {
            const response = await axiosPublic.post(api.place_order, {
              billing_address_id: selectedBillingAddress, 
              billing_information_id: selectedBillingInformation, 
              order_mode: 'WEBSITE', 
              mode_of_payment: selectedPaymentMode, 
              accept_terms: acceptTerms ? 1 : 0, 
              include_gst: includeGst ? 1 : 0
            });
            if(selectedPaymentMode==='Cash On Delivery'){
              fetchCart();
              toastSuccess(response.data.message);
              router.push(page.account.orders + `/${response.data?.order?.id}`);
            }
            if(selectedPaymentMode==='Online - Phonepe'){
              paymentWindow(response.data?.order?.payment?.phone_pe_payment_link, response.data?.order?.id);
            }
            if(selectedPaymentMode==='Online - Razorpay'){
                paymentWindow(response.data?.order?.payment?.razorpay_payment_link, response.data?.order?.id);
            }
            if(selectedPaymentMode==='Online - PayU'){
                paymentWindow(response.data?.order?.payment?.payu_payment_link, response.data?.order?.id);
            }
            if(selectedPaymentMode==='Online - CashFree'){
                paymentWindow(response.data?.order?.payment?.cashfree_payment_link, response.data?.order?.id);
            }
          } catch (error: any) {
            console.log(error);
            if (error?.response?.data?.message) {
              toastError(error?.response?.data?.message);
            }
          } finally {
            setLoading(false);
          }
    }

    return <div className='w-full'>
        <div className=' px-3 lg:px-5 pt-5 pb-5'>
            <Stepper activeStep={activeStep} styleConfig={styleConfig}>
                <Step label="Order Summary" />
                <Step label="Billing Information" />
                <Step label="Delivery Address" />
                <Step label="Payment" />
            </Stepper>
        </div>
        <div className=' border-t border-dashed border-gray-400 pt-3'>
            <div className=' w-full'>
                <ActiveComponent 
                    activeStep={activeStep} 
                    setActiveStep={setActiveStep} 
                    selectedBillingInformation={selectedBillingInformation} 
                    setSelectedBillingInformation={setSelectedBillingInformation} 
                    selectedBillingAddress={selectedBillingAddress} 
                    setSelectedBillingAddress={setSelectedBillingAddress} 
                    selectedPaymentMode={selectedPaymentMode} 
                    setSelectedPaymentMode={setSelectedPaymentMode} 
                    acceptTerms={acceptTerms}
                    setAcceptTerms={setAcceptTerms}
                    includeGst={includeGst}
                    setIncludeGst={setIncludeGst}
                    paymentHandler={paymentHandler}
                    paymentLoading={loading}
                />
            </div>
        </div>
        <VerifyPaymentLoading isOpen={verifyPaymentLoading} setIsOpen={setVerifyPaymentLoading} />
    </div>
}