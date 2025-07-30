import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StatusBar,
  Platform,
  ActivityIndicator,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, ParamListBase, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";

// Import the actual API calls for sending notifications
import { sendPushNotification, sendNotificationToAll } from "../../services/notifications";

type AdminNotificationSendNavigationProp = NativeStackNavigationProp<ParamListBase>;

export default function AdminNotificationSend() {
  const navigation = useNavigation<AdminNotificationSendNavigationProp>();

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [recipientIdsInput, setRecipientIdsInput] = useState<string>(""); // Comma-separated user IDs
  const [sendToAll, setSendToAll] = useState<boolean>(false);
  const [dataInput, setDataInput] = useState<string>(""); // JSON string for data
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [badgeCount, setBadgeCount] = useState<string>(""); // Numeric string for badge

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState("text-gray-400");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendNotification = async () => {
    setIsAlertOpen(false);
    if (!title.trim() || !message.trim()) {
      setAlertText("Título e Mensagem são obrigatórios.");
      setAlertColor("text-warning");
      setIsAlertOpen(true);
      return;
    }

    let recipientIds: string[] = [];
    if (!sendToAll) {
      if (!recipientIdsInput.trim()) {
        setAlertText("Por favor, insira IDs de destinatários ou selecione 'Enviar para todos'.");
        setAlertColor("text-warning");
        setIsAlertOpen(true);
        return;
      }
      recipientIds = recipientIdsInput.split(',').map(id => id.trim()).filter(id => id);
      if (recipientIds.length === 0) {
        setAlertText("Nenhum ID de destinatário válido encontrado.");
        setAlertColor("text-warning");
        setIsAlertOpen(true);
        return;
      }
    }

    let parsedData: Record<string, unknown> | undefined;
    if (dataInput.trim()) {
      try {
        parsedData = JSON.parse(dataInput);
      } catch (e) {
        setAlertText("Formato de 'Dados Adicionais' inválido. Deve ser um JSON válido.");
        setAlertColor("text-warning");
        setIsAlertOpen(true);
        return;
      }
    }

    const parsedBadge = badgeCount.trim() ? parseInt(badgeCount, 10) : undefined;
    if (badgeCount.trim() && (isNaN(parsedBadge!) || parsedBadge! < 0)) {
      setAlertText("O número do Badge deve ser um valor numérico não negativo.");
      setAlertColor("text-warning");
      setIsAlertOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      if (sendToAll) {
        await sendNotificationToAll({
          title,
          message,
          data: parsedData,
          sound: soundEnabled,
          badge: parsedBadge,
        });
      } else {
        await sendPushNotification({
          title,
          message,
          recipientIds,
          data: parsedData,
          sound: soundEnabled,
          badge: parsedBadge,
        });
      }

      setAlertText("Notificação enviada com sucesso!");
      setAlertColor("text-success");
      setIsAlertOpen(true);

      setTitle("");
      setMessage("");
      setRecipientIdsInput("");
      setDataInput("");
      setBadgeCount("");
      setSendToAll(false);
      setSoundEnabled(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Falha ao enviar a notificação.";
      setAlertText(errorMessage);
      setAlertColor("text-danger");
      setIsAlertOpen(true);
      console.error("Error sending notification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <View className="flex-1 w-full">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />

        <View className="w-full flex-1 px-6 max-w-[1000px] mx-auto">
          <BackButton />

          {/* Header */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Enviar Notificação</Text>
            <Text className="text-gray-400 font-inter">
              Crie e envie notificações push para usuários.
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-col w-full gap-4 text-center justify-start pb-24">

              <View className="w-full">
                <Text className="text-blue-200 text-sm font-interMedium mb-2">Título da Notificação</Text>
                <Input>
                  <Ionicons name="notifications" size={20} color={colors.border} />
                  <Input.Field
                    placeholder="Ex.: Lembrete do Evento, Nova Atividade!"
                    onChangeText={setTitle}
                    value={title}
                  />
                </Input>
              </View>

              {/* Corpo da mensagem da notificação */}
              <View className="w-full">
                <Text className="text-blue-200 text-sm font-interMedium mb-2">Mensagem</Text>
                <Input>
                  <FontAwesome5 name="comment-dots" size={20} color={colors.border} />
                  <Input.Field
                    placeholder="Corpo da mensagem da notificação."
                    onChangeText={setMessage}
                    value={message}
                    multiline={true}
                    numberOfLines={4}
                    style={{ minHeight: 80, textAlignVertical: 'top' }}
                  />
                </Input>
              </View>

              {/* Enviar todos */}
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-blue-200 text-sm font-interMedium">Enviar para todos os usuários</Text>
                <Switch
                  trackColor={{ false: colors.border, true: colors.green }}
                  thumbColor={sendToAll ? colors.white : colors.neutral[300]}
                  ios_backgroundColor={colors.border}
                  onValueChange={setSendToAll}
                  value={sendToAll}
                />
              </View>

              {/* Selecionar usuarios */}
              {!sendToAll && (
                <View className="w-full">
                  <Text className="text-blue-200 text-sm font-interMedium mb-2">IDs dos Destinatários (separados por vírgula)</Text>
                  <Input>
                    <FontAwesome5 name="users" size={20} color={colors.border} />
                    <Input.Field
                      placeholder="Ex.: id1, id2, id3"
                      onChangeText={setRecipientIdsInput}
                      value={recipientIdsInput}
                      autoCapitalize="none"
                    />
                  </Input>
                  <Text className="text-gray-500 text-xs mt-1">Deixe em branco se for enviar para todos.</Text>
                </View>
              )}

              {/* JSON */}
              <View className="w-full">
                <Text className="text-blue-200 text-sm font-interMedium mb-2">Dados Adicionais (JSON Opcional)</Text>
                <Input>
                  <FontAwesome5 name="code" size={20} color={colors.border} />
                  <Input.Field
                    placeholder='Ex.: {"key": "value", "type": "event"}'
                    onChangeText={setDataInput}
                    value={dataInput}
                    multiline={true}
                    numberOfLines={2}
                    style={{ minHeight: 60, textAlignVertical: 'top' }}
                    autoCapitalize="none"
                  />
                  <Text className="text-gray-500 text-xs mt-1">Deve ser um objeto JSON válido.</Text>
                </Input>
              </View>

              {/* Toggle para som*/}
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-blue-200 text-sm font-interMedium">Reproduzir Som</Text>
                <Switch
                  trackColor={{ false: colors.border, true: colors.green }}
                  thumbColor={soundEnabled ? colors.white : colors.neutral[300]}
                  ios_backgroundColor={colors.border}
                  onValueChange={setSoundEnabled}
                  value={soundEnabled}
                />
              </View>

              {isAlertOpen && <Text className={`text-sm font-inter ${alertColor}`}>{alertText}</Text>}

              {isLoading ? (
                <ActivityIndicator size="large" color={colors.blue[500]} className="mt-8" />
              ) : (
                <Button title="Enviar Notificação" className="mt-8" onPress={handleSendNotification} />
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}