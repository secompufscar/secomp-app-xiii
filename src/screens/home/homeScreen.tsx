import { useEffect, useState } from "react";
import { Text, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BeautifulName } from "beautiful-name";
import { useAuth } from "../../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faStar, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../styles/colors";
import { getCurrentEvent } from "../../services/events";
import AppLayout from "../../components/app/appLayout";
import HomeCompetitions from "../../components/home/homeCompetitions";
import HomeSocials from "../../components/home/homeSocials";
import { useTheme } from "../../hooks/ThemeContext";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { user }: any = useAuth();
  const [isBtnPressed, setIsBtnPressed] = useState(false);
  const [eventStatusMessage, setEventStatusMessage] = useState("Carregando informações do evento...");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchAndSetEventStatus = async () => {
      try {
        const currentEvent = await getCurrentEvent();
        
        if (currentEvent) {
          const message = getEventStatusMessage(currentEvent);
          setEventStatusMessage(message);
        } else {
          setEventStatusMessage("Nenhum evento ativo no momento");
        }
      } catch (error) {
        console.error("Falha ao buscar dados do evento:", error);
        setEventStatusMessage("Não foi possível carregar o evento");
      }
    };

    fetchAndSetEventStatus();
  }, []);

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

  // Inscrever-se no evento
  const subscribe = () => {
    console.log("Usuário inscrito nesta edição com suceso!");
  };

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background flex-1 items-center">
      <AppLayout>
        <View className="w-full flex-row items-center justify-between mt-8 mb-6 gap-4">
          <View className="flex-col h-full flex-1 ">
            <Text className="text-base text-blue-100 font-inter">{eventStatusMessage}</Text>
            <View className="flex-row items-center justify-start mt-[6px]">
              <Text className="text-[18px] text-light-text dark:text-dark-text font-poppinsSemiBold">{greeting} </Text>
              <Text className="text-[18px] text-green font-poppinsSemiBold">{`${nomeParaMostrar}`}</Text>
            </View>
          </View>

          {/* Notificações */}
          <Pressable
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <View className="w-11 h-11 flex items-center justify-center p-2 rounded-[8px] bg-light-secondary dark:bg-dark-secondary">
              <FontAwesomeIcon icon={faBell} size={20} color={theme === "dark" ? colors.dark.icon : colors.light.icon} />
            </View>
          </Pressable>
        </View>

        {/* Inscrição no evento */}
        <LinearGradient
          colors={["#29303F", "#2A3B5E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-col w-full rounded-[8px] justify-start mb-8 px-6 py-5 overflow-hidden"
        >
          <Text className="text-white text-lg font-poppinsSemiBold mb-2">
            Inscreva-se na Secomp
          </Text>
          <Text className="text-default text-[13px] font-inter leading-[1.5] mb-4">
            Para participar do evento e de suas atividades, você deve se inscrever por aqui
          </Text>
          <Pressable
            onPress={subscribe}
            onPressIn={() => setIsBtnPressed(true)}
            onPressOut={() => setIsBtnPressed(false)}
            className={`w-44 bg-blue-500 rounded-[6px] py-3 px-4 items-center mt-2 mb-1 ${isBtnPressed ? "opacity-80" : "opacity-100"}`}
          >
            <Text className="text-white text-[13px] font-poppinsMedium">Inscrever-se</Text>
          </Pressable>
        </LinearGradient>

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
    </SafeAreaView>
  );
}
