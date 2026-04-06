import { NextResponse } from "next/server";

type Credentials = {
  email: string;
  password: string;
};
type SignInResponse = {
  token: string;
  message?: string;
};

export const signIn = async (credentials: Credentials) => {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = (await response.json()) as SignInResponse;

  if (!response.ok) {
    return NextResponse.json(
      { message: data.message },
      { status: response.status },
    );
  } else {
    return NextResponse.json({ message: "logged in" });
  }
};
