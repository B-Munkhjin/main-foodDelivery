import { FoodCard, Food } from "./FoodCard";
import { AddFood } from "./AddFood";

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  foods: Food[];
}

type Foods = {
  foods: Food[];
};

type Categories = {
  categories: Category[];
};

export async function FoodsContainer() {
  const foodsResponse = await fetch("http://localhost:3001/foods");

  const { foods }: Foods = await foodsResponse.json();

  const categoryResponse = await fetch("http://localhost:3001/categories");
  const { categories }: Categories = await categoryResponse.json();
  return (
    <div className="flex flex-col">
      {categories?.map((category) => {
        const categoryFoods = foods.filter(
          (food) => food.foodCategoryId === category.id,
        );

        return (
          <div
            key={category.id}
            className="bg-[#FFFFFF] w-488.75 h-fit m-10 flex flex-col rounded-xl p-6 gap-4"
          >
            <div className="text-[#09090B] text-xl font-semibold">
              {category.name} ({categoryFoods.length})
            </div>
            <div className="flex gap-4">
              <AddFood categoryId={category.id} />
              <div className="flex gap-3">
                {categoryFoods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
