import { Button } from "@/components/ui/button";
import { DishesCategory } from "./Categories";
export interface GetCategoriesResponse {
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

export async function CategorySchema() {
  const data = await fetch("http://localhost:3001/categories");
  const { categories }: GetCategoriesResponse = await data.json();

  return (
    <div className=" bg-[#FFFFFF] w-488.75 h-fit m-10 flex flex-col rounded-xl p-6 gap-4">
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
  );
}

//end category-nuudaa avna (getCategory)
