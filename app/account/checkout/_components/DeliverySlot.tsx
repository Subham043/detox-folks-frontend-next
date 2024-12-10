import Image from "next/image";
import morning from "../../../../public/morning.png";
import afternoon from "../../../../public/afternoon.png";
import evening from "../../../../public/evening.png";
import { Dispatch, SetStateAction } from "react";

export default function DeliverySlot({selectedDeliverySlot, setSelectedDeliverySlot}:{
  selectedDeliverySlot: 'Morning: 9:00 AM - 11:00 AM'|'Evening: 6:00 PM - 8:00 PM'|'Afternoon: 2:00 PM - 4:00 PM',
  setSelectedDeliverySlot: Dispatch<SetStateAction<'Morning: 9:00 AM - 11:00 AM'|'Evening: 6:00 PM - 8:00 PM'|'Afternoon: 2:00 PM - 4:00 PM'>>,
}) {
  return (
    <div className="w-full mb-3">
        <div className=" w-full mb-5">
            <h3 className=" text-base md:text-xl text-[#8c6d52] font-semibold">Select Delivery Slot</h3>
            <p className=" text-neutral-500 text-sm md:text-base">Delivery will be made between your selected delivery slot.</p>
        </div>
        <div className=" w-full border border-gray-300 rounded-sm">
          <button onClick={()=>setSelectedDeliverySlot('Morning: 9:00 AM - 11:00 AM')} className={`w-full border-b border-gray-300 text-left  ${selectedDeliverySlot==='Morning: 9:00 AM - 11:00 AM' ? 'bg-[#ede1d736]' : ''}`}>
              <div className=" w-full px-3 py-3">
                <div className=" w-full flex flex-wrap justify-start items-center gap-5">
                  <Image src={morning} alt="cash" width={70} height={60} />
                  <div className=" flex-1">
                    <h4 className=" text-lg font-semibold">Morning: 9:00 AM - 11:00 AM</h4>
                    <p className=" text-sm md:text-base text-neutral-500">The order will be delivered between 9:00 AM - 11:00 AM</p>
                  </div>
                </div>
              </div>
          </button>
          <button onClick={()=>setSelectedDeliverySlot('Afternoon: 2:00 PM - 4:00 PM')} className={`w-full border-b border-gray-300 text-left  ${selectedDeliverySlot==='Afternoon: 2:00 PM - 4:00 PM' ? 'bg-[#ede1d736]' : ''}`}>
              <div className=" w-full px-3 py-3">
                <div className=" w-full flex flex-wrap justify-start items-center gap-5">
                  <Image src={afternoon} alt="razoray" width={70} height={60} />
                  <div className=" flex-1">
                    <h4 className=" text-lg font-semibold">Afternoon: 2:00 PM - 4:00 PM</h4>
                    <p className=" text-sm md:text-base text-neutral-500">The order will be delivered between 2:00 PM - 4:00 PM</p>
                  </div>
                </div>
              </div>
          </button>
          <button onClick={()=>setSelectedDeliverySlot('Evening: 6:00 PM - 8:00 PM')} className={`w-full text-left  ${selectedDeliverySlot==='Evening: 6:00 PM - 8:00 PM' ? 'bg-[#ede1d736]' : ''}`}>
              <div className=" w-full px-3 py-3">
                <div className=" w-full flex flex-wrap justify-start items-center gap-5">
                  <Image src={evening} alt="razoray" width={70} height={60} />
                  <div className=" flex-1">
                    <h4 className=" text-lg font-semibold">Evening: 6:00 PM - 8:00 PM</h4>
                    <p className=" text-sm md:text-base text-neutral-500">The order will be delivered between 6:00 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>
          </button>
        </div>
    </div>
  )
}