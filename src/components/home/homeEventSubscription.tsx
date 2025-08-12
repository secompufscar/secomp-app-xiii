import { useState, useEffect } from "react";
import { Text, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../hooks/AuthContext";
import { getRegistrationsByUserId } from "../../services/userEvents";

export default function HomeEventSubscription() {
  const [isBtnPressed, setIsBtnPressed] = useState(false);
  const { user }: any = useAuth();
  
  const subscribe = () => {
    // Aqui você pode colocar a lógica de inscrição, por enquanto só um alerta
    Alert.alert("Inscrição realizada!", "Você se inscreveu na Secomp com sucesso.");
  };

  useEffect(() => {

  }, [])

  return (
    <LinearGradient
      colors={["#29303F", "#2A3B5E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-col w-full rounded-[8px] justify-start mb-8 px-6 py-5 overflow-hidden"
    >
      <Text className="text-white text-lg font-poppinsSemiBold mb-2">Inscreva-se na Secomp</Text>
      <Text className="text-default text-[13px] font-inter leading-[1.5] mb-4">
        Para participar do evento e de suas atividades, você deve se inscrever por aqui
      </Text>
      <Pressable
        onPress={subscribe}
        onPressIn={() => setIsBtnPressed(true)}
        onPressOut={() => setIsBtnPressed(false)}
        className={`w-44 bg-blue-500 rounded-[6px] py-3 px-4 items-center mt-2 mb-1 ${
          isBtnPressed ? "opacity-80" : "opacity-100"
        }`}
      >
        <Text className="text-white text-[13px] font-poppinsMedium">Inscrever-se</Text>
      </Pressable>
    </LinearGradient>
  );
}
