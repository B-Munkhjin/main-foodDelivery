import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/");
}

export default async function GetOrdersPage() {
  let users = [];
  let categories = [];

  try {
    const [resUser, resCategory] = await Promise.all([
      fetch("http://localhost:3001/users", { cache: "no-store" }),
      fetch("http://localhost:3001/categories", { cache: "no-store" }),
    ]);

    if (resUser.ok) {
      const userData = await resUser.json();
      users = userData.users || userData;
    }

    if (resCategory.ok) {
      const catData = await resCategory.json();
      categories = catData.categories || catData;
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }

  return (
    <div className="flex flex-col mt-20 w-full p-8">
      <div className="flex justify-end mb-4">
        {users.length > 0 ? (
          users.map((user: any) => (
            <DropdownMenu key={user.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="truncate">
                    Email: {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Role: {user.role || "User"}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <form action={logout}>
                  <button
                    type="submit"
                    className="w-full text-left text-red-500 px-2 py-1.5 text-sm hover:bg-slate-100"
                  >
                    Log out
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      <Suspense fallback={<div>Loading Data Table...</div>}>
        {/* DataTable-ээ энд дуудна */}
        <div className="border p-4 rounded">Data Table Content Here</div>
      </Suspense>
    </div>
  );
}
