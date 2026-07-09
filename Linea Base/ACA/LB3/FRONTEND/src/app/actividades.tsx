import React from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar,
  TouchableOpacity, ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavBar } from '../components/BottomNavBar';
import { SectionHeader } from '../components/SectionHeader';
import { ExerciseCard } from '../components/ExerciseCard';
import { TagChip } from '../components/TagChip';
import { EJERCICIOS } from '../utils/actividadesData';

export default function ActividadesScreen() {
  const router = useRouter();
  const sugerencia = EJERCICIOS[2]; // Yoga Restaurativo
  const respiracion = EJERCICIOS[0]; // Respiración 4-7-8

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="light-content" backgroundColor="#7B68EE" />

      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header morado degradado ── */}
          <View
            className="px-5 pt-10 pb-6"
            style={{ backgroundColor: '#7B68EE' }}
          >
            <Text className="text-white text-2xl font-bold mb-1" style={{ fontFamily: 'serif' }}>
              Ejercicios de Relajación
            </Text>
            <Text className="text-white/70 text-sm">Encuentra tu momento de calma</Text>
          </View>

          <View className="px-5 pt-4">

            {/* ── Nuestra Sugerencia ── */}
            <Text className="text-[#1A1A1A] text-xs font-bold uppercase tracking-widest mb-3">
              Nuestra Sugerencia
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/actividades/yoga-restaurativo' as any)}
              activeOpacity={0.9}
              className="rounded-2xl overflow-hidden mb-6"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 }}
            >
              <ImageBackground
                source={sugerencia.imagen}
                style={{ width: '100%', aspectRatio: 16 / 9 }}
                resizeMode="cover"
              >
                <View
                  className="flex-1 justify-end p-4"
                  style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
                >
                  {/* Play button */}
                  <View className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 items-center justify-center">
                    <Ionicons name="play" size={16} color="white" />
                  </View>
                  <Text className="text-white font-bold text-base">{sugerencia.titulo}</Text>
                  <View className="flex-row items-center gap-x-1 mt-1">
                    <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.8)" />
                    <Text className="text-white/80 text-xs">{sugerencia.duracion} · Principiante</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* ── Más Ejercicios + Favoritos ── */}
<View className="flex-row gap-x-3 mb-4">
  {/* Más ejercicios */}
  <View className="flex-1">
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-[#1A1A1A] text-xs font-bold uppercase tracking-widest">
        Más Ejercicios
      </Text>
      <TouchableOpacity onPress={() => router.push('/actividades/mas-ejercicios' as any)}>
        <Text className="text-[#2D5A4E] text-sm font-medium">Ver todo</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      onPress={() => router.push('/actividades/mas-ejercicios' as any)}
      activeOpacity={0.9}
      className="rounded-2xl overflow-hidden w-full"
    >
      <ImageBackground
        source={EJERCICIOS[1].imagen}
        style={{ width: '100%', aspectRatio: 1 }}
        resizeMode="cover"
      >
        <View
          className="flex-1 justify-end p-3"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <Text className="text-white text-xs font-semibold">Meditación y más</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>

  {/* Favoritos */}
  <View className="flex-1">
    <Text className="text-[#1A1A1A] text-xs font-bold uppercase tracking-widest mb-3">
      Favoritos
    </Text>
    <TouchableOpacity
      activeOpacity={0.9}
      className="rounded-2xl overflow-hidden w-full"
    >
      <ImageBackground
        source={EJERCICIOS[3].imagen}
        style={{ width: '100%', aspectRatio: 1 }}
        resizeMode="cover"
      >
        <View
          className="flex-1 justify-end p-3"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <Text className="text-white text-xs font-semibold">Guardados</Text>
          <Text className="text-white/70 text-[10px]">4 actividades</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
</View>

          </View>
        </ScrollView>

        <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}