import api from "./api";

// Envia uma notificação push para usuários específicos
export const sendPushNotification = async (notificationData: CreateNotificationDTO): Promise<any> => {
  try {
    const response = await api.post("/notifications/send", notificationData);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao enviar notificação para usuários específicos:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao enviar notificação para usuários específicos.');
  }
};

// Envia uma notificação push para todos os usuários
export const sendNotificationToAll = async (notificationData: SendToAllNotificationDTO): Promise<any> => {
  try {
    const response = await api.post("/notifications/send-to-all", notificationData);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao enviar notificação para todos os usuários:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao enviar notificação para todos os usuários.');
  }
};