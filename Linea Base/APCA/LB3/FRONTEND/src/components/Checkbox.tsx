import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  labelComponent?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  label,
  labelComponent,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-start gap-x-3"
      activeOpacity={0.8}
    >
      <View
        className={`w-6 h-6 rounded-full items-center justify-center mt-0.5 ${
          checked ? 'bg-[#2D5A4E]' : 'bg-[#EFF3F0] border border-[#CCCCCC]'
        }`}
      >
        {checked && <Ionicons name="checkmark" size={14} color="#fff" />}
      </View>
      {labelComponent ? (
        labelComponent
      ) : (
        <Text className="flex-1 text-[#4A4A4A] text-sm leading-5">{label}</Text>
      )}
    </TouchableOpacity>
  );
};