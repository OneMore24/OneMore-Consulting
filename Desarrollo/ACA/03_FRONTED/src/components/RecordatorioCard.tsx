import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recordatorio, TIPO_INFO, DIAS_SEMANA } from '../utils/recordatoriosData';

interface RecordatorioCardProps {
  recordatorio: Recordatorio;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const RecordatorioCard: React.FC<RecordatorioCardProps> = ({
  recordatorio, onToggle, onEdit, onDelete,
}) => {
  const info = TIPO_INFO[recordatorio.tipo];

  return (
    <View
      className="bg-white rounded-2xl p-4 mb-3"
      style={{
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
        opacity: recordatorio.activo ? 1 : 0.6,
      }}
    >
      <View className="flex-row items-start">
        {/* Ícono tipo */}
        <View
          className="w-11 h-11 rounded-2xl items-center justify-center mr-3"
          style={{ backgroundColor: info.bgColor }}
        >
          <Text className="text-2xl">{recordatorio.emoji}</Text>
        </View>

        {/* Info */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-0.5">
            <Text className="text-[#1A1A1A] text-sm font-bold">{recordatorio.titulo}</Text>
            <Switch
              value={recordatorio.activo}
              onValueChange={onToggle}
              trackColor={{ false: '#E0E0E0', true: info.color }}
              thumbColor="#fff"
              style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
            />
          </View>
          <Text className="text-[#6B6B6B] text-xs mb-2">{recordatorio.descripcion}</Text>

          {/* Hora */}
          <View className="flex-row items-center gap-x-1 mb-3">
            <Ionicons name="time-outline" size={13} color={info.color} />
            <Text className="text-sm font-bold" style={{ color: info.color }}>
              {recordatorio.hora}
            </Text>
          </View>

          {/* Días */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }} className="mb-3">
            {DIAS_SEMANA.map((dia) => {
                const activo = recordatorio.dias.includes(dia);
                return (
                <View
                    key={dia}
                    style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: activo ? info.color : '#F0F0F0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    <Text
                    style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: activo ? 'white' : '#ABABAB',
                    }}
                    >
                    {dia}
                    </Text>
                </View>
                );
            })}
            </View>

          {/* Acciones */}
          <View className="flex-row gap-x-3">
            <TouchableOpacity
              onPress={onEdit}
              className="flex-row items-center gap-x-1"
              activeOpacity={0.7}
            >
              <Ionicons name="pencil-outline" size={13} color="#6B6B6B" />
              <Text className="text-[#6B6B6B] text-xs">Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              className="flex-row items-center gap-x-1"
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={13} color="#E53E3E" />
              <Text className="text-xs text-[#E53E3E]">Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};