import api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage';

type Login = ({
    email: string
    senha: string
})

type SignUp = ({
    nome: string
    email: string
    senha: string
})

interface SignupResponse {
  message: string;
  emailEnviado: boolean;
}

export const login = async (data: Login): Promise<User> => {
    const response = await api.post("/users/login", data)

    const { user, token } = response.data;
        
    // Armazenar o token em AsyncStorage
    await AsyncStorage.setItem('userToken', token);

    return user
}

export const signup = async (data: SignUp): Promise<SignupResponse> => {
    const response = await api.post("/users/signup", data)

    return response.data
}

export async function sendForgotPasswordEmail(data: { email: string }) {
  const response = await api.post("/users/sendForgotPasswordEmail", data);

  return response.data;
}

export async function updatePassword(token: string, newPassword: string) {
  const response = await api.patch(`/users/updatePassword/${token}`, { newPassword });
  
  return response.data; 
}


  