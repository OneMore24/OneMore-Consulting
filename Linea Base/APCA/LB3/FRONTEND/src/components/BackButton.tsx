import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  color = '#1A1A1A',
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={onPress ?? (() => router.back())}
      className="w-10 h-10 rounded-full bg-[#EFF3F0] items-center justify-center"
      activeOpacity={0.7}
    >
      <Ionicons name="arrow-back" size={20} color={color} />
    </TouchableOpacity>
  );
};