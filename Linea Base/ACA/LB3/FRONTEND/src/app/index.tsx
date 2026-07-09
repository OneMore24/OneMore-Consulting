import "../../global.css";
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../../assets/images/mountains.jpg')}
        className="flex-1"
        resizeMode="cover"
      >
        <View
          className="flex-1"
          style={{ backgroundColor: 'rgba(20,35,30,0.45)' }}
        >
          <SafeAreaView className="flex-1 justify-between px-6 pb-8 pt-16">

            {/* Logo + Título */}
            <View className="items-center mt-8">
              <View
                className="w-16 h-16 rounded-2xl items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
              >
                <Text className="text-white text-3xl" style={{ fontFamily: 'serif' }}>
                  A
                </Text>
              </View>

              <Text className="text-white text-5xl font-bold mb-2 tracking-wider" style={{ fontFamily: 'serif' }}>
                ACA
              </Text>

              <Text className="text-white/80 text-base tracking-wide">
                Tu santuario de bienestar mental
              </Text>
            </View>

            {/* Botones */}
            <View className="w-full gap-y-3">
              <Button
                label="Iniciar Sesión"
                variant="secondary"
                onPress={() => router.push('/login' as any)}
              />
              <Button
                label="Crear cuenta"
                variant="ghost"
                onPress={() => router.push('/register' as any)}
              />
              <Text className="text-white/60 text-xs text-center mt-2">
                Al continuar aceptas nuestros Términos de Uso
              </Text>
            </View>

          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}