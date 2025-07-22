// screens/ParticipantsList.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator, StatusBar, Platform } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from '@react-navigation/native'
import { getParticipantsByActivity } from '../../services/userAtActivities'
import BackButton from '../../components/button/backButton'

type ParticipantsListRouteParams = {
  ParticipantsList: {
    activityId: string
    activityName: string
  }
}

export default function ParticipantsList() {
  const { activityId, activityName } = useRoute<
    RouteProp<ParticipantsListRouteParams, 'ParticipantsList'>
  >().params

  const [list, setList] = useState<UserAtActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getParticipantsByActivity(activityId)
      .then((data) => {
        // Ordena alfabeticamente pelo userId
        const sorted = data.sort((a, b) =>
          a.userId.localeCompare(b.userId)
        )
        setList(sorted)
      })
      .catch((err) => {
        console.error(err)
        setError('Não foi possível carregar os participantes.')
      })
      .finally(() => setLoading(false))
  }, [activityId])

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-900">
        <ActivityIndicator size="large" color="#3DCC87" />
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4 bg-blue-900">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <View className="w-full px-6 max-w-[1000px] mx-auto min-h-screen">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />

        <BackButton />

        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Participantes</Text>

          <Text className="text-blue-200 font-inter text-base">
            {activityName}
          </Text>
        </View>

        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-border opacity-50 my-2 mx-6" />
          )}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center py-3">
              {/* Exibe apenas o userId */}
              <Text className="text-default font-inter">{item.userId}</Text>
              <Text
                className={`font-interMedium ${item.presente ? 'text-green' : 'text-gray-500'
                  }`}
              >
                {item.presente ? 'presente' : 'ausente'}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center px-4 mt-8">
              <Text className="text-gray-400 text-center font-inter text-sm">
                Nenhum participante encontrado
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
