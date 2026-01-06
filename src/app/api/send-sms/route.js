import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { phone, message } = await req.json();

    if (!phone || !message) {
      return NextResponse.json(
        { error: "Phone and message are required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: process.env.FAST2SMS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "q",
        message: message,
        numbers: phone,
      }),
    });

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: "SMS failed" },
      { status: 500 }
    );
  }
}
