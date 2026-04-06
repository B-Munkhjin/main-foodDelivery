"use client";

/////use client async 2 neg door orj bolohgui

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
import { File, LoaderCircle, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ChangeEventHandler, useRef, useState } from "react";
import { Category } from "./Categories";
import { FoodCard } from "./FoodCard";
type CategoryId = {
  categoryId: Number;
};

type Food = {
  name: String;
  price: Number;
  ingredients: String;
  foodCategoryId: Number;
  image: string;
};
export function AddFood(categoryId: CategoryId) {
  const ref = useRef({});
  // console.log(ref);

  const [open, setOpen] = useState(false);
  const [food, setFood] = useState<Food>({
    name: "",
    price: 0,
    ingredients: "",
    foodCategoryId: categoryId.categoryId,
    image: "http",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFood({ ...food, [event.target.name]: event.target.value });
  };

  const onAddFood = async (): Promise<void> => {
    setLoading(true);
    try {
      await fetch("http://localhost:3001/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...food,
          price: Number(food.price),
        }),
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
        <div className="flex flex-col px-4 py-2 w-[270.75px] h-60.25 rounded-md border border-dashed border-[#EF4444] justify-center items-center gap-6">
          <DialogTrigger asChild>
            <Button className="flex justify-center items-center bg-[#EF4444] size-10 rounded-full text-[white] text-lg">
              <Plus />
            </Button>
          </DialogTrigger>
          <div>Add new Dish to {}</div>
        </div>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add new Dish to {}</DialogTitle>
          </DialogHeader>

          <FieldGroup>
            <div className="flex gap-6">
              <Field>
                <Label>Food name</Label>
                <Input
                  onChange={handleChange}
                  placeholder="Type Food name..."
                  type="text"
                />
              </Field>
              <Field>
                <Label>Price name</Label>
                <Input
                  onChange={handleChange}
                  placeholder="Enter Price..."
                  type="text"
                />
              </Field>
            </div>
            <Field>
              <Label>Ingredients</Label>
              <Input
                onChange={handleChange}
                placeholder="List ingredients..."
                type="text"
                className="w-103 h-22.5 rounded-md"
              />
            </Field>
            <Field>
              <Label>Food Image</Label>
              <div className="flex items-center justify-center w-full bg-[#2563EB0D] rounded-2xl">
                <Label
                  htmlFor="dropzone-file"
                  className="flex flex-col  items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed  border-[#2563EB33] rounded-2xl border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
                >
                  <div className="flex flex-col gap-3 items-center justify-center text-body pt-5 pb-6 ">
                    <img src="/image.svg" className="size-8" />
                    <p>Choose a file or drag & drop it here</p>
                  </div>
                  <Input id="dropzone-file" type="file" className="hidden" />
                </Label>
              </div>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="submit"
              onClick={onAddFood}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-black text-white font-medium text-sm"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Add Dish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

// end hool nemne
