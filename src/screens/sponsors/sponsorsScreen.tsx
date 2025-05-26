import { SafeAreaView, ScrollView, View, Text, Button, Pressable, } from "react-native";
import BackButton from "../../components/button/backButton";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from 'react-native-svg';

export default function Sponsors() {
    return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pb-12 pt-6 w-full max-w-[1000px]">
        <BackButton/>

        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-3">
            Patrocinadores
          </Text>

          <Text className="text-gray-400 font-inter text-sm">
            Empresas que confiam em nós e fazem o evento acontecer
          </Text>
        </View>

        <LinearGradient
          colors={["#22242A", "#2A3A63"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-col w-full rounded-[8px] border border-[#536080] p-6 mb-8"
        >
          {/*Nome do Patrocinador + Estrela*/}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-3">

              {/*Imagem do Patrocinador*/}
              <View className="w-[35px] h-[35px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-[5px] flex items-center justify-center">
                <Text className="text-white text-[10px] font-bold">M</Text>
              </View>
              <Text className="text-white text-lg font-poppinsMedium">Magalu Cloud</Text>
            </View>


            <View className="w-6 h-6 flex items-center justify-center">
              <Svg
                width={24} 
                height={24} 
                viewBox="0 0 24 24"
              >
              <Path
                d="M12 1.02148L14.9393 8.90215L23.0215 9.6967L16.9107 15.0033L18.8787 22.9785L12 18.5979L5.12132 22.9785L7.08932 15.0033L0.978516 9.6967L9.06069 8.90215L12 1.02148Z"
                fill="#4B8BF5" 
              />
              </Svg>
            </View>
          </View>

          <View className="flex-row gap-2 mb-4">
            <View className="bg-[#4153DF] px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-inter">Hackathon</Text>
            </View>
            <View className="bg-[#4153DF] px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-inter">Feira Empresarial</Text>
            </View>
          </View>

          <Text className="text-gray-300 text-sm font-inter leading-relaxed">
            Magalu Cloud é a plataforma de serviços em nuvem do Magazine Luiza, focada em soluções digitais para
            empresas, como hospedagem de sites, armazenamento e infraestrutura de TI.
          </Text>
        </LinearGradient>    
        



        <LinearGradient
          colors={["#22242A", "#2A3A63"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-col w-full rounded-[8px] border border-[#536080] p-6 mb-8"
        >
          {/*Nome do Patrocinador + Estrela*/}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-3">

              {/*Imagem do Patrocinador*/}
              <View className="w-[35px] h-[35px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-[5px] flex items-center justify-center">
                <Text className="text-white text-[10px] font-bold">M</Text>
              </View>
              <Text className="text-white text-lg font-poppinsMedium">Tractian</Text>
            </View>


            <View className="w-6 h-6 flex items-center justify-center">
              <Svg
                width={24} 
                height={24} 
                viewBox="0 0 24 24"
              >
              <Path
                d="M12 1.02148L14.9393 8.90215L23.0215 9.6967L16.9107 15.0033L18.8787 22.9785L12 18.5979L5.12132 22.9785L7.08932 15.0033L0.978516 9.6967L9.06069 8.90215L12 1.02148Z"
                fill="#F3C83D" 
              />
              </Svg>
            </View>
          </View>

          <View className="flex-row gap-2 mb-4">
            <View className="bg-[#4153DF] px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-inter">Hackathon</Text>
            </View>
            <View className="bg-[#4153DF] px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-inter">Feira Empresarial</Text>
            </View>
          </View>

          <Text className="text-gray-300 text-sm font-inter leading-relaxed">
            A Tractian é uma startup brasileira fundada em 2019 que oferece soluções de manutenção preditiva para indústrias, utilizando sensores IoT e inteligência artificial para monitorar a saúde de máquinas e prever falhas.
          </Text>
        </LinearGradient>

        <LinearGradient
          colors={["#22242A", "#2A3A63"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-col w-full rounded-[8px] border border-[#536080] p-6 mb-8"
        >
          {/*Nome do Patrocinador + Estrela*/}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-3">

              {/*Imagem do Patrocinador*/}
              <View className="w-[35px] h-[35px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-[5px] flex items-center justify-center">
                <Text className="text-white text-[10px] font-bold">M</Text>
              </View>
              <Text className="text-white text-lg font-poppinsMedium">Visagio</Text>
            </View>


            <View className="w-6 h-6 flex items-center justify-center">
              <Svg
                width={24} 
                height={24} 
                viewBox="0 0 24 24"
              >
              <Path
                d="M12 1.02148L14.9393 8.90215L23.0215 9.6967L16.9107 15.0033L18.8787 22.9785L12 18.5979L5.12132 22.9785L7.08932 15.0033L0.978516 9.6967L9.06069 8.90215L12 1.02148Z"
                fill="#B8D1E0" 
              />
              </Svg>
            </View>
          </View>

          <View className="flex-row gap-2 mb-4">
            <View className="bg-[#4153DF] px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-inter">Palestra</Text>
            </View>
            <View className="bg-[#4153DF] px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-inter">Feira Empresarial</Text>
            </View>
          </View>

          <Text className="text-gray-300 text-sm font-inter leading-relaxed">
            ​A Visagio é uma plataforma global de transformação e desenvolvimento de negócios. Oferece consultoria em gestão empresarial, tecnologia e inovação, atendendo diversos setores como finanças, varejo, energia e logística .
          </Text>
        </LinearGradient>


        
        


      </ScrollView>
    </SafeAreaView>
  );
};