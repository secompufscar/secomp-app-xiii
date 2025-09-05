import { useEffect, useState } from "react";
import { getActivities } from "../../services/activities";
import { Pressable, View, Text, Image } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function HomeCompetitions() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pressedItemId, setPressedItemId] = useState<string | null>(null);
  const categoriaId = "3";

  const formatDate = (date: Date) => {
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (error) {
        console.error("Erro ao buscar atividades para homepage:", error);
      }
    };

    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((activity) => activity.categoriaId === categoriaId);

  return (
    <View className="w-full flex-1">
      {filteredActivities.length > 0 ? (
        filteredActivities.map((item) => {
          const isPressed = pressedItemId === item.id;

          return (
            <Pressable
              key={item.id.toString()}
              onPress={() => navigation.navigate("ActivityDetails", { item })}
              onPressIn={() => setPressedItemId(item.id)}
              onPressOut={() => setPressedItemId(null)}
            >
              <View className="w-full flex-row py-3 gap-1 border-b-[1px] border-[#242936]">
                <View className="flex-1 flex-col gap-2">
                  <Text className="text-white text-[13px] font-inter">{item.nome}</Text>

                  <View className="flex-row">
                    <Text className="text-default text-[12px] text-inter">Data: </Text>
                    <Text className="text-blue-200 text-[12px] text-inter mr-3">
                      {formatDate(new Date(item.data.substring(0, 10)))}
                    </Text>

                    <Text className="text-default text-[12px] text-inter">Horário: </Text>
                    <Text className="text-blue-200 text-[12px] text-inter">
                      {item.data.substring(11, 16)}h
                    </Text>
                  </View>
                </View>

                <View className="flex items-center justify-center">
                  <Image
                    source={require("../../../assets/icons/arrow.png")}
                    style={{
                      height: 42,
                      width: 42,
                      opacity: isPressed ? 0.9 : 1,
                      transform: isPressed ? [{ scale: 1.1 }] : [{ scale: 1 }],
                    }}
                  />
                </View>
              </View>
            </Pressable>
          );
        })
      ) : (
        <View className="w-full">
          <Text className="text-default text-[12px] font-inter">
            Nenhuma competição encontrada.
          </Text>
        </View>
      )}
    </View>
  );
}
