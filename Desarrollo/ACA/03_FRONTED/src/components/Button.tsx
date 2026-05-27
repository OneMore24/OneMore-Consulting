import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: 'bg-[#2D5A4E] rounded-2xl py-4 items-center justify-center',
    text: 'text-white font-semibold text-base tracking-wide',
  },
  secondary: {
    container: 'bg-white rounded-2xl py-4 items-center justify-center border border-[#E0E0E0]',
    text: 'text-[#1A1A1A] font-semibold text-base tracking-wide',
  },
  ghost: {
    container: 'bg-white/20 rounded-2xl py-4 items-center justify-center',
    text: 'text-white font-semibold text-base tracking-wide',
  },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = true,
  style,
  disabled,
  ...rest
}) => {
  const styles = variantStyles[variant];

  return (
    <TouchableOpacity
      className={`${styles.container} ${fullWidth ? 'w-full' : ''} ${
        disabled ? 'opacity-50' : 'active:opacity-80'
      }`}
      disabled={disabled || loading}
      style={style}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#2D5A4E'} />
      ) : (
        <Text className={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};