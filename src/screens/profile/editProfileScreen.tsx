import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { updateProfile, UpdateProfile } from "../../services/users";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/colors";
import { useAuth } from "../../hooks/AuthContext";
import { Input } from "../../components/input/input";
import AppLayout from "../../components/app/appLayout";
import Button from "../../components/button/button";
import validator from "validator";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user, updateUser }: any = useAuth();

  const [fullName, setFullName] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState("text-gray-400");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    return validator.isEmail(email);
  };

  const handleUpdate = async () => {
    setIsEmailValid(true);
    setIsAlertOpen(false);

    if (!fullName && !email) {
      setAlertText("Por favor, preencha pelo menos um campo");
      setAlertColor("text-warning");
      setIsAlertOpen(true);
      return;
    }

    if (email && !validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    setIsEmailValid(true);

    const dataToSend: UpdateProfile = {};

    if (fullName) {
      dataToSend.nome = fullName;
    }

    if (email) {
      dataToSend.email = email;
    }

    if (Object.keys(dataToSend).length === 0) {
      setAlertText("Por favor, preencha pelo menos um campo");
      setAlertColor("text-warning");
      setIsAlertOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      await updateProfile(dataToSend);

      const updatedUserData = { ...user, ...dataToSend };
      await updateUser(updatedUserData);

      setAlertText("Perfil atualizado com sucesso!");
      setAlertColor("text-success");
      setIsAlertOpen(true);
    } catch (error) {
      const err = error as any;
      const errorMessage =
        err.response?.data?.message || "Erro: não foi possível atualizar o perfil";

      setAlertText(errorMessage);
      setAlertColor("text-danger");
      setIsAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        {/* Cabeçalho */}
        <View className="w-full justify-center items-center mt-[60px] mb-10">
          <Text className="text-white text-xl font-poppinsSemiBold text-center">Editar Perfil</Text>

          <View className="absolute left-0">
            <Pressable
              className="w-[32px] h-[32px] rounded-[4px] bg-[#29303F] active:bg-[#29303F]/80"
              onPress={() => navigation.goBack()}
            >
              <View className={`flex items-center justify-center p-2 `}>
                <FontAwesomeIcon icon={faChevronLeft} size={16} color={colors.blue[200]} />
              </View>
            </Pressable>
          </View>
        </View>

        <View className="flex-col w-full gap-2 mt-2">
          {/* Nome Completo */}
          <View className="w-full">
            <Text className="text-white text-sm font-interMedium mb-2">Nome</Text>
            <Input>
              <Ionicons name="person" size={20} color={colors.border} />

              <Input.Field
                placeholder="Nome completo"
                onChangeText={setFullName}
                value={fullName}
              />
            </Input>
          </View>

          {/* Email */}
          <View className="w-full mt-2">
            <Text className="text-white text-sm font-interMedium mb-2">E-mail</Text>
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
              <Text className="text-sm text-danger font-inter mt-1">
                Por favor, digite um email válido!
              </Text>
            )}
          </View>

          {isAlertOpen && <Text className={`text-sm font-inter ${alertColor}`}>{alertText}</Text>}

          {/* Botão Atualizar */}
          <View className="mt-4">
            <Button title="Atualizar" onPress={handleUpdate} disabled={isLoading} />
            {isLoading && <ActivityIndicator size="large" color={colors.blue[500]} />}
          </View>
        </View>
      </AppLayout>
    </SafeAreaView>
  );
}
