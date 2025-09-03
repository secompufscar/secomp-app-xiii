// components/AppLayout.tsx
import { ScrollView, View, StatusBar, Platform } from "react-native";
import { ReactNode, useEffect} from "react";
import { useNavigation, NavigationProp, ParamListBase  } from "@react-navigation/native";
import { setupNotificationListeners } from "../../services/notifications";

interface AppLayoutProps {
  children: ReactNode;
}

// Wrapper do ScrollView para as páginas
export default function AppLayout({ children }: AppLayoutProps) {

  // Obtém o objeto navigation para permitir deep-linking das notificações
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  /**
   * Configura os listeners de notificações quando o componente é montado.
   * Isso permite que o app responda a notificações recebidas enquanto está em segundo plano
   * ou fechado, e navegue para a tela correta.
   */
  useEffect(() => {
    setupNotificationListeners(navigation);
  }, [navigation]);

  return (
    <View className="flex-1 w-full">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={Platform.OS === "android"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="w-full px-6 max-w-[1000px] mx-auto min-h-screen">{children}</View>
      </ScrollView>
    </View>
  );
}
