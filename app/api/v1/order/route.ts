import { axiosPrivate } from "@/app/_libs/utils/axios";
import { authOptions } from "@/app/_libs/utils/contants/authOptions";
import { api } from "@/app/_libs/utils/routes/api";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions)
    try {
        const response = await axiosPrivate.get(api.place_order_paginate, {
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