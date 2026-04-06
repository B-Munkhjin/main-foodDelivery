"use client";

import Link from "next/link";
import { AddFood } from "./Components/AddFood";
import { signIn } from "../lib/services/sign-in";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Route, User } from "lucide-react";
import { useRouter } from "next/navigation";
//dandaa server bna

export default function Home() {
  return (
    <div className="font-inter w-full h-full">
      <div className="w-full h-full">
        <SignIn />
      </div>
    </div>
  );
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    setError("");
    const credentials = { email, password };
    try {
      const response = await signIn(credentials);
      const errorMessage = await response.json();

      if (response.status !== 200) {
        setError(errorMessage.message);
        return;
      }
      router.push("/dashboard/foods");
    } catch (err) {
      setError("Burtgelgui hereglegch esvel password buruu bn!");
      // console.error(error);
    }
  };

  return (
    <div className="flex justify-between w-full h-full items-center">
      <div className="flex flex-col w-104 gap-6 ml-30">
        <Button className="size-9 justify-center items-center bg-[#FFFFFF] border border-[#E4E4E7] rounded-md text-black">
          <ChevronLeft />
        </Button>

        <div className="h-15 gap-1 flex flex-col justify-start">
          <h1 className="font-semibold text-2xl text-[#09090B]">Log in </h1>
          <p className=" text-base text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <div className=" flex flex-col h-31 w-104 gap-4">
          <Input
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-9 w-full border border-[#E4E4E7] bg-[#FFFFFF] rounded-md py-2 px-3"
          />
          <Input
            placeholder="Password"
            // type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-9 w-full border border-[#E4E4E7] bg-[#FFFFFF] rounded-md py-2 px-3"
          />
          <h1 className="text-sm text-[#18181B] underline">
            Forgot password ?
          </h1>
        </div>
        <Button
          onClick={onSubmit}
          className="rounded-md font-medium bg-[#18181B] text-[#FAFAFA] text-sm flex justify-center items-center"
        >
          {/* orson email password requirementtei taarch bvl bg-har bolno ugui bol sarral bna */}
          Let's Go
        </Button>
        <div className="flex flex-col justify-center gap-1">
          <div className="flex justify-center gap-3">
            <p className="text-base text-[#71717A]">Don’t have an account?</p>
            <button className="text-[#2563EB] text-base">Sign up </button>
          </div>
          <div className="flex justify-center">
            {error && <h1 className="text-[#e43737] text-base ">{error}</h1>}
          </div>
        </div>
      </div>

      <div className="flex my-25 ml-25 mr-8">
        <img src="/login.jpg" className="rounded-2xl h-280" />
      </div>
    </div>
  );
};
