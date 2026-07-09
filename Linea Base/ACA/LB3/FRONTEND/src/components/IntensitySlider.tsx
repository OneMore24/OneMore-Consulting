import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

const LABELS = ['', 'Leve', 'Moderado', 'Alto', 'Severo', 'Muy severo'];

export const IntensitySlider: React.FC<IntensitySliderProps> = ({
  value,
  onChange,
  max = 5,
}) => {
  return (
    <View>
      <View className="flex-row gap-x-1.5 mb-1">
        {Array.from({ length: max }).map((_, i) => {
          const nivel = i + 1;
          return (
            <TouchableOpacity
              key={nivel}
              onPress={() => onChange(nivel)}
              activeOpacity={0.8}
              className="flex-1 h-8 rounded-lg items-center justify-center"
              style={{
                backgroundColor: nivel <= value
                  ? nivel <= 2 ? '#2D5A4E'
                    : nivel <= 4 ? '#F6AD55'
                      : '#E53E3E'
                  : '#E8EDE9',
              }}
            >
              <Text className="text-xs font-bold text-white" style={{ opacity: nivel <= value ? 1 : 0 }}>
                {nivel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {value > 0 && (
        <Text className="text-[#6B6B6B] text-xs text-right">{LABELS[value]}</Text>
      )}
    </View>
  );
};