import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import { setGlobalSignOut } from "../utils/authHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (data: User, token: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: User) => Promise<void>; 
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "userToken";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (data: User, token: string) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      setUser(data);
    } catch (error) {
      console.error("Erro no signIn:", error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer sign out:", error);
    }
  }, []);

  const updateUser = useCallback(async (data: User) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }, []);

  useEffect(() => {
    setGlobalSignOut(signOut);
  }, [signOut]);

  // Recuperar usuário do AsyncStorage (login automático)
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {      
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

        if (storedUser && storedToken) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (parseError) {
            console.error("Erro ao parsear dados do usuário:", parseError);
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do storage:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const contextValue = useMemo(() => ({
    user,
    loading,
    signIn,
    signOut,
    updateUser,
  }), [user, loading, signIn, signOut, updateUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");  
  }

  return context;
};
