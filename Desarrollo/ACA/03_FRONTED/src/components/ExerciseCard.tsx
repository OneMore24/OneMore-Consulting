import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ejercicio, DIFICULTAD_COLORS } from '../utils/actividadesData';

interface ExerciseCardProps {
  ejercicio: Ejercicio;
  onPress?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ ejercicio, onPress }) => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 100) / 2;
  const imageHeight = cardWidth * 0.65;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        width: cardWidth,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <Image
        source={ejercicio.imagen}
        style={{ width: cardWidth, height: imageHeight }}
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-[#1A1A1A] text-sm font-semibold mb-1" numberOfLines={1}>
          {ejercicio.titulo}
        </Text>
        <View className="flex-row items-center gap-x-2">
          <View className="flex-row items-center gap-x-1">
            <Ionicons name="time-outline" size={11} color="#6B6B6B" />
            <Text className="text-[#6B6B6B] text-xs">{ejercicio.duracion}</Text>
          </View>
          <View
            className="px-2 py-0.5 rounded-full"
            style={{ backgroundColor: DIFICULTAD_COLORS[ejercicio.dificultad] + '20' }}
          >
            <Text
              className="text-[10px] font-bold"
              style={{ color: DIFICULTAD_COLORS[ejercicio.dificultad] }}
            >
              {ejercicio.dificultad}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};