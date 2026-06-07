import React, { useRef, useEffect } from 'react';
import {
  View, Text, Modal, TouchableOpacity,
  Animated, Linking, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface SOSModalProps {
  visible: boolean;
  onClose: () => void;
}

const NUMEROS_EMERGENCIA = [
  { label: 'Línea de crisis emocional', numero: '800-290-0024', icono: '🧠' },
  { label: 'Emergencias generales', numero: '911', icono: '🚨' },
  { label: 'Contacto de confianza', numero: '', icono: '👤', esContacto: true },
];

export const SOSModal: React.FC<SOSModalProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(400)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 200,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 400,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleLlamar = (numero: string, label: string) => {
    if (!numero) {
      Alert.alert(
        'Contacto de confianza',
        'No tienes un contacto de confianza configurado. ¿Quieres agregarlo?',
        [
          { text: 'Ahora no', style: 'cancel' },
          { text: 'Configurar', onPress: () => { onClose(); } },
        ]
      );
      return;
    }
    Alert.alert(
      `Llamar a ${label}`,
      `¿Confirmas llamar al ${numero}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Llamar',
          onPress: () => {
            Linking.openURL(`tel:${numero}`).catch(() =>
              Alert.alert('Error', 'No se pudo realizar la llamada')
            );
          },
        },
      ]
    );
  };

  const handleRespiracion = () => {
    onClose();
    setTimeout(() => {
      router.push('/actividades/respiracion-478' as any);
    }, 300);
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.55)',
          opacity: backdropAnim,
        }}
      >
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />

        {/* Sheet */}
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            backgroundColor: 'white',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 36,
          }}
        >
          {/* Handle */}
          <View style={{
            width: 40, height: 4, borderRadius: 2,
            backgroundColor: '#E0E0E0', alignSelf: 'center', marginBottom: 20,
          }} />

          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <View style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: '#FFF5F5', alignItems: 'center',
              justifyContent: 'center', marginRight: 10,
            }}>
              <Text style={{ fontSize: 18 }}>🆘</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' }}>
                ¿Necesitas ayuda?
              </Text>
              <Text style={{ fontSize: 12, color: '#6B6B6B', marginTop: 2 }}>
                Estamos aquí para ti
              </Text>
            </View>
          </View>

          {/* Separador */}
          <View style={{ height: 1, backgroundColor: '#F0F0F0', marginVertical: 16 }} />

          {/* Opción respiración */}
          <Text style={{ fontSize: 11, color: '#6B6B6B', fontWeight: '700',
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Ejercicio inmediato
          </Text>

          <TouchableOpacity
            onPress={handleRespiracion}
            activeOpacity={0.85}
            style={{
              flexDirection: 'row', alignItems: 'center',
              backgroundColor: '#1E3D30', borderRadius: 18,
              padding: 16, marginBottom: 20,
            }}
          >
            <View style={{
              width: 44, height: 44, borderRadius: 22,
              backgroundColor: 'rgba(255,255,255,0.15)',
              alignItems: 'center', justifyContent: 'center', marginRight: 14,
            }}>
              <Text style={{ fontSize: 22 }}>💨</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginBottom: 2 }}>
                Respiración 4–7–8
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>
                Calma el sistema nervioso en minutos
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>

          {/* Opción llamar */}
          <Text style={{ fontSize: 11, color: '#6B6B6B', fontWeight: '700',
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Llamar a alguien
          </Text>

          <View style={{ gap: 10 }}>
            {NUMEROS_EMERGENCIA.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => handleLlamar(item.numero, item.label)}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row', alignItems: 'center',
                  backgroundColor: '#F2F5F2', borderRadius: 16,
                  padding: 14,
                }}
              >
                <View style={{
                  width: 40, height: 40, borderRadius: 20,
                  backgroundColor: 'white', alignItems: 'center',
                  justifyContent: 'center', marginRight: 12,
                  shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06, shadowRadius: 4, elevation: 1,
                }}>
                  <Text style={{ fontSize: 18 }}>{item.icono}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#1A1A1A', fontWeight: '600', fontSize: 13 }}>
                    {item.label}
                  </Text>
                  {item.numero ? (
                    <Text style={{ color: '#2D5A4E', fontSize: 12, marginTop: 1, fontWeight: '600' }}>
                      {item.numero}
                    </Text>
                  ) : (
                    <Text style={{ color: '#ABABAB', fontSize: 12, marginTop: 1 }}>
                      No configurado
                    </Text>
                  )}
                </View>
                <Ionicons name="call-outline" size={18} color="#2D5A4E" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Cancelar */}
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            style={{ marginTop: 16, alignItems: 'center', paddingVertical: 10 }}
          >
            <Text style={{ color: '#ABABAB', fontSize: 14 }}>Cancelar</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};