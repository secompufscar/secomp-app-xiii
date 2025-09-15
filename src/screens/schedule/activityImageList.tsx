import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { getImagesByActivityId } from "../../services/activityImage";

type ActivityImage = {
  id: string;
  activityId: string;
  typeOfImage: string;
  imageUrl: string; // base64 ou url
};

type Props = {
  activityId: string;
};

export default function ActivityImageList({ activityId }: Props) {
  const [images, setImages] = useState<ActivityImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getImagesByActivityId(activityId);
        setImages(response);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchImages();
  }, [activityId]);

  return (
    <View className="mt-4 space-y-4">
      {images.map((img) => (
        <View
          key={img.id}
          className="flex-row bg-blue-600 mb-3 rounded-2xl p-3 shadow-sm"
        >
          <Image
            src={img.imageUrl}
            className="w-24 h-24 rounded-xl"
            resizeMode="cover"
          />
          <View className="flex-1 pl-3 justify-center">
            <Text className="font-inter text-sm text-white">
             {img.typeOfImage === "palestrante" ? "Nosso Palestrante Especial" : "Mais um pouco do nosso Conteúdo!"}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
