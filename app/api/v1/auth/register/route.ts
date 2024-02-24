import { api_routes } from "@/app/utils/api_routes";
import { axiosPrivate } from "@/app/utils/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const response = await axiosPrivate.post(api_routes.register, {...body});
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