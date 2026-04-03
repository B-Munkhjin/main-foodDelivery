import { AddFood } from "@/app/Components/AddFood";
import { DishesCategory } from "@/app/Components/Categories";
import { CategorySchema } from "@/app/Components/CategorySchema";
import { FoodsContainer } from "@/app/Components/foodsContainer";

export default function Home() {
  return (
    <div className="font-inter bg-[#f4f4f5]">
      <CategorySchema />
      <FoodsContainer />
    </div>
  );
}
