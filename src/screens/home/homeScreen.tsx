import { useEffect, useState } from "react";
import { Text, View, Pressable, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BeautifulName } from "beautiful-name"
import { useAuth } from "../../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faStar, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../styles/colors";

import AppLayout from "../../components/appLayout";
import HomeCompetitions from "../../components/home/homeCompetitions";
import HomeSocials from "../../components/home/homeSocials";

export default function Home() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { user } : any = useAuth();
    const [pressed, setPressed] = useState(false);

    // Mensagem baseada no horário do dia
    const getCurrentTime = () => {
        const hours = new Date().getHours();
        if (hours < 12) {
            return "Bom dia," ;
        } else if (hours >= 12 && hours < 18) {
            return "Boa tarde," ; 
        } else {
            return "Boa noite," ;
        }
    };

    // Mensagem baseada no dia do evento
    const getCurrentDay = () => {
        const day = new Date().toLocaleDateString();

        switch (day){
            case "29/09/2025":
                return "Hoje é o 1° dia de evento";
            case "30/09/2025":
                return "Hoje é o 2° dia de evento";
            case "01/10/2025":
                return "Hoje é o 3° dia de evento";
            case "02/10/2025":
                return "Hoje é o 4° dia de evento";
            case "03/10/2025":
                return "Hoje é o último dia de evento";
            default:
                return `Hoje não é dia de evento`;
        }
    }

    const greeting  = getCurrentTime();
    const eventDay = getCurrentDay();

    // Nome do usuário
    const nomeCompleto = new BeautifulName(user.nome).beautifulName;
    const nomes = nomeCompleto.trim().split(" ");

    const primeiroNome = nomes[0];
    const ultimoNome = nomes.length > 1 ? nomes[nomes.length - 1] : "";
    const nomeParaMostrar = ultimoNome && ultimoNome !== primeiroNome
    ? `${primeiroNome} ${ultimoNome}`
    : primeiroNome;

    // Inscrever-se no evento
    const subscribe = () => {

        console.log("Usuário inscrito nesta edição com suceso!");
    }
    
    return (
        <SafeAreaView className="bg-blue-900 flex-1 items-center">
            <AppLayout>
                <View className="w-full flex-row items-center justify-between mt-8 mb-8 gap-4">
                    <View className="flex-col h-full flex-1 ">
                        <Text className="text-[14px] text-blue-100 font-inter">{eventDay}</Text>
                        <View className="flex-row items-center justify-start mt-[7px]">
                            <Text className="text-[18px] text-white font-poppinsSemiBold">{greeting} </Text>
                            <Text className="text-[18px] text-green font-poppinsSemiBold">{`${nomeParaMostrar}`}</Text>
                        </View>
                    </View>
                    
                    {/* Notificações */}
                    <Pressable onPress={() => { navigation.navigate("") }}>
                        <View className="w-11 h-11 flex items-center justify-center rounded-[8px] p-2 bg-iconbg">
                            <FontAwesomeIcon icon={faBell} size={20} color={colors.blue[200]} />
                        </View>
                    </Pressable>
                </View>

                {/* Inscrição no evento */}
                <LinearGradient
                    colors={["#29303F", "#2A3B5E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="flex-col w-full rounded-[8px] justify-start mb-8 px-6 py-5"
                    >
                        <Text className="text-white text-[14px] font-poppinsMedium mb-2">Inscreva-se na Secomp</Text>
                        <Text className="text-default text-[13px] font-inter leading-[1.4] mb-4">Para participar do evento e de suas atividades, você deve se inscrever por aqui</Text>
                        <Pressable onPress={subscribe} className="w-44 bg-blue-500 rounded-[6px] py-3 px-4 items-center mt-2 mb-1">
                            <Text className="text-white text-[13px] font-poppinsMedium">Inscrever-se</Text>
                        </Pressable>
                </LinearGradient>

                {/* Guia do evento */}
                <View className="w-full mb-8 gap-4">
                    <Text className="text-sm text-green font-poppinsSemiBold">Guia do evento</Text>

                    <Pressable onPress={() => { navigation.navigate("EventGuide") }}>
                        {({ pressed }) => (
                            <View className={`h-[80px] py-3 px-5 flex-row items-center gap-4 rounded-[8px] ${pressed ? " bg-background/70" : "bg-background"}`}>
                                <Image source={require('../../../assets/home/guidebook.png')} style={{ width: 54, height: 54 }}/>
                                <View className="flex-col w-full justify-start gap-1">
                                    <Text className="text-white text-[12px] font-poppinsMedium">Como participar da Secomp?</Text>
                                    <Text className="hidden text-default text-[12px] font-inter leading-[1.4] xxs:block">Um guia com tudo o que você precisa!</Text>
                                    <Text className="block text-default text-[12px] font-inter leading-[1.4] xxs:hidden">Um guia contendo tudo!</Text>
                                </View>
                            </View>
                        )}
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
                        onPress={() => { navigation.navigate("Sponsors") }}
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}
                        className={`w-full h-[62px] p-2 gap-3 flex-row items-center border border-border rounded-[8px] transition-all duration-50 
                            ${pressed ? 'bg-background' : ''
                        }`}>
                        <View className="w-11 h-full flex items-center justify-center bg-background rounded-[5px]">
                            <FontAwesomeIcon icon={faStar} size={20} color={colors.blue[500]} />
                        </View>

                        <Text className="flex-1 text-white text-[13px] font-inter font-medium">Patrocinadores</Text>

                        <View className="w-6 h-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faChevronRight} size={16} color="#FFFFFF" />
                        </View>
                    </Pressable>
                </View>

                {/* Redes sociais */}
                <View className="w-full mb-20 gap-4">
                    <Text className="text-sm text-green font-poppinsSemiBold">Redes sociais</Text>
                    <HomeSocials />
                </View>            
            </AppLayout>
        </SafeAreaView>
    );
}