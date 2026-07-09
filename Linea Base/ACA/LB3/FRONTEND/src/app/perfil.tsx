import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavBar } from '../components/BottomNavBar';
import { SettingsCard } from '../components/SettingsCard';
import { SettingsRow } from '../components/SettingsRow';
import { useAuth } from '../context/AuthContext';
import { useRegistros } from '../context/RegistrosContext';
import { calcularEstadisticas } from '../utils/estadisticas';

const MENU_ITEMS = [
  { icon: 'person-outline', label: 'Editar Información', route: '/perfil/editar-info' },
  { icon: 'settings-outline', label: 'Configuración', route: '/perfil/configuracion' },
  { icon: 'notifications-outline', label: 'Notificaciones', route: '/perfil/notificaciones' },
  { icon: 'shield-outline', label: 'Privacidad y Seguridad', route: '/perfil/privacidad' },
  { icon: 'trending-up-outline', label: 'Seguimiento Emocional', route: '/perfil/seguimiento' },
  { icon: 'chatbubble-outline', label: 'Ayuda y Soporte', route: '/perfil/ayuda' },
] as const;

export default function PerfilScreen() {
  const router = useRouter();
  const { usuario } = useAuth();
  const { registros } = useRegistros();
  const stats = calcularEstadisticas(registros);

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5F2" />

      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header verde ── */}
          <View
            className="px-5 pt-10 pb-6"
            style={{ backgroundColor: '#3D6B5E' }}
          >
            {/* Avatar + info */}
            <View className="flex-row items-center gap-x-4 mb-5">
              <View className="w-16 h-16 rounded-2xl bg-white/20 items-center justify-center">
                <Ionicons name="person-outline" size={32} color="white" />
              </View>
              <View>
                <Text className="text-white text-xl font-bold">{usuario?.nombre ?? 'Invitado'}</Text>
                <Text className="text-white/70 text-sm">{usuario?.correo ?? 'Inicia sesión'}</Text>
                <View className="flex-row items-center gap-x-1 mt-1">
                  <Text className="text-sm">⭐</Text>
                  <Text className="text-white/70 text-xs">Paciente de Clínica Anxiety</Text>
                </View>
              </View>
            </View>

            {/* Stats */}
            <View className="flex-row gap-x-3">
              {[
                { value: String(stats.entradas), label: 'ENTRADAS' },
                { value: `${stats.racha}🔥`, label: 'RACHA' },
                { value: stats.promedioTexto, label: 'PROMEDIO' },
              ].map((stat) => (
                <View
                  key={stat.label}
                  className="flex-1 bg-white/15 rounded-2xl py-3 items-center"
                >
                  <Text className="text-white font-bold text-base">{stat.value}</Text>
                  <Text className="text-white/60 text-[10px] tracking-widest mt-0.5">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Menu ── */}
          <View className="px-5 pt-4">
            <SettingsCard>
              {MENU_ITEMS.map((item, index) => (
                <SettingsRow
                  key={item.route}
                  icon={item.icon as any}
                  label={item.label}
                  onPress={() => router.push(item.route as any)}
                  isLast={index === MENU_ITEMS.length - 1}
                />
              ))}
            </SettingsCard>

            {/* Cerrar sesión */}
            <SettingsCard>
              <SettingsRow
                icon="log-out-outline"
                label="Cerrar Sesión"
                danger
                onPress={() => router.push('/perfil/cerrar-sesion' as any)}
                isLast
              />
            </SettingsCard>
          </View>
        </ScrollView>

        {/* ── Navbar ── */}
        <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}