import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipo do contexto de autenticação
interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (data: User) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: User) => Promise<void>; // <-- 1. ADICIONADO
}

// Criação do contexto
const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const USER_STORAGE_KEY = "user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (data: User) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error("Erro no signIn:", error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
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

  // Recuperar usuário do AsyncStorage (login automático)
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
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
