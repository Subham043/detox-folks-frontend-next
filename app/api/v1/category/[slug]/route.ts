import { axiosPrivate } from "@/app/_libs/utils/axios";
import { api } from "@/app/_libs/utils/routes/api";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slug: string } }) {

    try {
        const response = await axiosPrivate.get(api.categories + `/${params.slug}`);
        if(response?.data?.category){
            return NextResponse.json({
                category: response.data.category
            }, {
                status: response.status,
            });
        }
        return NextResponse.json({
            category: null
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