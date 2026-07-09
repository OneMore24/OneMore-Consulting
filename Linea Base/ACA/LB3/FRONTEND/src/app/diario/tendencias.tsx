import React, { useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar,
} from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { PeriodSelector, Periodo } from '../../components/PeriodSelector';
import { TendenciasChart } from '../../components/TendenciasChart';
import { TENDENCIAS } from '../../utils/diarioData';

export default function TendenciasScreen() {
  const [periodo, setPeriodo] = useState<Periodo>('Semana');
  const data = TENDENCIAS[periodo];

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <ScreenHeader title="Tendencias" />

          {/* ── Selector de período ── */}
          <PeriodSelector selected={periodo} onSelect={setPeriodo} />

          {/* ── Gráfica ── */}
          <TendenciasChart
            labels={data.labels}
            animo={data.animo}
            energia={data.energia}
          />

          {/* ── Stats 2x2 ── */}
            <View className="flex-row gap-x-3 mb-3">
            <View
                className="flex-1 bg-white rounded-2xl p-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
            >
                <Text className="text-[#1A1A1A] text-lg font-bold">{data.promedio}</Text>
                <Text className="text-[#6B6B6B] text-xs mt-0.5">{data.promedioLabel}</Text>
            </View>
            <View
                className="flex-1 bg-white rounded-2xl p-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
            >
                <Text className="text-[#1A1A1A] text-lg font-bold">
                {data.mejorDia} {data.mejorDiaEmoji}
                </Text>
                <Text className="text-[#6B6B6B] text-xs mt-0.5">{data.mejorDiaLabel}</Text>
            </View>
            </View>

            <View className="flex-row gap-x-3">
            <View
                className="flex-1 bg-white rounded-2xl p-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
            >
                <Text className="text-[#7B68EE] text-lg font-bold">{data.racha} días 🔥</Text>
                <Text className="text-[#6B6B6B] text-xs mt-0.5">Racha actual</Text>
            </View>
            <View
                className="flex-1 bg-white rounded-2xl p-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
            >
                <Text className="text-[#7B68EE] text-lg font-bold">{data.registros} registros</Text>
                <Text className="text-[#6B6B6B] text-xs mt-0.5">Total entradas</Text>
            </View>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}