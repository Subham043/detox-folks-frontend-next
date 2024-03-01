import { getServerSession } from "next-auth";
import { axiosPrivate } from "@/app/_libs/utils/axios";
import { NextResponse } from "next/server";
import { api } from "@/app/_libs/utils/routes/api";
import { authOptions } from "@/app/_libs/utils/contants/authOptions";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    try {
        const body = await request.json()
        const response = await axiosPrivate.post(api.billing_address_create, {...body}, {
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