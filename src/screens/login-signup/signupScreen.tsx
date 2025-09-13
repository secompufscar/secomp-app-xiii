import { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import { colors } from "../../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { signup } from "../../services/users";
import { Input } from "../../components/input/input";
import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import validator from "validator";

export default function SignUp() {
  const navigation = useNavigation<AuthTypes>();
  const [nome, setNome] = useState("");

  // E-mail
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Senha
  const [senha, setSenha] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Confirmar senha
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Load animation
  const [isLoading, setIsLoading] = useState(false);

  // Alert
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState("text-gray-400");

  const validateEmail = (email: string): boolean => {
    return validator.isEmail(email);
  };

  function normalizeName(name: string): string {
    const particles = ["de", "da", "do", "das", "dos", "e", "em", "no", "na", "nos", "nas"];

    return name
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word, index) => {
        if (index > 0 && particles.includes(word)) {
          return word; 
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  const handleRegister = async () => {
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setIsConfirmPasswordValid(true);
    setIsAlertOpen(false);

    if (!email.trim() || !senha.trim() || !nome.trim()) {
      setAlertText("Por favor, preencha todos os campos");
      setAlertColor("text-warning");
      setIsAlertOpen(true);
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
      const data = await signup({ 
        nome: normalizeName(nome), 
        email, 
        senha 
      });

      if (data.emailEnviado) {
        navigation.navigate("EmailConfirmation", { email: email });

        // Limpa os campos
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Falha ao processar o cadastramento";
      setAlertText(errorMessage);
      setAlertColor("text-danger");
      setIsAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <AppLayout>
        <BackButton />

        <View className={`mt-8 gap-1`}>
          <Text className="text-white text-[24px] font-poppinsSemiBold">Criar conta</Text>

          <Text className="text-gray-400 text-base font-inter">
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
                onChangeText={setNome}
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
                  name={isPasswordVisible ? "eye" : "eye-off"}
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
                  name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                  size={20}
                  color={colors.border}
                />
              </Pressable>
            </Input>

            {!isConfirmPasswordValid && (
              <Text className="text-[12px] text-danger font-inter">As senhas não coincidem!</Text>
            )}

            {isAlertOpen && (
              <Text className={`text-sm mt-2 font-inter ${alertColor}`}>{alertText}</Text>
            )}
          </View>

          <Button className="mt-8" title="Criar" loading={isLoading} onPress={handleRegister} />

          <View className="flex-row mt-8 items-center justify-center gap-1">
            <Text className="text-white text-sm font-inter">Já possui uma conta?</Text>

            <Pressable onPress={() => navigation.navigate("Login")}>
              {({ pressed }) => (
                <Text
                  className={`text-sm font-inter font-semibold ${pressed ? "text-blue-500 opacity-80" : "text-blue-500"}`}
                >
                  Entrar
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </AppLayout>
    </SafeAreaView>
  );
}
