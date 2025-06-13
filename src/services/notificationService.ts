import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configurar o comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
// Registrar o canal de notificações para Android
export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    console.warn('Must use physical device for Push Notifications');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Failed to get push token for push notification!');
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo push token:', token);

  // Salvar o token no AsyncStorage e enviar para a API
  await AsyncStorage.setItem('pushToken', token);

  // Obter token de autenticação do usuário
  const authToken = await AsyncStorage.getItem('userToken');

  if (authToken) {
    try {
      await api.post('/users/register-push-token', { token }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      console.error('Failed to register push token:', error);
    }
  }

  return token;
}

// Listener para notificações recebidas
export function setupNotificationListeners(navigation: any) {
  Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification);
    // Aqui você pode lidar com a notificação em foreground
  });

  // Listener para quando o usuário toca na notificação
  Notifications.addNotificationResponseReceivedListener(response => {
    const data = response.notification.request.content.data;
    console.log('Notification touched:', data);

    // Navegar para uma tela específica baseada nos dados
    if (data.eventId) {
      navigation.navigate('EventDetails', { id: data.eventId });
    }
  });
}