import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const PERIODOS = ['Semana', 'Mes', '3 Meses', 'Año'] as const;
export type Periodo = typeof PERIODOS[number];

interface PeriodSelectorProps {
  selected: Periodo;
  onSelect: (periodo: Periodo) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selected, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-x-2 mb-4">
        {PERIODOS.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => onSelect(p)}
            activeOpacity={0.8}
            className={`px-4 py-2 rounded-full ${selected === p ? 'bg-[#2D5A4E]' : 'bg-white'}`}
            style={selected !== p ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 } : {}}
          >
            <Text className={`text-sm font-medium ${selected === p ? 'text-white' : 'text-[#4A4A4A]'}`}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};