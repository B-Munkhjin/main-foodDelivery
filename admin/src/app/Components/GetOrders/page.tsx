import { Suspense } from "react";
import { Payment, columns } from "./Columns";
import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  foods: Food[];
}

export interface Food {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  price: string;
  foodCategoryId: number;
}
export interface GetCategoriesResponse {
  categories: Category[];
}
export interface GetUsersResponse {
  users: User[];
}

export interface User {
  id: number;
  name?: string;
  email: string;
}

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      email: "m@example.com",
      quantity: 100,
      status: "Pending",
    },
  ];
}

export default async function GetOrdersPage() {
  const data = await getData();
  const dataCategory = await fetch("http://localhost:3001/categories");
  const dataUser = await fetch("http://localhost:3001/users");
  const { users }: GetUsersResponse = await dataUser.json();
  const { categories }: GetCategoriesResponse = await dataCategory.json();

  return (
    <div className="flex flex-col mt-20 w-full">
      <div className="flex flex-end ml-490 relative bottom-15">
        {users.map((user: any) => {
          return (
            <DropdownMenu key={user.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-fit mr-11">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="overflow-scroll ">
                    {`Email:  ${user.email}`}
                  </DropdownMenuItem>
                  <DropdownMenuItem>{`Role:  ${user.role}`}</DropdownMenuItem>
                  {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <form action={logout}>
                    <button
                      type="submit"
                      className="w-full text-left text-red-500 px-2 py-1.5 text-sm rounded-sm hover:bg-accent"
                    >
                      Log out
                    </button>
                  </form>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logout() {
  "use server";
  (await cookies()).delete("token");
  redirect("/");
}
