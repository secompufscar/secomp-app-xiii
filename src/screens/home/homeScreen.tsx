import { useCallback, useEffect, useState } from "react";
import { Text, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { BeautifulName } from "beautiful-name";
import { useAuth } from "../../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faStar, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/colors";
import { getCurrentEvent } from "../../services/events";
import { createRegistration, deleteRegistration, getRegistrationByUserIdAndEventId } from "../../services/userEvents";
import AppLayout from "../../components/app/appLayout";
import HomeEventSubscription from "../../components/home/homeEventSubscription";
import HomeCompetitions from "../../components/home/homeCompetitions";
import HomeSocials from "../../components/home/homeSocials";
import ConfirmationOverlay from "../../components/overlay/confirmationOverlay";
import ErrorOverlay from "../../components/overlay/errorOverlay";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { user }: any = useAuth();
  const [eventStatusMessage, setEventStatusMessage] = useState("Carregando informações do evento...");
  const [errorMessage, setErrorMessage] = useState("Erro");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [isEventActive, setIsEventActive] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Events | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<null | "subscribe" | "unsubscribe">(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setConfirmAction(null);
      };
    }, [])
  );

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const event = await getCurrentEvent();
        setCurrentEvent(event);

        // Status do evento
        if (event) {
          const today = new Date();
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);
          setIsEventActive(today >= start && today <= end);

          const message = getEventStatusMessage(event);
          setEventStatusMessage(message);
        } else {
          setIsEventActive(false);
          setEventStatusMessage("Nenhum evento ativo no momento");
        }

        // Inscrição do usuário
        if (event?.id && user?.id) {
          const registration = await getRegistrationByUserIdAndEventId(user.id, event.id);
          setIsUserSubscribed(!!registration);
          setRegistrationId(registration?.id || null);
        } else {
          setIsUserSubscribed(false);
          setRegistrationId(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do evento:", error);
        setIsUserSubscribed(false);
        setIsEventActive(false);
        setRegistrationId(null);
        setEventStatusMessage("Não foi possível carregar o evento");
      }
    };

    fetchEventData();
  }, [user]);

  const subscribe = async () => {
    try {
      if (!user?.id || !currentEvent?.id) throw new Error("Usuário ou evento inválido");
      const registration = await createRegistration({ eventId: currentEvent.id });
      setIsUserSubscribed(true);
      setRegistrationId(registration.id ?? null);
    } catch {
      handleError("Não foi possível realizar a inscrição");
    }
  };

  const unsubscribe = async () => {
    try {
      if (!registrationId) return;
      await deleteRegistration(registrationId);
      setIsUserSubscribed(false);
      setRegistrationId(null);
    } catch {
      handleError("Não foi possível cancelar a inscrição.");
    }
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  // Mensagem baseada no horário do dia
  const getCurrentTime = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Bom dia,";
    } else if (hours >= 12 && hours < 18) {
      return "Boa tarde,";
    } else {
      return "Boa noite,";
    }
  };

  // Mensagem baseada no dia do evento
  const getEventStatusMessage = (event: Events): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Converte as strings de data da API (que estão em formato ISO 8601) para objetos Date.
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    // Também normaliza as datas do evento para o início do dia no fuso horário local.
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    
    if (today < startDate) {
      return "O evento ainda não começou";
    }

    if (today > endDate) {
      return "O evento já terminou. Até a próxima!";
    }

    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const currentEventDay = diffDays + 1;

    if (today.getTime() === endDate.getTime()) {
      return "Hoje é o último dia de evento";
    }

    return `Hoje é o ${currentEventDay}° dia de evento`;
  };

  const greeting = getCurrentTime();

  // Nome do usuário
  const nomeCompleto = new BeautifulName(user.nome).beautifulName;
  const nomes = nomeCompleto.trim().split(" ");

  const primeiroNome = nomes[0];
  const ultimoNome = nomes.length > 1 ? nomes[nomes.length - 1] : "";
  const nomeParaMostrar =
    ultimoNome && ultimoNome !== primeiroNome ? `${primeiroNome} ${ultimoNome}` : primeiroNome;

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <View className="w-full flex-row items-center justify-between mt-8 mb-6 gap-4">
          <View className="flex-col h-full flex-1 ">
            <Text className="text-base text-blue-100 font-inter">{eventStatusMessage}</Text>
            <View className="flex-row items-center justify-start mt-[6px]">
              <Text className="text-[18px] text-white font-poppinsSemiBold">{greeting} </Text>
              <Text className="text-[18px] text-green font-poppinsSemiBold">{`${nomeParaMostrar}`}</Text>
            </View>
          </View>

          {/* Notificações */}
          <Pressable
            onPress={() => {
              navigation.navigate("Notifications");
            }}
          >
            <View className="w-11 h-11 flex items-center justify-center rounded-[8px] p-2 bg-iconbg">
              <FontAwesomeIcon icon={faBell} size={20} color={colors.blue[200]} />
            </View>
          </Pressable>
        </View>

        {/* Inscrição no evento */}
        <HomeEventSubscription
          isEventActive={isEventActive}
          isUserSubscribed={isUserSubscribed}
          onSubscribeRequest={() => setConfirmAction("subscribe")}
          onUnsubscribeRequest={() => setConfirmAction("unsubscribe")}
        />

        {/* Guia do evento */}
        <View className="w-full mb-8 gap-4">
          <Text className="text-sm text-green font-poppinsSemiBold">Guia do evento</Text>

          <Pressable
            onPress={() => {
              navigation.navigate("EventGuide");
            }}
            className={`h-[80px] py-3 px-5 flex-row items-center gap-4 rounded-[8px] bg-background active:bg-background/80`}
          >
            <Image
              source={require("../../../assets/home/guidebook.png")}
              style={{ width: 54, height: 54 }}
            />
            <View className="flex-col w-full justify-start gap-1">
              <Text className="text-white text-[12px] font-poppinsMedium">
                Como participar da Secomp?
              </Text>
              <Text className="hidden text-default text-[12px] font-inter leading-[1.4] xxs:block">
                Um guia com tudo o que você precisa!
              </Text>
              <Text className="block text-default text-[12px] font-inter leading-[1.4] xxs:hidden">
                Um guia contendo tudo!
              </Text>
            </View>
          </Pressable>
        </View>

        {/* Competições */}
        <View className="w-full mb-8 gap-1">
          <Text className="text-sm text-green font-poppinsSemiBold">Competições</Text>
          <HomeCompetitions />
        </View>

        {/* Patrocinadores */}
        <View className="w-full mb-8 gap-4">
          <Text className="text-sm text-green font-poppinsSemiBold">Nossos apoiadores</Text>

          <Pressable
            onPress={() => {
              navigation.navigate("Sponsors");
            }}
            className={`w-full h-[62px] p-2 gap-3 flex-row items-center border border-border rounded-[8px] transition-all duration-50 active:bg-background`}
          >
            <View className="w-[44px] h-full flex items-center justify-center bg-background rounded-[5px]">
              <FontAwesomeIcon icon={faStar} size={20} color={colors.blue[500]} />
            </View>

            <Text className="flex-1 text-white text-[13px] font-inter font-medium">
              Patrocinadores
            </Text>

            <View className="w-6 h-full flex items-center justify-center">
              <FontAwesomeIcon icon={faChevronRight} size={16} color="#FFFFFF" />
            </View>
          </Pressable>
        </View>

        {/* Redes sociais */}
        <View className="w-full mb-24 gap-4">
          <Text className="text-sm text-green font-poppinsSemiBold">Redes sociais</Text>
          <HomeSocials />
        </View>
      </AppLayout>

      <ConfirmationOverlay
        visible={!!confirmAction}
        title={confirmAction === "subscribe" ? "Confirmar inscrição" : "Cancelar inscrição"}
        message={confirmAction === "subscribe" ? "Você deseja se inscrever neste evento?" : "Tem certeza que deseja cancelar sua inscrição?"}
        onCancel={() => setConfirmAction(null)}
        onConfirm={async () => {
          if (confirmAction === "subscribe") await subscribe();
          if (confirmAction === "unsubscribe") await unsubscribe();
          setConfirmAction(null);
        }}
        confirmText="Continuar"
        confirmButtonColor={colors.blue[500]}
      />

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
