import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Polyline, Circle, Line, Defs, LinearGradient, Stop, Path } from 'react-native-svg';

interface TendenciasChartProps {
  labels: string[];
  animo: number[];
  energia: number[];
}

const CHART_HEIGHT = 120;
const MAX_VALUE = 5;
const MIN_VALUE = 1;

export const TendenciasChart: React.FC<TendenciasChartProps> = ({ labels, animo, energia }) => {
  const paddingH = 16;
  const paddingV = 12;
  const width = 320;

  const getY = (value: number) => {
    const range = MAX_VALUE - MIN_VALUE;
    return paddingV + ((MAX_VALUE - value) / range) * (CHART_HEIGHT - paddingV * 2);
  };

  const getX = (index: number, total: number) =>
    paddingH + (index / (total - 1)) * (width - paddingH * 2);

  const buildPath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i, data.length)},${getY(v)}`).join(' ');

  const buildAreaPath = (data: number[]) => {
    const points = data.map((v, i) => `${getX(i, data.length)},${getY(v)}`).join(' L ');
    const lastX = getX(data.length - 1, data.length);
    const firstX = getX(0, data.length);
    return `M ${firstX},${CHART_HEIGHT} L ${points} L ${lastX},${CHART_HEIGHT} Z`;
  };

  return (
    <View
      className="bg-white rounded-2xl p-4 mb-4"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
    >
      <Text className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-3">
        Ánimo y Energía
      </Text>

      <Svg width="100%" height={CHART_HEIGHT} viewBox={`0 0 ${width} ${CHART_HEIGHT}`}>
        <Defs>
          <LinearGradient id="animoGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#2D5A4E" stopOpacity="0.15" />
            <Stop offset="1" stopColor="#2D5A4E" stopOpacity="0" />
          </LinearGradient>
          <LinearGradient id="energiaGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#7B68EE" stopOpacity="0.15" />
            <Stop offset="1" stopColor="#7B68EE" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Líneas de cuadrícula */}
        {[1, 2, 3, 4, 5].map((v) => (
          <Line
            key={v}
            x1={paddingH} y1={getY(v)}
            x2={width - paddingH} y2={getY(v)}
            stroke="#F0F0F0" strokeWidth="1"
          />
        ))}

        {/* Área ánimo */}
        <Path d={buildAreaPath(animo)} fill="url(#animoGrad)" />
        {/* Área energía */}
        <Path d={buildAreaPath(energia)} fill="url(#energiaGrad)" />

        {/* Línea ánimo */}
        <Polyline
          points={animo.map((v, i) => `${getX(i, animo.length)},${getY(v)}`).join(' ')}
          fill="none" stroke="#2D5A4E" strokeWidth="2.5"
        />
        {/* Línea energía */}
        <Polyline
          points={energia.map((v, i) => `${getX(i, energia.length)},${getY(v)}`).join(' ')}
          fill="none" stroke="#7B68EE" strokeWidth="2.5"
        />

        {/* Puntos ánimo */}
        {animo.map((v, i) => (
          <Circle key={i} cx={getX(i, animo.length)} cy={getY(v)} r={3.5}
            fill="#2D5A4E" stroke="white" strokeWidth="1.5" />
        ))}
        {/* Puntos energía */}
        {energia.map((v, i) => (
          <Circle key={i} cx={getX(i, energia.length)} cy={getY(v)} r={3.5}
            fill="#7B68EE" stroke="white" strokeWidth="1.5" />
        ))}
      </Svg>

      <View className="flex-row justify-between px-2 mt-1 mb-3">
        {labels.map((l, index) => (
            <Text key={index} className="text-[#6B6B6B] text-xs">{l}</Text>
        ))}
        </View>

      {/* Leyenda */}
      <View className="flex-row gap-x-5">
        <View className="flex-row items-center gap-x-1.5">
          <View className="w-3 h-1 rounded-full bg-[#2D5A4E]" />
          <Text className="text-[#4A4A4A] text-xs">Ánimo</Text>
        </View>
        <View className="flex-row items-center gap-x-1.5">
          <View className="w-3 h-1 rounded-full bg-[#7B68EE]" />
          <Text className="text-[#4A4A4A] text-xs">Energía</Text>
        </View>
      </View>
    </View>
  );
};