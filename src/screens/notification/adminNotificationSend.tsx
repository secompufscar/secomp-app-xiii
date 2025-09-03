import { useState } from "react";
import { View, Text, StatusBar, Platform, ActivityIndicator, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input";
import { sendPushNotification, sendNotificationToAll } from "../../services/notifications";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import ErrorOverlay from "../../components/overlay/errorOverlay";
import WarningOverlay from "../../components/overlay/warningOverlay";

type AdminNotificationSendNavigationProp = NativeStackNavigationProp<ParamListBase>;

export default function AdminNotificationSend() {
  const navigation = useNavigation<AdminNotificationSendNavigationProp>();

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [recipientIdsInput, setRecipientIdsInput] = useState<string>(""); 
  const [sendToAll, setSendToAll] = useState<boolean>(false);
  const [dataInput, setDataInput] = useState<string>(""); 
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [badgeCount, setBadgeCount] = useState<string>(""); 

  const [errorMessage, setErrorMessage] = useState("Erro");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [warningMessage, setWarningMessage] = useState("Aviso");
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendNotification = async () => {
    if (!title.trim() || !message.trim()) {
      setWarningMessage("Por favor, preencha todos os campos e selecione uma categoria")
      setWarningModalVisible(true); 
      return;
    }

    let recipientIds: string[] = [];
    if (!sendToAll) {
      if (!recipientIdsInput.trim()) {
        setWarningMessage("Por favor, insira os IDs dos destinatários ou selecione 'Enviar para todos'.")
        setWarningModalVisible(true); 
        return;
      }

      recipientIds = recipientIdsInput.split(',').map(id => id.trim()).filter(id => id);
      if (recipientIds.length === 0) {
        setWarningMessage("Nenhum ID de destinatário válido encontrado.")
        setWarningModalVisible(true); 
        return;
      }
    }

    let parsedData: Record<string, unknown> | undefined;
    if (dataInput.trim()) {
      try {
        parsedData = JSON.parse(dataInput);
      } catch (e) {
        setWarningMessage("Formato de 'Dados Adicionais' inválido. Deve ser um JSON válido.")
        setWarningModalVisible(true); 
        return;
      }
    }

    const parsedBadge = badgeCount.trim() ? parseInt(badgeCount, 10) : undefined;
    if (badgeCount.trim() && (isNaN(parsedBadge!) || parsedBadge! < 0)) {
      setWarningMessage("O número do Badge deve ser um valor numérico não negativo.")
      setWarningModalVisible(true); 
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

      setTitle("");
      setMessage("");
      setRecipientIdsInput("");
      setDataInput("");
      setBadgeCount("");
      setSendToAll(false);
      setSoundEnabled(true);
      navigation.goBack();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Falha ao enviar a notificação.";
      setErrorMessage(errorMessage);
      setErrorModalVisible(true);
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
            <Text className="text-blue-200 font-inter"> Crie e envie notificações push para usuários </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-col w-full gap-4 text-center justify-start pb-24">
              {/* Título */}
              <View className="w-full">
                <Text className="text-gray-400 text-sm font-inter mb-2">Título da Notificação</Text>
                <Input>
                  <Input.Field
                    placeholder="Lembrete do evento, nova atividade!"
                    onChangeText={setTitle}
                    value={title}
                  />
                </Input>
              </View>

              {/* Corpo da mensagem da notificação */}
              <View className="w-full">
                <Text className="text-gray-400 text-sm font-inter mb-2">Mensagem</Text>
                <Input>
                  <Input.Field
                    placeholder="Corpo da mensagem da notificação"
                    onChangeText={setMessage}
                    value={message}
                    multiline={true}
                    numberOfLines={4}
                  />
                </Input>
              </View>

              {/* Enviar todos */}
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-blue-200 text-sm font-inter">Enviar para todos os usuários</Text>
                <Switch
                  trackColor={{ false: colors.border, true: colors.blue[500] }}
                  thumbColor={sendToAll ? colors.white : colors.neutral[300]}
                  ios_backgroundColor={colors.border}
                  onValueChange={setSendToAll}
                  value={sendToAll}
                />
              </View>

              {/* Selecionar usuarios */}
              {!sendToAll && (
                <View className="w-full">
                  <Text className="text-gray-400 text-sm font-inter mb-2">IDs dos Destinatários (separados por vírgula)</Text>
                  <Input>
                    <Input.Field
                      placeholder="ID1, ID2, ID3"
                      onChangeText={setRecipientIdsInput}
                      value={recipientIdsInput}
                      autoCapitalize="none"
                    />
                  </Input>
                </View>
              )}

              {/* JSON */}
              <View className="w-full">
                <Text className="text-gray-400 text-sm font-inter mb-2">Dados Adicionais (JSON Opcional)</Text>
                <Input>
                  <Input.Field
                    placeholder='Ex.: {"key": "value", "type": "event"}'
                    onChangeText={setDataInput}
                    value={dataInput}
                    multiline={true}
                    numberOfLines={2}
                    style={{ minHeight: 60, textAlignVertical: 'top' }}
                    autoCapitalize="none"
                  />
                </Input>
              </View>

              {/* Toggle para som*/}
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-blue-200 text-sm font-inter">Reproduzir Som</Text>
                <Switch
                  trackColor={{ false: colors.border, true: colors.blue[500] }}
                  thumbColor={soundEnabled ? colors.white : colors.neutral[300]}
                  ios_backgroundColor={colors.border}
                  onValueChange={setSoundEnabled}
                  value={soundEnabled}
                />
              </View>

              {isLoading ? (
                <ActivityIndicator size="large" color={colors.blue[500]} className="mt-8" />
              ) : (
                <Button title="Enviar Notificação" className="mt-8" onPress={handleSendNotification} />
              )}
            </View>
          </ScrollView>
        </View>
      </View>

      <ErrorOverlay
        visible={errorModalVisible}
        title="Erro"
        message={errorMessage}
        onConfirm={() => {setErrorModalVisible(false)}}
        confirmText="OK"
      />

      <WarningOverlay
        visible={warningModalVisible}
        title="Aviso"
        message={warningMessage}
        onConfirm={() => {setWarningModalVisible(false)}}
        confirmText="OK"
      />
    </SafeAreaView>
  );
}