import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { BeautifulName } from "beautiful-name";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faArrowRightFromBracket, faChevronRight, faQrcode, faFlag, faUser, faStar, faTicket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthContext";
import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import EditButton from "../../components/button/editButton";
import ProfileButton from "../../components/button/profileButton";

export default function EventAdmin() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { signOut, user }: any = useAuth();

  const nomeCompleto = new BeautifulName(user.nome).beautifulName;

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <View className="flex-row justify-between items-center">
          <BackButton />

          <Text className="text-white text-xl font-poppinsSemiBold text-center mt-8">Painel de Eventos</Text>

          <EditButton />
        </View>
      </AppLayout>
    </SafeAreaView>
  );
}
