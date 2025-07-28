import React, { useEffect, useState } from "react"
import { View, Text, StatusBar, Platform, ActivityIndicator, Alert, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import AppLayout from "../../components/app/appLayout"
import BackButton from "../../components/button/backButton"
import Button from "../../components/button/button"
import { Input } from "../../components/input/input"
import { createSponsor } from "../../services/sponsors"
import { getTags, Tag } from "../../services/tags";
import { colors } from "../../styles/colors"

export default function SponsorsAdminCreate() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  // Estados dos campos do formulário
  const [name, setName] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [description, setDescription] = useState("")
  const [starColor, setStarColor] = useState("")
  const [link, setLink] = useState("")

  // Estados relacionados a tags
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ao montar o componente, busca todas as tags
  useEffect(() => {
    (async () => {
      try {
        const tags = await getTags();
        setAllTags(tags);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar as tags.");
      } finally {
        setLoadingTags(false);
      }
    })();
  }, []);

  // Alterna entre marcar/desmarcar uma tag
  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev =>
      prev.includes(tagId)
        ? prev.filter(x => x !== tagId) // Remove se já estiver
        : [...prev, tagId] // Adiciona se não estiver
    );
  };


const handleCreate = async () => {
  setError(null)

  if (!name.trim() || !logoUrl.trim() || !description.trim()) {
    setError("Preencha pelo menos nome, logo e descrição.")
    return
  }

  setIsLoading(true)
  try {
    await createSponsor({
      name,
      logoUrl,
      description,
      starColor,
      link,
      tagIds: selectedTagIds,      
    })
    Alert.alert("Sucesso", "Patrocinador criado.")
    navigation.goBack()
  } catch (err) {
    console.error(err)
    setError("Não foi possível criar. Verifique os dados.")
  } finally {
    setIsLoading(false)
  }
}

  return (
    <SafeAreaView className="bg-blue-900 flex-1 items-center">
      <AppLayout>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={Platform.OS === "android"}
        />
        <BackButton />
        <View className="mb-8">
          <Text className="text-white text-2xl font-poppinsSemiBold mb-2">Criar novo patrocinador</Text>
          <Text className="text-gray-400 font-inter">
            Crie um novo patrocinador da Secomp!
          </Text>
        </View>

        {error && (
          <Text className="text-danger mb-4 text-sm font-inter">{error}</Text>
        )}

        <View className="flex-col flex-1 w-full gap-3 text-center justify-start">
          <Text className="text-blue-200 text-sm font-interMedium">Nome do patrocinador</Text>
          <Input>
            <Input.Field
              placeholder="Nome do patrocinador"
              value={name}
              onChangeText={setName}
            />
          </Input>

          <Text className="text-blue-200 text-sm font-interMedium">URL do logo</Text>
          <Input>
            <Input.Field
              placeholder="URL do logo"
              value={logoUrl}
              onChangeText={setLogoUrl}
              autoCapitalize="none"
            />
          </Input>

          <Text className="text-blue-200 text-sm font-interMedium">Descrição</Text>
          <Input>
            <Input.Field
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              style={{ height: 80, textAlignVertical: "top" }}
            />
          </Input>

          <Text className="text-blue-200 text-sm font-interMedium">Cor da estrela</Text>
          <Input>
            <Input.Field
              placeholder="Cor da estrela (ex: #FFD700)"
              value={starColor}
              onChangeText={setStarColor}
              autoCapitalize="none"
            />
          </Input>

          <Text className="text-blue-200 text-sm font-interMedium">Link para a página do patrocinador</Text>
          <Input>
            <Input.Field
              placeholder="Link (opcional)"
              value={link}
              onChangeText={setLink}
              autoCapitalize="none"
            />
          </Input>

          <Text className="text-blue-200 text-sm font-interMedium">Tags</Text>
          {loadingTags
            ? <ActivityIndicator color={colors.blue[200]} />
            : (
              <View className="flex-row flex-wrap gap-2 mb-6">
                {allTags.map(tag => {
                  const selected = selectedTagIds.includes(tag.id);
                  return (
                    <TouchableOpacity
                      key={tag.id}
                      onPress={() => toggleTag(tag.id)}
                      className={`px-3 py-1 rounded-full border ${selected ? "bg-blue-500 border-blue-500" : "border-gray-600"
                        }`}
                    >
                      <Text className={selected ? "text-white font-interMedium" : "text-gray-400 font-interMedium"}>
                        {tag.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )
          }

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={colors.blue[200]}
              className="mt-6"
            />
          ) : (
            <View className="mt-6">
              <Button title="Criar" className="mt-auto mb-12" onPress={handleCreate} />
            </View>
          )}
        </View>
      </AppLayout>
    </SafeAreaView>
  )
}
