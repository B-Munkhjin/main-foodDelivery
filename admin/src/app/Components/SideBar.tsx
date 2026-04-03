"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { LayoutDashboard, TruckIcon } from "lucide-react";
import { CategorySchema } from "./CategorySchema";
import { AddFood } from "./AddFood";
import { DishesCategory } from "./Categories";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminSideBar = () => {
  const [clicked, setClicked] = useState("foodMenu");
  const handleToggle = (id: string) => {
    setClicked(id);
  };
  const changeColor = (id: string) =>
    clicked === id ? "text-[#E4E4E7] bg-black " : "text-[#09090B] bg-white ";

  const pathname = usePathname();

  return (
    <div className="flex justify-center w-51.25 gap-2.5 px-5 bg-white">
      <SidebarProvider>
        <Sidebar className="flex justify-center w-51.25 bg-white">
          <div className="flex justify-center w-51.25 h-11 pr-5.25 gap-2 items-center relative top-9">
            <img src="/logo.svg" className="size-9" />
            <div className="flex flex-col">
              <div className="text-lg font-semibold text-[#09090B]">NomNom</div>
              <div className="text-sm text-[#71717A]">Swift delivery</div>
            </div>
          </div>
          <SidebarContent className="flex items-center flex-col gap-4 ">
            {/* button ongo solihod usePathname ashiglahnee */}
            <Button
              onClick={() => handleToggle("foodMenu")}
              className={`relative top-18 w-41.25 h-10 justify-center gap-2.5 rounded-full px-6 transition-all ${changeColor("foodMenu")}`}
            >
              <LayoutDashboard className="size-5.5" />
              <Link
                href="/dashboard/foods"
                className={`${pathname === "/dashboard/foods"}`}
              >
                Food menu
              </Link>
            </Button>
            <Button
              onClick={() => handleToggle("orders")}
              className={`relative top-18 w-41.25 h-10 justify-start gap-3 rounded-full px-8.25 transition-all ${changeColor("orders")}`}
            >
              <TruckIcon className="size-5.5" />
              <Link
                href="/dashboard/orders"
                className={`${pathname === "/dashboard/orders"}`}
              >
                Orders
              </Link>
            </Button>
          </SidebarContent>
        </Sidebar>
        {/* <div className="">
          <DishesCategory />
          <AddFood />
        </div> */}
      </SidebarProvider>
    </div>
  );
};
