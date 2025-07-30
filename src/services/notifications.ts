import api from "./api";

export interface CreateNotificationDTO {
  title: string;
  message: string;
  recipientIds: string[];
  data?: Record<string, unknown>;
  sound?: boolean;
  badge?: number;
}

export interface SendToAllNotificationDTO extends Omit<CreateNotificationDTO, 'recipientIds'> {}

export const sendPushNotification = async (notificationData: CreateNotificationDTO): Promise<any> => {
  try {
    const response = await api.post("/notifications/send", notificationData);
    return response.data;
  } catch (error: any) {
    console.error('Error in sendPushNotification:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to send notification to specific users.');
  }
};

export const sendNotificationToAll = async (notificationData: SendToAllNotificationDTO): Promise<any> => {
  try {
    const response = await api.post("/notifications/send-to-all", notificationData);
    return response.data;
  } catch (error: any) {
    console.error('Error in sendNotificationToAll:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to send notification to all users.');
  }
};