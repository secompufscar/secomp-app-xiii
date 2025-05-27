import { SafeAreaView, View, Text, Image, Pressable, Linking } from "react-native";
import BackButton from "../../components/button/backButton";
import { LinearGradient } from "expo-linear-gradient";
import AppLayout from "../../components/appLayout";
import { sponsors } from "./sponsorsData";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Sponsors() {
    return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <AppLayout>
        <BackButton/>

        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">
            Patrocinadores
          </Text>

          <Text className="text-gray-400 font-inter text-sm">
            Empresas que confiam em nós e fazem o evento acontecer
          </Text>
        </View>

        {sponsors.map((sponsor, index) => (
          <Pressable onPress={() => {Linking.openURL(sponsor.link)}}>
            {({ pressed }) => (
              <LinearGradient
                key={index}
                colors={["#2E364B", "#161F36"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className={`flex-col w-full rounded-[8px] border p-6 mb-8 ${pressed ? "border-blue-500" : "border-border"}`}
              >
                {/* Header */}
                <View className="w-full flex-row items-center justify-between mb-5">
                  <View className="flex-row items-center gap-3">
                    <View className="w-[42px] h-[42px] p-1 flex items-center justify-center">
                      <Image 
                        source={sponsor.logo}
                        style={{ width: "100%", height: "100%", resizeMode: 'cover', borderRadius: 3}}
                      />
                    </View>
                    <Text className="text-white text-[16px] font-poppinsMedium">{sponsor.name}</Text>
                  </View>

                  <View className="w-6 h-6 mb-1 flex items-center justify-center">
                    <AntDesign name="star" size={24} color={sponsor.starColor} />
                  </View>
                </View>

                {/* Tags */}
                <View className="w-full flex-row flex-wrap gap-2 mb-5">
                  {sponsor.tags.map((tag, tagIndex) => (
                    <View key={tagIndex} className="bg-blue-500 px-3 py-1.5 rounded-full">
                      <Text className="text-white text-xs font-inter">{tag}</Text>
                    </View>
                  ))}
                </View>

                {/* Description */}
                <Text className="text-default text-sm font-inter leading-relaxed">
                  {sponsor.description}
                </Text>
              </LinearGradient>
            )}
          </Pressable>
        ))}
      </AppLayout>
    </SafeAreaView>
  );
}