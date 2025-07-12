// screens/ParticipantsList.tsx
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import AppLayout from '../../components/app/appLayout'
import BackButton from '../../components/button/backButton'
import { getParticipantsByActivity } from '../../services/userAtActivities'

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
    <View className="flex-1 bg-blue-900">
      <AppLayout>
        <BackButton />

        {/* Cabeçalho */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-white text-2xl font-poppinsSemiBold">
            Participantes inscritos
          </Text>
          <Text className="text-gray-400">{activityName}</Text>
        </View>

        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 16 }}
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-border opacity-50 my-2 mx-6" />
          )}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center px-6 py-3">
              {/* Exibindo apenas o ID do usuário */}
              <Text className="text-white font-inter">{item.userId}</Text>
              <Text
                className={`font-inter ${
                  item.presente ? 'text-green' : 'text-gray-500'
                }`}
              >
                {item.presente ? 'Presente' : 'Ausente'}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center px-4">
              <Text className="text-gray-400 text-center font-inter text-sm">
                Nenhum participante encontrado.
              </Text>
            </View>
          )}
        />
      </AppLayout>
    </View>
  )
}
