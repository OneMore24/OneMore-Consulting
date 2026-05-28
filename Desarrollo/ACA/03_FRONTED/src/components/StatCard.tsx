import React from 'react';
import { View, Text } from 'react-native';

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, suffix }) => {
  return (
    <View className="flex-1 bg-white rounded-2xl py-4 px-3 items-center justify-center"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
    >
      <Text className="text-[#1A1A1A] text-xl font-bold">
        {value}{suffix ? <Text className="text-sm font-normal text-[#6B6B6B]">{suffix}</Text> : null}
      </Text>
      <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mt-1">{label}</Text>
    </View>
  );
};