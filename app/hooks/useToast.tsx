import { toast } from "react-toastify";
import { toastConfig } from "../utils/constants";

export function useToast(){
    const toastSuccess = (msg:string) => {toast.dismiss() ; toast.success(msg, toastConfig)};
    const toastError = (msg:string) => {toast.dismiss() ; toast.error(msg, toastConfig)};
    const toastInfo = (msg:string) => {toast.dismiss() ; toast.info(msg, toastConfig)};
    return {
        toastSuccess,
        toastError,
        toastInfo
    };
}