import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, AppState } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CameraView } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { checkIn } from "../../services/checkIn";
import { getActivityId, subscribeToActivity } from "../../services/activities";

export default function QRCode() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { id: activityId } = route.params as { id: string };
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive | background/) && nextAppState === "active") {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      try {
        const userId = data; // data é o userId escaneado do QR Code

        // Verificando se leitura recebeu os valores corretor
        console.log(userId);
        console.log("activity id:" + activityId);

        const activity: Activity | undefined = await getActivityId(activityId as string);
        if (!activity) {
          console.log("Atividade não encontrada");
          return;
        }

        if (userId && activityId) {
          if (activity.categoriaId == "1") {
            const response = await checkIn(userId, activityId);

            // Verificado resultado do checkIn
            // console.log(response);
            console.log(response);

            Alert.alert(
              "Check-In",
              `Check-in realizado com sucesso! \nUsuário marcado como presente.`,
              [{ text: "OK", onPress: () => navigation.goBack() }],
            );
          } else {
            const data = await subscribeToActivity(userId, activityId);
            const response = await checkIn(userId, activityId);

            Alert.alert(
              "Check-In",
              `Check-in realizado com sucesso! \nUsuário marcado como presente.`,
              [{ text: "OK", onPress: () => navigation.goBack() }],
            );
          }
        } else {
          Alert.alert("Erro", "Dados inválidos para check-in.", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        }
      } catch (error) {
        const err = error as any;

        const errorMessage = err.response?.data?.message || "Falha ao processar o check-in.";

        // Imprime o erro no console para depuração

        //console.error('Erro ao processar o check-in:', err.response.data);

        Alert.alert("Erro", errorMessage, [{ text: "OK", onPress: () => navigation.goBack() }]);
      }
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.square} />
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: 300, // Ajuste o tamanho conforme necessário
    height: 300,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30, // Para bordas arredondadas, se desejar
    backgroundColor: "transparent", // Garante que o fundo seja transparente
  },
});
