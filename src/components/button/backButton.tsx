import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton(){
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return(
        <Pressable
          className="w-[32px] h-[32px] flex items-center justify-center mt-16 mb-10 p-2 bg-[#29303F] rounded-[4px]"
          onPress={() => navigation.goBack()}
        >
            <FontAwesomeIcon className="text-blue-200 text-[16px]" icon={faChevronLeft} />
        </Pressable>
    );
}