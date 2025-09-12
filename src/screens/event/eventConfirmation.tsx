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
    <SafeAreaView className="bg-blue-900 flex-1 items-center justify-center">
      <AppLayout>
        <View className="flex flex-col items-center justify-center mt-16">
          <View className="flex w-56 h-56 p-2 items-center justify-center rounded-full border border-iconbg">
            <Image source={require("../../../assets/icons/celebration.png")} className="w-full h-full" />
          </View>

          <Button className="mt-16 w-[80%]" title="Continuar" onPress={() => {navigation.navigate("Home")}} />
        </View>
      </AppLayout>
    </SafeAreaView>
  );
}
