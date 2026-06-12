import React from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../components/ScreenHeader';
import { MoodBars } from '../../components/MoodBars';
import { useRegistros } from '../../context/RegistrosContext';

const formatFecha = (fecha: Date) => {
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatMes = (fecha: Date) => {
  return fecha.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric',
  }).toUpperCase();
};

export default function RegistrosScreen() {
  const router = useRouter();
  const { registros } = useRegistros();

  // Agrupar por mes
  const grupos = registros.reduce<Record<string, typeof registros>>((acc, registro) => {
  const key = formatMes(registro.fecha);
  if (!acc[key]) acc[key] = [];
  acc[key].push(registro);
  return acc;
}, {});

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <ScreenHeader title="Registros Pasados" />

          {Object.entries(grupos).map(([mes, registros]) => (
            <View key={mes} className="mb-4">
              {/* Etiqueta de mes */}
              <Text className="text-[#6B6B6B] text-xs font-semibold uppercase tracking-widest mb-3">
                {mes}
              </Text>

              {/* Lista de registros */}
              <View
                className="bg-white rounded-2xl overflow-hidden"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
              >
                {registros.map((registro, index) => (
                  <TouchableOpacity
                    key={registro.id}
                    activeOpacity={0.7}
                    onPress={() => router.push(`/diario/detalle-registro?id=${registro.id}` as any)}
                    className={`flex-row items-center px-4 py-4 ${
                      index < registros.length - 1 ? 'border-b border-[#F0F0F0]' : ''
                    }`}
                  >
                    {/* Emoji */}
                    <View className="w-10 h-10 rounded-full bg-[#F2F5F2] items-center justify-center mr-3">
                      <Text className="text-xl">{registro.estadoEmocional.emoji}</Text>
                    </View>

                    {/* Info */}
                    <View className="flex-1">
                      <Text className="text-[#1A1A1A] text-sm font-semibold">
                        {formatFecha(registro.fecha)}
                      </Text>
                      <Text className="text-[#6B6B6B] text-xs mt-0.5">
                        {registro.estadoEmocional.label}
                      </Text>
                    </View>

                    {/* Barras de nivel */}
                    <MoodBars nivel={registro.estadoEmocional.valor} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}