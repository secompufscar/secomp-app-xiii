import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/ThemeContext";
import { colors } from "../../styles/colors";

export default function EditButton() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();

  return (
    <Pressable
      className="w-[32px] h-[32px] mt-16 mb-10"
      onPress={() => navigation.navigate("EditProfile")}
    >
      {({ pressed }) => (
        <View
          className={`flex items-center justify-center p-2 rounded-[4px] bg-light-secondary dark:bg-dark-secondary ${
            pressed ? "opacity-80" : "opacity-100"
          }`}
        >
          <FontAwesomeIcon
                      icon={faPen}
                      size={16}
                      color={theme === "dark" ? colors.dark.icon : colors.light.icon}
                    />
        </View>
      )}
    </Pressable>
  );
}
