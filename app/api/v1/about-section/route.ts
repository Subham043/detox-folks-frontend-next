import { api_routes } from "@/app/utils/api_routes";
import { axiosPrivate } from "@/app/utils/axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await axiosPrivate.get(api_routes.about_section);
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