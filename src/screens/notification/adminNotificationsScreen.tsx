import { View, Text, Pressable, StatusBar, Platform, ActivityIndicator, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { format, parseISO } from "date-fns"; // Removed addHours as it might not be needed if dates are stored consistently
import { ptBR } from "date-fns/locale";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import { colors } from "../../styles/colors";

import { getNotificationHistory, deleteNotificationHistory } from "../../services/notifications";

interface Notification {
  id: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  status: 'PENDING' | 'SENT' | 'FAILED';
  error?: string;
  sentAt: Date; 
  createdBy?: string;
}

export default function AdminNotificationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchNotifications = async () => {
        setLoading(true);
        setError(null);

        try {
          const data = await getNotificationHistory();
          const formattedData = data.map(notif => ({
            ...notif,
            sentAt: typeof notif.sentAt === 'string' ? parseISO(notif.sentAt) : notif.sentAt
          }));
          setNotifications(formattedData);
        } catch (err: any) {
          console.error("Erro ao carregar notificações:", err);
          setError(err.message || "Não foi possível carregar as notificações. Tente novamente.");
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }, [])
  );

  const handleDeleteNotification = useCallback(async (id: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta notificação? Esta ação é irreversível.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              // Use the actual API call from the service file
              await deleteNotificationHistory(id);
              setNotifications((prev) => prev.filter((notif) => notif.id !== id));
            } catch (err: any) {
              console.error("Erro ao deletar notificação:", err);
              setError(err.message || "Não foi possível deletar a notificação. Tente novamente.");
            }
          },
        },
      ]
    );
  }, []);

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <Pressable
      onPress={() => {
        Alert.alert(
          item.title,
          `Mensagem: ${item.message}\nStatus: ${item.status}\nEnviado em: ${format(item.sentAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}`
        );
      }}
      className="rounded-lg shadow-md mb-4 border border-iconbg"
    >
      {({ pressed }) => (
        <View className={`flex flex-row justify-between p-4 gap-3 ${pressed ? "bg-background/80" : "bg-background"}`}>
          <View className="flex-1">
            <Text className="text-lg text-white font-poppinsSemiBold">{item.title}</Text>
            <Text className="text-base text-gray-600 font-inter mt-1" numberOfLines={2}>{item.message}</Text>

            <View className="flex flex-row mt-1 flex-wrap">
              <Text className="text-base text-gray-600 font-inter">
                Status: {item.status} -
              </Text>
              <Text className="text-gray-600 font-inter ml-1">
                {format(item.sentAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </Text>
            </View>
          </View>

          <Pressable onPress={(e) => {
            e.stopPropagation();
            handleDeleteNotification(item.id);
          }}>
            {({ pressed }) => (
              <View className={`flex w-[44px] h-full items-center justify-center bg-danger/10 rounded border border-danger ${pressed ? "bg-danger/20" : "bg-danger/10"}`}>
                <FontAwesome name="trash" size={20} color={colors.danger} />
              </View>
            )}
          </Pressable>
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <View className="flex-1 w-full">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />

        <View className="w-full flex-1 px-6 max-w-[1000px] mx-auto">
          <BackButton />

          <View className="mb-8">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Painel de Notificações</Text>
            <Text className="text-gray-400 font-inter">
              Painel de administração das notificações
            </Text>
          </View>

          <Button title="Enviar Notificação" onPress={() => { navigation.navigate("AdminNotificationSend"); }} />
        </View>
      </View>
    </SafeAreaView>
  );
}