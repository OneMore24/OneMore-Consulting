import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../../components/ScreenHeader';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { FormCard } from '../../components/FormCard';
import { proximamente } from '../../utils/proximamente';

export default function EditarInfoScreen() {
  const [nombre, setNombre] = useState('Ana');
  const [apellido, setApellido] = useState('García');
  const [email, setEmail] = useState('ana@correo.com');
  const [fechaNacimiento, setFechaNacimiento] = useState('15/03/1995');
  const [genero, setGenero] = useState('');
  const [biografia, setBiografia] = useState('');
  const router = useRouter();

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
          <ScreenHeader title="Editar Información" />

          {/* ── Avatar ── */}
          <View className="items-center mb-6">
            <TouchableOpacity activeOpacity={0.8} onPress={() => proximamente('El cambio de foto de perfil estará disponible próximamente.')}>
              <View
                className="w-20 h-20 rounded-2xl items-center justify-center mb-2"
                style={{
                  borderWidth: 2,
                  borderColor: '#2D5A4E',
                  borderStyle: 'dashed',
                  backgroundColor: '#F2F5F2',
                }}
              >
                <Ionicons name="person-outline" size={36} color="#2D5A4E" />
              </View>
              <Text className="text-[#2D5A4E] text-xs text-center font-medium">
                Cambiar foto de perfil
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Formulario ── */}
          <FormCard>
            <InputField
              label="Nombre"
              placeholder="Ana"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
            />
            <InputField
              label="Apellido"
              placeholder="García"
              value={apellido}
              onChangeText={setApellido}
              autoCapitalize="words"
            />
            <InputField
              label="Correo Electrónico"
              placeholder="ana@correo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <InputField
              label="Fecha de Nacimiento"
              placeholder="15/03/1995"
              value={fechaNacimiento}
              onChangeText={setFechaNacimiento}
            />
            <View className="mb-4">
            <Text className="text-[10px] font-bold text-[#4A4A4A] tracking-widest uppercase mb-2">
                Género
            </Text>
            <View className="flex-row gap-x-3">
                {['Masculino', 'Femenino'].map((opcion) => (
                <TouchableOpacity
                    key={opcion}
                    onPress={() => setGenero(opcion)}
                    activeOpacity={0.8}
                    className={`flex-1 py-4 rounded-2xl items-center ${
                    genero === opcion
                        ? 'bg-[#2D5A4E]'
                        : 'bg-[#EFF3F0]'
                    }`}
                >
                    <Text className={`text-sm font-medium ${
                    genero === opcion ? 'text-white' : 'text-[#4A4A4A]'
                    }`}>
                    {opcion}
                    </Text>
                </TouchableOpacity>
                ))}
            </View>
            </View>
            <InputField
              label="Biografía"
              placeholder="Cuéntanos sobre ti..."
              value={biografia}
              onChangeText={setBiografia}
              multiline
              numberOfLines={3}
            />
            <Button label="Guardar cambios" variant="primary" onPress={() => router.back()} />
          </FormCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}