import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable} from "react-native";
import { getActivities } from "../../services/activities";
import { getCategories } from "../../services/categories";
import { format, addHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { colors } from "../../styles/colors";

// Props esperadas pelo componente ActivityList
type ActivityListProps = {
  selectedCategory?: string; // Categoria atualmente selecionada
  onPressActivity?: (item: Activity) => void; // Callback ao tocar em uma atividade
};

// Componente principal que lista atividades filtradas por categoria
export default function ActivityList({
  selectedCategory,
  onPressActivity,
}: ActivityListProps) {
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Função auxiliar para normalizar strings (acentos e caixa baixa)
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();

  // Busca as categorias e atividades na montagem do componente
  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategories();
        setAllCategories(cats);

        const acts = await getActivities();
        setAllActivities(acts);
      } catch (err: any) {
        console.error("Erro ao buscar dados:", err);
        setErrorMsg("Falha ao obter dados.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  // Exibe aviso enquanto categorias ainda carregam
  if (selectedCategory && allCategories.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-gray-400 text-center font-inter text-sm">
          Carregando categorias...
        </Text>
      </View>
    );
  }

  // Retorna apenas as atividades pertencentes à categoria selecionada
  const getFilteredActivities = (): Activity[] => {
    if (!selectedCategory) {
      return allActivities;
    }

    let targetName;
    const selNorm = normalize(selectedCategory);

    if (selNorm === "outros") {
      targetName = ["workshop", "gamenight", "sociocultural"];
    } else {
      targetName = [selNorm]; 
    }

    const catObj = allCategories.find(
      (c) => targetName.includes(normalize(c.nome))
    );
    if (!catObj) {
      return [];
    }

    return allActivities.filter((a) => a.categoriaId === catObj.id);
  };

  const filtered = getFilteredActivities();

  // Nenhuma atividade encontrada para a categoria
  if (filtered.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-gray-400 text-center text-sm font-inter">
          Nenhuma atividade em “{selectedCategory}”
        </Text>
      </View>
    );
  }

  // Lista de atividades filtradas
  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 16, paddingTop: 4 }}
      renderItem={({ item }) => {
        const dataObj = new Date(item.data);
        const dia = format(dataObj, 'dd', { locale: ptBR });
        const mes = format(dataObj, 'MMMM', { locale: ptBR });
        const horaInicio = format(dataObj, 'HH:mm');
        const horaFim = format(addHours(dataObj, 1), 'HH:mm'); // Considera 1h de duração

        return (
          <Pressable
            onPress={() => onPressActivity?.(item)}
            className="flex-row items-center bg-background rounded-lg p-4 mx-0 mb-4 shadow-sm shadow-black/25"
          >
            {/* Bloco com a data (dia + mês) */}
            <View className="items-center mr-4">
              <Text className="text-white text-3xl font-poppinsSemiBold">{dia}</Text>
              <Text className="text-blue-300 text-xs font-inter lowercase">{mes}</Text>
            </View>

            {/* Linha vertical separadora */}
            <View className="w-px h-12 bg-[#3B465E] opacity-50 mr-4" />

            {/* Bloco com nome da atividade e horário */}
            <View className="h-full flex-1 flex-col justify-between py-1">
              <Text className="text-white text-[14px] font-poppinsMedium">
                {item.nome}
              </Text>

              <Text className="text-default text-[13px] font-inter">
                Horário: <Text className="text-green font-inter">{horaInicio}h - {horaFim}h</Text>
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}
