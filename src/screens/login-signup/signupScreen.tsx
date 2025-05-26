import { useState } from "react"
import { View, Alert, TouchableOpacity, Text, Platform, Pressable, ActivityIndicator } from "react-native"
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { StackTypes } from '../../routes/stack.routes';
import { colors } from "../../styles/colors"
import { SafeAreaView } from "react-native-safe-area-context";
import { signup } from "../../services/users";
import { Input } from "../../components/input/input"
import AppLayout from "../../components/appLayout";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button"
import validator from 'validator';


function capitalizeFirstLetter(string: string) {
	const words = string.toLocaleLowerCase().split(" ");
	
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i][0] ? words[i][0].toUpperCase() + words[i].substr(1) : "";
	}
	
	return words.join(" ");
}

export default function SignUp() {
	const navigation = useNavigation<StackTypes>();
	const [nome, setNome] = useState("")
	
	// E-mail
	const [email, setEmail] = useState("")
	const [isEmailValid, setIsEmailValid] = useState(true);

	// Senha
	const [senha, setSenha] = useState("")
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	// Confirmar senha
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

	// Load animation
	const [isLoading, setIsLoading] = useState(false)
	
	const validateEmail = (email: string): boolean => {
        return validator.isEmail(email);
    };

	// Função para exibir os alertas
	const showAlert = (title: string, message: string) => {
		if (Platform.OS === 'web') {
			window.alert(message);
		} else {
			Alert.alert(title, message);
		}
	};
	
	const handleRegister = async () =>  {
		setIsEmailValid(true);
		setIsPasswordValid(true);
		setIsConfirmPasswordValid(true);
	
		if (!email.trim() || !senha.trim() || !nome.trim()) {
			showAlert("Criar conta", "Por favor, preencha todos os campos!");
			return;
		}
	
		const emailValido = validateEmail(email);
		setIsEmailValid(emailValido);
		if (!emailValido) return;
	
		const senhaValida = senha.length >= 6;
		setIsPasswordValid(senhaValida);
		if (!senhaValida) return;
	
		const confirmacaoValida = senha === confirmPassword;
		setIsConfirmPasswordValid(confirmacaoValida);
		if (!confirmacaoValida) return;
	
		setIsLoading(true);
	
		try {
			const data = await signup({ nome, email, senha });
	
			if (data.emailEnviado) {
				showAlert("Inscrição", "Um e-mail de confirmação foi enviado com sucesso!");

				// Limpa os campos
				setNome("");
				setEmail("");
				setSenha("");
				setConfirmPassword("");
				
				navigation.navigate('Login');
			}
	
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message || 'Falha ao processar o cadastramento.';
			showAlert("Inscreva-se", errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
        <SafeAreaView className="flex-1 bg-blue-900 items-center">
			<AppLayout>
				<BackButton/>

				<View className={`mt-8 gap-1`}>
                    <Text className="text-white text-[24px] font-poppinsSemiBold">
                        Criar conta
                    </Text>

					<Text className="text-gray-400 text-sm font-inter">
						Você está próximo de participar do evento!
                    </Text>
                </View>

				<View className="flex-col w-full gap-2 py-8 text-center justify-center">
					{/* Nome */}
					<View className="w-full">
                        <Input>
							<Ionicons name="person" size={20} color={colors.border} />

                            <Input.Field
                                placeholder="Nome completo"
								onChangeText={(text) => setNome(capitalizeFirstLetter(text))}
                                value={nome}
                            />
                        </Input>
                    </View>

					{/* E-mail */}
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
					
					{/* Senha */}
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
						
					{/* Confirmar senha */}
					<View className="w-full">
                        <Input>
                            <MaterialIcons name="lock" size={20} color={colors.border} />

                            <Input.Field
                            placeholder="Confirmar senha"
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            secureTextEntry={!isConfirmPasswordVisible}
                            />

                            <Pressable onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                                <Ionicons
                                    name={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
                                    size={20}
                                    color={colors.border}
                                />
                            </Pressable>
                        </Input>

                        {!isConfirmPasswordValid && (
                            <Text className="text-[12px] text-danger font-inter">
                                As senhas não coincidem!
                            </Text>
                        )}
                    </View>

					{isLoading ? (
                        <ActivityIndicator size="large" color={colors.blue[500]} className="mt-8" />
                    ) : (
                        <Button className="mt-8" title="Criar" onPress={handleRegister} />
                    )}

					<View className="flex-row mt-10 items-center justify-center gap-1">
                        <Text className="text-white text-sm font-inter">
                            Já possui uma conta?
                        </Text>

                        <Pressable onPress={() => navigation.navigate("Login")}>
                            {({ pressed }) => (
                                <Text className={`text-sm font-inter font-semibold ${pressed ? "text-blue-500 opacity-80" : "text-blue-500"}`}>
                                    Entrar
                                </Text>
                            )}
                        </Pressable>
                    </View>
				</View>
            </AppLayout>
        </SafeAreaView>
	)
}

