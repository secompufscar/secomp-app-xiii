import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

const getApi = () => {
    const api = axios.create({
        baseURL: "http://192.168.1.4:3333/api/v1"
    })  
  
    api.interceptors.request.use(async config => {
        try {
            // Obtém os dados do usuário armazenados no AsyncStorage
            const userData = await AsyncStorage.getItem("user");

            // Verifica se há dados armazenados. Se houver, os parseia, caso contrário, define como null
            const user = userData ? JSON.parse(userData) : null;

            if (user) {
                config.headers['Authorization'] = `bearer ${user.token}`
            }

            return config
        } catch(error) { console.log(error) } finally {
            return config
        }
    })

    return api
}

export default getApi()