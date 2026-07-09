import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SectionHeaderProps {
  title: string;
  onVerTodo?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onVerTodo }) => {
  return (
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-[#1A1A1A] text-base font-bold tracking-wide uppercase">
        {title}
      </Text>
      {onVerTodo && (
        <TouchableOpacity onPress={onVerTodo}>
          <Text className="text-[#2D5A4E] text-sm font-medium">Ver todo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};