import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SuggestionItemProps {
  title: string;
  duration: string;
  image: ImageSourcePropType;
  subtitle?: string;
  onPress?: () => void;
}

export const SuggestionItem: React.FC<SuggestionItemProps> = ({
  title,
  duration,
  image,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center bg-white rounded-2xl p-3 mb-3"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
    >
      <Image
        source={image}
        style={{ width: '50%', height:'80%', aspectRatio: 1, borderRadius: 12 }}
        resizeMode="cover"
      />
      <View className="flex-1 ml-3">
        <Text className="text-[#1A1A1A] text-sm font-semibold mb-0.5">{title}</Text>
        {subtitle && (
          <Text className="text-[#6B6B6B] text-xs mb-1">{subtitle}</Text>
        )}
        <View className="flex-row items-center gap-x-1">
          <Ionicons name="time-outline" size={12} color="#6B6B6B" />
          <Text className="text-[#6B6B6B] text-xs">{duration}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#CCCCCC" />
    </TouchableOpacity>
  );
};