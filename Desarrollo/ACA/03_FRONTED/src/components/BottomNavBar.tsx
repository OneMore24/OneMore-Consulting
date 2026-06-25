import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const TABS = [
  { label: 'Inicio', icon: 'home-outline', activeIcon: 'home', route: '/home' },
  { label: 'Actividades', icon: 'swap-horizontal-outline', activeIcon: 'swap-horizontal', route: '/actividades' },
  { label: 'Diario', icon: 'book-outline', activeIcon: 'book', route: '/diario' },
  { label: 'Recursos', icon: 'play-circle-outline', activeIcon: 'play-circle', route: '/recursos' },
  { label: 'Perfil', icon: 'person-outline', activeIcon: 'person', route: '/perfil' },
] as const;

export const BottomNavBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      className="flex-row bg-white border-t border-[#F0F0F0] px-2 pt-2 pb-4"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 8 }}
    >
      {TABS.map((tab) => {
        const isActive = pathname === tab.route || pathname.startsWith(tab.route);
        return (
          <TouchableOpacity
            key={tab.route}
            onPress={() => router.push(tab.route as any)}
            className="flex-1 items-center justify-center gap-y-1"
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={22}
              color={isActive ? '#2D5A4E' : '#ABABAB'}
            />
            <Text
              className={`text-[10px] ${isActive ? 'text-[#2D5A4E] font-semibold' : 'text-[#ABABAB]'}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};