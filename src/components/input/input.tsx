import { colors } from "../../styles/colors";
import { ReactNode } from "react";
import { TextInput, View, TextInputProps } from "react-native";
import { Platform } from "react-native";

function Input({ children }: { children: ReactNode }) {
  return (
    <View
      className={`w-full ${Platform.OS === "web" ? "p-4" : "py-2 px-4"} flex-row items-center gap-3 border border-border bg-background rounded-lg mb-2 outline-none`}
    >
      {children}
    </View>
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 min-w-0 text-white text-sm font-inter align-middle items-center outline-none"
      placeholderTextColor={colors.border}
      multiline={false}
      numberOfLines={1}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };
