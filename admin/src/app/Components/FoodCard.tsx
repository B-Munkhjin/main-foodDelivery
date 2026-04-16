"use client";

import { useState, ChangeEventHandler } from "react";
import { Pen, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export type Food = {
  id: number | string;
  name: string;
  price: string | number;
  ingredients: string;
  image?: string;
  foodCategoryId: number;
};

interface FoodCardProps {
  food: Food;
}

export const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <div className="flex flex-col px-4 py-3 w-70 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow relative">
      <div className="relative">
        <img
          src={food.image || "/foodImg.png"}
          alt={food.name}
          className="w-full h-37 rounded-xl object-cover"
        />
        <div className="absolute -bottom-5 right-4">
          <EditFoodDialog foodData={food} />
        </div>
      </div>

      <div className="flex flex-col mt-1 ">
        <div className="flex justify-between items-center">
          <h1 className="text-[#EF4444] font-bold text-lg truncate w-2/3">
            {food.name}
          </h1>
          <h1 className="text-black font-bold text-md">${food.price}</h1>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2 h-10">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};

function EditFoodDialog({ foodData }: { foodData: Food }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedFood, setEditedFood] = useState<Food>(foodData);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setEditedFood({ ...editedFood, [event.target.name]: event.target.value });
  };

  const onUpdateFood = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/foods/${editedFood.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedFood),
        },
      );

      if (response.ok) {
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-white flex justify-center items-center size-11 rounded-full shadow-lg border border-gray-50 hover:scale-110 transition-transform cursor-pointer relative bottom-7.5 left-2">
          <Pen className="size-4 text-[#EF4444]" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={onUpdateFood}>
          <DialogHeader>
            <DialogTitle>Dishes info</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-4">
            <Field>
              <Label>Dishes name</Label>
              <Input
                name="name"
                defaultValue={foodData.name}
                onChange={handleChange}
                placeholder="Type Food name..."
                type="text"
              />
            </Field>

            <Field>
              <Label>Ingredients</Label>
              <Textarea
                name="ingredients"
                defaultValue={foodData.ingredients}
                onChange={handleChange}
                placeholder="List ingredients..."
                className="w-full h-22.5 rounded-md"
              />
            </Field>

            <Field>
              <Label>Price</Label>
              <Input
                name="price"
                defaultValue={foodData.price}
                onChange={handleChange}
                placeholder="Enter Price..."
                type="text"
              />
            </Field>

            <Field className="flex flex-col gap-2">
              <Label>Image</Label>
              <div className="flex items-center justify-center w-full bg-[#2563EB0D] rounded-2xl">
                <Label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-40 bg-neutral-secondary-medium border border-dashed border-[#2563EB33] rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <div className="flex flex-col gap-3 items-center justify-center pt-5 pb-6">
                    <img src="/image.svg" className="size-8" alt="upload" />
                    <p className="text-xs text-gray-500">
                      Choose a file or drag & drop
                    </p>
                  </div>
                  <Input id="dropzone-file" type="file" className="hidden" />
                </Label>
              </div>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-black text-white font-medium text-sm w-full"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
