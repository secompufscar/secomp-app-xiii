import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Animated } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { ScheduleItemProps } from '../../entities/schedule-item';
import { getActivityId, getUserSubscribedActivities } from '../../services/activities';
import { useAuth } from '../../hooks/AuthContext';

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2,);
    return `${day}`;
};

export default function MyEvents() {
    const navigation = useNavigation();
    //const currentDayString = formatDate(new Date());
    const currentDayString = "13"
    const [search, setSearch] = useState("")
    const [searching, setSearching] = useState(false)
    //const [filter, setFilter] = useState("")
    const [items, setItems] = useState<Activity[]>([])
    const [future, setFuture] = useState(true)
    const {user:{user}}: any = useAuth()


    const anim = useRef(new Animated.Value(0)).current;

    const open = () => {
        Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    const close = () => {
        Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        const fetchItems = async () => {

            const userActivities: UserAtActivity[] = await getUserSubscribedActivities(user.id);
            
            // Pega as atividades
            const activityIds = userActivities.map(ua => ua.activityId);
            const activityPromises = activityIds.map(id => getActivityId(id)); // retorna Promise<Activity>[]
            const activities: Activity[] = await Promise.all(activityPromises);

            const validFetchedItemsSubscribed = activities || [];
            console.log(validFetchedItemsSubscribed);

            //Filtragem de eventos futuros ou passados
            if (future) {
                var filteredItems = validFetchedItemsSubscribed.filter(item => item.data.substring(0,10) > currentDayString)
            } else {
                var filteredItems = validFetchedItemsSubscribed.filter(item => item.data.substring(0,10) < currentDayString)
            }

            //Filtragem de eventos por pesquisa
            if (searching) {
                filteredItems = filteredItems.filter(item => item.nome.includes(search))
            }

            //Filtragem de eventos por filtro, ainda não implementado
            // if (filter) {
            // }

            setItems(validFetchedItemsSubscribed);
        };

        fetchItems();
    }, [future, search]);

    function handleSearch(str: string) {
        setSearch(str)
    }

    function handleSearching() {
        if (searching) {
            close()
        } else {
            open()
        }
        setSearching(!searching)
    }

    // function handleFilter(str: string) {
    //     setFilter(str)
    // }

    return (
        <View className='bg-white flex-1'>
            <View className={`flex-row justify-start items-center pt-12 ${(!searching) && 'pb-10'} px-4 gap-4`}>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={24} color="#445BE6" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-blue-old'>Eventos inscritos</Text>
                <TouchableOpacity className='pl-10'>
                    <AntDesign name="search1" size={24} color="#445BE6" onPress={handleSearching} />
                </TouchableOpacity>
            </View>
            {searching && (
                <Animated.View className='p-4' style={{
                    transform: [{
                        translateY: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-50, 0]
                        })
                    }]
                }}>
                    <TextInput
                        className="bg-gray-200 rounded-md border p-2"
                        placeholder="Buscar eventos"
                        onChangeText={handleSearch}
                        value={search}
                    />
                </Animated.View>
            )}
            <View className="flex-row justify-around mx-12">
                <TouchableOpacity onPress={() => setFuture(true)}>
                    <Text className={`text-xl font-bold text-blue-old ${(future) && "underline"}`}>Futuros</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFuture(false)}>
                    <Text className={`text-xl font-bold text-blue-old ${(!future) && "underline"}`}>Completados</Text>
                </TouchableOpacity>
            </View>

            <View className="justify-end items-end px-8 py-2 bg-white">
                <TouchableOpacity>
                    <AntDesign name="filter" size={24} onPress={() => handleSearch("Teste")} />
                </TouchableOpacity>
            </View>
            {(future) ?
                <ScrollView className="py-5 px-5 bg-white">
                    <View className='flex-row flex-wrap justify-around'>
                        {items.map((item, index) => (
                            <View className='pb-4 bg-white' key={index}>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                : <ScrollView className="py-5 px-5 bg-white">
                    <View className='flex-row flex-wrap justify-around'>
                        {items.map((item, index) => (
                            <View className='pb-4 bg-white' key={index}>
                            </View>
                        ))}
                    </View>
                </ScrollView>}
        </View>
    );
}