import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, AppState, Platform } from "react-native";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CameraView } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

import { checkIn } from "../../services/checkIn";
import { getActivityId } from "../../services/activities";

let QrReader: any = null;
if (Platform.OS === "web") {
  QrReader = require("@cmdnio/react-qr-reader").QrReader;
}

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
        const userId = data;

        const activity: Activity | undefined = await getActivityId(activityId as string);
        if (!activity) {
          console.log("Atividade não encontrada");
          return;
        }

        if (userId && activityId) {
          await checkIn(userId, activityId);

          Alert.alert("Check-In", `Check-in realizado com sucesso!`, [{ text: "OK", onPress: () => navigation.goBack() }]);
        } else {
          Alert.alert("Erro", "Dados inválidos para check-in.", [{ text: "OK", onPress: () => navigation.goBack() }]);
        }
      } catch (error) {
        const err = error as any;
        const errorMessage = err.response?.data?.message || "Falha ao processar o check-in.";
        Alert.alert("Erro", errorMessage, [{ text: "OK" }]);
      }
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "web" ? (
        <View style={styles.webContainer}>
          <Text style={styles.webText}>Escaneie o QR Code</Text>
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result: any) => {
              if (result?.text) {
                handleBarCodeScanned({ data: result.text });
              }
            }}
            containerStyle={{ width: "100%" }}
            videoContainerStyle={{ width: "100%" }}
          />
        </View>
      ) : (
        <CameraView style={StyleSheet.absoluteFillObject} facing="back" onBarcodeScanned={handleBarCodeScanned}>
          <View style={styles.overlay}>
            <View style={styles.square} />
          </View>
        </CameraView>
      )}
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
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  webContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  webText: {
    fontSize: 18,
    marginBottom: 12,
  },
});
