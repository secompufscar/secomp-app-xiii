import { useState } from "react";
import { View, Image, Text, Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AuthTypes } from "../../routes/auth.routes";
import { useRoute } from "@react-navigation/native";
import { updatePassword } from "../../services/users";
import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input";
import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SetNewPassword() {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [successVisible, setSuccessVisible] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState("text-gray-400");

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AuthTypes>();
  const route = useRoute();
  const { token } = route.params as { token: string };

  const handleUpdatePassword = async () => {
    setIsAlertOpen(false);

    if (!password || !confirmPassword) {
      setAlertText("Por favor, preencha todos os campos");
      setAlertColor("text-warning");
      setIsAlertOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertText("As senhas não coincidem!");
      setAlertColor("text-danger");
      setIsAlertOpen(true);
      return;
    }

    if (password.length < 6) {
      setAlertText("A senha deve conter no mínimo 6 caracteres");
      setAlertColor("text-danger");
      setIsAlertOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(token, password);
      setSuccessVisible(true);
    } catch (error: any) {
      setAlertText("Falha ao redefinir a senha. Tente novamente.");
      setAlertColor("text-danger");
      setIsAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSuccessClose = () => {
    setSuccessVisible(false);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <AppLayout>
        <BackButton />

        <View className="my-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-3">
            Defina uma nova senha
          </Text>

          <Text className="text-gray-400 font-inter text-base">
            Estamos quase lá! Digite e confirme sua nova senha.
          </Text>
        </View>

        {/* Senha */}
        <View className="gap-2">
          <Input>
            <MaterialIcons name="lock" size={20} color={colors.border} />

            <Input.Field
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
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

          {/* Confirmar senha */}
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

          {isAlertOpen && <Text className={`text-sm font-inter ${alertColor}`}>{alertText}</Text>}
        </View>

        <Button className="mt-4" title="Atualizar senha" loading={isLoading} onPress={handleUpdatePassword} />
      </AppLayout>

      <Modal visible={successVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.6)]">
          <View className="w-[80%] px-6 py-8 gap-4 bg-blue-900 rounded-xl justify-center items-center xxs:w-[300px]">
            <Image
              source={require("../../../assets/animation/check-success.gif")}
              style={{ width: 130, height: 130 }}
              resizeMode="contain"
            />
            <Text className="text-white text-md font-inter font-medium text-center">
              Senha redefinida com sucesso!
            </Text>
            <Pressable
              onPress={onSuccessClose}
              className="bg-blue-500 mt-2 py-2.5 px-8 rounded-[5px]"
            >
              <Text className="text-white font-bold">OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
