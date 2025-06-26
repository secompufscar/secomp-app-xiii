import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import { sendForgotPasswordEmail } from "../../services/users";
import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input";
import validator from 'validator';
import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import Button  from "../../components/button/button";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PasswordReset() {
  const navigation = useNavigation<AuthTypes>();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState("text-gray-400");

  const validateEmail = (email: string): boolean => {
    return validator.isEmail(email);
  };

  async function replacePass() {
    setIsAlertOpen(false);

    // Campo vazio
    if (!email.trim()) {
      setAlertText("Não deixe o campo de e-mail vazio!");
      setAlertColor("text-warning");
      setIsAlertOpen(true);
      return;
    }

    // Email válido
    if (!validateEmail(email)) {
      setAlertText("Por favor, digite um email válido!");
      setAlertColor("text-danger");
      setIsAlertOpen(true);
      return;
    }

    setIsLoading(true);
  
    try {
      await sendForgotPasswordEmail({ email }); 
      navigation.navigate("VerifyEmail", { email });
    } catch (error: any) {
      // Erros
      setAlertText("Ocorreu um erro ao tentar enviar o e-mail de redefinição.");
      setAlertColor("text-danger");
      setIsAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <AppLayout>
        <BackButton/>

        <View className="my-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-3">
            Recuperar senha
          </Text>

          <Text className="text-gray-400 font-inter text-base">
            Por favor, insira seu e-mail para redefinir sua senha
          </Text>
        </View>

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

        {isAlertOpen && (
          <Text className={`text-[12px] text-danger font-inter mb-1 ${alertColor}`}>
              {alertText}
          </Text>
        )}

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.blue[500]} className="mt-8" />
        ) : (
          <Button className="mt-4" title="Enviar" onPress={replacePass}/>
        )}
      </AppLayout>
    </SafeAreaView>
  );
}
