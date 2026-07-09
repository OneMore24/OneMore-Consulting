import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  return (
    <View className="flex-row gap-x-1.5 mb-3">
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className="flex-1 h-1 rounded-full"
          style={{ backgroundColor: i < current ? '#2D5A4E' : 'rgba(255,255,255,0.35)' }}
        />
      ))}
    </View>
  );
};