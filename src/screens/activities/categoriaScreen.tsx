import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/AuthContext";
import { getCategories } from "../../services/categories";


export default function Categorias() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { user: { user } }: any = useAuth();

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const getCategoriesData = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        getCategoriesData();
    }, []);

    // Função para obter o ícone com base no nome da categoria
    const getIconName = (categoryName: string): string => {
        switch (categoryName) {
            case 'Minicursos':
                return 'laptop-file';

            case 'Palestras':
                return 'chalkboard-user';

            case 'Competições':
                return 'trophy';

            case 'Workshops':
                return 'people-group';

            case 'SECOMP':
                return 'id-badge';

            default:
                return 'list';  // Icone padrão
        }
    };

    const renderCategory = ({ item }: { item: Category }) => (
        <TouchableOpacity onPress={() => { navigation.navigate(`${item.nome}`) }}>
            <View className='grow h-20 flex-row items-center space-x-1 rounded-lg bg-neutral-200/20 my-2 border border-neutral-200/40'>
                <View className='w-14 h-full ml-2 items-center justify-center'>
                    <FontAwesome6 name={getIconName(item.nome)} size={20} color="#445BE6" />
                </View>

                <View className='grow'>
                    <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-lg font-semibold text-neutral-700'>{item.nome}</Text>
                </View>

                <View className='w-14 h-full ml-2 items-center justify-center'>
                    <FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className='bg-white flex-1 px-8'>
            <View className={"flex-row justify-center items-center mt-10"}>
                <TouchableOpacity className='py-2 px-3' style={{ position: 'absolute', left: 0, top: 0 }} onPress={() => navigation.goBack()}>
                    <FontAwesome6 name="chevron-left" size={14} color="#000000" />
                </TouchableOpacity>

                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-xl text-black pt-0.5'>Categorias</Text>
            </View>

            <FlatList
                className='mt-5'
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 10 }}
            />

        </SafeAreaView>
    );
}