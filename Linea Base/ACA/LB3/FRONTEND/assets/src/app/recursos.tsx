import React, { useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar,
  TouchableOpacity, TextInput, Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavBar } from '../components/BottomNavBar';
import { SectionHeader } from '../components/SectionHeader';
import { ResourceRow } from '../components/ResourceRow';
import { FavoritosCarousel } from '../components/FavoritosCarousel';
import { CATEGORIAS_RECURSOS, CategoriaRecurso } from '../utils/recursosData';
import { useRecursos } from '../context/RecursosContext';

export default function RecursosScreen() {
  const router = useRouter();
  const { recursos, toggleFavorito, busqueda, setBusqueda } = useRecursos();
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaRecurso>('Todos');
  const [modalBusqueda, setModalBusqueda] = useState(false);

  const favoritos = recursos.filter((r) => r.favorito);
  const articulos = recursos.filter((r) => r.tipo === 'ARTÍCULO').slice(0, 3);
  const videos = recursos.filter((r) => r.tipo === 'VIDEO').slice(0, 2);

  const resultadosBusqueda = recursos.filter((r) =>
    r.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-6">

            {/* ── Header ── */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#1A1A1A] text-2xl font-bold" style={{ fontFamily: 'serif' }}>
                Recursos
              </Text>
              <TouchableOpacity
                onPress={() => setModalBusqueda(true)}
                className="w-10 h-10 rounded-full bg-white items-center justify-center"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
              >
                <Ionicons name="search-outline" size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            {/* ── Filtros ── */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
              <View className="flex-row gap-x-2">
                {CATEGORIAS_RECURSOS.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setCategoriaActiva(cat)}
                    activeOpacity={0.8}
                    className="px-4 py-2 rounded-full"
                    style={{
                      backgroundColor: categoriaActiva === cat ? '#2D5A4E' : 'white',
                      shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
                    }}
                  >
                    <Text className="text-sm font-medium"
                      style={{ color: categoriaActiva === cat ? 'white' : '#4A4A4A' }}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* ── Favoritos ── */}
            <SectionHeader title="Favoritos" onVerTodo={() => router.push('/recursos/todos' as any)} />
            {favoritos.length > 0 ? (
              <FavoritosCarousel recursos={favoritos} onPress={(r) => toggleFavorito(r.id)} />
            ) : (
              <View className="bg-white rounded-2xl py-6 items-center mb-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
                <Text className="text-[#ABABAB] text-sm">No tienes favoritos aún</Text>
              </View>
            )}

            {/* ── Artículos ── */}
            <SectionHeader title="Artículos" onVerTodo={() => router.push('/recursos/todos' as any)} />
            <View className="bg-white rounded-2xl overflow-hidden mb-5"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
              {articulos.map((r, index) => (
                <ResourceRow
                  key={r.id}
                  recurso={r}
                  isLast={index === articulos.length - 1}
                  onToggleFavorito={() => toggleFavorito(r.id)}
                />
              ))}
            </View>

            {/* ── Videos ── */}
            <SectionHeader title="Videos" onVerTodo={() => router.push('/recursos/todos' as any)} />
            <View className="bg-white rounded-2xl overflow-hidden mb-4"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
              {videos.map((r, index) => (
                <ResourceRow
                  key={r.id}
                  recurso={r}
                  isLast={index === videos.length - 1}
                  onToggleFavorito={() => toggleFavorito(r.id)}
                />
              ))}
            </View>

          </View>
        </ScrollView>

        <BottomNavBar />
      </View>

      {/* ── Modal búsqueda ── */}
      <Modal visible={modalBusqueda} animationType="fade" transparent>
        <View className="flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <SafeAreaView className="flex-1">
            <View className="bg-[#F2F5F2] flex-1">

              {/* Barra de búsqueda */}
              <View className="flex-row items-center px-5 py-3 gap-x-3">
                <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 py-3 gap-x-2"
                  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
                  <Ionicons name="search-outline" size={18} color="#ABABAB" />
                  <TextInput
                    className="flex-1 text-sm text-[#1A1A1A]"
                    placeholder="Buscar recursos..."
                    placeholderTextColor="#ABABAB"
                    value={busqueda}
                    onChangeText={setBusqueda}
                    autoFocus
                  />
                  {busqueda.length > 0 && (
                    <TouchableOpacity onPress={() => setBusqueda('')}>
                      <Ionicons name="close-circle" size={18} color="#ABABAB" />
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity onPress={() => { setModalBusqueda(false); setBusqueda(''); }}>
                  <Text className="text-[#2D5A4E] text-sm font-medium">Cancelar</Text>
                </TouchableOpacity>
              </View>

              {/* Resultados */}
              <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                {busqueda.length === 0 ? (
                  <View className="items-center mt-16">
                    <Ionicons name="search-outline" size={48} color="#CCCCCC" />
                    <Text className="text-[#ABABAB] text-sm mt-3">Escribe para buscar recursos</Text>
                  </View>
                ) : resultadosBusqueda.length === 0 ? (
                  <View className="items-center mt-16">
                    <Text className="text-[#ABABAB] text-sm">Sin resultados para "{busqueda}"</Text>
                  </View>
                ) : (
                  <View className="bg-white rounded-2xl overflow-hidden"
                    style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
                    {resultadosBusqueda.map((r, index) => (
                      <ResourceRow
                        key={r.id}
                        recurso={r}
                        isLast={index === resultadosBusqueda.length - 1}
                        onToggleFavorito={() => toggleFavorito(r.id)}
                      />
                    ))}
                  </View>
                )}
              </ScrollView>

            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}