import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const credentials = await request.json();
    const cookieStore = await cookies();

    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      console.error("Backend-ээс HTML ирлээ:", errorText);
      return NextResponse.json(
        { message: "Backend server error (HTML returned)" },
        { status: 500 },
      );
    }

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Нэвтрэхэд алдаа гарлаа" },
        { status: response.status },
      );
    }

    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json(
      { message: "Server connection failed" },
      { status: 500 },
    );
  }
}
