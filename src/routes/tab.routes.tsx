import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from "react-native"
import { Home, Schedule, UserProfile, Categorias } from '../screens';

import { colors } from "../styles/colors"
import { useAuth } from "../hooks/AuthContext";
import { bottomLeft } from '@shopify/react-native-skia';

const Tab = createBottomTabNavigator();

// Menu do app
export default function TabRoutes() {

    // Usa para diferenciar entre navegação de user e admin
    const { user } = useAuth();
    const role = user?.tipo;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#1C212C',
                    borderTopWidth: 1,
                    borderTopColor: '#212735',
                    height: 66,
                    maxWidth: 1000, 
                    width: '100%',  
                    position: 'absolute', 
                    bottom: 0, 
                    marginHorizontal: 'auto', 
                    paddingHorizontal: 12,
                    gap: 4,
                },
                tabBarShowLabel: false,
                title: "SECOMP UFSCar 2024"
            }}
        >

            <Tab.Screen
                name="HOME"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className="flex justify-center items-center gap-[7px]">
                            <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={20}
                            color={focused ? colors.white : '#828EAD'}
                            />
                            <Text className={`text-[10px] font-inter font-medium ${focused ? "text-white" : "text-[#828EAD]"}`}>Início</Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="CRONOGRAMA"
                component={Schedule}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className="flex justify-center items-center gap-[7px]">
                            <Ionicons
                                name={focused ? 'calendar-clear' : 'calendar-clear-outline'}
                                size={20}
                                color={focused ? colors.white : '#828ead'}
                            />
                            <Text className={`text-[10px] font-inter font-medium ${focused ? "text-white" : "text-[#828EAD]"}`}>Cronograma</Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="ATIVIDADES"
                component={Categorias}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className="flex justify-center items-center gap-[7px]">
                            <Ionicons
                                name={focused ? 'list' : 'list-outline'}
                                size={20}
                                color={focused ? colors.white : '#828ead'}
                            />
                            <Text className={`text-[10px] font-inter font-medium ${focused ? "text-white" : "text-[#828EAD]"}`}>Atividades</Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="PERFIL"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className="flex justify-center items-center gap-[7px]">
                            <Ionicons
                                name={focused ? 'person' : 'person-outline'}
                                size={20}
                                color={focused ? colors.white : '#828ead'}
                            />
                            <Text className={`text-[10px] font-inter font-medium ${focused ? "text-white" : "text-[#828EAD]"}`}>Perfil</Text>
                        </View>
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

