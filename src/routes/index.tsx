import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/AuthContext";
import StackRoutes from "./stack.routes";
import AuthRoutes from "./auth.routes";

const linking = {
  prefixes: ["https://secompapp.com", "secompapp://"],
  config: {
    screens: {
      SetNewPassword: "SetNewPassword",
    },
  },
};

export default function Routes() {
  const { user }: any = useAuth();

  return (
    <NavigationContainer linking={linking}>
      {user ? <StackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
