import React, { useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MoodSelector } from '../components/MoodSelector';
import { QuickActionButton } from '../components/QuickActionButton';
import { SectionHeader } from '../components/SectionHeader';
import { WeeklySummaryCard } from '../components/WeeklySummaryCard';
import { SuggestionItem } from '../components/SuggestionItem';
import { BottomNavBar } from '../components/BottomNavBar';
import { SOSButton } from '../components/SOSButton';
import { SOSModal } from '../components/SOSModal';

const SUGGESTIONS = [
  {
    id: '1',
    title: 'Respiración 4–7–8',
    duration: '5 min',
    image: require('../../assets/images/suggestion1.jpg'),
  },
  {
    id: '2',
    title: 'Meditación matutina',
    duration: '10 min',
    image: require('../../assets/images/suggestion2.jpg'),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [sosVisible, setSosVisible] = useState(false);

  const today = new Date();
  const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
  const dateFormatted = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)}, ${dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}`;

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-4">

            {/* Header */}
            <View className="flex-row justify-between items-start mb-4">
              <View>
                <Text className="text-[#6B6B6B] text-xs mb-0.5">{dateFormatted}</Text>
                <Text className="text-[#1A1A1A] text-2xl font-bold">Hola, Ana 👋</Text>
              </View>
              <View className="flex-row gap-x-2">
                <TouchableOpacity
                  className="w-10 h-10 rounded-full bg-white items-center justify-center"
                  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
                >
                  <Ionicons name="notifications-outline" size={20} color="#1A1A1A" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-10 h-10 rounded-full bg-white items-center justify-center"
                  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
                  onPress={() => router.push('/perfil' as any)}
                >
                  <Ionicons name="person-outline" size={20} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
            </View>

            <MoodSelector />

            <View className="flex-row gap-x-3 mb-6">
              <QuickActionButton icon="clipboard-outline" label="Cuestionario" />
              <QuickActionButton icon="leaf-outline" label="Respiración" />
              <QuickActionButton icon="book-outline" label="Diario" iconColor="#7B68EE" />
            </View>

            <SectionHeader
              title="Resumen Semanal"
              onVerTodo={() => router.push('/resumen-semanal' as any)}
            />
            <WeeklySummaryCard
              dias={5}
              promedio="4.2"
              entradas={12}
              onPress={() => router.push('/resumen-semanal' as any)}
            />

            <SectionHeader
              title="Sugerencias del Día"
              onVerTodo={() => router.push('/sugerencias' as any)}
            />
            {SUGGESTIONS.map((s) => (
              <SuggestionItem
                key={s.id}
                title={s.title}
                duration={s.duration}
                image={s.image}
                onPress={() => {}}
              />
            ))}

          </View>
        </ScrollView>

        {/* Botón SOS flotante */}
        <SOSButton onPress={() => setSosVisible(true)} />

        <BottomNavBar />
      </View>

      {/* Modal SOS */}
      <SOSModal
        visible={sosVisible}
        onClose={() => setSosVisible(false)}
      />
    </SafeAreaView>
  );
}