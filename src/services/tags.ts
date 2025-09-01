import api from "./api";

// Busca e retorna a lista de todas as tags
export const getTags = async (): Promise<Tag[]> => {
  const response = await api.get('/tags/');
  return response.data;
};

// Cria uma nova tag
export const createTag = async (tagData: CreateTagData): Promise<Tag> => {
  const response = await api.post('/tags/', tagData);
  return response.data;
};

// Atualiza uma tag existente
export const updateTag = async (id: string, tagData: Tag): Promise<Tag> => {
  const response = await api.patch(`/tags/${id}`, tagData);
  return response.data;
};

// Deleta uma tag
export const deleteTag = async (id: string): Promise<void> => {
  await api.delete(`/tags/${id}`);
};