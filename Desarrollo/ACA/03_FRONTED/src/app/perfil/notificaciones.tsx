import React, { useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar,
  TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SettingsCard } from '../../components/SettingsCard';
import { SettingsRow } from '../../components/SettingsRow';
import { RecordatorioCard } from '../../components/RecordatorioCard';
import { RecordatorioModal } from '../../components/RecordatorioModal';
import { useRecordatorios } from '../../context/RecordatoriosContext';
import { Recordatorio } from '../../utils/recordatoriosData';

const NOTIFICACIONES_CONFIG = [
  { key: 'cuestionario', label: 'Cuestionario diario', subtitle: 'Recordatorio para completar tu registro' },
  { key: 'actividades', label: 'Nuevas actividades', subtitle: 'Cuando se añadan ejercicios nuevos' },
  { key: 'logros', label: 'Logros y rachas', subtitle: 'Celebra tus avances diarios' },
  { key: 'articulos', label: 'Artículos nuevos', subtitle: 'Contenido de bienestar reciente' },
];

export default function NotificacionesScreen() {
  const { recordatorios, toggleActivo, agregarRecordatorio, editarRecordatorio, eliminarRecordatorio } = useRecordatorios();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    cuestionario: true, actividades: false, logros: true, articulos: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [recordatorioEditar, setRecordatorioEditar] = useState<Recordatorio | null>(null);

  const toggle = (key: string) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleEditar = (recordatorio: Recordatorio) => {
    setRecordatorioEditar(recordatorio);
    setModalVisible(true);
  };

  const handleEliminar = (id: string) => {
    Alert.alert(
      'Eliminar recordatorio',
      '¿Estás seguro de que quieres eliminar este recordatorio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => eliminarRecordatorio(id) },
      ]
    );
  };

  const handleSave = (data: Omit<Recordatorio, 'id'>) => {
    if (recordatorioEditar) {
      editarRecordatorio(recordatorioEditar.id, data);
    } else {
      agregarRecordatorio(data);
    }
    setRecordatorioEditar(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4">
          <ScreenHeader title="Notificaciones" />

          <SettingsCard sectionLabel="General">
            {NOTIFICACIONES_CONFIG.map((item, index) => (
              <SettingsRow
                key={item.key}
                label={item.label}
                subtitle={item.subtitle}
                hasToggle
                toggleValue={toggles[item.key]}
                onToggleChange={() => toggle(item.key)}
                showChevron={false}
                isLast={index === NOTIFICACIONES_CONFIG.length - 1}
              />
            ))}
          </SettingsCard>

          <SettingsCard sectionLabel="Horario de Silencio">
            <View className="p-4">
              <Text className="text-[#6B6B6B] text-sm mb-4">Sin notificaciones en este rango</Text>
              <View className="flex-row gap-x-3">
                <TouchableOpacity className="flex-1 bg-[#F2F5F2] rounded-2xl py-4 items-center" activeOpacity={0.8}>
                  <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-1">Desde</Text>
                  <Text className="text-[#1A1A1A] text-xl font-bold">22:00</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-[#F2F5F2] rounded-2xl py-4 items-center" activeOpacity={0.8}>
                  <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-1">Hasta</Text>
                  <Text className="text-[#1A1A1A] text-xl font-bold">08:00</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SettingsCard>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#6B6B6B] text-xs font-semibold uppercase tracking-widest">Mis Recordatorios</Text>
            <TouchableOpacity
              onPress={() => { setRecordatorioEditar(null); setModalVisible(true); }}
              className="flex-row items-center gap-x-1 px-3 py-1.5 rounded-full bg-[#2D5A4E]"
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={14} color="white" />
              <Text className="text-white text-xs font-medium">Nuevo</Text>
            </TouchableOpacity>
          </View>

          {recordatorios.length === 0 ? (
            <View className="bg-white rounded-2xl py-8 items-center"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
              <Text className="text-3xl mb-2">🔔</Text>
              <Text className="text-[#1A1A1A] text-sm font-semibold mb-1">Sin recordatorios</Text>
              <Text className="text-[#6B6B6B] text-xs text-center px-8">
                Crea recordatorios para registrar tu estado emocional o hacer ejercicios
              </Text>
            </View>
          ) : (
            recordatorios.map((r) => (
              <RecordatorioCard
                key={r.id}
                recordatorio={r}
                onToggle={() => toggleActivo(r.id)}
                onEdit={() => handleEditar(r)}
                onDelete={() => handleEliminar(r.id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <RecordatorioModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); setRecordatorioEditar(null); }}
        onSave={handleSave}
        recordatorioEditar={recordatorioEditar}
      />
    </SafeAreaView>
  );
}