import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'

import TabRoutes from './tab.routes'

import {
    Schedule,
    ScheduleDetails,
    EventGuide,
    Sponsors,
    MyEvents,
    Credential,
    Registration,
    RegistrationDetails,
    Categorias,
    Minicursos,
    Palestras,
    Workshops,
    Competições,
    QRCode,
    SECOMP
} from '../screens'

import { ScheduleItemProps } from '../entities/schedule-item';

const Stack = createNativeStackNavigator();

// Rotas para usuários logados
type StackNavigation = {
    App: undefined;
    Schedule: undefined;
    ScheduleDetails: { item: ScheduleItemProps };
    EventGuide: undefined;
    Sponsors: undefined;
    MyEvents: undefined;
    Credential: undefined;
    Registration: undefined;
    RegistrationDetails: { item: ScheduleItemProps };
    Categorias: undefined;
    Minicursos: undefined;
    Palestras: undefined;
    Workshops: undefined;
    Competições: undefined;
    QRCode: { id: string };
    SECOMP: undefined;
  };

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackRoutes() {
    return (
        <Stack.Navigator 
            screenOptions={{ headerShown: false, title: "SECOMP UFScar 2024" }}
        >
            <Stack.Screen name="App" component={TabRoutes} />
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="ScheduleDetails" component={ScheduleDetails} />
            <Stack.Screen name="EventGuide" component={EventGuide} />
            <Stack.Screen name="Sponsors" component={Sponsors} />
            <Stack.Screen name="MyEvents" component={MyEvents} />
            <Stack.Screen name="Credential" component={Credential} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="RegistrationDetails" component={RegistrationDetails} />
            <Stack.Screen name="Categorias" component={Categorias} />
            <Stack.Screen name="Minicursos" component={Minicursos} />
            <Stack.Screen name="Palestras" component={Palestras} />
            <Stack.Screen name="Workshops" component={Workshops} />
            <Stack.Screen name="Competições" component={Competições} />
            <Stack.Screen name="QRCode" component={QRCode} />
            <Stack.Screen name="SECOMP" component={SECOMP} />
        </Stack.Navigator>
    );
}
