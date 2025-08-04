import { useCallback, useEffect, useState } from "react";
import { View, Text, Image, Pressable, Linking, ActivityIndicator, StatusBar, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { getSponsors, Sponsor }  from "../../services/sponsors";
import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchSponsors = async () => {
        try {
          const data = await getSponsors();
          setSponsors(data);
          setError(null);
        } catch (err) {
          console.error("Erro ao buscar patrocinadores:", err);
          setError("Não foi possível carregar os patrocinadores. Tente novamente mais tarde.");
        } finally {
          if (isLoading) {
            setIsLoading(false);
          }
        }
      };

      fetchSponsors();
    }, [isLoading])
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-blue-900 items-center justify-center">
        <ActivityIndicator size="large" color={colors.blue[500]} />
      </SafeAreaView>
    );
  }

  if (error && sponsors.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-blue-900 items-center">
        <AppLayout>
          <BackButton />
          <Text className="text-red-500 text-center font-inter mt-4">{error}</Text>
        </AppLayout>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <View className="w-full px-6 max-w-[1000px] mx-auto flex-1">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />

        <BackButton />

        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Patrocinadores</Text>

          <Text className="text-gray-400 font-inter text-base">
            Empresas que confiam em nós e fazem o evento acontecer
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 w-full"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {sponsors.map((sponsor) => (
            <Pressable
              onPress={() => {
                if (sponsor.link) {
                  Linking.openURL(sponsor.link);
                }
              }}
              key={sponsor.id}
            >
              {({ pressed }) => (
                <LinearGradient
                  colors={["#2E364B", "#161F36"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className={`flex-col w-full rounded-[8px] border p-6 mb-8 overflow-hidden ${pressed ? "border-blue-500" : "border-border"}`}
                >
                  {/* Header */}
                  <View className="w-full flex-row items-center justify-between mb-5">
                    <View className="flex-row items-center gap-3">
                      <View className="w-[42px] h-[42px] p-1 flex items-center justify-center">
                        <Image
                          source={{uri: sponsor.logoUrl}}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            borderRadius: 3,
                          }}
                        />
                      </View>
                      <Text className="text-white text-[16px] font-poppinsMedium">
                        {sponsor.name}
                      </Text>
                    </View>

                    <View className="w-6 h-6 mb-1 flex items-center justify-center">
                      <AntDesign name="star" size={22} color={sponsor.starColor} />
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
