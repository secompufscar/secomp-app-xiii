import { useState } from "react";
import { View, Text, Pressable, StatusBar, Platform, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createEvent, getCurrentEvent, updateEvent } from "../../services/events";
import { FontAwesome5 } from "@expo/vector-icons";
import { addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EventAdminCreate() {
  const [year, setYear] = useState<string>("");
  const [startDate, setStartDate] = useState(() => new Date());
  const [endDate, setEndDate] = useState(() => {
    const initialDate = new Date();
    return addDays(initialDate, 4);
  });
  const [isCurrent, setIsCurrent] = useState<boolean>(true);

  // Estados para controlar a visibilidade dos seletores de data no mobile
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState("text-gray-400");

  const [isLoading, setIsLoading] = useState(false);

  // Função para lidar com a mudança da data de início
  const onChangeStartDateMobile = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      
      if (selectedDate > endDate) {
        setEndDate(selectedDate);
      }
    }
  };
  
  // Função para lidar com a mudança da data de fim
  const onChangeEndDateMobile = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  // Função para criação de evento
  const handleCreateEvent = async () => {
    setIsAlertOpen(false);
    
    // Verifica se o ano foi preenchido
    if (!year.trim()) {
      setAlertText("Por favor, preencha o ano da edição");
      setAlertColor("text-warning");
      setIsAlertOpen(true);      
      return;
    }

    // Verifica se o ano é válido
    const currentYear = new Date().getFullYear();
    const parsedYear = parseInt(year, 10);

    if (isNaN(parsedYear) || parsedYear < currentYear || parsedYear >= 2100) {
      setAlertText(`O ano deve ser um número válido, entre ${currentYear} e 2100.`);
      setAlertColor("text-warning");
      setIsAlertOpen(true);
      return;
    }

    setIsLoading(true);

    try { 
      // 1 - Encontrar o evento atualmente ativo
      const activeEvent = await getCurrentEvent();

      // 2 - Se um evento ativo for encontrado, desativá-lo
      if (activeEvent && activeEvent.id) {
        const updatePayload: UpdateEvent = {
          ...activeEvent, 
          isCurrent: false,
        };

        await updateEvent(activeEvent.id, updatePayload);
      }
      
      // 3 - Preparar e criar o novo evento
      const eventData: Events = {
        year: parsedYear,
        startDate: startDate.toISOString(), 
        endDate: endDate.toISOString(),
        isCurrent: isCurrent,
      };

      await createEvent(eventData);

      setAlertText(`Sucesso! O evento ${year} foi criado.`);
      setAlertColor("text-success");
      setIsAlertOpen(true); 
    } catch (error) {
      setAlertText(`Erro ao criar evento, tente novamente`);
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
          <BackButton/>

          {/* Cabeçalho */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Criar novo evento</Text>
            <Text className="text-gray-400 font-inter">
              Inicie uma nova edição da Secomp!
            </Text>
          </View>

          <View className="w-full rounded-lg border-[1.5px] border-warning bg-warning/10 p-6 mb-8">
            <Text className="text-sm text-warning font-inter leading-relaxed">
              Ao criar um novo evento, este se torna o ativo, desativando automaticamente o anterior.
            </Text>
          </View>

          <View className="flex-col flex-1 w-full gap-4 text-center justify-start">
            {/* Ano da edição */}
            <View className="w-full">
              <Text className="text-blue-200 text-sm font-interMedium mb-2">Ano da edição</Text>
              <Input>
                <FontAwesome5 name="calendar-week" size={20} color={colors.border} />

                <Input.Field
                  placeholder="Ano (Ex.: 2025)"
                  onChangeText={setYear}
                  value={year}
                />
              </Input>
            </View>

            {/* Data de início */}
            <View className="w-full z-10 mb-2">
              {Platform.OS === 'web' ? (
                <View>
                  <Text className="text-blue-200 text-sm font-interMedium mb-2">Data de início</Text>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setStartDate(date);
                        console.log(startDate)
                        if (date > endDate) {
                            setEndDate(date);
                        }
                      }
                    }}
                    locale={ptBR} 
                    dateFormat="dd/MM/yyyy"
                    popperClassName="z-50"
                    customInput={
                      <View className={`w-full ${Platform.OS === "web" ? "p-4" : "py-2 px-4"} bg-background rounded-lg border border-border flex-row items-center`}>
                        <FontAwesome5 name="calendar-day" size={20} color={colors.border} />
                        <Text className="text-white font-inter text-base ml-4">
                          {startDate.toLocaleDateString('pt-BR')}
                        </Text>
                      </View>
                    }
                  />
                </View>
              ) : (
                <Pressable onPress={() => setShowStartDatePicker(true)}>
                  <Text className="text-blue-200 text-sm font-interMedium mb-2">Data de início</Text>
                  <View className="w-full p-4 bg-background rounded-lg border border-border flex-row items-center" pointerEvents="none">
                    <FontAwesome5 name="calendar-day" size={20} color={colors.border} />
                    <Text className="text-white font-inter text-base ml-4">
                      {`${startDate.toLocaleDateString('pt-BR')}`}
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>

            {/* Data de fim */}
            <View className="w-full">
              {Platform.OS === 'web' ? (
                <View>
                  <Text className="text-blue-200 text-sm font-interMedium mb-2">Data de fim</Text>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setEndDate(date);
                        if (date > endDate) {
                            setEndDate(date);
                        }
                      }
                    }}
                    locale={ptBR} 
                    dateFormat="dd/MM/yyyy"
                    popperClassName="z-50"
                    customInput={
                      <View className={`w-full ${Platform.OS === "web" ? "p-4" : "py-2 px-4"} bg-background rounded-lg border border-border flex-row items-center`}>
                        <FontAwesome5 name="calendar-times" size={20} color={colors.border} />
                        <Text className="text-white font-inter text-base ml-4">
                          {endDate.toLocaleDateString('pt-BR')}
                        </Text>
                      </View>
                    }
                  />
                </View>
              ) : (
                <Pressable onPress={() => setShowEndDatePicker(true)}>
                  <Text className="text-blue-200 text-sm font-interMedium mb-2">Data de fim</Text>
                  <View className="w-full p-4 bg-background rounded-lg border border-border flex-row items-center px-4" pointerEvents="none">
                    <FontAwesome5 name="calendar-times" size={20} color={colors.border} />
                    <Text className="text-white font-inter text-base ml-4">
                      {`${endDate.toLocaleDateString('pt-BR')}`}
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>

            {isAlertOpen && <Text className={`text-sm font-inter ${alertColor}`}>{alertText}</Text>}
              
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.blue[500]} className="mt-8" />
            ) : (
              <Button title="Criar" className="mt-auto mb-12" onPress={handleCreateEvent}/>
            )}
          </View>
        </View>
      </View>

      {Platform.OS !== 'web' && (
        <>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              onChange={onChangeStartDateMobile}
            />
          )}

          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              onChange={onChangeEndDateMobile}
              minimumDate={startDate}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
