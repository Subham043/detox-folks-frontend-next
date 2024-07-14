import Spinner from "@/app/_libs/components/Spinner";
import { Dialog, DialogContent } from "@/app/_libs/components/ui/dialog";

export default function VerifyPaymentLoading({isOpen, setIsOpen}:{isOpen:boolean, setIsOpen:(open:boolean)=>void}){
 return (
   <Dialog open={isOpen} onOpenChange={(open)=>{setIsOpen(open)}}>
        <DialogContent className="p-0">
            <div className=" w-full">
             <div className="w-full flex justify-center items-center px-3 py-3 bg-[#ede1d736]">
               <div className="w-full flex justify-center items-center gap-2">
                 <Spinner type='small' color="black" />
                 <p>Please wait till we verify your payment.</p> 
               </div>
             </div>
            </div>
        </DialogContent>
    </Dialog>
 )
}