"use client";

/////use client async 2 neg door orj bolohgui

import { CategorySchema } from "./CategorySchema";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ChangeEventHandler, useState } from "react";

export interface PostCategory {
  categories: Category[];
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

export function DishesCategory() {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    event,
  ) => {
    setCategoryName(event.target.value);
  };

  const onAddCategory = async () => {
    setLoading(true);

    const postBody = {
      name: categoryName,
    };

    try {
      await fetch("http://localhost:3001/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="flex justify-center items-center bg-[#EF4444] size-9 rounded-full text-[white] text-lg">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
            <X />
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Category name</Label>
              <Input
                onChange={onChange}
                placeholder="Type category name..."
                type="text"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              onClick={onAddCategory}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-black text-white font-medium text-sm"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Add Category"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

// end category nemne
