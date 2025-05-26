import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import BackButton from "../../components/button/backButton";
import AppLayout from "../../components/appLayout";

export default function EventGuide() {
    return (
        <SafeAreaView className="bg-blue-900 flex-1 items-center">
            <AppLayout>
                {/* Botão de voltar */}
                <BackButton />
                {/* Título */}
                <View className="mb-4">
                    <Text className="text-white text-[20px] font-poppinsSemiBold mb-2">
                        Guia do evento
                    </Text>
                    <Text className="text-white text-xs font-inter">
                        Como participar das atividades da Secomp?
                    </Text>
                </View>

                {/* Parágrafo 1 */}
                <Text className="text-gray-300 text-xs mb-4 font-poppins">
                    Antes de tudo, para participar de qualquer atividade, você precisa
                    estar inscrito na Secomp. Garanta sua inscrição na página inicial, na
                    primeira seção, clicando em {" "}
                    <Text className="text-green font-poppinsMedium">
                        Inscrever-se.
                    </Text>
                </Text>

                {/* Parágrafo 2 */}
                <Text className="text-gray-300 text-xs mb-6 font-poppins">
                    Agora, você está pronto para se juntar a nós!
                </Text>

                {/* Seção Palestras */}
                <View className="mb-6 w-full">
                    <Text className="text-white text-sm font-poppinsSemiBold mb-2">
                        Palestras
                    </Text>
                    <Text className="text-default text-xs mb-4 font-inter">
                        As palestras são eventos abertos,{" "}
                        <Text className="text-green font-poppinsMedium">
                            sem necessidade de inscrição prévia
                        </Text>
                        . Basta comparecer ao local, na data e horário indicados no
                        cronograma!
                    </Text>
                    <View className="w-full h-52 sm:h-72 md:h-80 lg:h-96 rounded-lg mb-1">
                    <Image
                        source={require("../../../assets/event-guide/palestra-magalu.png") }
                        style={{ width: '100%',  height: '100%' }}
                        resizeMode="cover"
                    />
                    </View>
                    <Text className="text-blue-200 text-xs font-inter">
                        Palestra da Magalu Cloud
                    </Text>
                </View>

                {/* Seção Minicursos */}
                <View className="mb-6 ">
                    <Text className="text-white text-sm font-poppinsSemiBold mb-2">
                        Minicursos
                    </Text>
                    <Text className="text-default text-xs mb-4 font-inter">
                        Para participar de minicursos do evento, é preciso{" "}
                        <Text className="text-green font-poppinsMedium">
                            se inscrever com antecedência
                        </Text>{" "}
                        pelo aplicativo, na página da atividade desejada. As opções estão
                        disponíveis em Atividades e Cronograma.{"\n\n"}As inscrições podem
                        ser acompanhadas no perfil do usuário!
                    </Text>
                    <View className="w-full h-52 sm:h-72 md:h-80 lg:h-96 rounded-lg mb-1">
                    <Image
                        source={require("../../../assets/event-guide/minicurso-git.png") }
                        style={{ width: '100%',  height: '100%' }}
                        resizeMode="cover"
                    />
                    </View>
                    <Text className="text-blue-200 text-xs font-inter mb-4">
                        Minicurso – Controle de versão com git
                    </Text>
                    <Text className="text-default text-xs font-inter">
                        Para os minicursos, é cobrada uma{" "}
                        <Text className="text-green font-poppinsMedium">
                            taxa de 1kg de alimento não perecível
                        </Text>{" "}
                        por pessoa, que será doado ao final do evento. Não se esqueça de
                        levar o alimento para poder participar.
                    </Text>
                </View>

                {/* Seção Competições */}
                <View className="mb-6 ">
                    <Text className="text-white text-sm font-poppinsSemiBold mb-2">
                        Competições
                    </Text>
                    <Text className="text-default text-xs mb-4 font-inter">
                        Para participar das competições, a{" "}
                        <Text className="text-green font-poppinsMedium">
                            inscrição é obrigatória e não ocorre pelo aplicativo
                        </Text>
                        . Como são organizadas em parceria com empresas, o processo pode
                        variar. Fique atento às nossas redes para não perder prazos ou
                        oportunidades.
                    </Text>
                    <View className="w-full h-52 sm:h-72 md:h-80 lg:h-96 rounded-lg mb-1">
                    <Image
                        source={require("../../../assets/event-guide/hackathon-tractian.png") }
                        style={{ width: '100%',  height: '100%' }}
                        resizeMode="cover"
                    />
                    </View>
                    <Text className="text-blue-200 text-xs font-inter">
                        Hackathon da Tractian
                    </Text>
                </View>

                {/* Seção Feira empresarial */}
                <View className="mb-6 ">
                    <Text className="text-white text-sm font-poppinsSemiBold mb-2">
                        Feira empresarial
                    </Text>
                    <Text className="text-default text-xs mb-4 font-inter">
                        A feira empresarial conecta empresas, profissionais e estudantes,
                        promovendo networking.{" "}
                        <Text className="text-green font-poppinsMedium">
                            Não é necessário realizar inscrição prévia
                        </Text>
                        , basta comparecer e visitar os estandes. Fique atento ao local do
                        evento e aproveite essa oportunidade de interação com o mercado!
                    </Text>
                    <View className="w-full h-52 sm:h-72 md:h-80 lg:h-96 rounded-lg mb-1">
                    <Image
                        source={require("../../../assets/event-guide/magalu-estande.jpg") }
                        style={{ width: '100%',  height: '100%' }}
                        resizeMode="cover"
                    />
                    </View>
                    <Text className="text-blue-200 text-xs font-inter">
                        Estande da Magalu Cloud
                    </Text>
                </View>

                {/* Seção final */}
                <View className="mb-16 ">
                    <Text className="text-white text-sm font-poppinsSemiBold mb-2">
                        Fique atento no cronograma!
                    </Text>
                    <Text className="text-default text-xs font-inter">
                        Sempre confira a data, o horário e o local de cada atividade. Fique
                        atento às publicações nas redes sociais para acompanhar qualquer
                        novidade.
                    </Text>
                </View>
            </AppLayout>
        </SafeAreaView>
    );
}
