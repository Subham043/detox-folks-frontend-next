import { axiosPrivate } from "@/app/_libs/utils/axios";
import { api } from "@/app/_libs/utils/routes/api";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const response = await axiosPrivate.get(api.about_section);
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