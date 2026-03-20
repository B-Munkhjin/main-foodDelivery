export type Food = {
  id: number;
  name: string;
  price: string;
  image: string;
  ingredients: string;
  foodCategoryId: number;
};

export type Category = {
  id: number;
  name: string;
  foods: Food[];
};

export type Categories = {
  categories: Category[];
};
