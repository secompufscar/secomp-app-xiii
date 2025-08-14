import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert, Linking, StatusBar, Platform, ScrollView, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faCalendarDay, faUsers, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthContext";
import { subscribeToActivity, unsubscribeToActivity } from "../../services/activities";
import { userSubscription } from "../../services/userAtActivities";
import { getImagesByActivityId } from "../../services/activityImage";
import { colors } from "../../styles/colors";
import { format, parseISO, addHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import InfoRow from "../../components/info/infoRow";
import ConfirmationOverlay from "../../components/overlay/confirmationOverlay";
import ErrorOverlay from "../../components/overlay/errorOverlay";

const categoryIdToName: { [key: string]: string } = {
  "1": "Minicurso",
  "2": "Palestra",
  "3": "Competição",
  "4": "Gamenight",
  "5": "Sociocultural",
  "6": "Credenciamento",
  default: "Atividade",
};

export default function ActivityDetails() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { item: activity } = route.params as { item: Activity };
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [palestranteImageUrl, setPalestranteImageUrl] = useState("");
  const [activityImageUrl, setActivityImageUrl] = useState("");

  const [isPressed, setIsPressed] = useState(false);
  const [isBtnPressed, setIsBtnPressed] = useState(false);

  const [errorMessage, setErrorMessage] = useState("Erro");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user || user.tipo === "ADMIN") {
        setSubscriptionLoading(false);
        return;
      }

      setSubscriptionLoading(true);
      try {
        const response = await userSubscription(user.id, activity.id);
        if (response?.inscricaoPrevia === true || response?.listaEspera === true) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (error: any) {
        setIsSubscribed(false);
      } finally {
        setSubscriptionLoading(false);
      }
    };

    const fetchImagesByActivityId = async () => {
      const apiResponse = await getImagesByActivityId(activity.id);

      apiResponse.map((e) => {
        if (e.typeOfImage === "palestrante") {
          setPalestranteImageUrl(e.imageUrl);
        } else {
          setActivityImageUrl(e.imageUrl);
        }
      });
    };

    checkSubscription();
    fetchImagesByActivityId();
  }, [user, activity.id]);

  const handleSubscription = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      if (isSubscribed) {
        await unsubscribeToActivity(user.id, activity.id);
        setIsSubscribed(false);
      } else {
        await subscribeToActivity(user.id, activity.id);
        setIsSubscribed(true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Erro ao alterar status de inscrição";
      setErrorMessage(errorMessage);
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanPresence = () => {
    navigation.navigate("QRCode", { id: activity.id });
  };

  const getDate = () => format(addHours(parseISO(activity.data), 3), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  const getTime = () => format(addHours(parseISO(activity.data), 3), "HH:mm'h'", { locale: ptBR });
  const categoryName = categoryIdToName[activity.categoriaId] || categoryIdToName["default"];

  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <View className="flex-1 w-full">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />

        {/* Imagem da atividade */}
        <View className="w-full h-[280px] relative -mt-10">
          {activityImageUrl !== "" ? (
            <ImageBackground
              source={{ uri: activityImageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full flex items-center justify-center bg-background pt-10">
              <FontAwesome6 name="image" size={56} color={colors.border}/>
            </View>
          )}
          <View className="absolute top-4 left-4">
            <BackButton />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 w-full"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', paddingBottom: 32 }}
        >
          <View className="w-full px-6 max-w-[1000px] mx-auto mt-6">
            {/* Título da atividade */}
            <View className="mb-6">
              <Text className="text-gray-400 font-inter text-base">{categoryName}</Text>
              <Text className="text-white text-xl font-poppinsSemiBold mt-1">{activity.nome}</Text>
            </View>

            {/* Informações */}
            <View className="mb-6">
              <InfoRow icon={faLocationDot} mainText="UFSCar" subText={activity.local}>
                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("UFSCar " + activity.local)}`
                    )
                  }
                  onPressIn={() => setIsPressed(true)}
                  onPressOut={() => setIsPressed(false)}
                >
                  <Text
                    className={`text-sm text-blue-500 font-interMedium p-2 border-[1px] border-blue-500 rounded-md ${
                      isPressed ? "bg-blue-500/20" : "bg-blue-500/10"
                    }`}
                  >
                    Ver no mapa
                  </Text>
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
                />
              </View>
            </View>

            {/* Detalhes */}
            <View className="mb-10">
              <Text className="text-white text-lg font-poppinsSemiBold mb-1">Detalhes</Text>
              <Text className="text-gray-400 text-base font-inter leading-relaxed">
                {activity.detalhes}
              </Text>
            </View>

            {/* Palestrante */}
            <View className="mb-10">
              <View className="flex-row items-center">
                {palestranteImageUrl !== "" ? (
                  <Image
                    source={{ uri: palestranteImageUrl }}
                    style={{ width: 72, height: 72, resizeMode: "cover" }}
                    className="rounded-full"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUserCircle} size={52} color={colors.border} />
                )}

                <View className="ml-4">
                  <Text className="text-white text-base font-poppinsSemiBold">
                    {activity.palestranteNome}
                  </Text>
                  <Text className="text-gray-400 text-base font-inter">Organização da SECOMP</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Botão final */}
          <View className="w-full px-6 max-w-[1000px] mx-auto">
            {user?.tipo === "ADMIN" ? (
              <View className="flex flex-row gap-4">
                <Button title="Ler Presença" onPress={handleScanPresence} className="flex-1" />
                <Button
                  title="Participantes"
                  className="w-[40%]"
                  onPress={() =>
                    navigation.navigate("ParticipantsList", {
                      activityId: activity.id,
                      activityName: activity.nome,
                    })
                  }
                />
              </View>
            ) : activity.categoriaId === "1" ? ( 
              subscriptionLoading || isLoading ? (
                <ActivityIndicator size="large" color={colors.blue[500]} />
              ) : (
                <Pressable
                  onPress={handleSubscription}
                  onPressIn={() => setIsBtnPressed(true)}
                  onPressOut={() => setIsBtnPressed(false)}
                >
                  <View
                    className={`w-full px-4 py-[16px] items-center justify-center rounded-lg transition-transform duration-100 transform 
                      ${isSubscribed ? "bg-border" : "bg-blue-500 "} 
                      ${isBtnPressed ? "opacity-80" : "opacity-100"}`}
                  >
                    <Text className="text-white text-base font-interMedium">
                      {isSubscribed ? "Cancelar Inscrição" : "Inscrever-se"}
                    </Text>
                  </View>
                </Pressable>
              )
            ) : null}
          </View>
        </ScrollView>
      </View>

      <ErrorOverlay
        visible={errorModalVisible}
        title="Erro"
        message={errorMessage}
        onConfirm={() => {setErrorModalVisible(false)}}
        confirmText="OK"
      />
    </SafeAreaView>
  );
}
