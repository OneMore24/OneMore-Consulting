import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RegistroCuestionario,
  REGISTROS_MOCK,
  OPCIONES_ESTADO,
} from '../utils/cuestionarioData';
import { emotionApi, EmotionRecord } from '../services/api';
import { useAuth } from './AuthContext';

interface RegistrosContextType {
  registros: RegistroCuestionario[];
  agregarRegistro: (registro: RegistroCuestionario) => void;
}

const RegistrosContext = createContext<RegistrosContextType>({
  registros: REGISTROS_MOCK,
  agregarRegistro: () => {},
});

// El backend guarda estado_animo en escala 1–10; la UI usa una escala 1–5.
const aEscala10 = (valor5: number) => Math.min(10, Math.max(1, valor5 * 2));
const aEscala5 = (valor10: number) =>
  Math.min(5, Math.max(1, Math.round(valor10 / 2)));

const mapearDesdeApi = (r: EmotionRecord): RegistroCuestionario => ({
  id: String(r.id_registro_emocional),
  fecha: new Date(r.fecha_hora),
  estadoEmocional: OPCIONES_ESTADO[aEscala5(r.estado_animo) - 1],
  sintomas: [],
  notaLibre: r.nota_descriptiva || '',
  nivelEstres: 3,
  nivelEnergia: 3,
});

export const RegistrosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [registros, setRegistros] = useState<RegistroCuestionario[]>(REGISTROS_MOCK);

  // Al iniciar sesión, hidrata el historial real desde el backend.
  // Sin sesión (o si el backend no responde) se conserva el contenido local.
  useEffect(() => {
    if (!token) {
      setRegistros(REGISTROS_MOCK);
      return;
    }
    let activo = true;
    emotionApi
      .list()
      .then((data) => {
        if (activo) setRegistros(data.map(mapearDesdeApi));
      })
      .catch(() => {
        /* sin conexión: se mantiene el estado actual */
      });
    return () => {
      activo = false;
    };
  }, [token]);

  const agregarRegistro = (registro: RegistroCuestionario) => {
    // Actualización optimista de la UI
    setRegistros((prev) => [registro, ...prev]);

    // Persistencia en el backend (si hay sesión)
    if (token) {
      emotionApi
        .register(aEscala10(registro.estadoEmocional.valor), registro.notaLibre)
        .catch(() => {
          /* el registro queda al menos en la sesión local */
        });
    }
  };

  return (
    <RegistrosContext.Provider value={{ registros, agregarRegistro }}>
      {children}
    </RegistrosContext.Provider>
  );
};

export const useRegistros = () => useContext(RegistrosContext);
