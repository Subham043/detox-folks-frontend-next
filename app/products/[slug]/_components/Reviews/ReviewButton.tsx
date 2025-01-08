import { Dialog, DialogContent, DialogTrigger } from "@/app/_libs/components/ui/dialog"
import { useState } from "react"
import { MdOutlineMessage, MdOutlineRateReview } from "react-icons/md"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@/app/_libs/utils/routes/api";
import { useToast } from "@/app/_libs/hooks/useToast";
import { axiosPublic } from "@/app/_libs/utils/axios";
import Textarea from "@/app/_libs/components/Textarea";
import IconButton from "@/app/_libs/components/IconButton";
import { IoSend } from "react-icons/io5";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useSession } from "next-auth/react";

const schema = yup
 .object({
  rating: yup.number().min(1).max(5).required(),
  comment: yup.string().optional(),
 })
 .required();


export default function ReviewButton({ slug }: { slug: string }) {
 const { status } = useSession();
 const [isOpen, setIsOpen] = useState<boolean>(false)
 const { toastSuccess, toastError } = useToast();
 const [loading, setLoading] = useState(false);

 const {
  handleSubmit,
  register,
  getValues,
  reset,
  setError,
  watch,
  setValue,
  formState: { errors },
 } = useForm({
  resolver: yupResolver(schema),
  values: {
   rating: 5,
   comment: undefined,
  }
 });

 const rating = watch("rating");

 const onSubmit = async () => {
  setLoading(true);
  try {
   const response = await axiosPublic.post(api.products + `/${slug}/reviews/create`, { ...getValues() });
   toastSuccess(response.data.message);
   reset({
    rating: 5,
    comment: undefined,
   });
   setIsOpen(false);
  } catch (error: any) {
   console.log(error);
   if (error?.response?.data?.message) {
    toastError(error?.response?.data?.message);
   }
   if (error?.response?.data?.errors?.rating) {
    setError("rating", {
     type: "server",
     message: error?.response?.data?.errors?.rating[0],
    });
   }
   if (error?.response?.data?.errors?.comment) {
    setError("comment", {
     type: "server",
     message: error?.response?.data?.errors?.comment[0],
    });
   }
  } finally {
   setLoading(false);
  }
 };

 return <>
  {status === "authenticated" && <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); reset(); }}>
   <DialogTrigger asChild>
    <button className=" mt-2 w-full text-sm text-[#8c6d52] text-center px-3 py-2 rounded-sm border-[#8c6d52] border flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600 hover:text-white hover:border-gray-600">
     <MdOutlineRateReview /> <span>REVIEW</span>
    </button>
   </DialogTrigger>
   <DialogContent className="p-0">
    <div className=" w-full">
     <div className=" w-full px-3 pt-3">
      <h5 className=" text-lg text-[#8c6d52] font-semibold text-ellipsis">Add Review</h5>
     </div>
     <form method="POST" onSubmit={handleSubmit(onSubmit)} className=" w-full px-3 py-3">
      <div className=" w-full mb-3">
       <div className=" flex flex-wrap justify-center gap-2 mt-1">
        {[1, 2, 3, 4, 5].map((index) => (
         <button key={index} type="button" onClick={(e) => {
          e.preventDefault();
          setValue("rating", index)
         }} className=" text-[#8c6d52] text-2xl">
          {index <= rating ? <FaStar /> : <FaRegStar />}
         </button>
        ))}
       </div>
      </div>
      <Textarea Icon={MdOutlineMessage} placeholder="Your Comment" register={register} errors={errors} name="comment" />
      <IconButton Icon={IoSend} text="SUBMIT" loading={loading} />
     </form>
    </div>
   </DialogContent>
  </Dialog>}
 </>
}