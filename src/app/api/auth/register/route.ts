import { register } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { status, message, error } = await register(requestBody);
  return NextResponse.json({ status, message, error }, { status });
}
