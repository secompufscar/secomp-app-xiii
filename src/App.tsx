import { ActivityIndicator, View } from 'react-native';
import Routes from './routes';
import './styles/global.css';
import '@expo/metro-runtime';
import { AuthProvider, useAuth } from './hooks/AuthContext';
import { useFonts } from 'expo-font';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { colors } from './styles/colors';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-900">
        <ActivityIndicator size="large" color={colors.blue[500]} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// Componente separado que usa o contexto corretamente
function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-900">
        <ActivityIndicator size="large" color={colors.blue[500]} />
      </View>
    );
  }

  return <Routes />;
}