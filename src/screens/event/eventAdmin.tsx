import { View, Text, Pressable, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";

export default function EventAdmin() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <View className="flex-1 w-full">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />

        <View className="w-full flex-1 px-6 max-w-[1000px] mx-auto">
          <BackButton/>

          {/* Cabeçalho */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Painel de eventos</Text>
            <Text className="text-gray-400 font-inter">
              Painel de administração dos eventos
            </Text>
          </View>

          <Button title="Criar evento" onPress={() => {navigation.navigate("EventAdminCreate")}}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
