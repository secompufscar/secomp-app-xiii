import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { BeautifulName } from "beautiful-name";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faArrowRightFromBracket,
  faChevronRight,
  faQrcode,
  faFlag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthContext";
import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import EditButton from "../../components/button/editButton";

export default function AdminProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { signOut, user }: any = useAuth();

  const nomeCompleto = new BeautifulName(user.nome).beautifulName;

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <View className="flex-row justify-between items-center">
          <BackButton />

          <Text className="text-white text-xl font-poppinsSemiBold text-center mt-8">Perfil</Text>

          <EditButton />
        </View>

        <View className="items-center mb-10">
          <View className="w-32 h-32 rounded-full border-[1px] border-[#3DCC87] bg-[#21353A] flex items-center justify-center mb-4">
            <View className="w-6 h-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} size={48} color="#3DCC87" />
            </View>
          </View>

          <Text className="text-white text-2xl font-poppinsSemiBold mb-1">{nomeCompleto}</Text>

          <Text className="text-gray-400 font-poppins text-base">{user.email}</Text>
        </View>

        {/* Notificações */}
        <Pressable onPress={() => {}}>
          {({ pressed }) => (
            <View
              className={`flex-row h-[58px] items-center justify-between rounded-lg p-4 mb-3 ${
                pressed ? "bg-background/60" : "bg-background"
              }`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-6 flex items-center justify-center">
                  <FontAwesomeIcon icon={faBell} size={20} color="#A9B4F4" />
                </View>
                <Text className="text-white text-base font-inter">Notificações</Text>
              </View>
              <View className="w-6 flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
              </View>
            </View>
          )}
        </Pressable>

        {/* Criar notificação */}
        <Pressable onPress={() => {}}>
          {({ pressed }) => (
            <View
              className={`flex-row h-[58px] items-center justify-between rounded-lg p-4 mb-3 ${
                pressed ? "bg-background/60" : "bg-background"
              }`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-6 flex items-center justify-center">
                  <FontAwesomeIcon icon={faFlag} size={20} color="#A9B4F4" />
                </View>
                <Text className="text-white text-base font-inter">Criar notificação</Text>
              </View>
              <View className="w-6 flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
              </View>
            </View>
          )}
        </Pressable>

        {/* Credenciamento */}
        <Pressable onPress={() => {}}>
          {({ pressed }) => (
            <View
              className={`flex-row h-[58px] items-center justify-between rounded-lg p-4 mb-3 ${
                pressed ? "bg-background/60" : "bg-background"
              }`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-6 flex items-center justify-center">
                  <FontAwesomeIcon icon={faQrcode} size={20} color="#A9B4F4" />
                </View>
                <Text className="text-white text-base font-inter">Credenciamento</Text>
              </View>
              <View className="w-6 flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
              </View>
            </View>
          )}
        </Pressable>

        {/* Sair */}
        <Pressable onPress={signOut}>
          {({ pressed }) => (
            <View
              className={`flex-row h-[58px] items-center justify-between rounded-lg p-5 mb-3 border border-iconbg ${
                pressed ? "bg-background/60" : ""
              }`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-6 flex items-center justify-center">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} size={20} color="#A9B4F4" />
                </View>

                <Text className="text-white text-base font-inter">Sair</Text>
              </View>

              <View className="w-6 flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
              </View>
            </View>
          )}
        </Pressable>
      </AppLayout>
    </SafeAreaView>
  );
}
