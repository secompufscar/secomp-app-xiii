import { View, Text, Pressable } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  notification: Notification
  onPress?: (notification: Notification) => void
}

export function NotificationItem({ notification, onPress }: Props) {
  const sentDate = new Date(notification.sentAt)
  const diffMs = Date.now() - sentDate.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)

  const timeAgo =
    diffMs < 60_000
      ? "Agora"
      : formatDistanceToNow(sentDate, { locale: ptBR, addSuffix: true })

  const iconColorClass =
    diffHours < 24
      ? "text-warning bg-warning/10 border-warning"   
      : "text-default bg-default/10 border-default" 

  return (
    <Pressable
      onPress={() => onPress?.(notification)}
      className="flex-row items-center bg-background rounded-lg p-5 mb-9 shadow-md/90 active:bg-background/70"
    >
      <View className="flex-1 gap-1 relative justify-center mt-3">
        <Text className="text-white font-poppinsMedium">
          {notification.title}
        </Text>
        <Text className="text-gray-300 text-sm font-inter">
          {notification.message}
        </Text>
      </View>

      <Text className={`${iconColorClass} text-xs font-inter py-2 px-3 border rounded-full absolute -top-4 left-5`}>Aviso</Text>
      <Text className="text-blue-300 text-xs font-inter lowercase py-2 px-3 bg-blue-300/10 border border-blue-300 rounded-full absolute -top-4 right-5">{timeAgo}</Text>
    </Pressable>
  )
}
