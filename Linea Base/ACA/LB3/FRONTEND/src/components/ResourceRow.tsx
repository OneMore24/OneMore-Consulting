import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recurso, TIPO_COLORS } from '../utils/recursosData';

interface ResourceRowProps {
  recurso: Recurso;
  onPress?: () => void;
  onToggleFavorito?: () => void;
  isLast?: boolean;
}

export const ResourceRow: React.FC<ResourceRowProps> = ({
  recurso, onPress, onToggleFavorito, isLast = false,
}) => {
  const isVideo = recurso.tipo === 'VIDEO';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className={`flex-row items-center px-4 py-3 ${!isLast ? 'border-b border-[#F0F0F0]' : ''}`}
    >
      {/* Thumbnail */}
      <View className="rounded-xl overflow-hidden mr-3" style={{ width: 64, height: 64 }}>
        <Image source={recurso.imagen} style={{ width: 64, height: 64 }} resizeMode="cover" />
        {isVideo && (
          <View className="absolute inset-0 items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
            <View className="w-7 h-7 rounded-full bg-white/30 items-center justify-center">
              <Ionicons name="play" size={14} color="white" />
            </View>
          </View>
        )}
      </View>

      {/* Info */}
      <View className="flex-1">
        <Text className="text-[10px] font-bold tracking-widest mb-0.5"
          style={{ color: TIPO_COLORS[recurso.tipo] }}>
          {recurso.tipo}
        </Text>
        <Text className="text-[#1A1A1A] text-sm font-semibold leading-5 mb-1" numberOfLines={2}>
          {recurso.titulo}
        </Text>
        <View className="flex-row items-center gap-x-1">
          <Ionicons name={isVideo ? 'time-outline' : 'book-outline'} size={11} color="#ABABAB" />
          <Text className="text-[#ABABAB] text-xs">{recurso.duracion}</Text>
        </View>
      </View>

      {/* Favorito */}
      <TouchableOpacity onPress={onToggleFavorito} className="px-2 py-1" activeOpacity={0.7}>
        <Ionicons
          name={recurso.favorito ? 'heart' : 'heart-outline'}
          size={18}
          color={recurso.favorito ? '#E53E3E' : '#CCCCCC'}
        />
      </TouchableOpacity>

      <Ionicons name="chevron-forward" size={16} color="#CCCCCC" />
    </TouchableOpacity>
  );
};