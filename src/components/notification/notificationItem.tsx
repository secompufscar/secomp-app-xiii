// src/components/notification/NotificationItem.tsx
import React from "react"
import { View, Text, Pressable } from "react-native"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Bell } from "lucide-react-native"
import { Notification } from "../../services/notificationService"

interface Props {
  notification: Notification
  onPress?: (notification: Notification) => void
}

export function NotificationItem({ notification, onPress }: Props) {
  const sentDate = new Date(notification.sentAt)
  const diffMs = Date.now() - sentDate.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)

  // texto “Agora” ou “há X”
  const timeAgo =
    diffMs < 60_000
      ? "Agora"
      : formatDistanceToNow(sentDate, { locale: ptBR, addSuffix: true })

  // escolhe a classe tailwind para cor do ícone
  const iconColorClass =
    diffHours < 1
      ? "text-success"   // verde: "#0FB842"
      : diffHours < 24
      ? "text-warning"   // amarelo: "#F1C21B"
      : "text-default"   // cinza: "#E0E0E0"

  return (
    <Pressable
      onPress={() => onPress?.(notification)}
      className="flex-row items-center bg-background rounded-lg p-4 mb-4 mx-0 shadow-sm active:bg-background/70"
    >
      {/* Ícone dentro de bolinha para destacar */}
      <View className="bg-iconbg p-2 rounded-full mr-4">
        <Bell size={20} className={iconColorClass} />
      </View>

      {/* Conteúdo */}
      <View className="flex-1">
        <Text className="text-white text-base font-poppinsMedium mb-1">
          {notification.title}
        </Text>
        <Text className="text-gray-300 text-sm font-inter mb-2">
          {notification.message}
        </Text>
        <Text className="text-blue-300 text-xs font-inter lowercase">{timeAgo}</Text>
      </View>
    </Pressable>
  )
}
