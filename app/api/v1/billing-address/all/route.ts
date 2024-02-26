import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { api_routes } from "@/app/utils/api_routes";
import { axiosPrivate } from "@/app/utils/axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions)
    try {
        const response = await axiosPrivate.get(api_routes.billing_address_all, {
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