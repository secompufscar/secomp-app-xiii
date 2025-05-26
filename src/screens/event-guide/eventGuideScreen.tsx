import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import BackButton from "../../components/button/backButton";
import AppLayout from "../../components/appLayout";

export default function EventGuide() {
    return (
        <SafeAreaView className="bg-blue-900 flex-1 items-center">
            <AppLayout>
                <BackButton />

                {/* Título */}
                <View className="mb-8">
                    <Text className="text-white text-2xl font-poppinsSemiBold mb-2">
                        Guia do evento
                    </Text>
                    <Text className="text-gray-400 font-inter text-sm">
                        Como participar das atividades da Secomp?
                    </Text>
                </View>

                {/* Parágrafo 1 */}
                <Text className="text-default text-sm mb-4 font-inter leading-relaxed">
                    Antes de tudo, para participar de qualquer atividade, você precisa
                    estar inscrito na Secomp. Garanta sua inscrição na página inicial, na
                    primeira seção, clicando em {" "}
                    <Text className="text-green font-inter">
                        Inscrever-se.
                    </Text>
                </Text>

                {/* Parágrafo 2 */}
                <Text className="text-default text-sm mb-8 font-inter">
                    Agora, você está pronto para se juntar a nós!
                </Text>

                {/* Seção Palestras */}
                <View className="mb-8 w-full">
                    <Text className="text-white text-[16px] font-poppinsMedium mb-2">
                        Palestras
                    </Text>

                    <Text className="text-default text-sm mb-6 font-inter leading-relaxed">
                        As palestras são eventos abertos,{" "}
                        <Text className="text-green font-inter">
                            sem necessidade de inscrição prévia
                        </Text>
                        . Basta comparecer ao local, na data e horário indicados no
                        cronograma!
                    </Text>

                    <View className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px] rounded-lg mb-2 overflow-hidden">
                        <Image
                            source={require("../../../assets/event-guide/palestra-magalu.png") }
                            style={{ width: '100%',  height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>

                    <Text className="text-[#7D88A2] text-sm font-inter leading-relaxed">
                        Palestra da Magalu Cloud
                    </Text>
                </View>

                {/* Seção Minicursos */}
                <View className="mb-8 w-full">
                    <Text className="text-white text-[16px] font-poppinsMedium mb-2">
                        Minicursos
                    </Text>

                    <Text className="text-default text-sm mb-4 font-inter leading-relaxed">
                        Para participar de minicursos do evento, é preciso{" "}
                        <Text className="text-green font-inter">
                            se inscrever com antecedência
                        </Text>{" "}
                        pelo aplicativo, na página da atividade desejada. As opções estão
                        disponíveis em Atividades e Cronograma.
                    </Text>

                    <Text className="text-default text-sm mb-6 font-inter leading-relaxed">
                        As inscrições podem ser acompanhadas no perfil do usuário!
                    </Text>

                    <View className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px] rounded-lg mb-2 overflow-hidden">
                        <Image
                            source={require("../../../assets/event-guide/minicurso-git.png") }
                            style={{ width: '100%',  height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>

                    <Text className="text-[#7D88A2] text-sm font-inter leading-relaxed mb-6">
                        Minicurso – Controle de versão com git
                    </Text>

                    <Text className="text-default text-sm font-inter">
                        Para os minicursos, é cobrada uma{" "}
                        <Text className="text-green font-inter leading-relaxed">
                            taxa de 1kg de alimento não perecível
                        </Text>{" "}
                        por pessoa, que será doado ao final do evento. Não se esqueça de
                        levar o alimento para poder participar.
                    </Text>
                </View>

                {/* Seção Competições */}
                <View className="mb-8 w-full">
                    <Text className="text-white text-[16px] font-poppinsMedium mb-2">
                        Competições
                    </Text>

                    <Text className="text-default text-sm mb-6 font-inter leading-relaxed">
                        Para participar das competições, a{" "}
                        <Text className="text-green font-inter">
                            inscrição é obrigatória e não ocorre pelo aplicativo
                        </Text>
                        . Como são organizadas em parceria com empresas, o processo pode
                        variar. Fique atento às nossas redes para não perder prazos ou
                        oportunidades.
                    </Text>

                    <View className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px] rounded-lg mb-2 overflow-hidden">
                        <Image
                            source={require("../../../assets/event-guide/hackathon-tractian.png") }
                            style={{ width: '100%',  height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>

                    <Text className="text-[#7D88A2] text-sm font-inter leading-relaxed">
                        Hackathon da Tractian
                    </Text>
                </View>

                {/* Seção Feira empresarial */}
                <View className="mb-8 w-full">
                    <Text className="text-white text-[16px] font-poppinsMedium mb-2">
                        Feira empresarial
                    </Text>

                    <Text className="text-default text-sm mb-6 font-inter leading-relaxed">
                        A feira empresarial conecta empresas, profissionais e estudantes,
                        promovendo networking.{" "}
                        <Text className="text-green font-inter">
                            Não é necessário realizar inscrição prévia
                        </Text>
                        , basta comparecer e visitar os estandes. Fique atento ao local do
                        evento e aproveite essa oportunidade de interação com o mercado!
                    </Text>

                    <View className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px] rounded-lg mb-2 overflow-hidden">
                        <Image
                            source={require("../../../assets/event-guide/magalu-estande.jpg")}
                            style={{ width: '100%',  height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>

                    <Text className="text-[#7D88A2] text-sm font-inter leading-relaxed">
                        Estande da Magalu Cloud
                    </Text>
                </View>

                {/* Seção final */}
                <View className="mb-16">
                    <Text className="text-white text-[16px] font-poppinsMedium mb-2">
                        Fique atento no cronograma!
                    </Text>
                    <Text className="text-default text-sm font-inter leading-relaxed">
                        Sempre confira a data, o horário e o local de cada atividade. Fique
                        atento às publicações nas redes sociais para acompanhar qualquer
                        novidade.
                    </Text>
                </View>
            </AppLayout>
        </SafeAreaView>
    );
}
