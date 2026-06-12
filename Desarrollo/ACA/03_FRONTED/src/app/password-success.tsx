import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';

export default function PasswordSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2] justify-center">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <View className="px-8 items-center">
        {/* Ícono de éxito */}
        <View
          className="w-24 h-24 rounded-full items-center justify-center mb-6"
          style={{ backgroundColor: '#EFF3F0' }}
        >
          <Text className="text-5xl">✅</Text>
        </View>

        <Text className="text-[#1A1A1A] text-2xl font-bold text-center mb-3">
          ¡Contraseña actualizada!
        </Text>
        <Text className="text-[#6B6B6B] text-sm text-center leading-6 mb-10">
          Tu contraseña fue cambiada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
        </Text>

        <View className="w-full">
          <Button
            label="Iniciar sesión"
            variant="primary"
            onPress={() => router.replace('/login' as any)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}