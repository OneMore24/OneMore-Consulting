import React from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScreenHeader } from '../../components/ScreenHeader';
import { MoodBars } from '../../components/MoodBars';
import { IntensitySlider } from '../../components/IntensitySlider';
import { REGISTROS_MOCK } from '../../utils/cuestionarioData';
import { useRegistros } from '../../context/RegistrosContext';


export default function DetalleRegistroScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { registros } = useRegistros();
  const registro = registros.find((r) => r.id === id) ?? registros[0];
  
  const fechaFormateada = registro.fecha.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <ScreenHeader title="Detalle del Registro" />

          {/* ── Estado emocional ── */}
          <View
            className="bg-white rounded-2xl p-4 mb-3"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          >
            <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-3">
              {fechaFormateada}
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-x-3">
                <Text className="text-4xl">{registro.estadoEmocional.emoji}</Text>
                <View>
                  <Text className="text-[#1A1A1A] text-base font-bold">
                    {registro.estadoEmocional.label}
                  </Text>
                  <Text className="text-[#6B6B6B] text-xs">Estado emocional</Text>
                </View>
              </View>
              <MoodBars nivel={registro.estadoEmocional.valor} />
            </View>
          </View>

          {/* ── Síntomas físicos ── */}
          {registro.sintomas.length > 0 && (
            <View
              className="bg-white rounded-2xl p-4 mb-3"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
            >
              <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-3">
                Síntomas físicos
              </Text>
              {registro.sintomas.map(({ sintoma, intensidad }) => (
                <View key={sintoma.id} className="mb-3">
                  <View className="flex-row items-center gap-x-2 mb-2">
                    <Text className="text-lg">{sintoma.emoji}</Text>
                    <Text className="text-[#1A1A1A] text-sm font-medium">{sintoma.label}</Text>
                  </View>
                  <IntensitySlider value={intensidad} onChange={() => {}} />
                </View>
              ))}
            </View>
          )}

          {/* ── Estrés y energía ── */}
          <View
            className="bg-white rounded-2xl p-4 mb-3"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          >
            <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-3">
              Estrés y Energía
            </Text>
            <Text className="text-[#1A1A1A] text-sm font-medium mb-1">Nivel de estrés</Text>
            <IntensitySlider value={registro.nivelEstres} onChange={() => {}} />
            <View className="mt-3">
              <Text className="text-[#1A1A1A] text-sm font-medium mb-1">Nivel de energía</Text>
              <IntensitySlider value={registro.nivelEnergia} onChange={() => {}} />
            </View>
          </View>

          {/* ── Nota libre ── */}
          {registro.notaLibre ? (
            <View
              className="bg-white rounded-2xl p-4"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
            >
              <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-2">
                Nota del día
              </Text>
              <Text className="text-[#1A1A1A] text-sm leading-5">{registro.notaLibre}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}