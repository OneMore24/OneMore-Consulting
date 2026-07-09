import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, TouchableOpacity, ScrollView,
  TextInput, KeyboardAvoidingView, Platform, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Recordatorio, TipoRecordatorio, DiaSemana,
  DIAS_SEMANA, TIPO_INFO,
} from '../utils/recordatoriosData';

interface RecordatorioModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Omit<Recordatorio, 'id'>) => void;
  recordatorioEditar?: Recordatorio | null;
}

const TIPOS: { tipo: TipoRecordatorio; label: string; emoji: string }[] = [
  { tipo: 'estado_emocional', label: 'Estado emocional', emoji: '😊' },
  { tipo: 'ejercicio', label: 'Ejercicio', emoji: '🧘' },
  { tipo: 'respiracion', label: 'Respiración', emoji: '💨' },
  { tipo: 'diario', label: 'Diario', emoji: '📓' },
];

const HORAS_PREDEFINIDAS = ['07:00', '08:00', '09:00', '12:00', '15:00', '18:00', '20:00', '21:00', '22:00'];

export const RecordatorioModal: React.FC<RecordatorioModalProps> = ({
  visible, onClose, onSave, recordatorioEditar,
}) => {
  const [tipo, setTipo] = useState<TipoRecordatorio>('estado_emocional');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [hora, setHora] = useState('08:00');
  const [dias, setDias] = useState<DiaSemana[]>(['L', 'M', 'X', 'J', 'V']);
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (recordatorioEditar) {
      setTipo(recordatorioEditar.tipo);
      setTitulo(recordatorioEditar.titulo);
      setDescripcion(recordatorioEditar.descripcion);
      setHora(recordatorioEditar.hora);
      setDias(recordatorioEditar.dias);
      setActivo(recordatorioEditar.activo);
    } else {
      setTipo('estado_emocional');
      setTitulo('');
      setDescripcion('');
      setHora('08:00');
      setDias(['L', 'M', 'X', 'J', 'V']);
      setActivo(true);
    }
  }, [recordatorioEditar, visible]);

  const toggleDia = (dia: DiaSemana) => {
    setDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleSave = () => {
    if (!titulo.trim()) return;
    const tipoSeleccionado = TIPOS.find((t) => t.tipo === tipo);
    onSave({
      tipo,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      hora,
      dias,
      activo,
      emoji: tipoSeleccionado?.emoji ?? '😊',
    });
    onClose();
  };

  const info = TIPO_INFO[tipo];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        />
        <View className="bg-white rounded-t-3xl px-6 pt-5 pb-8">
          {/* Handle */}
          <View className="w-10 h-1 rounded-full bg-[#E0E0E0] self-center mb-4" />

          <Text className="text-[#1A1A1A] text-lg font-bold mb-4">
            {recordatorioEditar ? 'Editar recordatorio' : 'Nuevo recordatorio'}
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Tipo */}
            <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-2">Tipo</Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {TIPOS.map((t) => {
                const tInfo = TIPO_INFO[t.tipo];
                const isSelected = tipo === t.tipo;
                return (
                  <TouchableOpacity
                    key={t.tipo}
                    onPress={() => setTipo(t.tipo)}
                    activeOpacity={0.8}
                    className="flex-row items-center gap-x-1.5 px-3 py-2 rounded-full"
                    style={{
                      backgroundColor: isSelected ? tInfo.color : '#F2F5F2',
                    }}
                  >
                    <Text className="text-sm">{t.emoji}</Text>
                    <Text
                      className="text-xs font-medium"
                      style={{ color: isSelected ? 'white' : '#4A4A4A' }}
                    >
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Título */}
            <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-2">Título</Text>
            <TextInput
              className="bg-[#F2F5F2] rounded-2xl px-4 py-3 text-sm text-[#1A1A1A] mb-4"
              placeholder="Nombre del recordatorio"
              placeholderTextColor="#ABABAB"
              value={titulo}
              onChangeText={setTitulo}
            />

            {/* Descripción */}
            <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-2">Descripción</Text>
            <TextInput
              className="bg-[#F2F5F2] rounded-2xl px-4 py-3 text-sm text-[#1A1A1A] mb-4"
              placeholder="Breve descripción (opcional)"
              placeholderTextColor="#ABABAB"
              value={descripcion}
              onChangeText={setDescripcion}
            />

            {/* Hora */}
            <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-2">Hora</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row gap-x-2">
                {HORAS_PREDEFINIDAS.map((h) => (
                  <TouchableOpacity
                    key={h}
                    onPress={() => setHora(h)}
                    activeOpacity={0.8}
                    className="px-4 py-2 rounded-full"
                    style={{ backgroundColor: hora === h ? info.color : '#F2F5F2' }}
                  >
                    <Text
                      className="text-sm font-medium"
                      style={{ color: hora === h ? 'white' : '#4A4A4A' }}
                    >
                      {h}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Días */}
            <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-2">Días</Text>
            <View className="flex-row gap-x-2 mb-4">
              {DIAS_SEMANA.map((dia) => {
                const activo = dias.includes(dia);
                return (
                  <TouchableOpacity
                    key={dia}
                    onPress={() => toggleDia(dia)}
                    activeOpacity={0.8}
                    className="flex-1 h-9 rounded-full items-center justify-center"
                    style={{ backgroundColor: activo ? info.color : '#F2F5F2' }}
                  >
                    <Text
                      className="text-xs font-bold"
                      style={{ color: activo ? 'white' : '#ABABAB' }}
                    >
                      {dia}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Activo */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-[#1A1A1A] text-sm font-medium">Activar recordatorio</Text>
              <Switch
                value={activo}
                onValueChange={setActivo}
                trackColor={{ false: '#E0E0E0', true: info.color }}
                thumbColor="#fff"
              />
            </View>

            {/* Botón guardar */}
            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.85}
              className="rounded-2xl py-4 items-center"
              style={{ backgroundColor: titulo.trim() ? '#2D5A4E' : '#CCCCCC' }}
              disabled={!titulo.trim()}
            >
              <Text className="text-white font-semibold text-base">
                {recordatorioEditar ? 'Guardar cambios' : 'Crear recordatorio'}
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};