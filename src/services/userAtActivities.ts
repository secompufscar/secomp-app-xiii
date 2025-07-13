import api from './api'

// Busca todos os participantes inscritos ou em lista de espera de uma atividade
export async function getParticipantsByActivity(
  activityId: string
): Promise<UserAtActivity[]> {
  const response = await api.get(`/userAtActivities/${activityId}`)
  return response.data
};

// Busca um vínculo específico entre usuário e atividade
export const userSubscription = async (
  userId: string,
  activityId: string
): Promise<UserAtActivity> => {
  const response = await api.get(
    `/userAtActivities/user-activity/${userId}/${activityId}`
  );
  return response.data;
};

