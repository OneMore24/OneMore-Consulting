import React from 'react';
import { View, ViewProps } from 'react-native';

interface FormCardProps extends ViewProps {
  children: React.ReactNode;
}

export const FormCard: React.FC<FormCardProps> = ({ children, style, ...rest }) => {
  return (
    <View
      className="bg-white rounded-3xl p-6 w-full"
      style={[
        {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.06,
          shadowRadius: 16,
          elevation: 4,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};