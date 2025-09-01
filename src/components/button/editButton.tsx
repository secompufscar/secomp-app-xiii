import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/colors";

export default function EditButton() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Pressable
      className="w-[32px] h-[32px] mt-10 mb-10"
      onPress={() => navigation.navigate("EditProfile")}
    >
      {({ pressed }) => (
        <View
          className={`flex items-center justify-center p-2 rounded-[4px] ${
            pressed ? "bg-[#29303F]/80" : "bg-[#29303F]"
          }`}
        >
          <FontAwesomeIcon icon={faPen} size={16} color={colors.blue[200]} />
        </View>
      )}
    </Pressable>
  );
}
