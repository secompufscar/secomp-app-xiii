import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot, faCalendarDay, faUsers, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/AuthContext';
import { subscribeToActivity, unsubscribeToActivity } from '../../services/activities';
import { userSubscription } from '../../services/userAtActivities';
import { colors } from '../../styles/colors';
import { format, parseISO, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AppLayout from '../../components/app/appLayout';
import BackButton from '../../components/button/backButton';
import Button from '../../components/button/button';
import InfoRow from '../../components/info/infoRow';

const categoryIdToName: { [key: string]: string } = {
  '1': 'Minicurso',
  '2': 'Palestra',
  '3': 'Competição',
  '4': 'Gamenight',
  '5': 'Sociocultural',
  '6': 'Credenciamento',
  'default': 'Atividade'
};

export default function ActivityDetails() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { item: activity } = route.params as { item: Activity };
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user || user.tipo === 'ADMIN') {
        setSubscriptionLoading(false);
        return;
      };

      setSubscriptionLoading(true);
      try {
        await userSubscription(user.id, activity.id);
        setIsSubscribed(true);
      } catch (error: any) {
        if (error.response?.status !== 404) {
          console.error("Erro ao verificar inscrição:", error);
        }
        setIsSubscribed(false);
      } finally {
        setSubscriptionLoading(false);
      }
    };
    checkSubscription();
  }, [user, activity.id]);

  const handleSubscription = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      if (isSubscribed) {
        await unsubscribeToActivity(user.id, activity.id);
        Alert.alert("Sucesso", "Você cancelou sua inscrição nesta atividade.");
        setIsSubscribed(false);
      } else {
        await subscribeToActivity(user.id, activity.id);
        Alert.alert("Sucesso", "Você se inscreveu nesta atividade!");
        setIsSubscribed(true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Ocorreu um erro.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanPresence = () => {
    navigation.navigate('QRCode', { id: activity.id });
  };

  const getDate = () => format(addHours(parseISO(activity.data), 3), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  const getTime = () => format(addHours(parseISO(activity.data), 3), "HH:mm'h'", { locale: ptBR });
  const categoryName = categoryIdToName[activity.categoriaId] || categoryIdToName['default'];

  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <View className="w-full h-72 absolute bg-iconbg/40 -z-10">
        {/* Imagem */}
      </View>

      <AppLayout>
        <BackButton />

        {/* titulo da atividade */}
        <View className="mb-6 mt-36">
          <Text className="text-gray-400 font-inter text-base">{categoryName}</Text>
          <Text className="text-white text-xl font-poppinsSemiBold mt-1">{activity.nome}</Text>
        </View>

        {/* info*/}
        <View className="mb-6">
          <InfoRow
            icon={faLocationDot}
            mainText="UFSCar"
            subText={activity.local}
          >
            {/*link pro google maps*/}
            <Pressable
              onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("UFSCar " + activity.local)}`)}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              <Text className={`text-sm text-blue-500 font-interMedium p-2 border-[1px] border-blue-500 rounded-md ${isPressed ? "bg-blue-500/20" : "bg-blue-500/10"}`}>Ver no mapa</Text>
            </Pressable>
          </InfoRow>

          <View className="flex flex-row w-full gap-4">
            <InfoRow
              icon={faCalendarDay}
              mainText={getDate()}
              subText={getTime()}
              className="w-[60%]"
            />

            <InfoRow
              icon={faUsers}
              mainText="Vagas"
              subText={activity.vagas > 0 ? activity.vagas : "Ilimitadas"}
              className="w-[35%]"
            >
            </InfoRow>
          </View>
        </View>

        <View className="mb-10">
          <Text className="text-white text-lg font-poppinsSemiBold mb-1">Detalhes</Text>
          <Text className="text-gray-400 text-base font-inter leading-relaxed">{activity.detalhes}</Text>
        </View>

        {/* Palestrante */}
        <View className="mb-10">
          <View className="flex-row items-center">
            {/* Imagem para adicionar depois */}
            <FontAwesomeIcon icon={faUserCircle} size={52} color={colors.border} />
            <View className="ml-4">
              <Text className="text-white text-base font-poppinsSemiBold">{activity.palestranteNome}</Text>
              {/* subtitulo do palestrante para depois */}
              <Text className="text-gray-400 text-base font-inter">Organização da SECOMP</Text>
            </View>
          </View>
        </View>

        {/* button */}
        <View className="mt-auto mb-10">
          {user?.tipo === 'ADMIN' ? (
            <View className="flex flex-row gap-4">
              <Button title="Ler Presença" onPress={handleScanPresence} className="flex-1" />
              <Button title="Lista de Inscritos" onPress={() => navigation.navigate("ParticipantsList", {
                activityId: activity.id,
                activityName: activity.nome
              })} className="flex-1" />
            </View>
          ) : (
            subscriptionLoading || isLoading ? (
              <ActivityIndicator size="large" color={colors.blue[500]} />
            ) : (
              <Button
                title={isSubscribed ? "Inscrever-se" : "Cancelar Inscrição"}
                onPress={handleSubscription}
              />
            )
          )}
        </View>

      </AppLayout>
    </SafeAreaView>
  );
}
