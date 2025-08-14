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

export const createActivity = async (activityData: Omit<Activity, 'id'>): Promise<Activity> => {
  const response = await api.post("/activities/", activityData);
  return response.data;
};

export const updateActivity = async (id: string, activityData: UpdateActivityData): Promise<Activity> => {
  const response = await api.put(`/activities/${id}`, activityData);
  return response.data;
};

export const deleteActivity = async (id: string) => {
  const response = await api.delete(`/activities/${id}`);
  return response;
};