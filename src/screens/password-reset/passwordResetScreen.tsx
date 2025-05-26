import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import { sendForgotPasswordEmail } from "../../services/users";
import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input";
import validator from 'validator';
import AppLayout from "../../components/appLayout";
import BackButton from "../../components/button/backButton";
import Button  from "../../components/button/button";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation<AuthTypes>();

  const validateEmail = (email: string): boolean => {
    return validator.isEmail(email);
  };

  async function replacePass() {
    if (!validateEmail(email)) {
      alert("É preciso informar um e-mail válido para redefinir a senha.");
      return;
    }

    navigation.navigate("VerifyEmail", { email });
  
    try {
      await sendForgotPasswordEmail({ email }); 
      
    } catch (error: any) {
      console.error("Erro ao enviar email de recuperação:", error);
      alert(
        error?.response?.data?.message ||
        "Ocorreu um erro ao tentar enviar o e-mail de redefinição. Insira outro e-mail ou tente novamente mais tarde."
      );
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <AppLayout>
        <BackButton/>

        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-3">
            Recuperar senha
          </Text>

          <Text className="text-gray-400 font-inter text-sm">
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

        <Button className="mt-4" title="Enviar" onPress={replacePass}/>

      </AppLayout>
    </SafeAreaView>
  );
}
