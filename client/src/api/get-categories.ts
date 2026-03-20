import { Categories } from "@/types/category";

const baseUrl = process.env.BASE_URL;

export const getCategories = async (): Promise<Categories> => {
  const response = await fetch(`${baseUrl}/categories`, {
    method: "GET",
  });

  const data = await response.json();

  return data;
};
