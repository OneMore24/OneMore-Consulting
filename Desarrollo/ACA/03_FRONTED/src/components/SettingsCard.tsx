import React from 'react';
import { View, Text } from 'react-native';

interface SettingsCardProps {
  sectionLabel?: string;
  children: React.ReactNode;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({ sectionLabel, children }) => {
  return (
    <View className="mb-4">
      {sectionLabel && (
        <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest font-semibold mb-2 px-1">
          {sectionLabel}
        </Text>
      )}
      <View
        className="bg-white rounded-2xl overflow-hidden"
        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
      >
        {children}
      </View>
    </View>
  );
};