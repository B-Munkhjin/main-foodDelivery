// "use client";
import { Button } from "@/components/ui/button";
import { DishesCategory } from "./Categories";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export async function CategorySchema() {
  const dataCategory = await fetch("http://localhost:3001/categories");
  const dataUser = await fetch("http://localhost:3001/users");
  const { users }: GetUsersResponse = await dataUser.json();
  const { categories }: GetCategoriesResponse = await dataCategory.json();

  return (
    <div>
      <div className="flex flex-end ml-490 mb-14 relative top-5">
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
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
      <div className=" bg-[#FFFFFF] w-488.75 flex flex-col rounded-xl p-6 gap-4 mx-10">
        <div className="text-[#09090B] text-xl font-semibold">
          Dishes category
        </div>
        <div className="flex gap-3">
          {categories.map((category) => {
            return (
              <div key={category.id}>
                <Button className="rounded-full w-fit h-fit flex justify-center items-center gap-2 bg-[#FFFFFF] px-4 py-2 border border-[#E4E4E7] ">
                  <h1 className="text-sm font-medium text-[#18181B]">
                    {category.name}
                  </h1>
                  <div className="rounded-full bg-[#18181B] py-0.5 px-2.5 text-[#FAFAFA]">
                    {category.foods.length}
                  </div>
                </Button>
              </div>
            );
          })}
          <div>
            <DishesCategory />
          </div>
        </div>
      </div>
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

//end category-nuudaa avna (getCategory)
