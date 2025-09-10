import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import TabRoutes from "./tab.routes";

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
  ParticipantsList,
  ActivityAdmin,
  ActivityAdminCreate,
  ActivityAdminUpdate,
  EventAdmin,
  EventAdminCreate,
  EventAdminUpdate,
  EventConfirmation,
  SponsorsAdmin,
  SponsorsAdminCreate,
  SponsorsAdminUpdate,
  TagsAdmin,
  Notifications,
  AdminNotificationScreen,
  AdminNotificationSend,
} from '../screens'

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
  ParticipantsList: { activityId: string; activityName: string; };
  ActivityAdmin: undefined;
  ActivityAdminCreate: undefined;
  ActivityAdminUpdate: { id: string };
  EventAdmin: undefined;
  EventAdminCreate: undefined;
  EventAdminUpdate: { id: string };
  EventConfirmation: { event: Events};
  SponsorsAdmin: undefined;
  SponsorsAdminCreate: undefined;
  SponsorsAdminUpdate: { id: string };
  TagsAdmin: undefined;
  Notifications: undefined;
  AdminNotificationScreen: undefined;
  AdminNotificationSend: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackRoutes() {
  return (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
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
      <Stack.Screen name="ParticipantsList" component={ParticipantsList} />
      <Stack.Screen name="ActivityAdmin" component={ActivityAdmin} />
      <Stack.Screen name="ActivityAdminCreate" component={ActivityAdminCreate} />
      <Stack.Screen name="ActivityAdminUpdate" component={ActivityAdminUpdate} />
      <Stack.Screen name="EventAdmin" component={EventAdmin} />
      <Stack.Screen name="EventAdminCreate" component={EventAdminCreate} />
      <Stack.Screen name="EventAdminUpdate" component={EventAdminUpdate} />
      <Stack.Screen name="EventConfirmation" component={EventConfirmation} />
      <Stack.Screen name="SponsorsAdmin" component={SponsorsAdmin} />
      <Stack.Screen name="SponsorsAdminCreate" component={SponsorsAdminCreate} />
      <Stack.Screen name="SponsorsAdminUpdate" component={SponsorsAdminUpdate} />
      <Stack.Screen name="TagsAdmin" component={TagsAdmin} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="AdminNotificationScreen" component={AdminNotificationScreen} />
      <Stack.Screen name="AdminNotificationSend" component={AdminNotificationSend} />
    </Stack.Navigator>
  );
}
