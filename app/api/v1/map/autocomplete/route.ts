import { axiosPrivate } from "@/app/_libs/utils/axios";
import { authOptions } from "@/app/_libs/utils/contants/authOptions";
import { api } from "@/app/_libs/utils/routes/api";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  try {
    const body = await request.json();
    const response = await axiosPrivate.post(
      api.map_autocomplete,
      { ...body },
      {
        headers: {
          Authorization: session !== null ? `Bearer ${session.user.token}` : "",
        },
      }
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
