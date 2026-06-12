import React from 'react';
import { Text, View } from 'react-native';

interface TagChipProps {
  label: string;
  color?: string;
  bgColor?: string;
}

export const TagChip: React.FC<TagChipProps> = ({
  label,
  color = '#2D5A4E',
  bgColor = '#EFF3F0',
}) => {
  return (
    <View
      className="px-3 py-1 rounded-full"
      style={{ backgroundColor: bgColor }}
    >
      <Text
        className="text-[10px] font-bold tracking-wider"
        style={{ color }}
      >
        {label}
      </Text>
    </View>
  );
};