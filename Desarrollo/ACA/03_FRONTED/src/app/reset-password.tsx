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

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!password) e.password = 'La contraseña es requerida';
    else if (password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (!confirmPassword) e.confirmPassword = 'Confirma tu contraseña';
    else if (password !== confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/password-success' as any);
    }, 1000);
  };

  // Indicador de fortaleza
  const getStrength = () => {
    if (password.length === 0) return null;
    if (password.length < 6) return { label: 'Débil', color: '#E53E3E', bars: 1 };
    if (password.length < 10) return { label: 'Media', color: '#F6AD55', bars: 2 };
    return { label: 'Fuerte', color: '#2D5A4E', bars: 3 };
  };

  const strength = getStrength();

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

            {/* Ícono + título */}
            <View className="items-center mt-8 mb-6">
              <View className="w-20 h-20 rounded-3xl bg-[#EFF3F0] items-center justify-center mb-4">
                <Text className="text-4xl">🔑</Text>
              </View>
              <Text className="text-[#1A1A1A] text-2xl font-bold mb-2">
                Nueva contraseña
              </Text>
              <Text className="text-[#6B6B6B] text-sm text-center leading-6">
                Crea una contraseña segura que no hayas usado antes.
              </Text>
            </View>

            <FormCard>
              <InputField
                label="Nueva Contraseña"
                placeholder="Mínimo 8 caracteres"
                isPassword
                value={password}
                onChangeText={(t) => { setPassword(t); setErrors({}); }}
                error={errors.password}
              />

              {/* Indicador de fortaleza */}
              {strength && (
                <View className="flex-row items-center gap-x-2 mb-4 -mt-2">
                  <View className="flex-row gap-x-1 flex-1">
                    {[1, 2, 3].map((bar) => (
                      <View
                        key={bar}
                        className="flex-1 h-1.5 rounded-full"
                        style={{ backgroundColor: bar <= strength.bars ? strength.color : '#E0E0E0' }}
                      />
                    ))}
                  </View>
                  <Text className="text-xs font-medium" style={{ color: strength.color }}>
                    {strength.label}
                  </Text>
                </View>
              )}

              <InputField
                label="Confirmar Contraseña"
                placeholder="••••••••"
                isPassword
                value={confirmPassword}
                onChangeText={(t) => { setConfirmPassword(t); setErrors({}); }}
                error={errors.confirmPassword}
              />

              <Button
                label="Guardar contraseña"
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