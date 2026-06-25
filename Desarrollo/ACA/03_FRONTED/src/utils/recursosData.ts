export type TipoRecurso = 'ARTÍCULO' | 'VIDEO' | 'PODCAST';
export type CategoriaRecurso = 'Todos' | 'Artículos' | 'Videos' | 'Podcasts';

export interface Recurso {
  id: string;
  tipo: TipoRecurso;
  titulo: string;
  duracion: string;
  imagen: any;
  favorito?: boolean;
}

export const RECURSOS: Recurso[] = [
  {
    id: '1',
    tipo: 'ARTÍCULO',
    titulo: 'Cómo manejar la ansiedad diaria',
    duracion: '5 min',
    imagen: require('../../assets/images/suggestion1.jpg'),
    favorito: true,
  },
  {
    id: '2',
    tipo: 'VIDEO',
    titulo: 'Yoga suave para el estrés',
    duracion: '22:15',
    imagen: require('../../assets/images/suggestion2.jpg'),
    favorito: true,
  },
  {
    id: '3',
    tipo: 'ARTÍCULO',
    titulo: 'Los beneficios del sueño reparador',
    duracion: '4 min',
    imagen: require('../../assets/images/suggestion3.jpg'),
    favorito: false,
  },
  {
    id: '4',
    tipo: 'VIDEO',
    titulo: 'Meditación guiada 10 minutos',
    duracion: '10:32',
    imagen: require('../../assets/images/suggestion4.jpg'),
    favorito: true,
  },
  {
    id: '5',
    tipo: 'ARTÍCULO',
    titulo: 'Mindfulness para principiantes',
    duracion: '6 min',
    imagen: require('../../assets/images/suggestion1.jpg'),
    favorito: false,
  },
  {
    id: '6',
    tipo: 'VIDEO',
    titulo: 'Respiración para dormir mejor',
    duracion: '8:45',
    imagen: require('../../assets/images/oceano.jpg'),
    favorito: false,
  },
];

export const CATEGORIAS_RECURSOS: CategoriaRecurso[] = ['Todos', 'Artículos', 'Videos', 'Podcasts'];

export const TIPO_COLORS: Record<TipoRecurso, string> = {
  'ARTÍCULO': '#2D5A4E',
  'VIDEO': '#7B68EE',
  'PODCAST': '#F6AD55',
};