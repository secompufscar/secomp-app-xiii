import { View, Text, Pressable, StatusBar, Platform, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { BeautifulName } from "beautiful-name";
import { useTheme } from "../../hooks/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faArrowRightFromBracket, faChevronRight, faQrcode, faFlag, faUser, faStar, faTags, faTicket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthContext";
import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import EditButton from "../../components/button/editButton";
import ProfileButton from "../../components/button/profileButton";
import { colors } from "../../styles/colors";

export default function AdminProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { signOut, user }: any = useAuth();
  const { theme, toggleTheme } = useTheme();

  const nomeCompleto = new BeautifulName(user.nome).beautifulName;

  return (
    <SafeAreaView className="bg-light-background dark:bg-dark-background flex-1 items-center">
      <View className="w-full px-6 max-w-[1000px] mx-auto flex-1">
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />
        
        <View className="flex-row justify-between items-center">
          <BackButton />
          <Text className="text-light-text dark:text-dark-text text-xl font-poppinsSemiBold text-center mt-8">Perfil</Text>
          <EditButton />
        </View>

        <View className="items-center mb-8">
          <View className="w-32 h-32 rounded-full border-[1px] border-[#3DCC87] bg-light-profileBackground dark:bg-dark-profileBackground flex items-center justify-center mb-4">
            <View className="w-6 h-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} size={48} color={theme === "dark" ? "#3DCC87" : colors.light.icon2} />
            </View>
          </View>
          <Text className="text-light-text dark:text-dark-text text-2xl font-poppinsSemiBold mb-1">{nomeCompleto}</Text>
          <Text className="text-gray-400 font-poppins text-base">{user.email}</Text>
        </View>

        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-light-text dark:text-dark-text">Dark Mode</Text>
          <Switch value={theme === "dark"} onValueChange={toggleTheme} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 w-full"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <ProfileButton icon={faQrcode} label="Credenciamento" onPress={() => {}} />
          <ProfileButton icon={faBell} label="Notificações" onPress={() => { navigation.navigate("AdminNotificationScreen")}} />
          <ProfileButton icon={faFlag} label="Atividades" onPress={() => { navigation.navigate("ActivityAdmin" )}} />
          <ProfileButton icon={faStar} label="Patrocinadores" onPress={() => { navigation.navigate("SponsorsAdmin") }} />
          <ProfileButton icon={faTags} label="Tags" onPress={() => { navigation.navigate("TagsAdmin") }} />
          <ProfileButton icon={faTicket} label="Eventos" onPress={() => { navigation.navigate("EventAdmin") }} />
          <ProfileButton icon={faArrowRightFromBracket} label="Sair" onPress={signOut} />

          //versao antiga do botao de logout, troquei para o profilebutton para ficar consistente por hora pois estava desalinhado
          {/*<Pressable onPress={signOut}>
            {({ pressed }) => (
              <View
                className={`flex-row h-[58px] items-center justify-between rounded-lg p-5 mb-24 border border-iconbg ${
                  pressed ? "bg-background/60" : ""
                }`}
              >
                <View className="flex-row items-center gap-4">
                  <View className="w-6 flex items-center justify-center">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size={20} color="#A9B4F4" />
                  </View>
                  <Text className="text-light-text dark:text-dark-text text-base font-inter">Sair</Text>
                </View>
                <View className="w-6 flex items-center justify-center">
                  <FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
                </View>
              </View>
            )}
          </Pressable>
          */}


        </ScrollView>
      </View>
    </SafeAreaView>
  );
}