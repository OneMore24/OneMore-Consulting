import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';

interface SOSButtonProps {
  onPress: () => void;
}

export const SOSButton: React.FC<SOSButtonProps> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        position: 'absolute',
        bottom: 90,
        right: 20,
        shadowColor: '#E53E3E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 100,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#E53E3E',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: '#FFF5F5',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }}>
          SOS
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};