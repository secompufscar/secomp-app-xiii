import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppLayout from "../../components/app/appLayout";
import Button from "../../components/button/button";

export default function EventConfirmation() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const event = route.params as { event: Events };

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <View className="mt-16">
          <Button className="mt-8" title="Entrar" onPress={() => {navigation.navigate("Home")}} />
        </View>
      </AppLayout>
    </SafeAreaView>
  );
}
