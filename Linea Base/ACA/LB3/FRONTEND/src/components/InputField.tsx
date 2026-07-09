import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  isPassword = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-[10px] font-bold text-[#4A4A4A] tracking-widest uppercase mb-2">
        {label}
      </Text>
      <View
        className={`flex-row items-center bg-[#EFF3F0] rounded-2xl px-4 ${
          isFocused ? 'border border-[#2D5A4E]' : 'border border-transparent'
        } ${error ? 'border border-red-400' : ''}`}
      >
        <TextInput
          className="flex-1 py-4 text-[#1A1A1A] text-sm"
          placeholderTextColor="#ABABAB"
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color="#ABABAB"
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>
      ) : null}
    </View>
  );
};