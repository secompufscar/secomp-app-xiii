import api from "./api";

export type UpdateActivityData = Partial<Activity>;

export const getActivities = async (): Promise<Activity[]> => {
  const response = await api.get("/activities/");
  return response.data;
};

export const getActivityId = async (id: string): Promise<Activity> => {
  const response = await api.get(`/activities/${id}`);
  return response.data;
};

export const getUserSubscribedActivities = async (userId: string): Promise<UserAtActivity[]> => {
  const response = await api.get(`/userAtActivities/all-activities/${userId}`);
  return response.data;
};

export const subscribeToActivity = async (userId: string, eventId: string) => {
  const response = await api.post("/userAtActivities", {
    userId: userId,
    activityId: eventId,
  });
  return response;
};

export const unsubscribeToActivity = async (userId: string, eventId: string) => {
  const response = await api.delete(`/userAtActivities/${userId}/${eventId}`);
  return response;
};

// Criar atividade
export const createActivity = async (activityData: Omit<Activity, 'id'>): Promise<Activity> => {
  const response = await api.post("/activities/", activityData);
  return response.data;
};

// Update
export const updateActivity = async (id: string, activityData: UpdateActivityData): Promise<Activity> => {
  const response = await api.patch(`/activities/${id}`, activityData);
  return response.data;
};