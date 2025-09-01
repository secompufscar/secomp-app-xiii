import api from "./api";

// Busca todas as categorias
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories/");
  return response.data;
};
