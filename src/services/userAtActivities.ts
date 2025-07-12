import api from "./api";

export const userSubscription = async (
  userId: string,
  activityId: string,
): Promise<UserAtActivity> => {
  const response = await api.get(`/userAtActivities/user-activity/${userId}/${activityId}`);
  return response.data;
};
