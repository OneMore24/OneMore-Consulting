export type TipoRecordatorio = 'estado_emocional' | 'ejercicio' | 'respiracion' | 'diario';
export type DiaSemana = 'L' | 'M' | 'X' | 'J' | 'V' | 'S' | 'D';

export interface Recordatorio {
  id: string;
  tipo: TipoRecordatorio;
  titulo: string;
  descripcion: string;
  hora: string;
  dias: DiaSemana[];
  activo: boolean;
  emoji: string;
  /** id de la fila en el backend (si el recordatorio se persistió). */
  backendId?: number;
}

export const DIAS_SEMANA: DiaSemana[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export const TIPO_INFO: Record<TipoRecordatorio, { color: string; bgColor: string; emoji: string }> = {
  estado_emocional: { color: '#7B68EE', bgColor: '#7B68EE15', emoji: '😊' },
  ejercicio: { color: '#2D5A4E', bgColor: '#2D5A4E15', emoji: '🧘' },
  respiracion: { color: '#48BB78', bgColor: '#48BB7815', emoji: '💨' },
  diario: { color: '#F6AD55', bgColor: '#F6AD5515', emoji: '📓' },
};

export const RECORDATORIOS_INICIALES: Recordatorio[] = [
  {
    id: '1',
    tipo: 'estado_emocional',
    titulo: 'Registro emocional',
    descripcion: 'Registra cómo te sientes hoy',
    hora: '08:00',
    dias: ['L', 'M', 'X', 'J', 'V'],
    activo: true,
    emoji: '😊',
  },
  {
    id: '2',
    tipo: 'ejercicio',
    titulo: 'Ejercicio de relajación',
    descripcion: 'Momento de calma y bienestar',
    hora: '12:00',
    dias: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    activo: true,
    emoji: '🧘',
  },
  {
    id: '3',
    tipo: 'respiracion',
    titulo: 'Respiración 4-7-8',
    descripcion: 'Pausa de respiración profunda',
    hora: '15:00',
    dias: ['L', 'X', 'V'],
    activo: false,
    emoji: '💨',
  },
  {
    id: '4',
    tipo: 'diario',
    titulo: 'Diario emocional',
    descripcion: 'Escribe sobre tu día',
    hora: '21:00',
    dias: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    activo: true,
    emoji: '📓',
  },
];