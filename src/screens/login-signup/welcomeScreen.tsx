import { Text, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import AppLayout from "../../components/app/appLayout";
import Button from "../../components/button/button";

export default function Welcome() {
  const navigation = useNavigation<AuthTypes>();

  // Exibe tela apenas no primeiro acesso
  // const handleUnderstandPress = async () => {
  //     await AsyncStorage.setItem("isFirstTime", "true")
  // };

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <View className="flex-col h-full w-full gap-10 items-center justify-center">
          <View className="w-full max-w-[400px] max-h-[400px] rounded-lg flex items-center">
            <Image
              source={require("../../../assets/welcome/team.png")}
              style={{
                width: "100%",
                aspectRatio: 1,
                maxHeight: 380,
              }}
              resizeMode="contain"
            />
          </View>

          <View className="flex-col gap-3 w-full">
            <Text className="text-white text-2xl font-poppinsSemiBold">Venha viver a Secomp</Text>

            <Text className="text-gray-400 font-inter text-base">
              Participe de um dos maiores eventos tech de São Carlos!
            </Text>
          </View>

          <View className="flex-col gap-6 w-full">
            <Button
              title="Entrar"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />

            <Pressable
              className="self-center"
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              {({ pressed }) => (
                <Text
                  className={`text-base font-inter ${pressed ? "text-white" : "text-gray-400"}`}
                >
                  Criar conta
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </AppLayout>
    </SafeAreaView>
  );
}
