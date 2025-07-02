import { View, Text, TextInput, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import { updateProfile, UpdateProfile } from '../../services/users';
export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleUpdate = async () => {
    if (!fullName && !email) {
      Alert.alert("Erro", "Preencha pelo menos um campo para atualizar.");
      return;
    }

    const dataToSend: UpdateProfile = {};

    if (fullName.trim()) dataToSend.nome = fullName.trim();
    if (email.trim()) dataToSend.email = email.trim();

    if (Object.keys(dataToSend).length === 0) {
      Alert.alert("Erro", "Preencha pelo menos um campo para atualizar.");
      return;
    }

    setIsLoading(true); // Ativa o loading

    try {
      await updateProfile(dataToSend);

      Alert.alert("Sucesso", "Perfil atualizado com sucesso.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
      console.error(error);
    } finally {
      setIsLoading(false); // Desativa o loading
    }
  };

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        {/* Cabeçalho */}
        <View className="flex-row items-center mt-6 mb-4 px-6 w-full">
          <BackButton />
          <Text className="flex-1 text-white text-lg font-poppinsSemiBold text-center mt-6">
            Editar Perfil
          </Text>
          <View className="w-6" />
        </View>

        <ScrollView className="flex-1 w-full" contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Campo Nome */}
          <Text className="text-white text-xs font-poppinsSemiBold mb-2 ml-6">Nome</Text>
          <View className="flex-row items-center bg-background border border-border rounded-[8px] px-4 py-3 mb-4 mx-6">
            <Ionicons name="person" size={20} color="#7B8DC3" />
            <TextInput
              placeholder="Nome completo"
              placeholderTextColor="#E0E0E0"
              value={fullName}
              onChangeText={setFullName}
              className="flex-1 text-white text-[12px] font-inter ml-3"
            />
          </View>

          {/* Campo Email */}
          <Text className="text-white text-xs font-poppinsSemiBold mb-2 ml-6">E-mail</Text>
          <View className="flex-row items-center bg-background border border-border rounded-[8px] px-4 py-3 mb-6 mx-6">
            <Ionicons name="mail" size={20} color="#7B8DC3" />
            <TextInput
              placeholder="aluno@estudante.ufscar.br"
              placeholderTextColor="#E0E0E0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              className="flex-1 text-white text-[12px] font-inter ml-3"
            />
          </View>

          {/* Botão Atualizar */}
          <View className="mx-6 mt-2">
            <Button title="Atualizar" onPress={handleUpdate} disabled={isLoading} />
            {isLoading && <ActivityIndicator className="mt-4" color="#fff" />}
          </View>
        </ScrollView>
      </AppLayout>
    </SafeAreaView>
  );
}
