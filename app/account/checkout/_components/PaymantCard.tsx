import Image from "next/image";
import cash from "../../../../public/money.webp";
// import phonepe from "../../../../public/phonepe.webp";
// import razorpay from "../../../../public/razorpay.webp";
import payu from "../../../../public/payu.webp";
// import cashfree from "../../../../public/cashfree.webp";
import { Dispatch, SetStateAction } from "react";

export default function PaymantCard({selectedPaymentMode, setSelectedPaymentMode}:{
  selectedPaymentMode: 'Cash On Delivery'|'Online - Phonepe'|'Online - Razorpay'|'Online - PayU'|'Online - CashFree',
  setSelectedPaymentMode: Dispatch<SetStateAction<'Cash On Delivery'|'Online - Phonepe'|'Online - Razorpay'|'Online - PayU'|'Online - CashFree'>>,
}) {
  return (
    <div className="w-full mb-3">
        <div className=" w-full mb-5">
            <h3 className=" text-base md:text-xl text-[#8c6d52] font-semibold">Select Payment Mode</h3>
            <p className=" text-neutral-500 text-sm md:text-base">All transactions are secure and encrypted.</p>
        </div>
        <div className=" w-full border border-gray-300 rounded-sm">
          {/* <button onClick={()=>setSelectedPaymentMode('Online - Phonepe')} className={`w-full border-b border-gray-300 text-left ${selectedPaymentMode==='Online - Phonepe' ? 'bg-[#ede1d736]' : ''}`}>
              <div className=" w-full px-3 py-3">
                <div className=" w-full flex flex-wrap justify-start items-center gap-5">
                  <Image src={phonepe} alt="phonepe" width={70} height={60} />
                  <div className=" flex-1">
                    <h4 className=" text-lg font-semibold">Phonepe</h4>
                    <p className=" text-sm md:text-base text-neutral-500">After clicking “ Place Order ”, you will be redirected to Phonepe (Cards, UPI, NetBanking, Wallets) to complete your purchase securely</p>
                  </div>
                </div>
              </div>
          </button>
          <button onClick={()=>setSelectedPaymentMode('Online - Razorpay')} className={`w-full border-b border-gray-300 text-left  ${selectedPaymentMode==='Online - Razorpay' ? 'bg-[#ede1d736]' : ''}`}>
              <div className=" w-full px-3 py-3">
                <div className=" w-full flex flex-wrap justify-start items-center gap-5">
                  <Image src={razorpay} alt="razoray" width={70} height={60} />
                  <div className=" flex-1">
                    <h4 className=" text-lg font-semibold">Razorpay - UPI</h4>
                    <p className=" text-sm md:text-base text-neutral-500">After clicking “ Place Order ”, you will be redirected to Razorpay (UPI, Wallets) to complete your purchase securely</p>
                  </div>
                </div>
              </div>
          </button> */}
          <button onClick={()=>setSelectedPaymentMode('Online - PayU')} className={`w-full border-b border-gray-300 text-left  ${selectedPaymentMode==='Online - PayU' ? 'bg-[#ede1d736]' : ''}`}>
              <div className=" w-full px-3 py-3">
                <div className=" w-full flex flex-wrap justify-start items-center gap-5">
                  <Image src={payu} alt="razoray" width={70} height={60} />
                  <div className=" flex-1">
                    <h4 className=" text-lg font-semibold">PayU</h4>
                    <p className=" text-sm md:text-base text-neutral-500">After clicking “ Place Order ”, you will be redirected to PayU (Cards, UPI, NetBanking, Wallets) to complete your purchase securely</p>
                  </div>
                </div>
              </div>
          </button>
          {/* <button onClick={()=>setSelectedPaymentMode('Online - CashFree')} className={`w-full border-b border-gray-300 text-left  ${selectedPaymentMode==='Online - CashFree' ? 'bg-[#ede1d736]' : ''}`}>
              <div className=" w-full px-3 py-3">
                <div className=" w-full flex flex-wrap justify-start items-center gap-5">
                  <Image src={cashfree} alt="razoray" width={70} height={60} />
                  <div className=" flex-1">
                    <h4 className=" text-lg font-semibold">CashFree</h4>
                    <p className=" text-sm md:text-base text-neutral-500">After clicking “ Place Order ”, you will be redirected to CashFree (Cards, UPI, NetBanking, Wallets) to complete your purchase securely</p>
                  </div>
                </div>
              </div>
          </button> */}
          <button onClick={()=>setSelectedPaymentMode('Cash On Delivery')} className={`w-full text-left  ${selectedPaymentMode==='Cash On Delivery' ? 'bg-[#ede1d736]' : ''}`}>
              <div className=" w-full px-3 py-3">
                <div className=" w-full flex flex-wrap justify-start items-center gap-5">
                  <Image src={cash} alt="cash" width={70} height={60} />
                  <div className=" flex-1">
                    <h4 className=" text-lg font-semibold">Cash On Delivery</h4>
                    <p className=" text-sm md:text-base text-neutral-500">Pay with cash upon delivery</p>
                  </div>
                </div>
              </div>
          </button>
        </div>
    </div>
  )
}