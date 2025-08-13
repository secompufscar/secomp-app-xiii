import { Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export default function HomeEventSubscription({
  isEventActive,
  isUserSubscribed,
  onSubscribeRequest,
  onUnsubscribeRequest
}: {
  isEventActive: boolean;
  isUserSubscribed: boolean;
  onSubscribeRequest: () => void;
  onUnsubscribeRequest: () => void;
}) {
  const [isBtnPressed, setIsBtnPressed] = useState(false);

  let titleText = "";
  let subtitleText = "";
  let buttonText = "";
  let buttonDisabled = false;
  let onPressHandler: () => void = () => {};

  if (!isEventActive) {
    titleText = "Preparando a próxima edição ...";
    subtitleText = "O evento ainda não está ativo. Aguarde o período para inscrição.";
    buttonText = "Inscrições fechadas";
    buttonDisabled = true;
  } else if (isUserSubscribed) {
    titleText = "Inscrição confirmada!";
    subtitleText = "Você já está inscrito no evento!";
    buttonText = "Cancelar Inscrição";
    onPressHandler = onUnsubscribeRequest;
  } else {
    titleText = "Inscreva-se na Secomp!";
    subtitleText = "Para participar do evento, inscreva-se por aqui.";
    buttonText = "Inscrever-se";
    onPressHandler = onSubscribeRequest;
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
