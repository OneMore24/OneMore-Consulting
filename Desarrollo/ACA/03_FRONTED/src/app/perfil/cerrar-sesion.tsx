import React from 'react';
import {
  View, Text, SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CerrarSesionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2] justify-center">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <View className="px-8 items-center">
        {/* Ícono */}
        <View
          className="w-20 h-20 rounded-3xl items-center justify-center mb-6"
          style={{ backgroundColor: '#FFF0F0' }}
        >
          <Ionicons name="log-out-outline" size={36} color="#E53E3E" />
        </View>

        {/* Texto */}
        <Text className="text-[#1A1A1A] text-2xl font-bold text-center mb-3">
          ¿Cerrar sesión?
        </Text>
        <Text className="text-[#6B6B6B] text-sm text-center leading-6 mb-8">
          Tu progreso y datos estarán guardados. Puedes volver cuando quieras.
        </Text>

        {/* Botones */}
        <View className="w-full gap-y-3">
          <TouchableOpacity
            className="w-full rounded-2xl py-4 items-center"
            style={{ backgroundColor: '#FFF0F0', borderWidth: 1, borderColor: '#FFCCCC' }}
            activeOpacity={0.8}
            onPress={() => router.replace('/' as any)}
          >
            <Text className="text-[#E53E3E] font-semibold text-base">Cerrar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full rounded-2xl py-4 items-center border border-[#2D5A4E]"
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Text className="text-[#2D5A4E] font-semibold text-base">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}