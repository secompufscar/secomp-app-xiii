import { View, Alert, Text, Platform, Pressable, ActivityIndicator } from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/AuthContext";
import { StackTypes } from '../../routes/stack.routes';
import { colors } from "../../styles/colors"
import { login } from "../../services/users";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../components/input/input";
import Button from "../../components/button/button";
import AppLayout from "../../components/appLayout";
import BackButton from "../../components/button/backButton";
import validator from 'validator';

export default function Login() {
    const navigation = useNavigation<StackTypes>();
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [senha, setSenha] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const validateEmail = (email: string): boolean => {
        return validator.isEmail(email);
    };

    const handleLogin = async () => {
        setIsEmailValid(true);
        setIsPasswordValid(true);
        
        if (!email.trim() || !senha.trim()) {
            if (Platform.OS === 'web') {
                window.alert("Por favor, preencha todos os campos!");
            } else {
                Alert.alert("Login incompleto!", "Por favor, preencha todos os campos.");
            }
            return;
        }
        
        // Verifica a validade do e-mail
        const emailValido = validateEmail(email);
		setIsEmailValid(emailValido);
		if (!emailValido) return;
        
        // Verifica a validade da senha
        if (senha.length < 6) {
            setIsPasswordValid(false);
            return;
        } else {
            setIsPasswordValid(true);
        }

        setIsLoading(true)

        try {
            const data = await login({ email, senha })
            await signIn(data)
        } catch (error) {
            const err = error as any;
            const errorMessage = err.response?.data?.message || 'Falha ao processar o login.';

            if (Platform.OS === 'web') {
                window.alert(`Erro: não foi possível realizar o login`);
            } else {
                Alert.alert("Erro no login", errorMessage);
            }

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-blue-900 items-center">
            <AppLayout>
                <BackButton/>

                <View className={`mt-8`}>
                    <Text className="text-white text-[24px] font-poppinsSemiBold">
                        Olá,
                    </Text>

                    <Text className="text-white text-[24px] font-poppinsSemiBold">
                        Bem-vindo de volta
                    </Text>
                </View>

                <View className="flex-col w-full gap-2 py-6 text-center justify-center">
                    <View className="w-full">
                        <Input>
                            <MaterialIcons name="email" size={20} color={colors.border} />

                            <Input.Field
                                placeholder="E-mail"
                                onChangeText={setEmail}
                                value={email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </Input>

                        {!isEmailValid && (
                            <Text className="text-[12px] text-danger font-inter mb-1">
                                Por favor, digite um email válido!
                            </Text>
                        )}
                    </View>
                        
                    <View className="w-full">
                        <Input>
                            <MaterialIcons name="lock" size={20} color={colors.border} />

                            <Input.Field
                            placeholder="Senha"
                            onChangeText={setSenha}
                            value={senha}
                            secureTextEntry={!isPasswordVisible}
                            />

                            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Ionicons
                                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                                    size={20}
                                    color={colors.border}
                                />
                            </Pressable>
                        </Input>

                        {!isPasswordValid && (
                            <Text className="text-[12px] text-danger font-inter">
                                A senha deve conter no mínimo 6 caracteres
                            </Text>
                        )}
                    </View>
        
                    <View className="w-full items-end">
                        <Pressable onPress={() => navigation.navigate("PasswordReset")}>
                            {({ pressed }) => (
                            <Text className={`text-xs font-poppins underline ${pressed ? "text-white" : "text-gray-400"}`}>
                                Esqueci minha senha!
                            </Text>
                            )}
                        </Pressable>
                    </View>

                    {isLoading ? (
                        <ActivityIndicator size="large" color={colors.blue[500]} className="mt-8" />
                    ) : (
                        <Button className="mt-8" title="Entrar" onPress={handleLogin} />
                    )}

                    <View className="flex-row mt-10 items-center justify-center gap-1">
                        <Text className="text-white text-sm font-inter">
                            Não possui uma conta?
                        </Text>

                        <Pressable onPress={() => navigation.navigate("SignUp")}>
                            {({ pressed }) => (
                                <Text className={`text-sm font-inter font-semibold ${pressed ? "text-blue-500 opacity-80" : "text-blue-500"}`}>
                                    Criar agora
                                </Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </AppLayout>
        </SafeAreaView>
    )
}