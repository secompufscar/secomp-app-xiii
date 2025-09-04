import { useCallback, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getNotifications } from '../../services/notifications';
import { NotificationItem } from "../../components/notification/notificationItem";
import { getActivities } from "../../services/activities";
import { colors } from "../../styles/colors";
import BackButton from "../../components/button/backButton";

export default function Notifications() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    setLoading(true)
    try {
      const [notifs, acts] = await Promise.all([
        getNotifications(), 
        getActivities(),    
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

  const handlePressNotification = (notification: Notification) => {
    const activityId = notification.data?.activityId
    if (!activityId) return

    const activity = activities.find((a) =>  String(a.id) === String(activityId))
    if (activity) {
      navigation.navigate("ActivityDetails", { item: activity })
    }
  }
  
  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <View className="flex-1 w-full">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />

        <View className="w-full flex-1 px-6 max-w-[1000px] mx-auto">
          <BackButton/>

          <View className="mb-8">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Notificações</Text> 
            <Text className="text-gray-400 font-inter">
              Fique por dentro das novidades e atualizações importantes!
            </Text> 
          </View>

          {/* Lista de notificações */}
          {loading ? 
            <ActivityIndicator size="large" color={colors.blue[500]} className="mt-8"/>
          :
            <View className="flex-1">
              <FlatList
                data={notifications}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}
                renderItem={({ item }) => (
                  <NotificationItem
                    notification={item}
                    onPress={handlePressNotification}
                  />
                )}
              />
            </View>
          }
        </View>
      </View>
    </SafeAreaView>
  )
}
