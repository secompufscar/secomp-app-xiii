import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../components/input/input";
import { useForm, Controller } from "react-hook-form";
import { getSponsorById, updateSponsor, linkTagToSponsor, unlinkTagFromSponsor } from "../../services/sponsors";
import { getTags } from "../../services/tags";;
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../styles/colors";
import AppLayout from "../../components/app/appLayout";
import BackButton from "../../components/button/backButton";
import Button from "../../components/button/button";
import ErrorOverlay from "../../components/overlay/errorOverlay";

type RouteParams = { SponsorsAdminUpdate: { id: string } }
type FormData = {
  name: string
  description: string
  logoUrl: string
  link: string
  starColor: string
}

interface Tag {
  id: string;
  name: string;
};

function parseStarColor(hexColor: string): string {
  switch (hexColor) {
    case "#4B8BF5":
      return "Diamante"
    case "#F3C83D":
      return "Ouro"
    case "#B8D1E0":
      return "Prata"
    default:
      return "Default"
  }
}

export default function SponsorsAdminUpdateScreen() {
  const route = useRoute<RouteProp<RouteParams, "SponsorsAdminUpdate">>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  const { id } = route.params;
  const [originalTagIds, setOriginalTagIds] = useState<string[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("Erro");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  // react-hook-form setup
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      logoUrl: "",
      starColor: "",
      link: "",
    },
  })

  // Carrega os dados do patrocinador e faz reset dos campos
  useEffect(() => {
    setErrorModalVisible(false);

    (async () => {
      try {
        const data: Sponsor = await getSponsorById(id)
        reset({
          name: data.name ?? "",
          description: data.description ?? "",
          logoUrl: data.logoUrl ?? "",
          link: data.link ?? "",
          starColor: parseStarColor(data.starColor ?? ""),
        })
        setOriginalTagIds(data.tags)
        setSelectedTagIds(data.tags)

        // Busca todas as tags
        const all = await getTags();
        setAllTags(all.map(tag => ({ id: tag.id ?? "", name: tag.name })));
      } catch {
        setErrorMessage("Não foi possível carregar os dados do patrocinador")
        setErrorModalVisible(true);
        navigation.goBack();
      } finally {
        setLoading(false)
      }
    })()
  }, [id, reset])

  function renderTagCheckbox(tag: Tag) {
    const isSelected = selectedTagIds.includes(tag.id)
    return (
      <Pressable
        key={tag.id}
        className={`px-4 py-2 rounded-full border ${isSelected ? "bg-blue-500/10 border-blue-500" : "border-gray-600"}`}
        onPress={() => {
          setSelectedTagIds(old =>
            isSelected
              ? old.filter(t => t !== tag.id)
              : [...old, tag.id]
          )
        }}
      >
        <Text className={isSelected ? "text-blue-500 font-interMedium" : "text-gray-400 font-interMedium"}>{tag.name}</Text>
      </Pressable>
    )
  }

  interface OnSubmitParams {
    name: string;
    description: string;
    logoUrl: string;
    link: string;
    starColor: string;
  }

  const onSubmit = async (formData: OnSubmitParams): Promise<void> => {
    const mappedStarColor = (() => {
      switch (formData.starColor.toLowerCase()) {
        case "diamante":
          return "#4B8BF5"
        case "ouro":
          return "#F3C83D"
        case "prata":
          return "#B8D1E0"
        default:
          return "#CECECE"
      }
    })()

    setSaving(true);
    
    try {
      setErrorModalVisible(false);

      await updateSponsor(id, {...formData, starColor: mappedStarColor});

      const added: string[] = selectedTagIds.filter(t => !originalTagIds.includes(t));
      const removed: string[] = originalTagIds.filter(t => !selectedTagIds.includes(t));

      await Promise.all(added.map((tagId: string) => linkTagToSponsor(id, tagId)));
      await Promise.all(removed.map((tagId: string) => unlinkTagFromSponsor(id, tagId)));

      navigation.goBack();
    } catch {
      setErrorMessage("Não foi possível salvar os dados do patrocinador")
      setErrorModalVisible(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-900">
        <ActivityIndicator size="large" color={colors.green} />
      </View>
    )
  }

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <BackButton />

        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Editar patrocinador</Text>
          <Text className="text-blue-200 font-inter">
            Atualize as informações de um patrocinador existente
          </Text>
        </View>

        <View className="flex-col flex-1 w-full gap-4 text-center justify-start">
          <View className="w-full">
            <Text className="text-gray-400 text-sm font-inter mb-2">Nome do patrocinador</Text>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }: { field: { value: string; onChange: (text: string) => void } }) => (
                <Input>
                  <Input.Field
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Nome do patrocinador"
                  />
                </Input>
              )}
            />
          </View>

          <View className="w-full">
            <Text className="text-gray-400 text-sm font-inter mb-2">Descrição</Text>
            <Controller
              control={control}
              name="description"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }: { field: { value: string; onChange: (text: string) => void } }) => (
                <Input>
                  <Input.Field
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Descrição"
                    style={{ color: '#fff' }}
                  />
                </Input>
              )}
            />
          </View>

          <View className="w-full">
            <Text className="text-gray-400 text-sm font-inter mb-2">URL do logo</Text>
            <Controller
              control={control}
              name="logoUrl"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }: { field: { value: string; onChange: (text: string) => void } }) => (
                <Input>
                  <Input.Field
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="https://..."
                    autoCapitalize="none"
                  />
                </Input>
              )}
            />
          </View>

          <View className="w-full">
            <Text className="text-gray-400 text-sm font-inter mb-2">Nível de patrocínio</Text>
            <Controller
              control={control}
              name="starColor"
              defaultValue=""
              rules={{ required: true }}
              render={({field: { value, onChange }}: {field: { value: string; onChange: (text: string) => void }}) => (
                <Input>
                  <Input.Field
                    value={value}
                    onChangeText={onChange}
                    placeholder="#FFD700"
                    autoCapitalize="none"
                  />
                </Input>
              )}
            />
          </View>

          <View className="w-full">
            <Text className="text-gray-400 text-sm font-inter mb-2">Link para a página do patrocinador</Text>
            <Controller
              control={control}
              name="link"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }: { field: { value: string; onChange: (text: string) => void } }) => (
                <Input>
                  <Input.Field
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="https://site.com"
                    autoCapitalize="none"
                  />
                </Input>
              )}
            />
          </View>

          <View className="w-full mb-4">
            <Text className="text-gray-400 text-sm font-inter mb-3">Tags</Text>
            <View className="flex-row flex-wrap gap-3 mb-2">
              {allTags.map(renderTagCheckbox)}
            </View>
          </View>

          <Button title="Salvar alterações" className="mt-auto mb-8" loading={saving} onPress={handleSubmit(onSubmit)}/>
        </View>
      </AppLayout>

      <ErrorOverlay
        visible={errorModalVisible}
        title="Erro inesperado"
        message={errorMessage}
        onConfirm={() => {setErrorModalVisible(false)}}
        confirmText="OK"
      />
    </SafeAreaView>
  )
}
