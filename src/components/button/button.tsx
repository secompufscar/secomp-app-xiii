import { PressableProps } from "@react-native-material/core";
import { Text, Pressable } from "react-native";
import clsx from "clsx";

type Props = PressableProps & {
  title: string;
};

export default function Button({ title, ...rest }: Props) {
    return (
        <Pressable
            {...rest}
        >
            {({ pressed }) => (
                <Text
                className={clsx(
                    "w-full p-4 items-center justify-center rounded-lg text-white text-sm font-inter font-semibold text-center",
                    "transition-transform duration-100",
                    pressed ? "bg-blue-500 opacity-80" : "bg-blue-500"
                )}
                >
                {title}
                </Text>
            )}
        </Pressable>
    );
}
