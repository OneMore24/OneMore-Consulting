import React, { useRef, useState } from 'react';
import { View, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

interface OtpInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onComplete }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newValues = [...values];
    newValues[index] = text.slice(-1);
    setValues(newValues);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    const code = newValues.join('');
    if (code.length === length) onComplete(code);
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
      {values.map((val, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputs.current[index] = ref; }}
          value={val}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          style={{
            width: '13%',
            aspectRatio: 1,
            borderRadius: 12,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1A1A1A',
            backgroundColor: val ? 'rgba(45,90,78,0.1)' : '#EFF3F0',
            borderWidth: 2,
            borderColor: val ? '#2D5A4E' : 'transparent',
          }}
        />
      ))}
    </View>
  );
};