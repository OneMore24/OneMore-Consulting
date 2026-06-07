import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, SafeAreaView, StatusBar,
  TouchableOpacity, Animated, Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Fase = 'Inhala' | 'Mantén' | 'Exhala' | 'idle';

interface FaseConfig {
  label: Fase;
  duracion: number;
  instruccion: string;
  escala: number;
}

const FASES: FaseConfig[] = [
  { label: 'Inhala', duracion: 4, instruccion: 'Respira lento por la nariz...', escala: 1.3 },
  { label: 'Mantén', duracion: 7, instruccion: 'Mantén el aire suavemente...', escala: 1.3 },
  { label: 'Exhala', duracion: 8, instruccion: 'Suelta el aire lentamente...', escala: 0.85 },
];

export default function Respiracion478Screen() {
  const router = useRouter();
  const [activo, setActivo] = useState(false);
  const [faseIndex, setFaseIndex] = useState(0);
  const [cuenta, setCuenta] = useState(0);
  const [ciclos, setCiclos] = useState(0);

  const escalaAnim = useRef(new Animated.Value(1)).current;
  const opacidadAnim = useRef(new Animated.Value(0.4)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const faseActual = FASES[faseIndex];

  const animarCirculo = (escala: number, duracion: number) => {
    Animated.parallel([
      Animated.timing(escalaAnim, {
        toValue: escala,
        duration: duracion * 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacidadAnim, {
        toValue: escala > 1 ? 0.7 : 0.4,
        duration: duracion * 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const iniciarFase = (index: number) => {
    const fase = FASES[index];
    setCuenta(fase.duracion);
    animarCirculo(fase.escala, fase.duracion);

    intervalRef.current = setInterval(() => {
      setCuenta((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timeoutRef.current = setTimeout(() => {
      const nextIndex = (index + 1) % FASES.length;
      setFaseIndex(nextIndex);
      if (nextIndex === 0) setCiclos((c) => c + 1);
      iniciarFase(nextIndex);
    }, fase.duracion * 1000);
  };

  const iniciar = () => {
    setActivo(true);
    setFaseIndex(0);
    setCiclos(0);
    iniciarFase(0);
  };

  const detener = () => {
    setActivo(false);
    clearInterval(intervalRef.current!);
    clearTimeout(timeoutRef.current!);
    setFaseIndex(0);
    setCuenta(0);
    Animated.parallel([
      Animated.timing(escalaAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(opacidadAnim, { toValue: 0.4, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#1E3D30' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3D30" />

      {/* Back button */}
      <View className="px-5 pt-4">
        <TouchableOpacity
          onPress={() => { detener(); router.back(); }}
          className="w-9 h-9 rounded-full items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          <Ionicons name="arrow-back" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center px-8">

        {/* ── Círculo animado ── */}
        <View className="items-center justify-center mb-10" style={{ width: 260, height: 260 }}>
          {/* Círculo exterior difuso */}
          <Animated.View
            style={{
              position: 'absolute',
              width: 260,
              height: 260,
              borderRadius: 130,
              backgroundColor: 'rgba(255,255,255,0.08)',
              transform: [{ scale: escalaAnim }],
              opacity: opacidadAnim,
            }}
          />
          {/* Círculo borde */}
          <Animated.View
            style={{
              position: 'absolute',
              width: 220,
              height: 220,
              borderRadius: 110,
              borderWidth: 1.5,
              borderColor: 'rgba(255,255,255,0.3)',
              transform: [{ scale: escalaAnim }],
            }}
          />
          {/* Círculo principal */}
          <Animated.View
            className="items-center justify-center"
            style={{
              width: 180,
              height: 180,
              borderRadius: 90,
              backgroundColor: 'rgba(255,255,255,0.12)',
              transform: [{ scale: escalaAnim }],
            }}
          >
            <Text className="text-white text-2xl font-bold" style={{ fontFamily: 'serif' }}>
              {activo ? faseActual.label : 'Respira'}
            </Text>
            {activo && cuenta > 0 && (
              <Text className="text-white/60 text-lg font-light mt-1">{cuenta}</Text>
            )}
          </Animated.View>
        </View>

        {/* Instrucción */}
        <Text className="text-white/60 text-sm text-center mb-10">
          {activo ? faseActual.instruccion : 'Presiona comenzar para iniciar la sesión'}
        </Text>

        {/* ── Indicadores de fase ── */}
        <View className="flex-row gap-x-3 mb-10">
          {FASES.map((fase, i) => (
            <View
              key={fase.label}
              className="px-5 py-2.5 rounded-full"
              style={{
                backgroundColor: activo && faseIndex === i
                  ? 'rgba(255,255,255,0.25)'
                  : 'rgba(255,255,255,0.08)',
                borderWidth: activo && faseIndex === i ? 1 : 0,
                borderColor: 'rgba(255,255,255,0.4)',
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: activo && faseIndex === i ? 'white' : 'rgba(255,255,255,0.45)' }}
              >
                {fase.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Ciclos */}
        {activo && ciclos > 0 && (
          <Text className="text-white/40 text-xs mb-4">
            Ciclos completados: {ciclos}
          </Text>
        )}

        {/* ── Botón ── */}
        <TouchableOpacity
          onPress={activo ? detener : iniciar}
          activeOpacity={0.85}
          className="w-full rounded-2xl py-4 items-center"
          style={{ backgroundColor: activo ? 'rgba(255,255,255,0.15)' : 'white' }}
        >
          <Text
            className="text-base font-semibold"
            style={{ color: activo ? 'white' : '#1E3D30' }}
          >
            {activo ? 'Detener sesión' : 'Comenzar sesión'}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}