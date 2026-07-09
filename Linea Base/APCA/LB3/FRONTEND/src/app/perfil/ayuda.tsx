import React, { useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar,
  TextInput, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SettingsCard } from '../../components/SettingsCard';
import { SettingsRow } from '../../components/SettingsRow';
import { Button } from '../../components/Button';
import { proximamente } from '../../utils/proximamente';

const FAQS = [
  '¿Cómo funciona el cuestionario diario?',
  '¿Es privada mi información?',
  '¿Puedo exportar mi historial?',
  '¿Cómo cambio las notificaciones?',
  '¿Cómo contacto a un profesional?',
];

export default function AyudaScreen() {
  const [mensaje, setMensaje] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <ScreenHeader title="Ayuda y Soporte" />

          {/* ── Buscador ── */}
          <View
            className="flex-row items-center bg-white rounded-2xl px-4 py-3 mb-5"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          >
            <Ionicons name="search-outline" size={18} color="#ABABAB" />
            <TextInput
              className="flex-1 ml-2 text-sm text-[#1A1A1A]"
              placeholder="Buscar en preguntas frecuentes..."
              placeholderTextColor="#ABABAB"
            />
          </View>

          {/* ── FAQs ── */}
          <SettingsCard sectionLabel="Preguntas Frecuentes">
            {FAQS.map((faq, index) => (
              <SettingsRow
                key={index}
                label={faq}
                onPress={() => proximamente('Pronto encontrarás aquí la respuesta a esta pregunta.')}
                isLast={index === FAQS.length - 1}
              />
            ))}
          </SettingsCard>

          {/* ── Contacto directo ── */}
          <SettingsCard sectionLabel="Contacto Directo">
            <View className="p-4">
              <Text className="text-[#6B6B6B] text-sm mb-3">
                ¿No encontraste lo que buscabas? Escríbenos.
              </Text>
              <TextInput
                className="bg-[#F2F5F2] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] mb-4"
                placeholder="Describe tu consulta..."
                placeholderTextColor="#ABABAB"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={mensaje}
                onChangeText={setMensaje}
                style={{ minHeight: 90 }}
              />
              <Button
                label="  Enviar mensaje"
                variant="primary"
                onPress={() => {
                  if (!mensaje.trim()) {
                    proximamente('Escribe tu consulta antes de enviarla.');
                    return;
                  }
                  setMensaje('');
                  proximamente('¡Mensaje enviado! Te responderemos pronto.');
                }}
              />
            </View>
          </SettingsCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}