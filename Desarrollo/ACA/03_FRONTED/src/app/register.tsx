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
import { Checkbox } from '../components/Checkbox';
import { FormCard } from '../components/FormCard';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = 'El nombre es requerido';
    if (!email) e.email = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Correo no válido';
    if (!password) e.password = 'La contraseña es requerida';
    else if (password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (password !== confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    if (!acceptedTerms) e.terms = 'Debes aceptar los términos';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await register(fullName.trim(), email, password);
      router.replace('/home' as any);
    } catch (err: any) {
      setErrors({ general: err?.message || 'No se pudo crear la cuenta' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 px-6 pt-6 pb-10">
            <BackButton />
            <Text className="text-[#1A1A1A] text-3xl font-bold mt-8 mb-1">
              Crea tu cuenta
            </Text>
            <Text className="text-[#6B6B6B] text-sm mb-8">
              Empieza tu camino hacia el bienestar
            </Text>
            <FormCard>
              <InputField label="Nombre Completo" placeholder="Ana García"
                value={fullName} onChangeText={setFullName} error={errors.fullName} autoCapitalize="words" />
              <InputField label="Correo Electrónico" placeholder="tu@correo.com"
                keyboardType="email-address" value={email} onChangeText={setEmail} error={errors.email} />
              <InputField label="Contraseña" placeholder="Mínimo 8 caracteres"
                isPassword value={password} onChangeText={setPassword} error={errors.password} />
              <InputField label="Confirmar Contraseña" placeholder="••••••••"
                isPassword value={confirmPassword} onChangeText={setConfirmPassword} error={errors.confirmPassword} />
              <View className="mb-5">
                <Checkbox
                  checked={acceptedTerms}
                  onPress={() => setAcceptedTerms(p => !p)}
                  labelComponent={
                    <Text className="flex-1 text-[#4A4A4A] text-sm leading-5">
                      Acepto los <Text className="text-[#2D5A4E] font-semibold">Términos y Condiciones</Text> y la <Text className="text-[#2D5A4E] font-semibold">Política de Privacidad</Text> de APCA
                    </Text>
                  }
                />
                {errors.terms ? <Text className="text-red-500 text-xs mt-1 ml-9">{errors.terms}</Text> : null}
              </View>
              {errors.general ? (
                <Text className="text-red-500 text-sm text-center mb-3">{errors.general}</Text>
              ) : null}
              <Button label="Crear cuenta" variant="primary" loading={loading} onPress={handleRegister} />
            </FormCard>
            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-[#6B6B6B] text-sm">¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => router.push('/login' as any)}>
                <Text className="text-[#2D5A4E] font-bold text-sm">Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}