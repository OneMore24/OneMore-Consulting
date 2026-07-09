import { RegistroCuestionario } from './cuestionarioData';

export interface Estadisticas {
  entradas: number;       // total de registros
  promedio: number;       // estado de ánimo medio (escala 1–5)
  promedioTexto: string;  // "4.2"
  racha: number;          // días consecutivos (terminando hoy o ayer) con registro
}

function claveDia(f: Date): string {
  const d = new Date(f);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/** Calcula estadísticas reales a partir de los registros del diario. */
export function calcularEstadisticas(registros: RegistroCuestionario[]): Estadisticas {
  const entradas = registros.length;

  const promedio = entradas
    ? registros.reduce((s, r) => s + (r.estadoEmocional?.valor ?? 0), 0) / entradas
    : 0;

  // Racha: días consecutivos con al menos un registro, contando desde hoy (o ayer).
  const dias = new Set(registros.map((r) => claveDia(r.fecha)));
  let racha = 0;
  const cursor = new Date();
  if (!dias.has(claveDia(cursor))) {
    cursor.setDate(cursor.getDate() - 1); // permite que la racha siga contando si hoy aún no hay registro
  }
  while (dias.has(claveDia(cursor))) {
    racha++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { entradas, promedio, promedioTexto: promedio.toFixed(1), racha };
}

export interface DiaSemana {
  day: string;   // 'L'..'D'
  value: number; // promedio del estado de ánimo ese día (0 si no hay registro)
}

const ETIQUETAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

/** Datos de la semana actual (lunes a domingo) para la gráfica de ánimo. */
export function datosSemana(registros: RegistroCuestionario[]): DiaSemana[] {
  const hoy = new Date();
  // Lunes de la semana actual
  const lunes = new Date(hoy);
  const offset = (hoy.getDay() + 6) % 7; // getDay: 0=Dom
  lunes.setDate(hoy.getDate() - offset);
  lunes.setHours(0, 0, 0, 0);

  return ETIQUETAS.map((day, i) => {
    const dia = new Date(lunes);
    dia.setDate(lunes.getDate() + i);
    const delDia = registros.filter((r) => claveDia(r.fecha) === claveDia(dia));
    const value = delDia.length
      ? delDia.reduce((s, r) => s + (r.estadoEmocional?.valor ?? 0), 0) / delDia.length
      : 0;
    return { day, value: Number(value.toFixed(1)) };
  });
}

/** Cuántos días de la semana actual tienen al menos un registro. */
export function diasCompletadosSemana(registros: RegistroCuestionario[]): number {
  return datosSemana(registros).filter((d) => d.value > 0).length;
}
