import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "../../components/button/backButton";
import AppLayout from "../../components/app/appLayout";

export default function EventGuide() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <BackButton />

        {/* Título */}
        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Guia do evento</Text>
          <Text className="text-gray-400 font-inter text-base">
            Como participar das atividades da Secomp?
          </Text>
        </View>

        {/* Parágrafo 1 */}
        <Text className="text-default text-base mb-4 font-inter leading-relaxed">
          Antes de tudo, para participar de qualquer atividade, você precisa estar inscrito na
          Secomp. Garanta sua inscrição na página inicial, na primeira seção, clicando em{" "}
          <Text
            onPress={() => { navigation.navigate("Home") }} 
            className="text-green font-inter"
          >
            Inscrever-se.
          </Text>
        </Text>

        {/* Parágrafo 2 */}
        <Text className="text-default text-base mb-8 font-inter">
          Agora, você está pronto para se juntar a nós!
        </Text>

        {/* Inscrever-se x Salvar atividade */}
        <View className="mb-8">
          <Text className="text-white text-[16px] font-poppinsMedium mb-2">
            Inscrever-se ou salvar atividade?
          </Text>
          <Text className="text-default text-base mb-4 font-inter leading-relaxed">
            Durante o evento, apenas os minicursos precisam de inscrição pelo app. As outras atividades são livres ou acontecem de forma externa. 
            Mesmo assim, <Text className="text-green font-inter">você pode salvar as atividades que curtir</Text> e acompanhar tudo o que vai rolar na semana sem se preocupar com inscrição!
          </Text>

          <Text className="text-default text-base font-inter leading-relaxed">
            Todas as atividades que você salvar vão direto para o mesmo lugar das que você se inscreveu, em: <Text className="text-green font-inter" onPress={() => { navigation.navigate("MyEvents") }} >Minhas Atividades</Text>.
            Assim, fica fácil acompanhar tudo o que você quer participar durante a semana em um só lugar! 😉
          </Text>
        </View>

        {/* Seção Palestras */}
        <View className="mb-8 w-full">
          <Text className="text-white text-[16px] font-poppinsMedium mb-2">Palestras</Text>

          <Text className="text-default text-base mb-6 font-inter leading-relaxed">
            As palestras são eventos abertos,{" "}
            <Text className="text-green font-inter">sem necessidade de inscrição prévia</Text>.
            Basta comparecer ao local, na data e horário indicados no cronograma!
          </Text>

          <View className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px] rounded-lg mb-2 overflow-hidden">
            <Image
              source={require("../../../assets/event-guide/palestra-magalu.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-[#7D88A2] text-sm font-inter leading-relaxed">
            Palestra da Magalu Cloud
          </Text>
        </View>

        {/* Seção Minicursos */}
        <View className="mb-8 w-full">
          <Text className="text-white text-[16px] font-poppinsMedium mb-2">Minicursos</Text>

          <Text className="text-default text-base mb-4 font-inter leading-relaxed">
            Para participar de minicursos do evento, é preciso{" "}
            <Text className="text-green font-inter">se inscrever com antecedência</Text> pelo
            aplicativo, na página da atividade desejada. As vagas são limitadas, então não deixe para depois!
          </Text>

          <Text className="text-default text-base mb-4 font-inter leading-relaxed">
            Se a atividade estiver cheia, não se preocupe, existe a fila de espera. Caso alguma vaga fique livre, o próximo da lista poderá garantir a sua participação.
          </Text>

          <Text className="text-default text-base mb-6 font-inter leading-relaxed">
            As inscrições podem ser acompanhadas no perfil do usuário!
          </Text>

          <View className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px] rounded-lg mb-2 overflow-hidden">
            <Image
              source={require("../../../assets/event-guide/minicurso-git.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-[#7D88A2] text-sm font-inter leading-relaxed mb-6">
            Minicurso – Controle de versão com git
          </Text>

          <Text className="text-default text-base font-inter leading-relaxed">
            Para os minicursos, é cobrada uma{" "}
            <Text className="text-green font-inter leading-relaxed">
              taxa de 1kg de alimento não perecível
            </Text>{" "}
            por pessoa, que será doado ao final do evento. Não se esqueça de levar o alimento para
            poder participar.
          </Text>
        </View>

        {/* Seção Competições */}
        <View className="mb-8 w-full">
          <Text className="text-white text-[16px] font-poppinsMedium mb-2">Competições</Text>

          <Text className="text-default text-base mb-6 font-inter leading-relaxed">
            Para participar das competições, a{" "}
            <Text className="text-green font-inter">
              inscrição é obrigatória e não ocorre pelo aplicativo
            </Text>
            . Como são organizadas em parceria com empresas, o processo pode variar. Fique atento às
            nossas redes para não perder prazos ou oportunidades.
          </Text>

          <View className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px] rounded-lg mb-2 overflow-hidden">
            <Image
              source={require("../../../assets/event-guide/hackathon-tractian.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-[#7D88A2] text-sm font-inter leading-relaxed">
            Hackathon da Tractian
          </Text>
        </View>

        {/* Seção Feira empresarial */}
        <View className="mb-8 w-full">
          <Text className="text-white text-[16px] font-poppinsMedium mb-2">Feira empresarial</Text>

          <Text className="text-default text-base mb-6 font-inter leading-relaxed">
            A feira empresarial conecta empresas, profissionais e estudantes, promovendo networking.{" "}
            <Text className="text-green font-inter">
              Não é necessário realizar inscrição prévia
            </Text>
            , basta comparecer e visitar os estandes. Fique atento ao local do evento e aproveite
            essa oportunidade de interação com o mercado!
          </Text>

          <View className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px] rounded-lg mb-2 overflow-hidden">
            <Image
              source={require("../../../assets/event-guide/magalu-estande.jpg")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-[#7D88A2] text-sm font-inter leading-relaxed">
            Estande da Magalu Cloud
          </Text>
        </View>

        {/* Coffee */}
        <View className="mb-8">
          <Text className="text-white text-[16px] font-poppinsMedium mb-2">
            Aproveite o coffee do evento
          </Text>
          <Text className="text-default text-base font-inter leading-relaxed">
            Para participar do coffee, é necessário estar inscrito no evento e apresentar sua credencial na entrada. Venha desfrutar de deliciosas opções de café, fazer networking e recarregar as energias durante o evento!          </Text>
        </View>

        {/* Prêmios */}
        <View className="mb-8">
          <Text className="text-white text-[16px] font-poppinsMedium mb-2">
            Participe e ganhe prêmios!
          </Text>
          <Text className="text-default text-base font-inter leading-relaxed">
            Participe das atividades e acumule pontos! Os três participantes com maior pontuação ao final serão premiados, então não perca a chance de se destacar e ganhar prêmios incríveis!
          </Text>
        </View>

        {/* Seção final */}
        <View className="mb-16">
          <Text className="text-white text-[16px] font-poppinsMedium mb-2">
            Fique atento no cronograma!
          </Text>
          <Text className="text-default text-base font-inter leading-relaxed">
            Sempre confira a data, o horário e o local de cada atividade. Fique atento às
            publicações nas redes sociais para acompanhar qualquer novidade.
          </Text>
        </View>
      </AppLayout>
    </SafeAreaView>
  );
}
