import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { phone, message } = await req.json();

    const url =
      "https://www.fast2sms.com/dev/bulkV2" +
      `?authorization=${process.env.FAST2SMS_API_KEY}` +
      `&route=q` +
      `&numbers=${phone}` +
      `&message=${encodeURIComponent(message)}`;

    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    return NextResponse.json({
      success: true,
      fast2sms: data,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
