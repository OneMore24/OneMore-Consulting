import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { BackButton } from '../components/BackButton';
import { SuggestionItem } from '../components/SuggestionItem';

const SUGGESTIONS = [
  {
    id: '1',
    title: 'Respiración 4–7–8',
    subtitle: 'Técnica de relajación profunda',
    duration: '5 min',
    image: require('../../assets/images/suggestion1.jpg'),
    
  },
  {
    id: '2',
    title: 'Meditación guiada',
    subtitle: 'Para calmar la mente',
    duration: '10 min',
    image: require('../../assets/images/suggestion2.jpg'),
  },
  {
    id: '3',
    title: 'Caminata mindful',
    subtitle: 'Conecta con el presente',
    duration: '15 min',
    image: require('../../assets/images/suggestion3.jpg'),
  },
  {
    id: '4',
    title: 'Estiramiento suave',
    subtitle: 'Libera la tensión corporal',
    duration: '8 min',
    image: require('../../assets/images/suggestion4.jpg'),
  },
];

export default function SugerenciasScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">

          {/* ── Header ── */}
          <BackButton />
          <Text
            className="text-[#1A1A1A] text-2xl font-bold mt-4 mb-6"
            style={{ fontFamily: 'serif' }}
          >
            Sugerencias del Día
          </Text>

          {/* ── Lista completa ── */}
          {SUGGESTIONS.map((s) => (
            <SuggestionItem
              key={s.id}
              title={s.title}
              subtitle={s.subtitle}
              duration={s.duration}
              image={s.image}
              onPress={() => {}}
            />
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}