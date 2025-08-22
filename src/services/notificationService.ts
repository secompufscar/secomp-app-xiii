import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Platform } from 'react-native';

export type Notification = {
  id: string
  title: string
  message: string
  sentAt: string
  status?: "PENDING" | "SENT" | "FAILED"
  data?: Record<string, unknown>
}

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
    console.log('Push notifications are not supported on simulators/emulators');
    return null;
  }

  // Configurar canal Android
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Notificações padrão',
      importance: Notifications.AndroidImportance.MAX,
      lightColor: '#FF231F7C',
      sound: 'default',
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
    console.log('Canal de notificações configurado para Android');
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  console.log('Final notification status:', finalStatus);
  if (finalStatus !== 'granted') {//
    console.warn('Failed to get push token for push notification!');
    return null;
  }
  let token;
  try {
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas?.projectId,
    });
  }
  catch (error) {
    console.error('Error getting Expo push token:', error);
    return null;
  }

  // Salvar o token no AsyncStorage e enviar para a API
  await AsyncStorage.setItem('pushToken', typeof token === 'string' ? token : token.data ?? JSON.stringify(token));

  // Obter token de autenticação do usuário
  const authToken = await AsyncStorage.getItem('userToken');

  if (authToken) {
    try {
      await api.post('/users/registerPushToken', { token: token.data }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      console.error('Failed to register push token:', error);
    }
  }

  return token;
}

export async function scheduleNotification(params: any) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: params.title,
      body: params.body,
      data: params.data,
    },
    trigger: params.trigger,
  });
}

// Listener para notificações recebidas
export function setupNotificationListeners(
  navigation: NavigationProp<ParamListBase>
) {
  Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification)
  })

  Notifications.addNotificationResponseReceivedListener(response => {
    const data = response.notification.request.content.data as any
    console.log('Notification touched:', data)

    if (data.activityId) {
      navigation.navigate('ActivityDetails', { item: { id: data.activityId } })
    }
  })
}

// Recupera o histórico de notificações do usuário
export async function getNotifications(): Promise<Notification[]> {
  const res = await api.get<Notification[]>('/notifications/history')
  return res.data
}