import { axiosPrivate } from "@/app/_libs/utils/axios";
import { api } from "@/app/_libs/utils/routes/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const response = await axiosPrivate.post(api.forgot_password, {...body});
        return NextResponse.json({
            ...response.data
        }, {
            status: response.status,
        });
        
    } catch (error:any) {
        return NextResponse.json({
            ...error.response.data
        }, {
            status: error.response.status,
        });
    }
}