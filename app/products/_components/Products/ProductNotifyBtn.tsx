import Spinner from "@/app/_libs/components/Spinner";
import { useToast } from "@/app/_libs/hooks/useToast";
import { useState } from "react";
import { FaBell } from "react-icons/fa";

export default function ProductNotifyBtn(){
    const [loading, setLoading] = useState(false);
    const { toastSuccess } = useToast();

    const handleClick = () => {
      setLoading(true);

      // stop loading after 2 seconds
      setTimeout(() => {
        setLoading(false);
        toastSuccess("You will be notified once the product is in stock.")
      }, 2000);
    };

    return <button title="Notify Me" onClick={handleClick} className=" mt-2 mx-auto w-full bg-[#8c6d52] text-sm text-white text-center px-3 py-2 rounded-sm border-[#8c6d52] border flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600">
       {loading ? <Spinner type="small" />: <><FaBell /> <span>NOTIFY</span></>}
    </button>
}