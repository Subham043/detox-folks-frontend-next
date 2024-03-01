import { axiosPrivate } from "@/app/_libs/utils/axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { api } from "@/app/_libs/utils/routes/api";
import { authOptions } from "@/app/_libs/utils/contants/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions)
    try {
        const response = await axiosPrivate.get(api.billing_information_all, {
            headers: {
                Authorization: session!==null ? `Bearer ${session.user.token}` : ''
            }
        });
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