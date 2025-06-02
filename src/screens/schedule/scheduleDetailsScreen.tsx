import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { format, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import AppLayout from "../../components/appLayout";
import BackButton from "../../components/button/backButton";
import { Activity } from "../../components/activity/activityList";

type ScheduleDetailsProps = {
    item: Activity;
};

export default function ScheduleDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params as ScheduleDetailsProps;

    const data = new Date(item.data);
    const dataFormatada = format(data, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
    const horaInicio = format(data, 'HH:mm');
    const horaFim = format(addHours(data, 1), 'HH:mm');

    return (
        <SafeAreaView className="bg-blue-900 flex-1 items-center">
            <AppLayout>
                <BackButton />

                <Text className="text-white text-2xl font-poppinsSemiBold p-4 mb-2 mx-0">Detalhes</Text>

                <View className="p-4 w-full">
                    <View className="bg-blue-900 rounded-3xl p-6 space-y-4">
                        <Text className="text-center text-lg font-poppinsSemiBold text-neutral-800">
                            {item.nome}
                        </Text>

                        <View className="flex-row items-center">
                            <AntDesign name="calendar" size={20} color="#445BE6" />
                            <Text className="pl-2 text-neutral-700 font-inter">
                                {dataFormatada}
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Ionicons name="time-outline" size={20} color="#445BE6" />
                            <Text className="pl-2 text-neutral-700 font-inter">
                                {horaInicio}h - {horaFim}h
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <AntDesign name="team" size={20} color="#445BE6" />
                            <Text className="pl-2 text-neutral-700 font-inter">
                                {item.palestranteNome}
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <AntDesign name="enviromento" size={20} color="#445BE6" />
                            <Text className="pl-2 text-neutral-700 font-inter">
                                {item.local}
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Ionicons name="ticket-outline" size={20} color="#445BE6" />
                            <Text className="pl-2 text-neutral-700 font-inter">
                                {item.vagas} vagas disponíveis
                            </Text>
                        </View>

                        <View className="flex-row items-start">
                            <Ionicons name="information-circle-outline" size={20} color="#445BE6" />
                            <Text className="pl-2 text-neutral-700 font-inter text-justify flex-1">
                                {item.detalhes}
                            </Text>
                        </View>
                    </View>
                </View>
            </AppLayout>
        </SafeAreaView>
    );
}
