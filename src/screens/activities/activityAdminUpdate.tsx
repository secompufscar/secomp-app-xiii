import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Pressable, StatusBar, Platform, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, ParamListBase, useFocusEffect, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { updateActivity } from "../../services/activities";
import { getCategories } from "../../services/categories";
import { getActivityId } from "../../services/activities";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input";
import ErrorOverlay from "../../components/overlay/errorOverlay";
import WarningOverlay from "../../components/overlay/warningOverlay";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import DatePicker from "react-datepicker";

type ActivityAdminCreateNavigationProp = NativeStackNavigationProp<ParamListBase>;

type RouteParams = {
  ActivityAdminCreate: {
    id?: string;
  };
};

export default function ActivityAdminUpdate() {
  const navigation = useNavigation<ActivityAdminCreateNavigationProp>();
  const route = useRoute<RouteProp<RouteParams, "ActivityAdminCreate">>();
  const activityId = route.params?.id;

  const [name, setName] = useState<string>("");
  const [speakerName, setSpeakerName] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [vacancies, setVacancies] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [points, setPoints] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState("Erro");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [warningMessage, setWarningMessage] = useState("Aviso");
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  // Busca as categorias
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchCategories = async () => {
        setCategoriesLoading(true);
        try {
          const fetchedCategories = await getCategories();
          if (isActive) {
            setCategories(fetchedCategories);
            // Se ainda não tiver categoria selecionada, seleciona a primeira
            if (fetchedCategories.length > 0 && !selectedCategoryId) {
              setSelectedCategoryId(fetchedCategories[0].id);
            }
            setCategoriesError(null);
          }
        } catch (err) {
          console.error("Erro ao buscar categorias:", err);
          if (isActive) {
            setCategoriesError("Não foi possível carregar as categorias.");
          }
        } finally {
          if (isActive) {
            setCategoriesLoading(false);
          }
        }
      };

      fetchCategories();

      return () => {
        isActive = false;
      };
    }, [selectedCategoryId])
  );

  // Busca a atividade
  useEffect(() => {
    if (!activityId) return;

    let isActive = true;

    const fetchActivity = async () => {
      setIsLoading(true);
      try {
        const activity = await getActivityId(activityId);
        if (isActive) {
          setName(activity.nome);
          setSpeakerName(activity.palestranteNome);
          const activityDate = new Date(activity.data);
          setDate(activityDate);
          setTime(activityDate);
          setVacancies(String(activity.vagas));
          setDetails(activity.detalhes);
          setPoints(String(activity.points));
          setLocation(activity.local);
          setSelectedCategoryId(activity.categoriaId);
        }
      } catch (err) {
        console.error("Erro ao buscar atividade:", err);
        if (isActive) {
          setErrorMessage("Não foi possível carregar os dados da atividade");
          setErrorModalVisible(true);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchActivity();

    return () => {
      isActive = false;
    };
  }, [activityId]);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleUpdateActivity = async () => {
    if (!activityId)
      return;

    if (
      !name.trim() ||
      !speakerName.trim() ||
      !vacancies.trim() ||
      !details.trim() ||
      !points.trim() ||
      !location.trim() ||
      !selectedCategoryId
    ) {
      setWarningMessage("Por favor, preencha todos os campos e selecione uma categoria");
      setWarningModalVisible(true);
      return;
    }

    const parsedVacancies = parseInt(vacancies, 10);
    if (isNaN(parsedVacancies) || parsedVacancies < 0) {
      setWarningMessage("O número de vagas deve ser um valor numérico positivo");
      setWarningModalVisible(true);
      return;
    }

    const parsedPoints = parseInt(points, 10);
    if (isNaN(parsedPoints) || parsedPoints < 0) {
      setWarningMessage("A pontuação deve ser um valor numérico positivo")
      setWarningModalVisible(true);  
      return;
    }


    setIsLoading(true);

    try {
      const dateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );

      const adjustedDateTime = new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000);

      const activityData = {
        nome: name,
        palestranteNome: speakerName,
        data: adjustedDateTime.toISOString(),
        vagas: parsedVacancies,
        detalhes: details,
        points: parsedPoints,
        categoriaId: selectedCategoryId,
        local: location,
      };

      await updateActivity(activityId, activityData);
      navigation.goBack();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Falha ao atualizar a atividade.";
      setErrorMessage(errorMessage);
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <View className="flex-1 w-full">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />

        <View className="w-full flex-1 px-6 max-w-[1000px] mx-auto">
          <BackButton />

          {/* Cabeçalho */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">
              {activityId ? "Editar atividade" : "Criar nova atividade"}
            </Text>
            <Text className="text-blue-200 font-inter">
              {activityId
                ? "Atualize os dados da atividade."
                : "Adicione uma nova atividade ao evento!"}
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-col flex-1 w-full gap-4 text-center justify-start pb-8">
              {/* Nome da atividade */}
              <View className="w-full">
                <Text className="text-gray-400 text-sm font-interMedium mb-2">Nome da Atividade</Text>
                <Input>
                  <Input.Field placeholder="Ex.: Palestra de IA" onChangeText={setName} value={name} />
                </Input>
              </View>

              {/* Nome do Palestrante */}
              <View className="w-full">
                <Text className="text-gray-400 text-sm font-interMedium mb-2">Nome do Palestrante</Text>
                <Input>
                  <Input.Field placeholder="Ex.: João Silva" onChangeText={setSpeakerName} value={speakerName} />
                </Input>
              </View>

              {/* Data da atividade */}
              <View className="w-full mb-2">
                {Platform.OS === "web" ? (
                  <View>
                    <Text className="text-gray-400 text-sm font-interMedium mb-2">Data</Text>
                    <DatePicker
                      selected={date}
                      onChange={(date: Date | null) => {
                        if (date) setDate(date);
                      }}
                      locale={ptBR}
                      dateFormat="dd/MM/yyyy"
                      popperClassName="z-50"
                      portalId="root"
                      customInput={
                        <View
                          className={`w-full p-[16px] bg-background rounded-lg border border-border flex-row items-center`}>
                          <Text className="text-white font-inter text-sm">{date.toLocaleDateString("pt-BR")}</Text>
                        </View>
                      }
                    />
                  </View>
                ) : (
                  <Pressable onPress={() => setShowDatePicker(true)}>
                    <Text className="text-gray-400 text-sm font-interMedium mb-2">Data</Text>
                    <View
                      className="w-full p-[16px] bg-background rounded-lg border border-border flex-row items-center"
                      pointerEvents="none"
                    >
                      <Text className="text-white font-inter text-sm">{`${date.toLocaleDateString("pt-BR")}`}</Text>
                    </View>
                  </Pressable>
                )}
              </View>

              {/* Horário da atividade */}
              <View className="w-full mb-2">
                {Platform.OS === "web" ? (
                  <View>
                    <Text className="text-gray-400 text-sm font-interMedium mb-2">Horário</Text>
                    <DatePicker
                      selected={time}
                      onChange={(time: Date | null) => {
                        if (time) setTime(time);
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      timeCaption="Hora"
                      dateFormat="HH:mm"
                      locale={ptBR}
                      popperClassName="z-50"
                      portalId="root"
                      customInput={
                        <View className="w-full p-[16px] bg-background rounded-lg border border-border flex-row items-center">
                          <Text className="text-white font-inter text-sm">{format(time, "HH:mm")}</Text>
                        </View>
                      }
                    />
                  </View>
                ) : (
                  <Pressable onPress={() => setShowTimePicker(true)}>
                    <Text className="text-gray-400 text-sm font-interMedium mb-2">Horário</Text>
                    <View
                      className="w-full p-[16px] bg-background rounded-lg border border-border flex-row items-center"
                      pointerEvents="none"
                    >
                      <Text className="text-white font-inter text-sm">{format(time, "HH:mm", { locale: ptBR })}</Text>
                    </View>
                  </Pressable>
                )}
              </View>

              {/* Local */}
              <View className="w-full">
                <Text className="text-gray-400 text-sm font-interMedium mb-2">Local</Text>
                <Input>
                  <Input.Field placeholder="Ex.: Auditório" onChangeText={setLocation} value={location} />
                </Input>
              </View>

              {/* Vagas */}
              <View className="w-full">
                <Text className="text-gray-400 text-sm font-interMedium mb-2">Número de Vagas</Text>
                <Input>
                  <Input.Field placeholder="Ex.: 50" onChangeText={setVacancies} value={vacancies} keyboardType="numeric" />
                </Input>
              </View>

              {/* Detalhes */}
              <View className="w-full">
                <Text className="text-gray-400 text-sm font-interMedium mb-2">Detalhes</Text>
                <Input>
                  <Input.Field placeholder="Detalhes da atividade" onChangeText={setDetails} value={details} />
                </Input>
              </View>


              {/* Pontos */}
              <View className="w-full">
                <Text className="text-gray-400 text-sm font-interMedium mb-2">Pontos</Text>
                <Input>
                  <Input.Field
                    placeholder="Pontuação da atividade"
                    onChangeText={setPoints}
                    value={points}
                  />
                </Input>
              </View>

              {/* Categoria */}
              <View className="w-full mb-4">
                <Text className="text-gray-400 text-sm font-interMedium mb-3">Categoria</Text>
                {categoriesLoading ? (
                  <ActivityIndicator size="small" color={colors.blue[500]} />
                ) : categoriesError ? (
                  <Text className="text-danger text-sm">{categoriesError}</Text>
                ) : (
                  <View className="flex-row flex-wrap gap-3 mb-2">
                    {categories.map((category) => {
                      const isSelected = selectedCategoryId === category.id;
                      return (
                        <Pressable
                          key={category.id}
                          onPress={() => setSelectedCategoryId(category.id)}
                          className={`px-4 py-2 rounded-full border ${
                            isSelected ? "bg-blue-500/10 border-blue-500" : "border-gray-600"
                          }`}
                        >
                          <Text className={isSelected ? "text-blue-500 font-interMedium" : "text-gray-400 font-interMedium"}>
                            {category.nome}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>

              {isLoading ? (
                <ActivityIndicator size="large" color={colors.blue[500]} className="mt-6" />
              ) : (
                <Button title="Atualizar" className="mt-auto" onPress={handleUpdateActivity} />
              )}
            </View>
          </ScrollView>
        </View>
      </View>

      {Platform.OS !== "web" && (
        <>
          {showDatePicker && <DateTimePicker value={date} mode="date" onChange={onChangeDate} />}
          {showTimePicker && <DateTimePicker value={time} mode="time" onChange={onChangeTime} />}
        </>
      )}

      <ErrorOverlay visible={errorModalVisible} title="Erro" message={errorMessage} onConfirm={() => setErrorModalVisible(false)} confirmText="OK" />

      <WarningOverlay visible={warningModalVisible} title="Aviso" message={warningMessage} onConfirm={() => setWarningModalVisible(false)} confirmText="OK" />
    </SafeAreaView>
  );
}
