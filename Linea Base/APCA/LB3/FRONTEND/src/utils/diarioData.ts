export interface Nota {
  id: string;
  fecha: string;
  hora: string;
  emoji: string;
  texto: string;
}

export interface TendenciaData {
  labels: string[];
  animo: number[];
  energia: number[];
  promedio: string;
  promedioLabel: string;  
  mejorDia: string;
  mejorDiaLabel: string;  
  mejorDiaEmoji: string;
  racha: number;
  registros: number;
}

export const NOTAS_INICIALES: Nota[] = [
  {
    id: '1',
    fecha: 'HOY',
    hora: '7:30 AM',
    emoji: '😊',
    texto: 'Me siento lista para el día. La meditación matutina ayudó mucho a calmar mi mente y empezar con energía.',
  },
  {
    id: '2',
    fecha: 'AYER',
    hora: '9:15 PM',
    emoji: '😤',
    texto: 'Día de trabajo intenso pero pude hacer el ejercicio de respiración a las 3pm y funcionó muy bien.',
  },
  {
    id: '3',
    fecha: 'HACE 3 DÍAS',
    hora: '8:00 PM',
    emoji: '🌿',
    texto: 'Tuve una conversación difícil pero encontré formas de manejar la situación con calma y serenidad.',
  },
];

export const TENDENCIAS: Record<string, TendenciaData> = {
  Semana: {
    labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    animo:   [3.5, 4.0, 3.8, 4.5, 4.2, 4.8, 4.3],
    energia: [3.0, 3.5, 4.0, 4.2, 3.8, 4.5, 4.0],
    promedio: '4.3 / 5',
    promedioLabel: 'Promedio semanal',
    mejorDia: 'Sábado',
    mejorDiaLabel: 'Mejor día',
    mejorDiaEmoji: '😄',
    racha: 5,
    registros: 7,
  },
  Mes: {
    labels: ['S1', 'S2', 'S3', 'S4'],
    animo:   [3.8, 4.1, 4.3, 4.5],
    energia: [3.2, 3.9, 4.0, 4.3],
    promedio: '4.2 / 5',
    promedioLabel: 'Promedio mensual',
    mejorDia: 'Semana 4',
    mejorDiaLabel: 'Mejor semana',
    mejorDiaEmoji: '😊',
    racha: 12,
    registros: 23,
  },
  '3 Meses': {
    labels: ['Ene', 'Feb', 'Mar'],
    animo:   [3.5, 3.9, 4.3],
    energia: [3.0, 3.7, 4.1],
    promedio: '3.9 / 5',
    promedioLabel: 'Promedio trimestral',
    mejorDia: 'Marzo',
    mejorDiaLabel: 'Mejor mes',
    mejorDiaEmoji: '🌟',
    racha: 18,
    registros: 67,
  },
  Año: {
    labels: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    animo:   [3.0, 3.2, 3.5, 3.8, 4.0, 4.2, 4.1, 4.3, 4.0, 4.2, 4.4, 4.3],
    energia: [2.8, 3.0, 3.3, 3.6, 3.9, 4.0, 3.8, 4.1, 3.9, 4.0, 4.2, 4.1],
    promedio: '3.9 / 5',
    promedioLabel: 'Promedio anual',
    mejorDia: 'Noviembre',
    mejorDiaLabel: 'Mejor mes',
    mejorDiaEmoji: '🏆',
    racha: 30,
    registros: 248,
  },
};