// screens/sponsors/SponsorsAdminUpdateScreen.tsx
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AppLayout from "../../components/app/appLayout"
import BackButton from "../../components/button/backButton"
import Button from "../../components/button/button"
import { Input } from "../../components/input/input"
import { useForm, Controller } from "react-hook-form"
import { getSponsorById, updateSponsor, linkTagToSponsor, unlinkTagFromSponsor, Sponsor, UpdateSponsorData } from "../../services/sponsors";
import { getTags, Tag } from "../../services/tags";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { colors } from "../../styles/colors"

type RouteParams = { SponsorsAdminUpdate: { id: string } }
type FormData = {
  name: string
  description: string
  logoUrl: string
  link: string
  starColor: string
}

export default function SponsorsAdminUpdateScreen() {
  const route = useRoute<RouteProp<RouteParams, "SponsorsAdminUpdate">>()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  
  const { id } = route.params
  const [originalTagIds, setOriginalTagIds] = useState<string[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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
    ; (async () => {
      try {
        const data: Sponsor = await getSponsorById(id)
        reset({
          name: data.name ?? "",
          description: data.description ?? "",
          logoUrl: data.logoUrl ?? "",
          link: data.link ?? "",
          starColor: data.starColor ?? "",
        })
        setOriginalTagIds(data.tags)
        setSelectedTagIds(data.tags)

        // busca todas as tags
        const all = await getTags();
        setAllTags(all);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar patrocinador.")
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
        className={`px-3 py-1 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-background'}`}
        onPress={() => {
          setSelectedTagIds(old =>
            isSelected
              ? old.filter(t => t !== tag.id)
              : [...old, tag.id]
          )
        }}
      >
        <Text className={isSelected ? 'text-white' : 'text-gray-400'}>{tag.name}</Text>
      </Pressable>
    )
  }

  interface SponsorUpdateData {
    name: string;
    description: string;
    logoUrl: string;
    link: string;
    starColor: string;
  }

  interface OnSubmitParams {
    name: string;
    description: string;
    logoUrl: string;
    link: string;
    starColor: string;
  }

  const onSubmit = async (formData: OnSubmitParams): Promise<void> => {
    setSaving(true);
    try {
      // 1) atualiza dados básicos
      await updateSponsor(id, formData as UpdateSponsorData);

      // 2) sincroniza tags
      const added: string[] = selectedTagIds.filter(t => !originalTagIds.includes(t));
      const removed: string[] = originalTagIds.filter(t => !selectedTagIds.includes(t));

      await Promise.all(added.map((tagId: string) => linkTagToSponsor(id, tagId)));
      await Promise.all(removed.map((tagId: string) => unlinkTagFromSponsor(id, tagId)));

      Alert.alert("Sucesso", "Dados e tags atualizados.");
      navigation.goBack();
    } catch {
      Alert.alert("Erro", "Não foi possível salvar.");
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
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">
            Editar Patrocinador
          </Text>
          <Text className="text-gray-400 font-inter">
            Atualize as informações abaixo
          </Text>
        </View>

        <View className="flex-col flex-1 w-full gap-3 text-center justify-start">
          {/** Nome */}
          <Text className="text-blue-200 text-sm font-interMedium mb-1">
            Nome
          </Text>
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

          {/** Descrição */}
          <Text className="text-blue-200 text-sm font-interMedium mb-1 mt-4">
            Descrição
          </Text>
          <Controller
            control={control}
            name="description"
            defaultValue=""
            render={({ field }: { field: { value: string; onChange: (text: string) => void } }) => (
              <Input>
                <Input.Field
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Descrição"
                  multiline
                  numberOfLines={3}
                  style={{ color: '#fff' }}
                />
              </Input>
            )}
          />

          {/** Logo URL */}
          <Text className="text-blue-200 text-sm font-interMedium mb-1 mt-4">
            Logo URL
          </Text>
          <Controller
            control={control}
            name="logoUrl"
            defaultValue=""
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

          {/** Link */}
          <Text className="text-blue-200 text-sm font-interMedium mb-1 mt-4">
            Link
          </Text>
          <Controller
            control={control}
            name="link"
            defaultValue=""
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

          {/** Cor da Estrela */}
          <Text className="text-blue-200 text-sm font-interMedium mb-1 mt-4">
            Cor da estrela
          </Text>
          <Controller
            control={control}
            name="starColor"
            defaultValue=""
            render={({
              field: { value, onChange },
            }: {
              field: { value: string; onChange: (text: string) => void }
            }) => (
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

          {/* === Seção de seleção de tags === */}
          <Text className="text-blue-200 text-sm font-interMedium mb-2 mt-4">
            Tags
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {allTags.map(renderTagCheckbox)}
          </View>

          {saving ? (
            <ActivityIndicator
              size="large"
              color={colors.blue[500]}
              className="mt-6"
            />
          ) : (
            <Button
              title="Salvar alterações"
              className="mt-6 mb-12"
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </View>
      </AppLayout>
    </SafeAreaView>
  )
}
