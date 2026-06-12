import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, StatusBar, TouchableOpacity,
  ScrollView, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '../../components/ProgressBar';
import { Button } from '../../components/Button';
import { IntensitySlider } from '../../components/IntensitySlider';
import {
  OPCIONES_ESTADO, SINTOMAS_FISICOS, OpcionEstado, SintomaFisico,
} from '../../utils/cuestionarioData';
import { useRegistros } from '../../context/RegistrosContext';


const TOTAL_PASOS = 4;

export default function CuestionarioScreen() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const { agregarRegistro } = useRegistros();
  // Respuestas
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<OpcionEstado | null>(null);
  const [sintomasSeleccionados, setSintomasSeleccionados] = useState<Record<string, number>>({});
  const [nivelEstres, setNivelEstres] = useState(0);
  const [nivelEnergia, setNivelEnergia] = useState(0);
  const [notaLibre, setNotaLibre] = useState('');

  const toggleSintoma = (sintoma: SintomaFisico) => {
    setSintomasSeleccionados((prev) => {
      const next = { ...prev };
      if (next[sintoma.id] !== undefined) {
        delete next[sintoma.id];
      } else {
        next[sintoma.id] = 1;
      }
      return next;
    });
  };

  const setIntensidad = (sintomaId: string, valor: number) => {
    setSintomasSeleccionados((prev) => ({ ...prev, [sintomaId]: valor }));
  };

  const puedeAvanzar = () => {
    if (paso === 1) return estadoSeleccionado !== null;
    if (paso === 3) return nivelEstres > 0 && nivelEnergia > 0;
    return true;
  };

  const siguiente = () => {
  if (paso < TOTAL_PASOS) {
    setPaso(paso + 1);
  } else {
    // Construir el registro
    const sintomasArray = Object.entries(sintomasSeleccionados).map(([id, intensidad]) => ({
      sintoma: SINTOMAS_FISICOS.find((s) => s.id === id)!,
      intensidad,
    }));

    agregarRegistro({
      id: Date.now().toString(),
      fecha: new Date(),
      estadoEmocional: estadoSeleccionado!,
      sintomas: sintomasArray,
      notaLibre,
      nivelEstres,
      nivelEnergia,
    });

    router.replace('/diario/registros' as any);
        }
    };

  const anterior = () => {
    if (paso > 1) setPaso(paso - 1);
    else router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="light-content" backgroundColor="#7B68EE" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* ── Header morado ── */}
        <View className="px-5 pt-5 pb-6" style={{ backgroundColor: '#7B68EE' }}>
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={anterior}
              className="w-9 h-9 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <Ionicons name="arrow-back" size={18} color="white" />
            </TouchableOpacity>
          </View>

          <ProgressBar current={paso} total={TOTAL_PASOS} />

          <Text className="text-white/70 text-xs mb-2">{paso} DE {TOTAL_PASOS}</Text>
          <Text className="text-white text-xl font-bold leading-7">
            {paso === 1 && '¿Cómo describirías tu estado\nemocional hoy?'}
            {paso === 2 && '¿Qué síntomas físicos\nexperimentas hoy?'}
            {paso === 3 && '¿Cuál es tu nivel de estrés\ny energía?'}
            {paso === 4 && '¿Quieres agregar alguna\nnota adicional?'}
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-5 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* ── Paso 1: Estado emocional ── */}
          {paso === 1 && (
            <View className="flex-row flex-wrap gap-3">
              {OPCIONES_ESTADO.map((opcion) => {
                const isSelected = estadoSeleccionado?.valor === opcion.valor;
                return (
                  <TouchableOpacity
                    key={opcion.valor}
                    onPress={() => setEstadoSeleccionado(opcion)}
                    activeOpacity={0.8}
                    className="rounded-2xl px-5 py-3 flex-row items-center gap-x-2"
                    style={{
                      backgroundColor: isSelected ? '#2D5A4E' : 'white',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <Text className="text-xl">{opcion.emoji}</Text>
                    <Text className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {opcion.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* ── Paso 2: Síntomas físicos ── */}
          {paso === 2 && (
            <View>
              <Text className="text-[#6B6B6B] text-sm mb-4">
                Selecciona los que apliquen e indica la intensidad
              </Text>
              {SINTOMAS_FISICOS.map((sintoma) => {
                const seleccionado = sintomasSeleccionados[sintoma.id] !== undefined;
                return (
                  <View
                    key={sintoma.id}
                    className="bg-white rounded-2xl p-4 mb-3"
                    style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
                  >
                    <TouchableOpacity
                      onPress={() => toggleSintoma(sintoma)}
                      activeOpacity={0.8}
                      className="flex-row items-center mb-2"
                    >
                      <View
                        className="w-6 h-6 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: seleccionado ? '#2D5A4E' : '#E8EDE9' }}
                      >
                        {seleccionado && <Ionicons name="checkmark" size={14} color="white" />}
                      </View>
                      <Text className="text-lg mr-2">{sintoma.emoji}</Text>
                      <Text className="text-[#1A1A1A] text-sm font-medium flex-1">{sintoma.label}</Text>
                    </TouchableOpacity>

                    {seleccionado && (
                      <View className="ml-9">
                        <Text className="text-[#6B6B6B] text-xs mb-2">Intensidad:</Text>
                        <IntensitySlider
                          value={sintomasSeleccionados[sintoma.id]}
                          onChange={(v) => setIntensidad(sintoma.id, v)}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {/* ── Paso 3: Estrés y energía ── */}
          {paso === 3 && (
            <View>
              <View
                className="bg-white rounded-2xl p-4 mb-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
              >
                <Text className="text-[#1A1A1A] text-sm font-semibold mb-1">Nivel de estrés</Text>
                <Text className="text-[#6B6B6B] text-xs mb-3">¿Qué tan estresado/a te sientes?</Text>
                <IntensitySlider value={nivelEstres} onChange={setNivelEstres} />
              </View>

              <View
                className="bg-white rounded-2xl p-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
              >
                <Text className="text-[#1A1A1A] text-sm font-semibold mb-1">Nivel de energía</Text>
                <Text className="text-[#6B6B6B] text-xs mb-3">¿Cuánta energía tienes hoy?</Text>
                <IntensitySlider value={nivelEnergia} onChange={setNivelEnergia} />
              </View>
            </View>
          )}

          {/* ── Paso 4: Nota libre ── */}
          {paso === 4 && (
            <View>
              <Text className="text-[#6B6B6B] text-sm mb-3">
                Opcional — comparte algo más sobre tu día
              </Text>
              <TextInput
                className="bg-white rounded-2xl px-4 py-4 text-sm text-[#1A1A1A]"
                placeholder="Escribe aquí lo que quieras compartir..."
                placeholderTextColor="#ABABAB"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={notaLibre}
                onChangeText={setNotaLibre}
                style={{
                  minHeight: 140,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              />
            </View>
          )}
        </ScrollView>

        {/* ── Botón siguiente ── */}
        <View className="px-5 pb-6 pt-2">
          <Button
            label={paso === TOTAL_PASOS ? 'Guardar registro ✓' : 'Siguiente →'}
            variant="primary"
            onPress={siguiente}
            disabled={!puedeAvanzar()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}