import { toast } from "react-toastify";
import { toastConfig } from "../utils/constants";
import { useCallback } from "react";

export function useToast(){
    const toastSuccess = useCallback((msg:string) => {toast.dismiss() ; toast.success(msg, toastConfig)}, []);
    const toastError = useCallback((msg:string) => {toast.dismiss() ; toast.error(msg, toastConfig)}, []);
    const toastInfo = useCallback((msg:string) => {toast.dismiss() ; toast.info(msg, toastConfig)}, []);
    return {
        toastSuccess,
        toastError,
        toastInfo
    };
}