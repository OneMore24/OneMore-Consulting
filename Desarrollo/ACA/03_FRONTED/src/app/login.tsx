import "../../global.css";
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { BackButton } from '../components/BackButton';
import { FormCard } from '../components/FormCard';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Correo no válido';
    if (!password) e.password = 'La contraseña es requerida';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 px-6 pt-6 pb-10">
            <BackButton />
            <Text className="text-[#1A1A1A] text-3xl font-bold mt-8 mb-1">
              Bienvenido de nuevo
            </Text>
            <Text className="text-[#6B6B6B] text-sm mb-8">
              Inicia sesión para continuar
            </Text>
            <FormCard>
              <InputField
                label="Correo Electrónico"
                placeholder="tu@correo.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
              />
              <InputField
                label="Contraseña"
                placeholder="••••••••"
                isPassword
                value={password}
                onChangeText={setPassword}
                error={errors.password}
              />
              <TouchableOpacity className="self-end mb-5">
                <Text className="text-[#4A4A4A] text-sm">¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
              <Button label="Iniciar Sesión" variant="primary" onPress={() => { if (validate()) {router.replace('/home' as any);} }} />
            </FormCard>
            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-[#6B6B6B] text-sm">¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={() => router.push('/register' as any)}>
                <Text className="text-[#2D5A4E] font-bold text-sm">Regístrate gratis</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}