import React from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavBar } from '../components/BottomNavBar';
import { SectionHeader } from '../components/SectionHeader';
import { MoodChart } from '../components/MoodChart';
import { NoteCard } from '../components/NoteCard';
import { NOTAS_INICIALES } from '../utils/diarioData';

const QUICK_ACTIONS = [
  { icon: 'pencil-outline', label: 'Cuestionario', subtitle: 'Registro de hoy', route: '/diario/cuestionario', iconColor: '#7B68EE' },
  { icon: 'book-outline', label: 'Mis Notas', subtitle: '3 notas guardadas', route: '/diario/notas', iconColor: '#2D5A4E' },
  { icon: 'calendar-outline', label: 'Registros', subtitle: 'Historial completo', route: '/diario/registros', iconColor: '#2D5A4E' },
  { icon: 'trending-up-outline', label: 'Tendencias', subtitle: 'Gráfica semanal', route: '/diario/tendencias', iconColor: '#7B68EE' },
] as const;

const MOOD_DATA = [
  { day: 'L', value: 3.5 },
  { day: 'M', value: 4.0 },
  { day: 'X', value: 3.8 },
  { day: 'J', value: 4.5 },
  { day: 'V', value: 4.2 },
  { day: 'S', value: 4.8 },
  { day: 'D', value: 4.3 },
];

export default function DiarioScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="light-content" backgroundColor="#7B68EE" />

      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header morado ── */}
          <View className="px-5 pt-10 pb-6" style={{ backgroundColor: '#7B68EE' }}>
            <Text className="text-white text-2xl font-bold mb-1" style={{ fontFamily: 'serif' }}>
              Diario Emocional
            </Text>
            <Text className="text-white/70 text-sm mb-5">Conoce tu mundo interior</Text>

            <View className="flex-row gap-x-3">
              {[
                { value: '5🔥', label: 'RACHA' },
                { value: '23', label: 'ENTRADAS' },
                { value: '4.1', label: 'PROMEDIO' },
              ].map((stat) => (
                <View key={stat.label} className="flex-1 bg-white/15 rounded-2xl py-3 items-center">
                  <Text className="text-white font-bold text-base">{stat.value}</Text>
                  <Text className="text-white/60 text-[10px] tracking-widest mt-0.5">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="px-5 pt-4">
            {/* ── Acciones rápidas ── */}
            <View className="flex-row flex-wrap gap-3 mb-6">
              {QUICK_ACTIONS.map((action) => (
                <TouchableOpacity
                  key={action.route}
                  onPress={() => router.push(action.route as any)}
                  activeOpacity={0.8}
                  className="bg-white rounded-2xl p-4"
                  style={{
                    width: '47%',
                    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
                  }}
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mb-3"
                    style={{ backgroundColor: action.iconColor + '15' }}
                  >
                    <Ionicons name={action.icon as any} size={20} color={action.iconColor} />
                  </View>
                  <Text className="text-[#1A1A1A] text-sm font-semibold">{action.label}</Text>
                  <Text className="text-[#6B6B6B] text-xs mt-0.5">{action.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ── Esta semana ── */}
            <SectionHeader
              title="Esta Semana"
              onVerTodo={() => router.push('/diario/tendencias' as any)}
            />
            <MoodChart data={MOOD_DATA} />

            {/* ── Última entrada ── */}
            <SectionHeader
              title="Última Entrada"
              onVerTodo={() => router.push('/diario/notas' as any)}
            />
            <NoteCard nota={NOTAS_INICIALES[0]} onPress={() => router.push('/diario/notas' as any)} />
          </View>
        </ScrollView>

        <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}