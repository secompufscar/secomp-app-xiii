import api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { registerForPushNotifications, setupNotificationListeners } from './notificationService';
import { Platform } from 'react-native';

// Realiza login do usuário e configura notificações push
export const login = async (data: Login, navigation: NavigationProp<ParamListBase>): Promise<{user: User; token: string}> => {
  const response = await api.post("/users/login", data);
  const { user, token } = response.data;

  // Armazenar o token em AsyncStorage
  await AsyncStorage.setItem('userToken', token);

  // Configuração de push notifications
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    try {
      await registerForPushNotifications();
      setupNotificationListeners(navigation);
      console.log('Notificações configuradas');
    } catch (notifError) {
      console.error('Erro ao configurar notificações:', notifError);
    }
  }

  return { user, token };
};

// Realiza cadastro de novo usuário
export const signup = async (data: SignUp): Promise<SignupResponse> => {
  const response = await api.post("/users/signup", data);
  return response.data;
};

// Retorna o perfil do usuário logado
export const getProfile = async (): Promise<User> => {
  const response = await api.get("/users/getProfile");
  return response.data;
};

// Retorna detalhes de um usuário específico (omitindo senha e QR code)
export const getUserDetails = async (id: string): Promise<Omit<User, 'senha' | 'qrCode'>> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Envia email de redefinição de senha
export const sendForgotPasswordEmail = async (data: { email: string }) => {
  const response = await api.post("/users/sendForgotPasswordEmail", data);
  return response.data;
};

// Atualiza a senha do usuário usando token de recuperação
export const updatePassword = async (token: string, senha: string) => {
  const response = await api.patch(`/users/updatePassword/${token}`, { senha });
  return response.data;
};

// Atualiza dados do perfil do usuário
export const updateProfile = async (data: UpdateProfile) => {
  const response = await api.patch("/users/updateProfile", data);
  return response.data;
};

// Retorna ranking do usuário
export const getUserRanking = async (id: string): Promise<{ rank: number }> => {
  const response = await api.get(`/users/getUserRanking/${id}`);
  return response.data;
};

// Retorna quantidade total de atividades de um usuário
export const getUserActivitiesCount = async (id: string): Promise<{ totalActivities: number }> => {
  const response = await api.get(`/users/${id}/activities/count`);
  return response.data;
};
