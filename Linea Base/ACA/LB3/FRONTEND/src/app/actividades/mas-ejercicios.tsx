import React, { useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../components/ScreenHeader';
import { ExerciseCard } from '../../components/ExerciseCard';
import { EJERCICIOS, CATEGORIAS, Categoria } from '../../utils/actividadesData';

export default function MasEjerciciosScreen() {
  const router = useRouter();
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>('Todos');

  const ejerciciosFiltrados = categoriaActiva === 'Todos'
    ? EJERCICIOS
    : EJERCICIOS.filter((e) => e.categoria === categoriaActiva);

  const handlePress = (ejercicio: typeof EJERCICIOS[0]) => {
    if (ejercicio.route) {
      router.push(ejercicio.route as any);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <ScreenHeader title="Más Ejercicios" />

          {/* Filtros */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-5"
          >
            <View className="flex-row gap-x-2">
              {CATEGORIAS.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategoriaActiva(cat)}
                  activeOpacity={0.8}
                  className="px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: categoriaActiva === cat ? '#2D5A4E' : 'white',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <Text
                    className="text-sm font-medium"
                    style={{ color: categoriaActiva === cat ? 'white' : '#4A4A4A' }}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' }}>
            {ejerciciosFiltrados.map((ejercicio) => (
              <ExerciseCard
                key={ejercicio.id}
                ejercicio={ejercicio}
                onPress={() => handlePress(ejercicio)}
              />
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}