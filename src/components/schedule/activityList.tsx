import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { getActivities } from "../../services/activities";
import { getCategories } from "../../services/categories";
import { parseISO, addHours, format, getDay, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { colors } from "../../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage, faLaptopCode, faTrophy, faGamepad, faUsers, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Props esperadas pelo componente ActivityList
type ActivityListProps = {
  selectedDay?: string;
  onPressActivity?: (item: Activity) => void;
};

const categoryIconMap: { [key: string]: IconDefinition } = {
  'minicursos': faLaptopCode,
  '1': faLaptopCode,
  
  'palestra': faMessage,
  '2': faMessage,

  'competicoes': faTrophy,
  '3': faTrophy,

  'gamenight': faGamepad,
  '4': faGamepad,

  'sociocultural': faUsers,
  '5': faUsers,

  'default': faCalendarDays,
};

export default function ActivityList({
  selectedDay,
  onPressActivity,
}: ActivityListProps) {
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dayNameToDayOfWeek: { [key: string]: number } = {
    'SEG': 1,
    'TER': 2,
    'QUA': 3,
    'QUI': 4,
    'SEX': 5,
  };

  // Busca as atividades E categorias na montagem do componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const acts: Activity[] = await getActivities();
        const sortedActivities = acts.sort((a, b) => {
          const dateA = parseISO(a.data).getTime(); // Certifique-se que 'data' é uma ISO string
          const dateB = parseISO(b.data).getTime();
          return dateA - dateB;
        });
  
        setAllActivities(sortedActivities);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setErrorMsg("Falha ao obter dados.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const getFilteredActivitiesByDay = (): Activity[] => {
    if (!selectedDay || allActivities.length === 0) {
      return [];
    }

    const targetDayOfWeek = dayNameToDayOfWeek[selectedDay.toUpperCase()];

    if (targetDayOfWeek === undefined) {
      console.warn(`Dia selecionado inválido: ${selectedDay}`);
      return [];
    }

    return allActivities.filter(activity => {
      const rawDate = parseISO(activity.data);
      const dataObj = addHours(rawDate, 3); // UTC-3 (Brasília)
      const activityDayOfWeek = getDay(dataObj);

      return activityDayOfWeek === targetDayOfWeek;
    });
  };

  const filteredActivities = getFilteredActivitiesByDay();

  // Tela de loading
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.blue[500]} />
      </View>
    );
  }

  // Tela de erro
  if (errorMsg) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-danger text-center font-inter text-sm">
          {errorMsg}
        </Text>
      </View>
    );
  }

  // Nenhuma atividade encontrada para o dia selecionado
  if (filteredActivities.length === 0) {
    return (
      <View className="flex-1 items-center justify-start mt-8">
        <Text className="text-gray-400 text-center text-sm font-inter">
          Nenhuma atividade registrada neste dia
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredActivities}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 60, paddingTop: 4 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const activityIcon = categoryIconMap[item.categoriaId] || categoryIconMap['default'];

        const rawDate = parseISO(item.data);
        const activityDateTime = addHours(rawDate, 3); // Horario de brasilia
        const hasOccurred = isPast(activityDateTime); 

        // Cor do icone
        const iconColor = hasOccurred ? '#3B465E' : '#4153DF'; // Grey out if past, otherwise white
  
        return (
          <Pressable
            onPress={() => onPressActivity?.(item)}
            className="flex-row items-center bg-background rounded-lg p-4 mb-4 shadow-sm active:bg-background/70"
          
          >
            {/* Bloco com o ÍCONE da categoria */}
            <View className="items-center justify-center mr-4 w-[60px] h-[60px]">
              <FontAwesomeIcon icon={activityIcon} size={48} color={iconColor} />
            </View>

            {/* Linha vertical separadora */}
            <View className="w-px h-12 bg-[#3B465E] opacity-50 mr-4" />

            {/* Bloco com nome da atividade e horário*/}
            <View className="flex-1 flex-col flex-wrap">
              <Text numberOfLines={1} className="text-white text-[14px] mb-1 font-poppinsMedium">
                {item.nome}
              </Text>

              <View className="flex flex-row gap-4">
                <Text className="text-default text-[13px] font-inter">
                  Horário: <Text className="text-green font-inter">{item.data.substring(11, 16)}</Text>
                </Text>

                <Text className="text-default text-[13px] font-inter">
                  Local: <Text className="text-green font-inter">{item.local}</Text>
                </Text>
              </View>
            </View>
          </Pressable>
        );
      }}
    />
  );
}