import { getCategories } from "@/api/get-categories";

export default async function Home() {
  const { categories } = await getCategories();

  return (
    <div>
      <div className="flex justify-center flex-col px-50">
        <img src="/bigPoster.png" className="h-200"></img>
        {categories.map((category) => {
          return (
            <div key={category.id} className="flex gap-2">
              <div>{category.name}</div>
              <div>
                {category.foods.map((food) => {
                  return <div key={food.id}>{food.name}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
