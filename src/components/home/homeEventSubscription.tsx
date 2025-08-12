import { useState, useEffect } from "react";
import { Text, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../hooks/AuthContext";
import { getCurrentEvent } from "../../services/events";
import { getRegistrationByUserIdAndEventId, createRegistration, deleteRegistration } from "../../services/userEvents";

export default function HomeEventSubscription() {
  const [isBtnPressed, setIsBtnPressed] = useState(false);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [isEventActive, setIsEventActive] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Events | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const { user }: any = useAuth();

  const subscribe = async () => {
    if (!user?.id || !currentEvent?.id) {
      Alert.alert("Erro", "Usuário ou evento inválido.");
      return;
    }

    try {
      const registration = await createRegistration({ eventId: currentEvent.id });
      setIsUserSubscribed(true);
      setRegistrationId(registration.id ?? null);
      Alert.alert("Sucesso", "Você se inscreveu na Secomp com sucesso.");
    } catch (error: any) {
      Alert.alert("Erro", error.response?.data?.message || "Não foi possível realizar a inscrição.");
    }
  };

  const unsubscribe = async () => {
    if (!registrationId) return;
    try {
      await deleteRegistration(registrationId);
      setIsUserSubscribed(false);
      setRegistrationId(null);
      Alert.alert("Sucesso", "Sua inscrição foi removida.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cancelar a inscrição.");
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const event = await getCurrentEvent();
        setCurrentEvent(event);
        if (!event?.id || !user?.id) {
          setIsUserSubscribed(false);
          setIsEventActive(false);
          return;
        }

        const today = new Date();
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        setIsEventActive(today >= start && today <= end);

        const registration = await getRegistrationByUserIdAndEventId(user.id, event.id);
        setIsUserSubscribed(!!registration);
        setRegistrationId(registration?.id || null);
      } catch (error) {
        setIsUserSubscribed(false);
        setIsEventActive(false);
        setRegistrationId(null);
      }
    };

    fetchStatus();
  }, [user]);

  let titleText = "";
  let subtitleText = "";
  let buttonText = "";
  let buttonDisabled = false;
  let onPressHandler = subscribe;

  if (!isEventActive) {
    titleText = "Preparando a próxima edição ..."
    subtitleText = "O evento ainda não está ativo. Aguarde o período para inscrição.";
    buttonText = "Inscrições fechadas";
    buttonDisabled = true;
  } else if (isUserSubscribed) {
    titleText = "Inscrição confirmada!"
    subtitleText = "Você já está inscrito no evento! Aproveite nossas atividades.";
    buttonText = "Cancelar Inscrição";
    buttonDisabled = false;
    onPressHandler = unsubscribe;
  } else {
    titleText = "Inscreva-se na Secomp!"
    subtitleText = "Para participar do evento e de suas atividades, você deve se inscrever por aqui";
    buttonText = "Inscrever-se";
    buttonDisabled = false;
    onPressHandler = subscribe;
  }

  return (
    <LinearGradient
      colors={["#29303F", "#2A3B5E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-col w-full rounded-[8px] justify-start mb-8 px-6 py-5 overflow-hidden"
    >
      <Text className="text-white text-base font-poppinsSemiBold mb-2">{titleText}</Text>
      <Text className="text-default font-inter leading-[1.5] mb-4">
        {subtitleText}
      </Text>
      <Pressable
        onPress={onPressHandler}
        onPressIn={() => setIsBtnPressed(true)}
        onPressOut={() => setIsBtnPressed(false)}
        disabled={buttonDisabled}
        className={`w-44 bg-blue-500 rounded-[6px] py-3 px-4 items-center mt-2 mb-1 ${
          isBtnPressed ? "opacity-80" : "opacity-100"
        }`}
      >
        <Text className="text-white text-[13px] font-poppinsMedium">{buttonText}</Text>
      </Pressable>
    </LinearGradient>
  );
}
