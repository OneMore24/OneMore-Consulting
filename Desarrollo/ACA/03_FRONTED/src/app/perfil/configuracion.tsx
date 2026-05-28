import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SettingsCard } from '../../components/SettingsCard';
import { SettingsRow } from '../../components/SettingsRow';

export default function ConfiguracionScreen() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [recordatorios, setRecordatorios] = useState(true);
  const [sincronizacion, setSincronizacion] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <ScreenHeader title="Configuración" />

          {/* ── Apariencia ── */}
          <SettingsCard sectionLabel="Apariencia">
            <SettingsRow
              label="Modo oscuro"
              hasToggle
              toggleValue={modoOscuro}
              onToggleChange={setModoOscuro}
              showChevron={false}
            />
            <SettingsRow
              label="Tamaño de texto"
              onPress={() => {}}
              isLast
            />
          </SettingsCard>

          {/* ── Datos ── */}
          <SettingsCard sectionLabel="Datos">
            <SettingsRow
              label="Recordatorios diarios"
              hasToggle
              toggleValue={recordatorios}
              onToggleChange={setRecordatorios}
              showChevron={false}
            />
            <SettingsRow
              label="Sincronización automática"
              hasToggle
              toggleValue={sincronizacion}
              onToggleChange={setSincronizacion}
              showChevron={false}
            />
            <SettingsRow
              label="Datos y almacenamiento"
              onPress={() => {}}
              isLast
            />
          </SettingsCard>

          {/* ── Cuenta ── */}
          <SettingsCard sectionLabel="Cuenta">
            <SettingsRow
              label="Idioma de la app"
              onPress={() => {}}
            />
            <SettingsRow
              label="Eliminar cuenta"
              danger
              onPress={() => {}}
              isLast
            />
          </SettingsCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}