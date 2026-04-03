import { Plus } from "lucide-react";

export interface Food {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  price: string;
  foodCategoryId: number;
  ingredients: string;
}

interface FoodCardProps {
  food: Food;
}

export const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <div className="flex flex-col px-4 py-2 w-[270.75px] h-60.25 rounded-md border justify-start gap-5">
      <div>
        <img
          src="/foodImg.png"
          className="w-[238.75px] h-32.25 rounded-xl mt-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-4 items-center">
          <h1 className="text-[#EF4444] font-medium text-lg">{food.name}</h1>
          <h1 className="text-[#09090B] text-sm">{food.price}</h1>
        </div>
        <h1 className="text-[#09090B] text-sm overflow-scroll mb-2">
          {food.ingredients}
        </h1>
      </div>
    </div>
  );
};
