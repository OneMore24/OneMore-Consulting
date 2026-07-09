import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../components/ScreenHeader';
import { StatCard } from '../../components/StatCard';
import { MoodChart } from '../../components/MoodChart';
import { useRegistros } from '../../context/RegistrosContext';
import { calcularEstadisticas, datosSemana } from '../../utils/estadisticas';

function etiquetaFecha(fecha: Date): string {
  const hoy = new Date();
  const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);
  const f = new Date(fecha);
  const esMismoDia = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (esMismoDia(f, hoy)) return 'Hoy';
  if (esMismoDia(f, ayer)) return 'Ayer';
  return f.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

const MoodBars: React.FC<{ nivel: number; max?: number }> = ({ nivel, max = 5 }) => {
  return (
    <View className="flex-row gap-x-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <View
          key={i}
          className="w-2 h-5 rounded-sm"
          style={{ backgroundColor: i < nivel ? '#7B68EE' : '#E0E0E0' }}
        />
      ))}
    </View>
  );
};

export default function SeguimientoScreen() {
  const router = useRouter();
  const { registros } = useRegistros();
  const stats = calcularEstadisticas(registros);
  const MOOD_DATA = datosSemana(registros);
  const HISTORIAL = registros.slice(0, 5).map((r) => ({
    emoji: r.estadoEmocional?.emoji ?? '😐',
    fecha: etiquetaFecha(r.fecha),
    estado: r.estadoEmocional?.label ?? '',
    nivel: r.estadoEmocional?.valor ?? 0,
  }));

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <ScreenHeader title="Seguimiento Emocional" />

          {/* ── Stats ── */}
          <View className="flex-row gap-x-3 mb-4">
            <StatCard value={`${stats.racha}🔥`} label="Racha" />
            <StatCard value={String(stats.entradas)} label="Entradas" />
            <StatCard value={stats.promedioTexto} label="Promedio" />
          </View>

          {/* ── Gráfica semanal ── */}
          <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          >
            <Text className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-2">Esta Semana</Text>
            <MoodChart data={MOOD_DATA} />
          </View>

          {/* ── Historial reciente ── */}
          <Text className="text-[#1A1A1A] text-sm font-bold uppercase tracking-widest mb-3">
            Historial Reciente
          </Text>
          <View
            className="bg-white rounded-2xl overflow-hidden mb-4"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          >
            {HISTORIAL.map((item, index) => (
              <View
                key={index}
                className={`flex-row items-center px-4 py-4 ${index < HISTORIAL.length - 1 ? 'border-b border-[#F0F0F0]' : ''}`}
              >
                <Text className="text-2xl mr-3">{item.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-[#1A1A1A] text-sm font-semibold">{item.fecha}</Text>
                  <Text className="text-[#6B6B6B] text-xs">{item.estado}</Text>
                </View>
                <MoodBars nivel={item.nivel} />
              </View>
            ))}
          </View>

          {/* ── Ver gráfica completa ── */}
          <TouchableOpacity
            className="rounded-2xl py-4 items-center border border-[#2D5A4E]"
            activeOpacity={0.8}
            onPress={() => router.push('/resumen-semanal' as any)}
          >
            <Text className="text-[#2D5A4E] font-semibold text-sm">Ver gráfica completa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}