import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingsRowProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  danger?: boolean;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  showChevron?: boolean;
  isLast?: boolean;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({
  icon,
  iconColor = '#2D5A4E',
  label,
  subtitle,
  onPress,
  danger = false,
  hasToggle = false,
  toggleValue = false,
  onToggleChange,
  showChevron = true,
  isLast = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={hasToggle ? 1 : 0.7}
      className={`flex-row items-center px-4 py-4 ${!isLast ? 'border-b border-[#F0F0F0]' : ''}`}
    >
      {icon && (
        <View className="w-8 h-8 rounded-full bg-[#F2F5F2] items-center justify-center mr-3">
          <Ionicons name={icon} size={17} color={danger ? '#E53E3E' : iconColor} />
        </View>
      )}
      <View className="flex-1">
        <Text className={`text-sm font-medium ${danger ? 'text-[#E53E3E]' : 'text-[#1A1A1A]'}`}>
          {label}
        </Text>
        {subtitle && (
          <Text className="text-xs text-[#6B6B6B] mt-0.5">{subtitle}</Text>
        )}
      </View>
      {hasToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggleChange}
          trackColor={{ false: '#E0E0E0', true: '#2D5A4E' }}
          thumbColor="#fff"
        />
      ) : showChevron ? (
        <Ionicons name="chevron-forward" size={16} color="#CCCCCC" />
      ) : null}
    </TouchableOpacity>
  );
};