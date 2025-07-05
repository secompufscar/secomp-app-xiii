import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { colors } from '../../styles/colors';

interface InfoRowProps {
  icon: IconDefinition;
  mainText: string;
  subText?: string;
  children?: ReactNode;
}

export default function InfoRow({ icon, mainText, subText, children }: InfoRowProps) {
  return (
    <View className="flex-row items-center w-full mb-4">
      {/* icone */}
      <View className="w-10 h-10 bg-background rounded items-center justify-center mr-4">
        <FontAwesomeIcon icon={icon} size={18} color={colors.blue[500]} />
      </View>

      {/* texto */}
      <View className="flex-1">
        <Text className="text-gray-400 text-base font-inter">{mainText}</Text>
        {subText && (
          <Text className="text-white text-base font-interMedium">{subText}</Text>
        )}
      </View>

      {children && (
        <View className="ml-auto">
          {children}
        </View>
      )}
    </View>
  );
}
