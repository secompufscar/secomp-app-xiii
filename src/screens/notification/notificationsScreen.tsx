import React, { useCallback, useState } from "react"
import { View, Text, FlatList, SafeAreaView, ActivityIndicator } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import AppLayout from "../../components/app/appLayout"
import BackButton from "../../components/button/backButton"
import { getNotifications, Notification } from '../../services/notificationService'
import { NotificationItem } from "../../components/notification/notificationItem"
import { getActivities } from "../../services/activities"

export default function Notifications() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  /**
   * Carrega notificações e atividades em paralelo.
   * Foi utilizado Promise.all para otimizar o tempo de espera.
  */
  const loadNotifications = async () => {
    setLoading(true)
    try {
      const [notifs, acts] = await Promise.all([
        getNotifications(), // GET /notifications/history
        getActivities(),    // GET /activities
      ])
      setNotifications(notifs)
      setActivities(acts)
    } catch (err) {
      console.error("Erro ao carregar notificações:", err)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadNotifications()
    }, [])
  )

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  /**
   * Ao pressionar um card de notificação:
   * 1. Extrai o activityId de notification.data
   * 2. Busca o objeto Activity correspondente
   * 3. Navega para ActivityDetails passando { item: activity }
   */
  const handlePressNotification = (notification: Notification) => {
    const activityId = notification.data?.activityId
    if (!activityId) return

    const activity = activities.find((a) => a.id === activityId)
    if (activity) {
      navigation.navigate("ActivityDetails", { item: activity })
    }
  }

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <BackButton />

        <View className="flex-col flex-1 w-full gap-4">
          <View className="mb-6">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">
              Notificações
            </Text>
            <Text className="text-gray-400 font-inter">
              Fique por dentro das novidades e atualizações importantes
            </Text>
          </View>

          {/* Lista de notificações */}
          <View className="flex-1">
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 40 }}
              ListEmptyComponent={() => (
                <View className="items-center justify-center mt-20">
                  <Text className="text-default font-poppinsMedium text-base">
                    Nenhuma notificação encontrada
                  </Text>
                  <Text className="text-gray-400 font-inter mt-1">
                    Você está em dia!
                  </Text>
                </View>
              )}
              renderItem={({ item }) => (
                <NotificationItem
                  notification={item}
                  onPress={handlePressNotification}
                />
              )}
            />
          </View>
        </View>
      </AppLayout>
    </SafeAreaView>
  )
}
