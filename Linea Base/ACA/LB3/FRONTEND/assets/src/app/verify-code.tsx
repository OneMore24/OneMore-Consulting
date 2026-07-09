import React, { useState, useEffect } from 'react';
import {
  View, Text, SafeAreaView, StatusBar,
  TouchableOpacity, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BackButton } from '../components/BackButton';
import { OtpInput } from '../components/OtpInput';
import { Button } from '../components/Button';
import { FormCard } from '../components/FormCard';

const RESEND_SECONDS = 60;

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleComplete = (value: string) => {
    setCode(value);
    setError('');
  };

  const handleVerify = () => {
    if (code.length < 6) { setError('Ingresa el código completo'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/reset-password' as any);
    }, 1000);
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setSeconds(RESEND_SECONDS);
    setError('');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-6 pb-10">
          <BackButton />

          {/* Ícono + título */}
          <View className="items-center mt-8 mb-6">
            <View className="w-20 h-20 rounded-3xl bg-[#EFF3F0] items-center justify-center mb-4">
              <Text className="text-4xl">✉️</Text>
            </View>
            <Text className="text-[#1A1A1A] text-2xl font-bold mb-2">
              Revisa tu correo
            </Text>
            <Text className="text-[#6B6B6B] text-sm text-center leading-6">
              Enviamos un código de 6 dígitos a tu correo. Puede tardar unos minutos.
            </Text>
          </View>

          <FormCard>
            <OtpInput length={6} onComplete={handleComplete} />

            {error ? (
              <Text className="text-red-500 text-xs text-center mb-3">{error}</Text>
            ) : null}

            <Button
              label="Verificar código"
              variant="primary"
              loading={loading}
              onPress={handleVerify}
            />

            {/* Reenviar */}
            <View className="flex-row justify-center items-center mt-4">
              <Text className="text-[#6B6B6B] text-sm">¿No recibiste el código? </Text>
              <TouchableOpacity onPress={handleResend} disabled={seconds > 0}>
                <Text className={`text-sm font-bold ${seconds > 0 ? 'text-[#ABABAB]' : 'text-[#2D5A4E]'}`}>
                  {seconds > 0 ? `Reenviar en ${seconds}s` : 'Reenviar'}
                </Text>
              </TouchableOpacity>
            </View>
          </FormCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}