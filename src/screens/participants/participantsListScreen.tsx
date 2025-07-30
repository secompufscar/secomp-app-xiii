import React, { useState, useCallback } from 'react'
import { View, Text, FlatList, ActivityIndicator, StatusBar, Platform } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native'
import { getParticipantsByActivity } from '../../services/userAtActivities'
import { getUserDetails } from '../../services/users'
import { colors } from '../../styles/colors';
import BackButton from '../../components/button/backButton'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
  const total = list.length;
  const presentes = list.filter((p) => p.presente).length;


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

  // Item da lista
  const renderParticipant = ({ item }: { item: ParticipantDetails }) => (
    <View className="flex-row justify-between items-center py-3">
      <Text className="flex-1 mr-2 text-white font-inter flex-wrap">{item.userName}</Text>

      <View className="w-[90px] flex items-start justify-start">
        <View className={`w-full p-3 rounded-full flex items-center justify-center ${item.presente ? 'bg-success/10' : 'bg-gray-500/10'}`}>
          <Text
            className={`font-interMedium text-center leading-none ${item.presente ? 'text-success' : 'text-gray-500'}`}
          >
            {item.presente ? 'presente' : 'ausente'}
          </Text>
        </View>
      </View>
    </View>
  )

  // Separador da lista
  const renderSeparator = () => (
    <View className="h-[1px] bg-[#3B465E] opacity-50 my-1" />
  )

  // Lista vazia
  const renderEmptyComponent = () => (
    <View className="flex-1 items-center justify-center px-4 mt-8">
      <Text className="text-gray-400 text-center font-inter text-sm">
        Nenhum participante encontrado
      </Text>
    </View>
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
      <SafeAreaView className="flex-1 bg-blue-900 items-center">
        <View className="w-full px-6 max-w-[1000px] mx-auto min-h-screen">
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={Platform.OS === "android"}
          />

          <BackButton />
          <Text className="text-red-500 text-center">{error}</Text>
        </View>
      </SafeAreaView>
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

        <View className="w-full mb-6">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Participantes</Text>

          <Text className="text-blue-200 font-inter text-base">
            {activityName}
          </Text>
        </View>

        <View className="w-full mb-10 flex-row gap-5">
          <View className="flex-1 p-4 flex-row items-center gap-4 bg-iconbg/20 rounded border border-border">
            <FontAwesome6 name="person" size={24} color={colors.border} />
            <Text className="text-border font-interSemiBold leading-none">{total}</Text>
          </View>

          <View className="flex-1 p-4 flex-row items-center gap-4 bg-success/10 rounded border border-success/80">
            <FontAwesome6 name="person-circle-check" size={24} color={colors.success} />
            <Text className="text-success font-interSemiBold leading-none">{presentes}</Text>
          </View>
        </View>

        <View className="flex flex-row mb-2 items-center justify-between">
          <Text className="flex-1 mr-2 text-gray-400 text-sm font-interMedium">Nome</Text>

          <View className="w-[90px] flex items-start justify-start">
            <Text className="text-gray-400 text-sm font-interMedium">Status</Text>
          </View>
        </View>

        <View className="h-[1px] bg-[#3B465E] opacity-50 my-1" />

        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          initialNumToRender={15}
          renderItem={renderParticipant}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  )
}
