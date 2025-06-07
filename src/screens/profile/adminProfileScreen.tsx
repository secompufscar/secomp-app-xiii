import { SafeAreaView, View, Text, Pressable } from "react-native";
import BackButton from "../../components/button/backButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import EditButton from "../../components/button/editButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faRightFromBracket,
  faChevronRight,
  faQrcode,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../../components/appLayout";

export default function AdminProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <View className="flex-row justify-between items-center mb-8">
          <BackButton />
          <EditButton />
        </View>

        <View className="items-center mb-8">
          <View className="w-28 h-28 rounded-full border-[1px] border-[#3DCC87] bg-[#21353A] flex items-center justify-center mb-4">
            <View className="w-6 h-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} size={48} color="#3DCC87" />
            </View>
          </View>
          <Text className="text-white text-2xl font-poppinsSemiBold mb-1">
            Nome Completo
          </Text>
          <Text className="text-gray-400 font-poppins text-[14px]">
            aluno@estudante.ufscar.br
          </Text>
        </View>

        {/* Menu - Notificações */}
        <Pressable onPress={() => { /* Navegacao */ }}>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-between rounded-lg p-4 mb-3 ${
                pressed ? "bg-[#3D475C]" : "bg-[#29303F]"
              }`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-6 h-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faBell} size={24} color="#A9B4F4" />
                </View>
                <Text className="text-white text-base font-inter">Notificações</Text>
              </View>
              <View className="w-6 h-full flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
              </View>
            </View>
          )}
        </Pressable>

        {/* Menu - Credencial */}
        <Pressable onPress={() => { /* Navegacao */ }}>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-between rounded-lg p-4 mb-3 ${
                pressed ? "bg-[#3D475C]" : "bg-[#29303F]"
              }`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-6 h-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faQrcode} size={24} color="#A9B4F4" />
                </View>
                <Text className="text-white text-base font-inter">Credencial</Text>
              </View>
              <View className="w-6 h-full flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
              </View>
            </View>
          )}
        </Pressable>

        {/* Menu - Minhas Atividades */}
        <Pressable onPress={() => { /* Navegacao */ }}>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-between rounded-lg p-4 mb-3 ${
                pressed ? "bg-[#3D475C]" : "bg-[#29303F]"
              }`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-6 h-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCalendarDays} size={24} color="#A9B4F4" />
                </View>
                <Text className="text-white text-base font-inter">Minhas Atividades</Text>
              </View>
              <View className="w-6 h-full flex items-center justify-center">
                <FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
              </View>
            </View>
          )}
        </Pressable>

        {/* Logout */}
        <Pressable onPress={() => { /* Lógica de logout */ }}>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-center p-4 ${
                pressed ? "opacity-70" : ""
              }`}
            >
              <View className="w-6 h-full flex items-center justify-center mr-2">
                <FontAwesomeIcon icon={faRightFromBracket} size={16} color="#FFFFFF" />
              </View>
              <Text className="text-white text-base font-inter">Sair</Text>
            </View>
          )}
        </Pressable>
      </AppLayout>
    </SafeAreaView>
  );
}
