import React from 'react';
import { View } from 'react-native';

interface MoodBarsProps {
  nivel: number;
  max?: number;
  color?: string;
}

export const MoodBars: React.FC<MoodBarsProps> = ({
  nivel,
  max = 5,
  color = '#2D5A4E',
}) => {
  return (
    <View className="flex-row gap-x-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <View
          key={i}
          className="w-2 rounded-sm"
          style={{
            height: 20,
            backgroundColor: i < nivel ? color : '#E0E0E0',
          }}
        />
      ))}
    </View>
  );
};