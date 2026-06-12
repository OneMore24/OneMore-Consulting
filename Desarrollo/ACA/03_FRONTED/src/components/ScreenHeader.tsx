import React from 'react';
import { View, Text } from 'react-native';
import { BackButton } from './BackButton';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack }) => {
  return (
    <View className="flex-row items-center gap-x-3 mb-6">
      <BackButton onPress={onBack} />
      <Text className="text-[#1A1A1A] text-xl font-bold">{title}</Text>
    </View>
  );
};