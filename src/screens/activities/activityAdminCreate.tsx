import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StatusBar,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, ParamListBase, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createActivity } from "../../services/activities";
import { getCategories } from "../../services/categories"; // Import getCategories
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { format, addHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";

type ActivityAdminCreateNavigationProp = NativeStackNavigationProp<ParamListBase>;

export default function ActivityAdminCreate() {
  const navigation = useNavigation<ActivityAdminCreateNavigationProp>();

  const [name, setName] = useState<string>("");
  const [speakerName, setSpeakerName] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [vacancies, setVacancies] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null); // State for selected category ID
  const [categories, setCategories] = useState<Category[]>([]); // State for fetched categories

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState("text-gray-400");

  const [isLoading, setIsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

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
            if (fetchedCategories.length > 0) {
              setSelectedCategoryId(fetchedCategories[0].id); // Select first category by default
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
    }, [])
  );

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

  const handleCreateActivity = async () => {
    setIsAlertOpen(false);

    if (
      !name.trim() ||
      !speakerName.trim() ||
      !vacancies.trim() ||
      !details.trim() ||
      !location.trim() ||
      !selectedCategoryId
    ) {
      setAlertText("Por favor, preencha todos os campos e selecione uma categoria.");
      setAlertColor("text-warning");
      setIsAlertOpen(true);
      return;
    }

    const parsedVacancies = parseInt(vacancies, 10);
    if (isNaN(parsedVacancies) || parsedVacancies < 0) {
      setAlertText("O número de vagas deve ser um valor numérico positivo.");
      setAlertColor("text-warning");
      setIsAlertOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      const dateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
      );

      const activityData = {
        nome: name,
        palestranteNome: speakerName,
        data: dateTime.toISOString(), 
        vagas: parsedVacancies,
        detalhes: details,
        categoriaId: selectedCategoryId,
        local: location,
      };

      await createActivity(activityData);

      setAlertText(`Sucesso! A atividade "${name}" foi criada.`);
      setAlertColor("text-success");
      setIsAlertOpen(true);

      // Limpa os campos depois de criar
      setName("");
      setSpeakerName("");
      setDate(new Date());
      setTime(new Date());
      setVacancies("");
      setDetails("");
      setLocation("");
      setSelectedCategoryId(categories.length > 0 ? categories[0].id : null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Falha ao criar a atividade.";
      setAlertText(errorMessage);
      setAlertColor("text-danger");
      setIsAlertOpen(true);
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
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Criar nova atividade</Text>
            <Text className="text-gray-400 font-inter">
              Adicione uma nova atividade ao evento!
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-col w-full gap-4 text-center justify-start pb-24">
              {/* Nome da atividade */}
              <View className="w-full">
                <Text className="text-blue-200 text-sm font-interMedium mb-2">Nome da Atividade</Text>
                <Input>
                  <FontAwesome5 name="font" size={20} color={colors.border} />
                  <Input.Field
                    placeholder="Nome da Atividade (Ex.: Palestra de IA)"
                    onChangeText={setName}
                    value={name}
                  />
                </Input>
              </View>

              {/* Nome do Palestrante */}
              <View className="w-full">
                <Text className="text-blue-200 text-sm font-interMedium mb-2">Nome do Palestrante</Text>
                <Input>
                  <FontAwesome5 name="user" size={20} color={colors.border} />
                  <Input.Field
                    placeholder="Nome do Palestrante (Ex.: João Silva)"
                    onChangeText={setSpeakerName}
                    value={speakerName}
                  />
                </Input>
              </View>

              {/* Data da atividade */}
              <View className="w-full z-10">
                {Platform.OS === 'web' ? (
                  <View>
                    <Text className="text-blue-200 text-sm font-interMedium mb-2">Data</Text>
                    <input
                      type="date"
                      value={format(date, "yyyy-MM-dd")}
                      onChange={(e) => setDate(new Date(e.target.value))}
                      style={{
                        width: "100%",
                        padding: 16,
                        backgroundColor: colors.background,
                        color: colors.white,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: colors.border,
                        fontSize: 14,
                        fontFamily: "Inter_400Regular",
                      }}
                    />
                  </View>
                ) : (
                  <Pressable onPress={() => setShowDatePicker(true)}>
                    <Text className="text-blue-200 text-sm font-interMedium mb-2">Data</Text>
                    <View className="w-full p-4 bg-background rounded-lg border border-border flex-row items-center" pointerEvents="none">
                      <FontAwesome5 name="calendar-alt" size={20} color={colors.border} />
                      <Text className="text-white font-inter text-base ml-4">
                        {format(date, "dd/MM/yyyy", { locale: ptBR })}
                      </Text>
                    </View>
                  </Pressable>
                )}
              </View>

              {/* Horário da atividade */}
              <View className="w-full z-10">
                {Platform.OS === 'web' ? (
                  <View>
                    <Text className="text-blue-200 text-sm font-interMedium mb-2">Horário</Text>
                    <input
                      type="time"
                      value={format(time, "HH:mm")}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const newTime = new Date();
                        newTime.setHours(hours, minutes, 0, 0);
                        setTime(newTime);
                      }}
                      style={{
                        width: "100%",
                        padding: 16,
                        backgroundColor: colors.background,
                        color: colors.white,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: colors.border,
                        fontSize: 14,
                        fontFamily: "Inter_400Regular",
                      }}
                    />
                  </View>
                ) : (
                  <Pressable onPress={() => setShowTimePicker(true)}>
                    <Text className="text-blue-200 text-sm font-interMedium mb-2">Horário</Text>
                    <View className="w-full p-4 bg-background rounded-lg border border-border flex-row items-center" pointerEvents="none">
                      <FontAwesome5 name="clock" size={20} color={colors.border} />
                      <Text className="text-white font-inter text-base ml-4">
                        {format(time, "HH:mm", { locale: ptBR })}
                      </Text>
                    </View>
                  </Pressable>
                )}
              </View>

              {/* Local */}
              <View className="w-full">
                <Text className="text-blue-200 text-sm font-interMedium mb-2">Local</Text>
                <Input>
                  <FontAwesome5 name="map-marker-alt" size={20} color={colors.border} />
                  <Input.Field
                    placeholder="Local (Ex.: Auditório)"
                    onChangeText={setLocation}
                    value={location}
                  />
                </Input>
              </View>

              {/* Vagas */}
              <View className="w-full">
                <Text className="text-blue-200 text-sm font-interMedium mb-2">Número de Vagas</Text>
                <Input>
                  <FontAwesome5 name="users" size={20} color={colors.border} />
                  <Input.Field
                    placeholder="Vagas (Ex.: 50 ou 0 para ilimitadas)"
                    onChangeText={setVacancies}
                    value={vacancies}
                    keyboardType="numeric"
                  />
                </Input>
              </View>

              {/* Detalhes */}
              <View className="w-full">
                <Text className="text-blue-200 text-sm font-interMedium mb-2">Detalhes</Text>
                <Input>
                  <FontAwesome5 name="align-left" size={20} color={colors.border} />
                  <Input.Field
                    placeholder="Detalhes da atividade"
                    onChangeText={setDetails}
                    value={details}
                    multiline={true}
                    numberOfLines={4}
                    style={{ minHeight: 80, textAlignVertical: 'top' }}
                  />
                </Input>
              </View>

              {/* Categoria */}
              <View className="w-full">
                <Text className="text-blue-200 text-sm font-interMedium mb-2">Categoria</Text>
                {categoriesLoading ? (
                  <ActivityIndicator size="small" color={colors.blue[500]} />
                ) : categoriesError ? (
                  <Text className="text-danger text-sm">{categoriesError}</Text>
                ) : (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 50 }}>
                    <View className="flex-row flex-wrap gap-2">
                      {categories.map((category) => {
                        const isSelected = selectedCategoryId === category.id;
                        return (
                          <Pressable
                            key={category.id}
                            onPress={() => setSelectedCategoryId(category.id)}
                            className={`px-5 py-2.5 rounded-full ${
                              isSelected ? "bg-green" : "border border-neutral-200"
                            } justify-center items-center`}
                          >
                            <Text
                              className={`text-xs font-poppinsMedium ${
                                isSelected ? "text-blue-900" : "text-neutral-200"
                              }`}
                            >
                              {category.nome}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </ScrollView>
                )}
              </View>

              {isAlertOpen && <Text className={`text-sm font-inter ${alertColor}`}>{alertText}</Text>}

              {isLoading ? (
                <ActivityIndicator size="large" color={colors.blue[500]} className="mt-8" />
              ) : (
                <Button title="Criar Atividade" className="mt-8" onPress={handleCreateActivity} />
              )}
            </View>
          </ScrollView>
        </View>
      </View>

      {Platform.OS !== 'web' && (
        <>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={onChangeDate}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              onChange={onChangeTime}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}