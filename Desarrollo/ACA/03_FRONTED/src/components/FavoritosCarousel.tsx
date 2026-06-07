import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recurso } from '../utils/recursosData';

interface FavoritosCarouselProps {
  recursos: Recurso[];
  onPress?: (recurso: Recurso) => void;
}

export const FavoritosCarousel: React.FC<FavoritosCarouselProps> = ({ recursos, onPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
      className="mb-4"
    >
      {recursos.map((recurso) => (
        <TouchableOpacity
          key={recurso.id}
          onPress={() => onPress?.(recurso)}
          activeOpacity={0.85}
          className="rounded-2xl overflow-hidden"
          style={{ width: 130, height: 90 }}
        >
          <Image
            source={recurso.imagen}
            style={{ width: 130, height: 90 }}
            resizeMode="cover"
          />
          {/* Overlay */}
          <View
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
          />
          {/* Corazón */}
          <View className="absolute top-2 right-2">
            <Ionicons name="heart" size={16} color="white" />
          </View>
          {/* Play si es video */}
          {recurso.tipo === 'VIDEO' && (
            <View className="absolute inset-0 items-center justify-center">
              <View className="w-8 h-8 rounded-full bg-white/30 items-center justify-center">
                <Ionicons name="play" size={14} color="white" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};