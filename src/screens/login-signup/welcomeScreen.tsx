import { Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from '../../routes/auth.routes';
import AppLayout from "../../components/appLayout";
import Button from '../../components/button/button';

export default function Welcome() {
    const navigation = useNavigation<AuthTypes>();

    // Exibe tela apenas no primeiro acesso
    // const handleUnderstandPress = async () => {
    //     await AsyncStorage.setItem("isFirstTime", "true")
    // };

    return (
        <SafeAreaView className="bg-blue-900 flex-1 items-center">
            <AppLayout>
                <View className="flex-col w-full h-full py-24 gap-10">
                    <View className="flex-1 w-full bg-background rounded-lg">
                        {/* Ilustração */}
                    </View>

                    <View className="flex-col gap-3">
                        <Text className="text-white text-2xl font-poppinsSemiBold">
                            Venha viver a Secomp
                        </Text>

                        <Text className="text-gray-400 font-inter text-sm">
                            Participe de um dos maiores eventos tech de São Carlos!
                        </Text>
                    </View>

                    <View className="flex-col gap-6">
                        <Button title="Entrar" onPress={() => {navigation.navigate("Login")}}/>

                        <Pressable className="self-center" onPress={() => {navigation.navigate("SignUp")}}>
                            {({ pressed }) => (
                                <Text className={`text-sm font-inter ${pressed ? "text-white" : "text-gray-400"}`}>
                                    Criar nova conta
                                </Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </AppLayout>
        </SafeAreaView>
    );
}
