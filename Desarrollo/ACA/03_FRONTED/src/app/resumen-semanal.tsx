import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { BackButton } from '../components/BackButton';
import { StatCard } from '../components/StatCard';
import { MoodChart } from '../components/MoodChart';
import { DayBar } from '../components/DayBar';

const MOOD_DATA = [
  { day: 'L', value: 3.5 },
  { day: 'M', value: 4.2 },
  { day: 'X', value: 3.8 },
  { day: 'J', value: 4.5 },
  { day: 'V', value: 4.0 },
  { day: 'S', value: 4.8 },
  { day: 'D', value: 4.3 },
];

export default function ResumenSemanalScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">

          {/* ── Header ── */}
          <BackButton />
          <Text
            className="text-[#1A1A1A] text-2xl font-bold mt-4 mb-6"
            style={{ fontFamily: 'serif' }}
          >
            Resumen Semanal
          </Text>

          {/* ── Stats ── */}
          <View className="flex-row gap-x-3 mb-4">
            <StatCard value="4.3" label="Promedio" />
            <StatCard value="5 días 🔥" label="Racha" />
            <StatCard value="7/7" label="Completado" />
          </View>

          {/* ── Gráfica de estado de ánimo ── */}
          <MoodChart data={MOOD_DATA} />

          {/* ── Por día ── */}
          <View
            className="bg-white rounded-2xl p-4"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          >
            <Text className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-4">
              Por Día
            </Text>
            {MOOD_DATA.map((d) => (
              <DayBar key={d.day} day={d.day} value={d.value} />
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}