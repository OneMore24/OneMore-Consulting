import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MOODS = [
  { emoji: '😢', value: 1 },
  { emoji: '😕', value: 2 },
  { emoji: '😐', value: 3 },
  { emoji: '🙂', value: 4 },
  { emoji: '😊', value: 5 },
];

interface MoodSelectorProps {
  onSelect?: (value: number) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelected(value);
    onSelect?.(value);
  };

  return (
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ backgroundColor: '#3D6B5E' }}
    >
      <Text className="text-white/80 text-sm mb-3 font-medium">
        ¿CÓMO TE SIENTES HOY?
      </Text>
      <View className="flex-row justify-between">
        {MOODS.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            onPress={() => handleSelect(mood.value)}
            activeOpacity={0.8}
            className={`w-12 h-12 rounded-full items-center justify-center ${
              selected === mood.value ? 'bg-white/30' : 'bg-white/10'
            }`}
          >
            <Text className="text-2xl">{mood.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};