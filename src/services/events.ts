import api from "./api";

// Busca e retorna a lista de todos os eventos
export const getEvents = async (): Promise<Events[]> => {
  const response = await api.get('/event/');
  return response.data;
};

// Busca e retorna o evento ativo atual
export const getCurrentEvent = async (): Promise<Events> => {
  const response = await api.get('/event/current');
  return response.data;
};

// Busca um evento específico pelo seu ID
export const getEventById = async (id: string): Promise<Events> => {
  const response = await api.get(`/event/${id}`);
  return response.data;
};

// Cria um novo evento
export const createEvent = async (eventData: Events): Promise<Events> => {
  const response = await api.post('/event/', eventData);
  return response.data;
};

// Atualiza um evento existente
export const updateEvent = async (id: string, eventData: UpdateEvent): Promise<Events> => {
  const response = await api.put(`/event/${id}`, eventData);
  return response.data;
};

// Deleta um evento
export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/event/${id}`);
};