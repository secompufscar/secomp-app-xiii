import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot, faCalendarDays, faUsers, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/AuthContext';
import { subscribeToActivity, unsubscribeToActivity } from '../../services/activities';
import { userSubscription } from '../../services/userAtActivities';
import AppLayout from '../../components/app/appLayout';
import BackButton from '../../components/button/backButton';
import Button from '../../components/button/button';
import { colors } from '../../styles/colors';
import { format, parseISO, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import InfoRow from '../../components/info/infoRow';

const categoryIdToName: { [key: string]: string } = {
  '1': 'Minicurso',
  '2': 'Palestra',
  '3': 'Competição',
  '4': 'Game Night',
  '5': 'Sociocultural',
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
      <AppLayout>

        <View className="mb-4">
            <BackButton />
        </View>

        {/* titulo da atividade */}
        <View className="mb-6">
            <Text className="text-gray-400 font-inter text-base">{categoryName}</Text>
            <Text className="text-white text-3xl font-poppinsSemiBold mt-1">{activity.nome}</Text>
        </View>

        {/* info*/}
        <View className="mb-8 space-y-4">
            <InfoRow 
                icon={faLocationDot} 
                mainText="Departamento de Computação"
                subText={activity.local}
            >
                {/*link pro google maps*/}
                <Pressable onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.local)}`)}>
                    <Text className="text-green underline">Ver no mapa</Text>
                </Pressable>
            </InfoRow>

            <InfoRow 
                icon={faCalendarDays} 
                mainText={getDate()}
                subText={getTime()}
            />

            <InfoRow 
                icon={faUsers} 
                mainText="Vagas"
                subText={activity.vagas > 0 ? activity.vagas : "Ilimitadas"}
            >
            </InfoRow>
        </View>
        
        <View className="mb-8">
            <Text className="text-white text-lg font-poppinsMedium mb-2">Detalhes</Text>
            <Text className="text-default text-base font-inter leading-relaxed">{activity.detalhes}</Text>
        </View>

        {/* Palestrante */}
        <View className="mb-12">
            <Text className="text-white text-lg font-poppinsMedium mb-3">Palestrante</Text>
            <View className="flex-row items-center">
                 {/* Imagem para adicionar depois */}
                <FontAwesomeIcon icon={faUserCircle} size={48} color={colors.border} />
                <View className="ml-4">
                    <Text className="text-white text-base font-poppinsMedium">{activity.palestranteNome}</Text>
                     {/* subtitulo do palestrante para depois */}
                    <Text className="text-gray-400 text-sm">Organização da SECOMP</Text>
                </View>
            </View>
        </View>

        {/* button */}
        <View className="mt-auto mb-4">
            {user?.tipo === 'ADMIN' ? (
              <View className="space-y-4">
                <Button title="Ver Lista de Inscritos" onPress={() => Alert.alert("Funcionalidade futura", "A lista de inscritos será exibida aqui.")} />
                <Button title="Ler Presença (QR Code)" onPress={handleScanPresence} />
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
