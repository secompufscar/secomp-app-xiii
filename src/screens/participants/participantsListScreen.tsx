import React, { useState, useCallback } from 'react'
import { View, Text, FlatList, ActivityIndicator, StatusBar, Platform } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native'
import { getParticipantsByActivity } from '../../services/userAtActivities'
import { getUserDetails } from '../../services/users'
import { colors } from '../../styles/colors';
import BackButton from '../../components/button/backButton'

type ParticipantsListRouteParams = {
  ParticipantsList: {
    activityId: string
    activityName: string
  }
}

type ParticipantDetails = {
  id: string;
  userId: string;
  userName: string; 
  activityId: string;
  presente: boolean;
  inscricaoPrevia: boolean;
  listaEspera: boolean;
}

export default function ParticipantsList() {
  const { activityId, activityName } = useRoute<
    RouteProp<ParticipantsListRouteParams, 'ParticipantsList'>
  >().params

  const [list, setList] = useState<ParticipantDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useFocusEffect(
    useCallback(() => {
      let isActive = true
      const fetchData = async () => {
        setLoading(true)
        setError(null)

        try {
          const participants = await getParticipantsByActivity(activityId)
          const detailedList = await Promise.all(
            participants.map(async (p) => {
              const user = await getUserDetails(p.userId)
              return {
                ...p,
                userName: user.nome,
              }
            })
          )
          // Ordena a lista de participantes pelo nome do usuário alfabeticamente
          const sorted = detailedList.sort((a, b) => a.userName.localeCompare(b.userName))
          if (isActive) setList(sorted)
        } catch (err) {
          console.error(err)
          if (isActive) setError('Não foi possível carregar os participantes.')
        } finally {
          if (isActive) setLoading(false)
        }
      }

      fetchData()

      return () => {
        isActive = false
      }
    }, [activityId])
  )

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-900">
        <ActivityIndicator size="large" color={colors.blue[500]} />
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
              <Text className="text-default font-inter">{item.userName}</Text>
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
