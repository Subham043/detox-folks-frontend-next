import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { api_routes } from "@/app/utils/api_routes";
import { getServerSession } from "next-auth";
import { axiosPrivate } from "@/app/utils/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    try {
        const body = await request.json()
        const response = await axiosPrivate.post(api_routes.cart_create, {...body}, {
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