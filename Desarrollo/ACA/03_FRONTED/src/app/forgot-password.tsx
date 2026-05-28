import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BackButton } from '../components/BackButton';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { FormCard } from '../components/FormCard';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) { setError('El correo es requerido'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Correo no válido'); return false; }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // Simula llamada a API
    setTimeout(() => {
      setLoading(false);
      router.push('/verify-code' as any);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-6 pb-10">
            <BackButton />

            {/* Ícono */}
            <View className="items-center mt-8 mb-6">
              <View className="w-20 h-20 rounded-3xl bg-[#EFF3F0] items-center justify-center mb-4">
                <Text className="text-4xl">🔒</Text>
              </View>
              <Text className="text-[#1A1A1A] text-2xl font-bold mb-2">
                ¿Olvidaste tu contraseña?
              </Text>
              <Text className="text-[#6B6B6B] text-sm text-center leading-6">
                Ingresa tu correo y te enviaremos un código para restablecer tu contraseña.
              </Text>
            </View>

            <FormCard>
              <InputField
                label="Correo Electrónico"
                placeholder="tu@correo.com"
                keyboardType="email-address"
                value={email}
                onChangeText={(t) => { setEmail(t); setError(''); }}
                error={error}
              />
              <Button
                label="Enviar código"
                variant="primary"
                loading={loading}
                onPress={handleSubmit}
              />
            </FormCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}