import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import { setGlobalSignOut } from "../utils/authHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

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

const TOKEN_STORAGE_KEY = "userToken";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (data: User, token: string) => {
    try {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      setUser(data);
    } catch (error) {
      console.error("Erro no signIn:", error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer sign out:", error);
    }
  }, []);

  const updateUser = useCallback(async (data: User) => {
    setUser(data);
  }, []);

  useEffect(() => {
    setGlobalSignOut(signOut);
  }, [signOut]);

  // Recuperar usuário do AsyncStorage (login automático)
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {      
        const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

        if (storedToken) {
          const response = await api.get("/users/me");
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        await signOut();
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
