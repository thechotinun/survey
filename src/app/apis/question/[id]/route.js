import axiosInstance from "@/app/utils/axios.interceptor";
import { NextResponse } from "next/server";

// FIND (GET) function
export async function GET(req, { params }) {
    try {
      const { id } = params;
  
      const response = await axiosInstance.get(`/questions/${id}`);
      return NextResponse.json(response.data, {
        status: response.data.status.code,
      });
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error);
      return NextResponse.json(
        { message: "Error fetching data", error: error.response?.data || error },
        { status: error.response?.data?.status.code || 500 }
      );
    }
  }