import React, { useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StatusBar,
  TouchableOpacity, ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { TagChip } from '../../components/TagChip';
import { EJERCICIOS } from '../../utils/actividadesData';

export default function YogaRestaurativoScreen() {
  const router = useRouter();
  const ejercicio = EJERCICIOS[2];
  const [favorito, setFavorito] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Imagen hero ── */}
        <ImageBackground
          source={ejercicio.imagen}
          style={{ width: '100%', height: 280 }}
          resizeMode="cover"
        >
          <View
            className="flex-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
          >
            {/* Botones top */}
            <View className="flex-row justify-between items-center px-5 pt-12">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-9 h-9 rounded-full items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Ionicons name="arrow-back" size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFavorito(!favorito)}
                className="w-9 h-9 rounded-full items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Ionicons
                  name={favorito ? 'heart' : 'heart-outline'}
                  size={18}
                  color={favorito ? '#FF6B6B' : 'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* ── Contenido ── */}
        <View className="px-5 pt-5">
          <Text className="text-[#1A1A1A] text-2xl font-bold mb-3" style={{ fontFamily: 'serif' }}>
            {ejercicio.titulo}
          </Text>

          {/* Tags */}
          <View className="flex-row gap-x-2 mb-5">
            <TagChip label="PRINCIPIANTE" />
            <TagChip label="20 MIN" />
            <TagChip label="RELAJACIÓN" />
          </View>

          {/* Descripción */}
          <View
            className="bg-white rounded-2xl p-4 mb-3"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          >
            <Text className="text-[#6B6B6B] text-xs font-bold uppercase tracking-widest mb-3">
              Descripción
            </Text>
            <Text className="text-[#4A4A4A] text-sm leading-6">
              {ejercicio.descripcion}
            </Text>
          </View>

          {/* Necesitarás */}
          <View
            className="bg-white rounded-2xl p-4 mb-6"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          >
            <Text className="text-[#6B6B6B] text-xs font-bold uppercase tracking-widest mb-3">
              Necesitarás
            </Text>
            {ejercicio.necesitaras.map((item, index) => (
              <View key={index} className="flex-row items-start gap-x-2 mb-2">
                <Text className="text-[#2D5A4E] text-sm mt-0.5">•</Text>
                <Text className="text-[#4A4A4A] text-sm flex-1">{item}</Text>
              </View>
            ))}
          </View>

          <Button
            label="▷  Comenzar ahora"
            variant="primary"
            onPress={() => router.push('/actividades/respiracion-478' as any)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}