import { axiosPrivate } from "@/app/_libs/utils/axios";
import { api } from "@/app/_libs/utils/routes/api";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: { slug: number } }
) {
  try {
    const body = await request.json();
    const response = await axiosPrivate.post(
      api.reset_password + `/${params.slug}`,
      { ...body }
    );
    return NextResponse.json(
      {
        ...response.data,
      },
      {
        status: response.status,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        ...error.response.data,
      },
      {
        status: error.response.status,
      }
    );
  }
}
