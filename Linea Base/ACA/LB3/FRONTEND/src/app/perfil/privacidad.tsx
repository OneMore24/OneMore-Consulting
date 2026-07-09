import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SettingsCard } from '../../components/SettingsCard';
import { SettingsRow } from '../../components/SettingsRow';
import { proximamente } from '../../utils/proximamente';

export default function PrivacidadScreen() {
  const router = useRouter();
  const [perfilPublico, setPerfilPublico] = useState(false);
  const [compartirProgreso, setCompartirProgreso] = useState(false);
  const [analisisUso, setAnalisisUso] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <ScreenHeader title="Privacidad y Seguridad" />

          {/* ── Privacidad ── */}
          <SettingsCard sectionLabel="Privacidad">
            <SettingsRow
              label="Perfil público"
              subtitle="Visible para otros usuarios"
              hasToggle
              toggleValue={perfilPublico}
              onToggleChange={setPerfilPublico}
              showChevron={false}
            />
            <SettingsRow
              label="Compartir progreso"
              subtitle="Permite compartir tu racha"
              hasToggle
              toggleValue={compartirProgreso}
              onToggleChange={setCompartirProgreso}
              showChevron={false}
            />
            <SettingsRow
              label="Análisis de uso"
              subtitle="Ayuda a mejorar la app (anónimo)"
              hasToggle
              toggleValue={analisisUso}
              onToggleChange={setAnalisisUso}
              showChevron={false}
              isLast
            />
          </SettingsCard>

          {/* ── Seguridad ── */}
          <SettingsCard sectionLabel="Seguridad">
            <SettingsRow label="Cambiar contraseña" onPress={() => router.push('/forgot-password' as any)} />
            <SettingsRow label="Autenticación en 2 pasos" onPress={() => proximamente()} />
            <SettingsRow label="Sesiones activas" onPress={() => proximamente()} isLast />
          </SettingsCard>

          {/* ── Exportar datos ── */}
          <TouchableOpacity
            className="rounded-2xl py-4 items-center border border-[#E53E3E]"
            style={{ backgroundColor: '#FFF5F5' }}
            activeOpacity={0.8}
            onPress={() => proximamente('La exportación de tus datos estará disponible próximamente.')}
          >
            <Text className="text-[#E53E3E] font-semibold text-sm">Exportar mis datos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}