import { useCallback, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import { BeautifulName } from "beautiful-name"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faArrowRightFromBracket, faChevronRight, faQrcode, faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthContext";
import { getUserRanking, getProfile } from "../../services/users";
import { colors } from "../../styles/colors";
import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import EditButton from "../../components/button/editButton";

export default function UserProfile() {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
	const { signOut, user: userFromContext, updateUser }: any = useAuth()

	const [user, setUser] = useState(userFromContext);
	const [ranking, setRanking] = useState<number | null>(null);

	if (!user) {
        return (
            <SafeAreaView className="bg-blue-900 flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={colors.blue[500]} />
            </SafeAreaView>
        );
    }

	useFocusEffect(
		useCallback(() => {
		  async function fetchData() {
			try {
			  // Buscar perfil atualizado
			  const freshUser = await getProfile();
			  await updateUser(freshUser);
			  setUser(freshUser);
	
			  // Buscar ranking usando o id atualizado
			  const rankingData = await getUserRanking(freshUser.id);
			  setRanking(rankingData.rank);
			} catch (error) {
			  console.error("Erro ao buscar dados do perfil:", error);
			}
		  }
		  fetchData();
		}, [])
	);

	const nomeCompleto = new BeautifulName(userFromContext.nome).beautifulName;

  	return (
		<SafeAreaView className="bg-blue-900 flex-1 items-center">
			<AppLayout>
				<View className="flex-row justify-between items-center">
					<BackButton />

					<Text className="text-white text-xl font-poppinsSemiBold text-center mt-6">
						Perfil
					</Text>

					<EditButton />
				</View>

				<View className="items-center mb-8">
					<View className="w-32 h-32 rounded-full border-[1px] border-[#3DCC87] bg-[#21353A] flex items-center justify-center mb-4">
						<View className="w-6 h-full flex items-center justify-center">
							<FontAwesomeIcon icon={faUser} size={48} color="#3DCC87" />
						</View>
					</View>

					<Text className="text-white text-2xl font-poppinsSemiBold mb-1">
						{nomeCompleto}
					</Text>

					<Text className="text-gray-400 font-poppins text-base">
						{user.email}
					</Text>
				</View>

				{/* Stats */}
				<View className="relative flex-row justify-around items-center mb-8 px-5 py-7 border border-blue-100/30 rounded-lg">
					<Text className="absolute top-0 left-3 mt-[-8] px-1 bg-blue-900 text-gray-400 text-sm font-inter uppercase"> Estatísticas </Text>

					<View className="items-center">
						<Text className="text-white text-4xl font-poppinsSemiBold">
							{ranking ?? "-"}
						</Text>
						<Text className="text-gray-500 font-inter text-xs uppercase">
							No rank
						</Text>
					</View>

					<View className="items-center">
						<Text className="text-white text-4xl font-poppinsSemiBold">
							{user.points}
						</Text>
						<Text className="text-gray-500 font-inter text-xs uppercase">
							Pontos
						</Text>
					</View>

					<View className="items-center">
						<Text className="text-white text-4xl font-poppinsSemiBold">
							04
						</Text>
						<Text className="text-gray-500 font-inter text-xs uppercase">
							Atividades
						</Text>
					</View>
				</View>

				{/* Notificações */}
				<Pressable onPress={() => {}}>
				{({ pressed }) => (
					<View
					className={`flex-row h-[58px] items-center justify-between rounded-lg p-5 mb-3 ${
						pressed ? "bg-background/60" : "bg-background"
					}`}
					>
						<View className="flex-row items-center gap-4">
							<View className="w-6 flex items-center justify-center">
								<FontAwesomeIcon icon={faBell} size={20} color="#A9B4F4" />
							</View>
							
							<Text className="text-white text-base font-inter">Notificações</Text>
						</View>

						<View className="w-6 flex items-center justify-center">
							<FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
						</View>
					</View>
				)}
				</Pressable>
				
				{/* Credencial */}
				<Pressable onPress={() => {navigation.navigate("Credential")}}>
				{({ pressed }) => (
					<View
					className={`flex-row h-[58px] items-center justify-between rounded-lg p-5 mb-3 ${
						pressed ? "bg-background/60" : "bg-background"
					}`}
					>
						<View className="flex-row items-center gap-4">
							<View className="w-6 flex items-center justify-center">
								<FontAwesomeIcon icon={faQrcode} size={20} color="#A9B4F4" />
							</View>
							
							<Text className="text-white text-base font-inter">Credencial</Text>
						</View>

						<View className="w-6 flex items-center justify-center">
							<FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
						</View>
					</View>
				)}
				</Pressable>
				
				{/* Minhas atividades */}
				<Pressable onPress={() => {navigation.navigate("MyEvents")}}>
				{({ pressed }) => (
					<View
						className={`flex-row h-[58px] items-center justify-between rounded-lg p-5 mb-3 ${
							pressed ? "bg-background/60" : "bg-background"
						}`}
					>
						<View className="flex-row items-center gap-4">
							<View className="w-6 flex items-center justify-center">
								<FontAwesomeIcon icon={faCalendarDays} size={20} color="#A9B4F4" />
							</View>
							
							<Text className="text-white text-base font-inter">Minhas Atividades</Text>
						</View>

						<View className="w-6 flex items-center justify-center">
							<FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
						</View>
					</View>
				)}
				</Pressable>
				
				{/* Sair */}
				<Pressable onPress={signOut}>
				{({ pressed }) => (
					<View
						className={`flex-row h-[58px] items-center justify-between rounded-lg p-5 mb-3 border border-iconbg ${
							pressed ? "bg-background/60" : ""
						}`}
					>
						<View className="flex-row items-center gap-4">
							<View className="w-6 flex items-center justify-center">
								<FontAwesomeIcon icon={faArrowRightFromBracket} size={20} color="#A9B4F4" />
							</View>
							
							<Text className="text-white text-base font-inter">Sair</Text>
						</View>

						<View className="w-6 flex items-center justify-center">
							<FontAwesomeIcon icon={faChevronRight} size={16} color="#A9B4F4" />
						</View>
					</View>
				)}
				</Pressable>
			</AppLayout>
		</SafeAreaView>
  	);
}