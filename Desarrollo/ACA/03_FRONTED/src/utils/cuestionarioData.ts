export interface OpcionEstado {
  emoji: string;
  label: string;
  valor: number;
}

export interface SintomaFisico {
  id: string;
  label: string;
  emoji: string;
}

export interface RegistroCuestionario {
  id: string;
  fecha: Date;
  estadoEmocional: OpcionEstado;
  sintomas: { sintoma: SintomaFisico; intensidad: number }[];
  notaLibre: string;
  nivelEstres: number;
  nivelEnergia: number;
}

export const OPCIONES_ESTADO: OpcionEstado[] = [
  { emoji: '😣', label: 'Muy mal', valor: 1 },
  { emoji: '😔', label: 'Mal', valor: 2 },
  { emoji: '😐', label: 'Neutral', valor: 3 },
  { emoji: '🙂', label: 'Bien', valor: 4 },
  { emoji: '😄', label: 'Muy bien', valor: 5 },
];

export const SINTOMAS_FISICOS: SintomaFisico[] = [
  { id: 'cabeza', label: 'Dolor de cabeza', emoji: '🤕' },
  { id: 'tension', label: 'Tensión muscular', emoji: '💪' },
  { id: 'fatiga', label: 'Fatiga', emoji: '😴' },
  { id: 'estomago', label: 'Malestar estomacal', emoji: '🤢' },
  { id: 'sueno', label: 'Problemas de sueño', emoji: '🌙' },
  { id: 'apetito', label: 'Cambios de apetito', emoji: '🍽️' },
  { id: 'palpitaciones', label: 'Palpitaciones', emoji: '💓' },
  { id: 'respiracion', label: 'Dificultad para respirar', emoji: '😮‍💨' },
];

export const REGISTROS_MOCK: RegistroCuestionario[] = [
  {
    id: '1',
    fecha: new Date(2026, 4, 21),
    estadoEmocional: OPCIONES_ESTADO[4],
    sintomas: [{ sintoma: SINTOMAS_FISICOS[2], intensidad: 2 }],
    notaLibre: 'Me siento con mucha energía hoy.',
    nivelEstres: 2,
    nivelEnergia: 5,
  },
  {
    id: '2',
    fecha: new Date(2026, 4, 20),
    estadoEmocional: OPCIONES_ESTADO[3],
    sintomas: [{ sintoma: SINTOMAS_FISICOS[0], intensidad: 3 }],
    notaLibre: 'Día productivo aunque con algo de cansancio.',
    nivelEstres: 3,
    nivelEnergia: 4,
  },
  {
    id: '3',
    fecha: new Date(2026, 4, 19),
    estadoEmocional: OPCIONES_ESTADO[2],
    sintomas: [{ sintoma: SINTOMAS_FISICOS[1], intensidad: 4 }, { sintoma: SINTOMAS_FISICOS[2], intensidad: 3 }],
    notaLibre: 'Día complicado, mucha tensión en el trabajo.',
    nivelEstres: 4,
    nivelEnergia: 2,
  },
  {
    id: '4',
    fecha: new Date(2026, 4, 18),
    estadoEmocional: OPCIONES_ESTADO[3],
    sintomas: [],
    notaLibre: 'Buen día en general.',
    nivelEstres: 2,
    nivelEnergia: 4,
  },
  {
    id: '5',
    fecha: new Date(2026, 4, 17),
    estadoEmocional: OPCIONES_ESTADO[4],
    sintomas: [],
    notaLibre: 'Excelente día, medité por la mañana.',
    nivelEstres: 1,
    nivelEnergia: 5,
  },
  {
    id: '6',
    fecha: new Date(2026, 4, 16),
    estadoEmocional: OPCIONES_ESTADO[1],
    sintomas: [{ sintoma: SINTOMAS_FISICOS[0], intensidad: 4 }],
    notaLibre: 'Mal día, dolor de cabeza todo el día.',
    nivelEstres: 5,
    nivelEnergia: 2,
  },
  {
    id: '7',
    fecha: new Date(2026, 4, 15),
    estadoEmocional: OPCIONES_ESTADO[3],
    sintomas: [{ sintoma: SINTOMAS_FISICOS[4], intensidad: 2 }],
    notaLibre: 'Dormí poco pero el día estuvo bien.',
    nivelEstres: 3,
    nivelEnergia: 3,
  },
];