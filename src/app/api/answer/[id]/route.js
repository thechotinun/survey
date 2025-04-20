import axiosInstance from "@/app/utils/axios.interceptor";
import { NextResponse } from "next/server";

//POST
export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const reqBody = await req.json();
    const response = await axiosInstance.post(`/survay-answer/${id}`, reqBody);
    return NextResponse.json(response.data, {
      status: response.data.status.code,
    });
  } catch (error) {
    console.error("Error comment data:", error.response?.data || error);
  }
}