import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import AppLayout from "../../components/app/appLayout";
import Button from "../../components/button/button"

export default function EmailConfirmation(){
    const navigation = useNavigation<AuthTypes>();
    const route = useRoute();
    const { email } = route.params as { email: string } || { email: '' };

    return (
        <SafeAreaView className="flex-1 bg-blue-900 items-center">
            <AppLayout>
                <View className="w-full max-w-[400px] h-[400px] mt-16 flex items-center justify-center">
                    <Image
                        source={require("../../../assets/email/email.png")}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                </View>

                <View className="w-full flex-col items-start">
                    <Text className="text-white text-xl font-poppinsSemiBold mb-2">Confirme seu e-mail</Text>
                    <Text className="text-gray-400 text-base font-inter">Um e-mail foi enviado para <Text className="text-green">{email}</Text>.</Text>
                </View>

                <Button className="mt-10" title="Login" onPress={() => navigation.navigate("Login")}/>
            </AppLayout>
        </SafeAreaView>
    )
}