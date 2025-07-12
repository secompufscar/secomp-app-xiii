import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'

import TabRoutes from './tab.routes'

import {
    Schedule,
    EventGuide,
    Sponsors,
    MyEvents,
    Credential,
    Activities,
    QRCode,
    EditProfile,
    ActivityDetails,
    ParticipantsList
} from '../screens'

import { ScheduleItemProps } from '../entities/schedule-item';

const Stack = createNativeStackNavigator();

// Rotas para usuários logados
type StackNavigation = {
    App: undefined;
    Schedule: undefined;
    EventGuide: undefined;
    Sponsors: undefined;
    MyEvents: undefined;
    Credential: undefined;
    Activities: undefined;
    QRCode: { id: string };
    EditProfile: undefined;
    ActivityDetails: { item: Activity };
    ParticipantsList: {
        activityId: string;
        activityName: string;
    }
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, title: "SECOMP UFScar 2024" }}
        >
            <Stack.Screen name="App" component={TabRoutes} />
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="EventGuide" component={EventGuide} />
            <Stack.Screen name="Sponsors" component={Sponsors} />
            <Stack.Screen name="MyEvents" component={MyEvents} />
            <Stack.Screen name="Credential" component={Credential} />
            <Stack.Screen name="Activities" component={Activities} />
            <Stack.Screen name="QRCode" component={QRCode} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ActivityDetails" component={ActivityDetails} />
            <Stack.Screen name="ParticipantsList" component={ParticipantsList} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
