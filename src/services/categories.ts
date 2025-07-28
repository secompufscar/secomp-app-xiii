import api from "./api";

type Category = {
  id: string;
  nome: string;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories/");

  return response.data;
};
