import React, { useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar,
  TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../../components/ScreenHeader';
import { NoteCard } from '../../components/NoteCard';
import { Button } from '../../components/Button';
import { NOTAS_INICIALES, Nota } from '../../utils/diarioData';

const EMOJIS = ['😊', '😄', '😐', '😕', '😢', '😤', '🌿', '⭐', '🔥', '💪'];

export default function NotasScreen() {
  const [notas, setNotas] = useState<Nota[]>(NOTAS_INICIALES);
  const [modalVisible, setModalVisible] = useState(false);
  const [texto, setTexto] = useState('');
  const [emojiSeleccionado, setEmojiSeleccionado] = useState('😊');

  const agregarNota = () => {
    if (!texto.trim()) return;
    const nueva: Nota = {
      id: Date.now().toString(),
      fecha: 'HOY',
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      emoji: emojiSeleccionado,
      texto: texto.trim(),
    };
    setNotas([nueva, ...notas]);
    setTexto('');
    setEmojiSeleccionado('😊');
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-4">
            {/* ── Header ── */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center gap-x-3">
                <ScreenHeader title="Mis Notas" />
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="w-10 h-10 rounded-full bg-[#2D5A4E] items-center justify-center"
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={22} color="white" />
              </TouchableOpacity>
            </View>

            {/* ── Lista de notas ── */}
            {notas.map((nota) => (
              <NoteCard key={nota.id} nota={nota} />
            ))}

            {/* ── Añadir nueva nota ── */}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
              className="rounded-2xl py-5 items-center mb-4"
              style={{
                borderWidth: 1.5,
                borderColor: '#CCCCCC',
                borderStyle: 'dashed',
                backgroundColor: 'transparent',
              }}
            >
              <Ionicons name="add" size={20} color="#ABABAB" />
              <Text className="text-[#ABABAB] text-sm mt-1">Añadir nueva nota</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* ── Modal nueva nota ── */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          />
          <View className="bg-white rounded-t-3xl px-6 pt-5 pb-8">
            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-[#E0E0E0] self-center mb-5" />

            <Text className="text-[#1A1A1A] text-lg font-bold mb-4">Nueva nota</Text>

            {/* Selector de emoji */}
            <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-2">
              ¿Cómo te sientes?
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row gap-x-2">
                {EMOJIS.map((e) => (
                  <TouchableOpacity
                    key={e}
                    onPress={() => setEmojiSeleccionado(e)}
                    className={`w-11 h-11 rounded-full items-center justify-center ${
                      emojiSeleccionado === e ? 'bg-[#2D5A4E]/15' : 'bg-[#F2F5F2]'
                    }`}
                    style={emojiSeleccionado === e ? { borderWidth: 2, borderColor: '#2D5A4E' } : {}}
                  >
                    <Text className="text-2xl">{e}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Texto */}
            <Text className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-2">
              Tu nota
            </Text>
            <TextInput
              className="bg-[#F2F5F2] rounded-2xl px-4 py-3 text-sm text-[#1A1A1A] mb-5"
              placeholder="Escribe cómo te sientes hoy..."
              placeholderTextColor="#ABABAB"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={texto}
              onChangeText={setTexto}
              style={{ minHeight: 100 }}
            />

            <Button
              label="Guardar nota"
              variant="primary"
              onPress={agregarNota}
              disabled={!texto.trim()}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}