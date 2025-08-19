import api from "./api"

// Listar todas as imagens
export const listActivityImages = async (): Promise<ActivityImage[]> => {
    const response = await api.get("/activityImages/list");
    return response.data;
};

// Buscar imagens por activityId
export const getImagesByActivityId = async (activityId: string): Promise<ActivityImage[]> => {
    const response = await api.get(`/activityImages/activityId/${activityId}`);
    return response.data;
};

// Buscar imagem por id
export const getImageById = async (id: string): Promise<ActivityImage> => {
    const response = await api.get(`/activityImages/${id}`);
    return response.data;
};

// Criar nova imagem (com upload)
export const createActivityImage = async (data: FormData): Promise<ActivityImage> => {
    const response = await api.post("/activityImages", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// Atualizar imagem por id (com ou sem upload)
export const updateActivityImageById = async (id: string, data: FormData): Promise<ActivityImage> => {
    const response = await api.put(`/activityImages/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// Deletar imagem por id
export const deleteActivityImageById = async (id: string): Promise<{ msg: string }> => {
    const response = await api.delete(`/activityImages/${id}`);
    return response.data;
};