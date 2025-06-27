import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

const getApi = () => {
    const api = axios.create({
        baseURL: "https://api.secompufscar.com.br/api/v1"
    })  
  
    api.interceptors.request.use(async config => {
        try {
            // Obtém o token do usuário através do asyncStorage (token criado no Login em 'user.ts login()' )
            const userToken = await AsyncStorage.getItem("userToken");

            if (typeof userToken =='string' && userToken.trim()!='') {
                config.headers['Authorization'] = `Bearer ${userToken}`
            }
            else{
                console.log("Erro na obtenção do token do usuário")
            }

            return config
        } catch(error) { console.log(error) } finally {
            return config
        }
    })

    return api
}

export default getApi()