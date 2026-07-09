import React from 'react';
import { View, Text } from 'react-native';

interface DayBarProps {
  day: string;
  value: number;
  maxValue?: number;
}

export const DayBar: React.FC<DayBarProps> = ({ day, value, maxValue = 5 }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <View className="flex-row items-center mb-2.5">
      <Text className="text-[#4A4A4A] text-sm w-5 mr-3">{day}</Text>
      <View className="flex-1 h-3 bg-[#E8EDE9] rounded-full overflow-hidden">
        <View
          className="h-full rounded-full bg-[#2D5A4E]"
          style={{ width: `${percentage}%` }}
        />
      </View>
      <Text className="text-[#4A4A4A] text-sm ml-3 w-6 text-right">{value}</Text>
    </View>
  );
};