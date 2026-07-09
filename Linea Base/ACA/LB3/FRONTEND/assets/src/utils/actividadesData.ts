export type Dificultad = 'FÁCIL' | 'MEDIO' | 'DIFÍCIL';
export type Categoria = 'Todos' | 'Respiración' | 'Meditación' | 'Yoga';

export interface Ejercicio {
  id: string;
  titulo: string;
  duracion: string;
  dificultad: Dificultad;
  categoria: Categoria;
  descripcion: string;
  necesitaras: string[];
  imagen: any;
  route?: string;
}

export const EJERCICIOS: Ejercicio[] = [
  {
    id: '1',
    titulo: 'Respiración 4–7–8',
    duracion: '5 min',
    dificultad: 'FÁCIL',
    categoria: 'Respiración',
    descripcion: 'Técnica de respiración profunda que activa el sistema nervioso parasimpático para reducir el estrés y la ansiedad de forma inmediata.',
    necesitaras: ['Un lugar tranquilo', 'Posición cómoda sentado o acostado'],
    imagen: require('../../assets/images/suggestion1.jpg'),
    route: '/actividades/respiracion-478',
  },
  {
    id: '2',
    titulo: 'Meditación zen',
    duracion: '10 min',
    dificultad: 'MEDIO',
    categoria: 'Meditación',
    descripcion: 'Práctica de meditación enfocada en la atención plena y la quietud mental para alcanzar un estado de calma profunda.',
    necesitaras: ['Lugar tranquilo', 'Cojín o silla cómoda', 'Auriculares opcionales'],
    imagen: require('../../assets/images/suggestion2.jpg'),
    route: '/actividades/detalle-ejercicio?id=2',
  },
  {
    id: '3',
    titulo: 'Yoga restaurativo',
    duracion: '20 min',
    dificultad: 'FÁCIL',
    categoria: 'Yoga',
    descripcion: 'Práctica suave que combina posturas restaurativas con respiración consciente para liberar tensión y calmar el sistema nervioso. Ideal para el final del día o momentos de estrés elevado.',
    necesitaras: ['Esterilla o superficie cómoda', 'Cojín o almohada', 'Ropa cómoda y holgada'],
    imagen: require('../../assets/images/suggestion3.jpg'),
    route: '/actividades/yoga-restaurativo',
  },
  {
    id: '4',
    titulo: 'Atención plena',
    duracion: '8 min',
    dificultad: 'FÁCIL',
    categoria: 'Meditación',
    descripcion: 'Ejercicio de mindfulness para conectar con el momento presente y reducir pensamientos intrusivos.',
    necesitaras: ['Lugar tranquilo', 'Posición cómoda'],
    imagen: require('../../assets/images/suggestion4.jpg'),
    route: '/actividades/detalle-ejercicio?id=4',
  },
  {
    id: '5',
    titulo: 'Relajación muscular',
    duracion: '12 min',
    dificultad: 'MEDIO',
    categoria: 'Yoga',
    descripcion: 'Técnica de relajación progresiva que trabaja cada grupo muscular para liberar tensión acumulada.',
    necesitaras: ['Esterilla', 'Lugar tranquilo', 'Ropa cómoda'],
    imagen: require('../../assets/images/suggestion1.jpg'),
    route: '/actividades/detalle-ejercicio?id=5',
  },
  {
    id: '6',
    titulo: 'Sueño reparador',
    duracion: '15 min',
    dificultad: 'FÁCIL',
    categoria: 'Meditación',
    descripcion: 'Meditación guiada diseñada para preparar el cuerpo y la mente para un sueño profundo y reparador.',
    necesitaras: ['Cama o superficie cómoda', 'Oscuridad o antifaz', 'Temperatura agradable'],
    imagen: require('../../assets/images/suggestion2.jpg'),
    route: '/actividades/detalle-ejercicio?id=6',
  },
];

export const CATEGORIAS: Categoria[] = ['Todos', 'Respiración', 'Meditación', 'Yoga'];

export const DIFICULTAD_COLORS: Record<Dificultad, string> = {
  'FÁCIL': '#2D5A4E',
  'MEDIO': '#F6AD55',
  'DIFÍCIL': '#E53E3E',
};