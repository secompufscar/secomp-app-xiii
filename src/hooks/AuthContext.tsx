import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipo do contexto de autenticação
interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (data: User) => Promise<void>;
  signOut: () => Promise<void>;
}

// Criação do contexto com tipo indefinido inicialmente
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Tipo das props do provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider da autenticação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Login
  const signIn = async (data: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error("Erro no signIn:", error);
    }
  };

  // Logout
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer sign out:", error);
    }
  };

  // Recuperar usuário do AsyncStorage (login automático)
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
