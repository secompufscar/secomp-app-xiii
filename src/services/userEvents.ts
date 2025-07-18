import api from "./api";

export interface CreateRegistrationDTO {
  eventId: string;
}

// Busca e retorna a lista de todas as inscrições para um evento específico
export const getRegistrationsByEventId = async (eventId: string): Promise<UserEvent[]> => {
  const response = await api.get(`/userEvent/event/${eventId}`);
  return response.data;
};

// Busca e retorna a lista de todos os eventos em que um usuário está inscrito
export const getRegistrationsByUserId = async (userId: string): Promise<UserEvent[]> => {
  const response = await api.get(`/userEvent/user/${userId}`);
  return response.data;
};

// Inscreve o usuário autenticado em um evento
export const createRegistration = async (registrationData: CreateRegistrationDTO): Promise<UserEvent> => {
  const response = await api.post('/userEvent', registrationData);
  return response.data;
};

// Remove/cancela a inscrição de um usuário em um evento
export const deleteRegistration = async (registrationId: string): Promise<void> => {
  await api.delete(`/userEvent/${registrationId}`);
};