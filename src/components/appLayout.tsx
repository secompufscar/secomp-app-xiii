// components/AppLayout.tsx
import { ScrollView, View, StatusBar, Platform } from "react-native";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

// Wrapper do ScrollView para as páginas
export default function AppLayout({ children }: AppLayoutProps) {
    return (
      <View className="flex-1 w-full">
        <StatusBar
          barStyle="light-content"
          backgroundColor={Platform.OS === 'android' ? '#0f172a' : 'transparent'}
          translucent={Platform.OS === 'android'}
        />
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 w-full"
        >
          <View className="w-full px-6 max-w-[1000px] mx-auto min-h-screen">
            {children}
          </View>
        </ScrollView>
      </View>
    );
}
