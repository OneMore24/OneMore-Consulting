/**
 * Capa de acceso a la API REST del backend ACA.
 *
 * La URL base se toma de la variable de entorno EXPO_PUBLIC_API_URL.
 * - Emulador Android: usa http://10.0.2.2:3000
 * - Dispositivo físico: usa http://<IP-de-tu-PC>:3000
 * - Web / iOS simulador: http://localhost:3000
 */
const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

// Token JWT en memoria (lo gestiona AuthContext).
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export interface ApiUser {
  id: number;
  nombre: string;
  correo: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  usuario: ApiUser;
}

async function request<T = any>(
  path: string,
  options: { method?: string; body?: any; auth?: boolean } = {}
): Promise<T> {
  const { method = 'GET', body, auth = false } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (auth && authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    throw new Error('No se pudo conectar con el servidor');
  }

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || 'Ocurrió un error inesperado');
  }
  return data as T;
}

// ----------------------------- Auth -----------------------------
export const authApi = {
  register: (payload: {
    nombre: string;
    email: string;
    password: string;
    fecha_nacimiento?: string;
    genero?: string;
  }) => request<AuthResponse>('/api/auth/register', { method: 'POST', body: payload }),

  login: (email: string, password: string) =>
    request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  forgotPassword: (email: string) =>
    request<{ message: string; token_dev?: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: { email },
    }),

  resetPassword: (token: string, password: string) =>
    request<{ message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: { token, password },
    }),
};

// ----------------------------- Usuario -----------------------------
export const userApi = {
  getProfile: () => request('/api/user/profile', { auth: true }),
  updateProfile: (payload: {
    nombre_completo?: string;
    fecha_nacimiento?: string;
    genero?: string;
  }) => request('/api/user/profile', { method: 'PUT', body: payload, auth: true }),
};

// ----------------------------- Diario emocional -----------------------------
export interface EmotionRecord {
  id_registro_emocional: number;
  id_paciente: number;
  estado_animo: number;
  nota_descriptiva: string | null;
  fecha_hora: string;
}

export const emotionApi = {
  register: (estado_animo: number, nota_descriptiva?: string) =>
    request('/api/emotions', {
      method: 'POST',
      body: { estado_animo, nota_descriptiva },
      auth: true,
    }),
  list: (desde?: string, hasta?: string) => {
    const qs =
      desde && hasta ? `?desde=${desde}&hasta=${hasta}` : '';
    return request<EmotionRecord[]>(`/api/emotions${qs}`, { auth: true });
  },
};

// ----------------------------- Síntomas / Crisis -----------------------------
export const symptomApi = {
  catalog: () => request('/api/symptoms/catalog', { auth: true }),
  register: (
    nota_adicional: string,
    sintomas: { id_sintoma: number; intensidad?: string }[]
  ) =>
    request('/api/symptoms', {
      method: 'POST',
      body: { nota_adicional, sintomas },
      auth: true,
    }),
  list: () => request('/api/symptoms', { auth: true }),
};

// ----------------------------- Recursos -----------------------------
export interface ResourceRecord {
  id_recurso: number;
  titulo: string;
  descripcion: string | null;
  tipo: string | null;
  duracion_minutos: number | null;
  contenido_url: string | null;
  favorito: boolean;
}

export const resourceApi = {
  list: () => request<ResourceRecord[]>('/api/resources', { auth: true }),
  addFavorite: (id: number) =>
    request(`/api/resources/${id}/favorito`, { method: 'POST', auth: true }),
  removeFavorite: (id: number) =>
    request(`/api/resources/${id}/favorito`, { method: 'DELETE', auth: true }),
};

// ----------------------------- Recordatorios -----------------------------
export interface ReminderRecord {
  id_recordatorio: number;
  id_paciente: number;
  titulo: string;
  fecha: string;
  activo: number;
}

export const reminderApi = {
  list: () => request<ReminderRecord[]>('/api/reminders', { auth: true }),
  create: (titulo: string, fecha: string) =>
    request('/api/reminders', { method: 'POST', body: { titulo, fecha }, auth: true }),
  update: (
    id: number,
    payload: { titulo?: string; fecha?: string; activo?: number }
  ) => request(`/api/reminders/${id}`, { method: 'PUT', body: payload, auth: true }),
  remove: (id: number) =>
    request(`/api/reminders/${id}`, { method: 'DELETE', auth: true }),
};

// ----------------------------- SOS -----------------------------
export const sosApi = {
  get: () => request('/api/sos'),
};
