import api from "./api";

// Realiza o check-in de um usuário em uma atividade
export const checkIn = async (userId: string, activityId: string): Promise<UserAtActivity[]> => {
  const response = await api.post(`/checkIn/${userId}/${activityId}`);
  return response.data;
};
