import { IconType } from "react-icons";
import Spinner from "../Spinner";

type IconButtonProps = {
    Icon: IconType;
    text: string;
    loading: boolean;
    type?: "button" | "reset" | "submit";
};

export default function IconButton({Icon, text, type="submit", loading}:IconButtonProps) {
    return <div className=" relative w-full">
        <button type={type} disabled={loading} className="w-full bg-[#8c6d52] text-sm text-white text-center px-5 py-3 rounded-sm border-none flex justify-center items-center gap-2 font-semibold transition-all hover:bg-gray-600">
            {
                loading ? <Spinner />:
                <>
                    <Icon /> <span>{text}</span>
                </>
            }
        </button>
    </div>
}