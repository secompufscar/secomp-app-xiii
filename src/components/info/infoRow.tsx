import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { colors } from '../../styles/colors';


interface InfoRowProps {
  icon: IconDefinition;
  mainText: string;
  subText?: string;
  children?: ReactNode; // "Ver no mapa" 
}


export default function InfoRow({ icon, mainText, subText, children }: InfoRowProps) {
  return (
    <View className="flex-row items-center w-full">
      {/* icone */}
      <View className="w-12 h-12 bg-iconbg rounded-lg items-center justify-center mr-4">
        <FontAwesomeIcon icon={icon} size={22} color={colors.blue[500]} />
      </View>

      {/* texto */}
      <View className="flex-1">
        <Text className="text-default text-base font-inter">{mainText}</Text>
        {subText && (
          <Text className="text-gray-400 text-base font-inter mt-1">{subText}</Text>
        )}
      </View>

      {/* ver todos */}
      {children && (
        <View className="ml-auto">
          {children}
        </View>
      )}
    </View>
  );
}
