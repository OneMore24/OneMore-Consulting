import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Nota } from '../utils/diarioData';

interface NoteCardProps {
  nota: Nota;
  onPress?: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ nota, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white rounded-2xl p-4 mb-3"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-[#6B6B6B] text-xs font-semibold uppercase tracking-widest">
          {nota.fecha}, {nota.hora}
        </Text>
        <Text className="text-lg">{nota.emoji}</Text>
      </View>
      <Text className="text-[#1A1A1A] text-sm leading-5" numberOfLines={2}>
        {nota.texto}
      </Text>
    </TouchableOpacity>
  );
};