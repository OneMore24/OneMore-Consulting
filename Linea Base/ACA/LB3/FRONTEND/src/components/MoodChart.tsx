import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Polyline, Circle, Line } from 'react-native-svg';

interface MoodChartProps {
  data: { day: string; value: number }[];
}

const CHART_HEIGHT = 100;
const DOT_RADIUS = 5;
const MAX_VALUE = 5;
const MIN_VALUE = 1;

export const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const paddingH = 16;
  const paddingV = 12;

  const getY = (value: number, height: number) => {
    const range = MAX_VALUE - MIN_VALUE;
    return paddingV + ((MAX_VALUE - value) / range) * (height - paddingV * 2);
  };

  return (
    <View
      className="bg-white rounded-2xl p-4 mb-4"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
    >
      <Text className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-3">
        Estado de Ánimo
      </Text>

      <View>
        <Svg width="100%" height={CHART_HEIGHT} viewBox={`0 0 ${320} ${CHART_HEIGHT}`}>
          {/* Líneas de cuadrícula horizontales */}
          {[1, 2, 3, 4, 5].map((v) => (
            <Line
              key={v}
              x1={paddingH}
              y1={getY(v, CHART_HEIGHT)}
              x2={320 - paddingH}
              y2={getY(v, CHART_HEIGHT)}
              stroke="#E8EDE9"
              strokeWidth="1"
            />
          ))}

          {/* Línea de datos */}
          <Polyline
            points={data
              .map((d, i) => {
                const x = paddingH + (i / (data.length - 1)) * (320 - paddingH * 2);
                const y = getY(d.value, CHART_HEIGHT);
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="#2D5A4E"
            strokeWidth="2"
          />

          {/* Puntos */}
          {data.map((d, i) => {
            const x = paddingH + (i / (data.length - 1)) * (320 - paddingH * 2);
            const y = getY(d.value, CHART_HEIGHT);
            return (
              <Circle
                key={i}
                cx={x}
                cy={y}
                r={DOT_RADIUS}
                fill="#2D5A4E"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </Svg>

        {/* Etiquetas de días */}
        <View className="flex-row justify-between px-2 mt-1">
          {data.map((d) => (
            <Text key={d.day} className="text-[#6B6B6B] text-xs">{d.day}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};