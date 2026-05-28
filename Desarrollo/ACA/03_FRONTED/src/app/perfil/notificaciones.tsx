import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SettingsCard } from '../../components/SettingsCard';
import { SettingsRow } from '../../components/SettingsRow';

const NOTIFICACIONES = [
  { key: 'cuestionario', label: 'Cuestionario diario', subtitle: 'Recordatorio para completar tu registro', defaultValue: true },
  { key: 'actividades', label: 'Nuevas actividades', subtitle: 'Cuando se añadan ejercicios nuevos', defaultValue: false },
  { key: 'logros', label: 'Logros y rachas', subtitle: 'Celebra tus avances diarios', defaultValue: true },
  { key: 'articulos', label: 'Artículos nuevos', subtitle: 'Contenido de bienestar reciente', defaultValue: false },
  { key: 'respiracion', label: 'Recordatorio de respiración', subtitle: 'Pausa de 5 min durante el día', defaultValue: true },
];

export default function NotificacionesScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICACIONES.map((n) => [n.key, n.defaultValue]))
  );

  const toggle = (key: string) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <ScreenHeader title="Notificaciones" />

          <SettingsCard>
            {NOTIFICACIONES.map((item, index) => (
              <SettingsRow
                key={item.key}
                label={item.label}
                subtitle={item.subtitle}
                hasToggle
                toggleValue={toggles[item.key]}
                onToggleChange={() => toggle(item.key)}
                showChevron={false}
                isLast={index === NOTIFICACIONES.length - 1}
              />
            ))}
          </SettingsCard>

          {/* ── Horario de silencio ── */}
          <SettingsCard sectionLabel="Horario de Silencio">
            <View className="p-4">
              <Text className="text-[#6B6B6B] text-sm mb-4">
                Sin notificaciones en este rango
              </Text>
              <View className="flex-row gap-x-3">
                <TouchableOpacity
                  className="flex-1 bg-[#F2F5F2] rounded-2xl py-4 items-center"
                  activeOpacity={0.8}
                >
                  <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-1">Desde</Text>
                  <Text className="text-[#1A1A1A] text-xl font-bold">22:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-[#F2F5F2] rounded-2xl py-4 items-center"
                  activeOpacity={0.8}
                >
                  <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-1">Hasta</Text>
                  <Text className="text-[#1A1A1A] text-xl font-bold">08:00</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SettingsCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}