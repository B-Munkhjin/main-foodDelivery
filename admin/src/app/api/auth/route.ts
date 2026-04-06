// ///tsaashaa web dre hadgalah bish cookie-d buyu oordeeree, server dre hadgalj bna
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type SignInResponse = {
  token: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const credentials = await request.json();
    const cookieStore = await cookies();

    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = (await response.json()) as SignInResponse;
    cookieStore.set("token", data.token);
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status },
      );
    }
    return NextResponse.json({ message: "logged in" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
