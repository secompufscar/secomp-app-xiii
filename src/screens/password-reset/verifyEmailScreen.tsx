import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import { sendForgotPasswordEmail } from "../../services/users";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import AppLayout from "../../components/app/appLayout";

export default function VerifyEmail() {
  const navigation = useNavigation<AuthTypes>();
  const route = useRoute();
  const { email } = (route.params as { email: string }) || { email: "" };

  // Reenviar e-mail de redefinição de senha
  async function resendEmail() {
    try {
      await sendForgotPasswordEmail({ email });
    } catch (error: any) {
      console.error("Erro ao enviar email de recuperação:", error);
      alert(
        error?.response?.data?.message ||
          "Ocorreu um erro ao tentar enviar o e-mail de redefinição. Insira outro e-mail ou tente novamente mais tarde.",
      );
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <AppLayout>
        <BackButton />

        <View className="mt-8 mb-10">
          <Text className="text-white text-xl font-poppinsSemiBold mb-3">
            Verifique seu e-mail
          </Text>

          <Text className="text-gray-400 font-inter text-base leading-[1.8]">
            Foi enviado um link para redefinição de senha no seu e-mail cadastrado.
          </Text>
        </View>

        <Button
          title="Enviar novamente"
          onPress={() => {
            resendEmail;
          }}
        />

        <Pressable onPress={() => navigation.navigate("Login")}>
          {({ pressed }) => (
            <View
              className={`w-full mt-4 p-4 border border-border items-center justify-center rounded-lg outline-none ${pressed ? "bg-border/10" : ""}`}
            >
              <Text className="text-border text-base font-inter font-semibold">
                Voltar para o login
              </Text>
            </View>
          )}
        </Pressable>
      </AppLayout>
    </SafeAreaView>
  );
}
