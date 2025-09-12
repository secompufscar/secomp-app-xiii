import { memo, useCallback, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { getActivities } from "../../services/activities";
import { parseISO, addHours, getDay, isPast } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMicrophone,
  faLaptopCode,
  faTrophy,
  faGamepad,
  faUsers,
  faIdBadge,
  faCalendar,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type ActivityListProps = {
  selectedDay?: string;
  onPressActivity?: (item: Activity) => void;
};

const categoryIconMap: { [key: string]: IconDefinition } = {
  Minicursos: faLaptopCode,
  "1": faLaptopCode,

  Palestra: faMicrophone,
  "2": faMicrophone,

  Competicoes: faTrophy,
  "3": faTrophy,

  Gamenight: faGamepad,
  "4": faGamepad,

  Sociocultural: faUsers,
  "5": faUsers,

  Credenciamento: faIdBadge,
  "6": faIdBadge,

  Coffee: faMugHot,
  "7": faMugHot,

  default: faCalendar,
};

export default function ActivityList({ selectedDay, onPressActivity }: ActivityListProps) {
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dayNameToDayOfWeek: { [key: string]: number } = {
    SEG: 1,
    TER: 2,
    QUA: 3,
    QUI: 4,
    SEX: 5,
  };

  // Busca as atividades e categorias na montagem do componente
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        setLoading(true);
        try {
          const acts: Activity[] = await getActivities();

          if (isActive) {
            const sortedActivities = acts.sort((a, b) => {
              const dateA = parseISO(a.data).getTime();
              const dateB = parseISO(b.data).getTime();
              return dateA - dateB;
            });
            setAllActivities(sortedActivities);
            setErrorMsg(null);
          }
        } catch (err) {
          console.error("Erro ao buscar dados:", err);
          if (isActive) {
            setErrorMsg("Falha ao obter dados.");
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const getFilteredActivitiesByDay = (): Activity[] => {
    if (!selectedDay || allActivities.length === 0) {
      return [];
    }

    const targetDayOfWeek = dayNameToDayOfWeek[selectedDay.toUpperCase()];

    if (targetDayOfWeek === undefined) {
      console.warn(`Dia selecionado inválido: ${selectedDay}`);
      return [];
    }

    return allActivities.filter((activity) => {
      const rawDate = parseISO(activity.data);
      const dataObj = addHours(rawDate, 3); // UTC-3 (Brasília)
      const activityDayOfWeek = getDay(dataObj);

      return activityDayOfWeek === targetDayOfWeek;
    });
  };

  const filteredActivities = getFilteredActivitiesByDay();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center pb-24">
        <ActivityIndicator size="large" color={colors.blue[500]} />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-danger text-center font-inter text-sm">{errorMsg}</Text>
      </View>
    );
  }

  if (filteredActivities.length === 0) {
    return (
      <View className="flex-1 items-center justify-start mt-8">
        <Text className="text-gray-400 text-center text-sm font-inter">
          Nenhuma atividade registrada neste dia
        </Text>
      </View>
    );
  }

  const ActivityItem = memo(({ item }: { item: Activity }) => {
    const activityIcon = categoryIconMap[item.categoriaId] || categoryIconMap["default"];
    const rawDate = parseISO(item.data);
    const activityDateTime = addHours(rawDate, 3); 
    const hasOccurred = isPast(activityDateTime);
    const iconColor = hasOccurred ? "#3B465E" : colors.blue[500];

    return (
      <Pressable
        onPress={() => onPressActivity?.(item)}
        className="flex-row items-center bg-background rounded-lg p-4 mb-4 shadow-sm active:bg-background/70"
      >
        <View className="items-center justify-center mr-4 w-[48px] h-[56px]">
          <FontAwesomeIcon icon={activityIcon} size={45} color={iconColor} />
        </View>

        <View className="w-px h-12 bg-[#3B465E] opacity-50 mr-4" />

        <View className="flex flex-1 flex-col">
          <Text numberOfLines={1} className="text-white text-[14px] mb-1 font-poppinsMedium">
            {item.nome}
          </Text>

          <View className="flex flex-row">
            <Text className="w-24 mr-4 text-gray-400 text-[13px] font-interMedium mb-[8px]">
              Horário:
              <Text className="text-green font-inter"> {item.data.substring(11, 16)}</Text>
            </Text>

            <Text className="flex-1 text-gray-400 text-[13px] font-interMedium" numberOfLines={1} ellipsizeMode="tail">
              Local: <Text className="text-green font-inter">{item.local}</Text>
            </Text>
          </View>
        </View>
      </Pressable>
    );
  });

  return (
    <FlatList
      data={filteredActivities}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 60, paddingTop: 4 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ActivityItem item={item} />}
    />
  );
}
