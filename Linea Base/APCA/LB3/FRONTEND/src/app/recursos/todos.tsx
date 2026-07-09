import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { ResourceRow } from '../../components/ResourceRow';
import { CATEGORIAS_RECURSOS, CategoriaRecurso } from '../../utils/recursosData';
import { useRecursos } from '../../context/RecursosContext';

export default function TodosRecursosScreen() {
  const { recursos, toggleFavorito } = useRecursos();
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaRecurso>('Todos');

  const recursosFiltrados = categoriaActiva === 'Todos'
    ? recursos
    : recursos.filter((r) => {
        if (categoriaActiva === 'Artículos') return r.tipo === 'ARTÍCULO';
        if (categoriaActiva === 'Videos') return r.tipo === 'VIDEO';
        if (categoriaActiva === 'Podcasts') return r.tipo === 'PODCAST';
        return true;
      });

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4">
          <ScreenHeader title="Todos los Recursos" />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
            <View className="flex-row gap-x-2">
              {CATEGORIAS_RECURSOS.map((cat) => (
                <TouchableOpacity key={cat} onPress={() => setCategoriaActiva(cat)} activeOpacity={0.8}
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: categoriaActiva === cat ? '#2D5A4E' : 'white',
                    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 }}>
                  <Text className="text-sm font-medium"
                    style={{ color: categoriaActiva === cat ? 'white' : '#4A4A4A' }}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="bg-white rounded-2xl overflow-hidden"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
            {recursosFiltrados.map((recurso, index) => (
              <ResourceRow
                key={recurso.id}
                recurso={recurso}
                isLast={index === recursosFiltrados.length - 1}
                onToggleFavorito={() => toggleFavorito(recurso.id)}
              />
            ))}
            {recursosFiltrados.length === 0 && (
              <View className="py-10 items-center">
                <Text className="text-[#ABABAB] text-sm">No hay recursos en esta categoría</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}