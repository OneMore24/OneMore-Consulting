import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';

interface WeeklySummaryCardProps {
  dias: number;
  promedio: string;
  entradas: number;
  onPress?: () => void;
}

export const WeeklySummaryCard: React.FC<WeeklySummaryCardProps> = ({
  dias,
  promedio,
  entradas,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} className="rounded-2xl overflow-hidden mb-4">
      <ImageBackground
        source={require('../../assets/images/oceano.jpg')}
        resizeMode="cover"
        className="w-full"
        style={{ width: '100%', aspectRatio: 16/6  }}
      >
        {/* Overlay oscuro */}
        <View
          className="flex-1 flex-row items-end p-4"
          style={{ backgroundColor: 'rgba(20,40,30,0.45)' }}
        >
          <View className="flex-1 items-center">
            <Text className="text-white text-xl font-bold">{dias} días</Text>
            <Text className="text-white/70 text-xs uppercase tracking-widest">Racha</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-white text-xl font-bold">{promedio}/5</Text>
            <Text className="text-white/70 text-xs uppercase tracking-widest">Promedio</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-white text-xl font-bold">{entradas}</Text>
            <Text className="text-white/70 text-xs uppercase tracking-widest">Entradas</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};