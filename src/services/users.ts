import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Login = {
  email: string;
  senha: string;
};

type SignUp = {
  nome: string;
  email: string;
  senha: string;
};

interface SignupResponse {
  message: string;
  emailEnviado: boolean;
}

export type UpdateProfile = {
  nome?: string;
  email?: string;
};

export const login = async (data: Login): Promise<User> => {
  const response = await api.post("/users/login", data);

  const { user, token } = response.data;

  // Armazenar o token em AsyncStorage
  await AsyncStorage.setItem("userToken", token);

  return user;
};

export const signup = async (data: SignUp): Promise<SignupResponse> => {
  const response = await api.post("/users/signup", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/users/getProfile");
  return response.data;
};

export const getUserDetails = async (id: string): Promise<Omit<User, 'senha' | 'qrCode'>> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const sendForgotPasswordEmail = async (data: { email: string }) => {
  const response = await api.post("/users/sendForgotPasswordEmail", data);
  return response.data;
};

export const updatePassword = async (token: string, newPassword: string) => {
  const response = await api.patch(`/users/updatePassword/${token}`, { newPassword });
  return response.data;
};

export const updateProfile = async (data: UpdateProfile) => {
  const response = await api.patch("/users/updateProfile", data);
  return response.data;
};

export const getUserProfile = async (): Promise<User> => {
  const response = await api.get("/users/getProfile");
  return response.data;
};

export const getUserRanking = async (id: string): Promise<{ rank: number }> => {
  const response = await api.get(`/users/getUserRanking/${id}`);
  return response.data;
};

export const getUserActivitiesCount = async (id: string): Promise<{ totalActivities: number }> => {
  const response = await api.get(`/users/${id}/activities/count`);
  return response.data;
};
