import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { parseISO, addHours, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../../hooks/AuthContext";
import { getActivities, getUserSubscribedActivities } from "../../services/activities";

export type Activity = {
  id: string;
  nome: string;
  palestranteNome: string;
  data: string;
  vagas: string;
  detalhes: string;
  categoriaId: string;
  local: string;
};

type SubscribedActivityListProps = {
  onPressActivity?: (item: Activity) => void;
};

export function SubscribedActivityList({
  onPressActivity,
}: SubscribedActivityListProps) {
  const { user, loading: authLoading } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;

    (async () => {
      try {
        // 1) Busca inscrições do usuário e extrai os IDs
        const userSubs = await getUserSubscribedActivities(String(user.id));
        const subscribedIds = userSubs.map((u) => u.activityId);

        // 2) Busca todas as atividades e filtra
        const allActs = await getActivities();
        const filtered = allActs.filter((a) => subscribedIds.includes(a.id));

        setActivities(filtered);
      } catch (err: any) {
        console.error("Erro ao buscar inscrições:", err);
        setErrorMsg("Não foi possível carregar suas inscrições.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user, authLoading]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-red-500 text-center font-inter text-sm">
          {errorMsg}
        </Text>
      </View>
    );
  }

  if (activities.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-gray-400 text-center text-sm font-inter">
          Você não está inscrito em nenhuma atividade.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 16, paddingTop: 4 }}
      renderItem={({ item }) => {
        // Ajuste de fuso-horário se necessário
        const rawDate = parseISO(item.data);
        const dateObj = addHours(rawDate, 0); // ajuste aqui se precisar de UTC-3: use addHours(rawDate, 3)
        const dia = format(dateObj, "dd", { locale: ptBR });
        const mes = format(dateObj, "MMMM", { locale: ptBR });
        const horaInicio = format(dateObj, "HH:mm");
        const horaFim = format(addHours(dateObj, 1), "HH:mm");

        return (
          <Pressable
            onPress={() => onPressActivity?.(item)}
            className="flex-row items-center bg-background rounded-lg p-4 mx-0 mb-4 shadow-sm active:bg-background/70"
          >
            {/* Data */}
            <View className="items-center mr-4">
              <Text className="text-white text-3xl font-poppinsSemiBold">
                {dia}
              </Text>
              <Text className="text-blue-300 text-xs font-inter lowercase">
                {mes}
              </Text>
            </View>

            {/* Separador */}
            <View className="w-px h-12 bg-[#3B465E] opacity-50 mr-4" />

            {/* Detalhes */}
            <View className="flex-1 flex-col justify-between">
              <Text
                numberOfLines={1}
                className="text-white text-[14px] font-poppinsMedium"
              >
                {item.nome}
              </Text>
              <Text className="text-default text-[13px] font-inter">
                Horário:{" "}
                <Text className="text-green font-inter">
                  {horaInicio}h - {horaFim}h
                </Text>
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}
