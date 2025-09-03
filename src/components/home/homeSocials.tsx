import { LinearGradient } from "expo-linear-gradient";
import { Linking, Platform, Pressable, View } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

const openLink = async (appUrl: string, webUrl: string) => {
  try {
    if (Platform.OS === "web") {
      window.open(webUrl, "_blank");
      return;
    }

    const supported = await Linking.canOpenURL(appUrl);
    if (supported) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    if (Platform.OS === "web") {
      window.open(webUrl, "_blank");
    } else {
      await Linking.openURL(webUrl);
    }
  }
};

const socialLinks = [
  {
    key: "instagram",
    appUrl: "instagram://user?username=secompufscar",
    webUrl: "https://www.instagram.com/secompufscar/",
    icon: <FontAwesome6 name="instagram" size={36} color="white" />,
  },
  {
    key: "facebook",
    appUrl: "fb://page/secompufscar",
    webUrl: "https://www.facebook.com/secompufscar",
    icon: <FontAwesome6 name="square-facebook" size={36} color="white" />,
  },
  {
    key: "linkedin",
    appUrl: "linkedin://company/secomp-ufscar",
    webUrl: "https://www.linkedin.com/company/secomp-ufscar/posts",
    icon: <FontAwesome6 name="linkedin" size={36} color="white" />,
  },
  {
    key: "website",
    appUrl: "https://www.secompufscar.com.br/", 
    webUrl: "https://www.secompufscar.com.br/",
    icon: <MaterialCommunityIcons name="web" size={36} color="white" />,
  },
];

export default function HomeSocials() {
  return (
    <View className="flex-row justify-between items-center gap-3">
      {socialLinks.map(({ key, appUrl, webUrl, icon }) => (
        <Pressable
          key={key}
          onPress={() => openLink(appUrl, webUrl)}
          className="flex-1 rounded-[6px] overflow-hidden"
        >
          {({ pressed }) => (
            <LinearGradient
              colors={["#29303F", "#2A3B5E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className={`p-5 items-center justify-center transition-opacity ${pressed ? "opacity-70" : "opacity-100"}`}
            >
              {icon}
            </LinearGradient>
          )}
        </Pressable>
      ))}
    </View>
  );
}