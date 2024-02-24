import { api_routes } from "@/app/utils/api_routes";
import { axiosPrivate } from "@/app/utils/axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { search } = new URL(request.url)

    try {
        const response = await axiosPrivate.get(api_routes.products + search);
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