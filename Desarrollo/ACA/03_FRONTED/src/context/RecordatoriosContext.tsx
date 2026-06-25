import React, { createContext, useContext, useState } from 'react';
import {
  Recordatorio,
  RECORDATORIOS_INICIALES,
} from '../utils/recordatoriosData';
import { reminderApi } from '../services/api';
import { useAuth } from './AuthContext';

interface RecordatoriosContextType {
  recordatorios: Recordatorio[];
  toggleActivo: (id: string) => void;
  agregarRecordatorio: (recordatorio: Omit<Recordatorio, 'id'>) => void;
  editarRecordatorio: (id: string, data: Partial<Recordatorio>) => void;
  eliminarRecordatorio: (id: string) => void;
}

const RecordatoriosContext = createContext<RecordatoriosContextType>({
  recordatorios: RECORDATORIOS_INICIALES,
  toggleActivo: () => {},
  agregarRecordatorio: () => {},
  editarRecordatorio: () => {},
  eliminarRecordatorio: () => {},
});

// Construye un DATETIME (hoy + hora "HH:MM") para enviar al backend.
const aFechaHora = (hora: string) => {
  const hoy = new Date().toISOString().slice(0, 10);
  return `${hoy} ${hora || '08:00'}:00`;
};

export const RecordatoriosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>(RECORDATORIOS_INICIALES);

  const toggleActivo = (id: string) => {
    let item: Recordatorio | undefined;
    setRecordatorios((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          item = { ...r, activo: !r.activo };
          return item;
        }
        return r;
      })
    );
    if (token && item?.backendId) {
      reminderApi.update(item.backendId, { activo: item.activo ? 1 : 0 }).catch(() => {});
    }
  };

  const agregarRecordatorio = (data: Omit<Recordatorio, 'id'>) => {
    const localId = Date.now().toString();
    setRecordatorios((prev) => [...prev, { ...data, id: localId }]);

    // Persistencia best-effort: guarda el id del backend para futuras ediciones.
    if (token) {
      reminderApi
        .create(data.titulo, aFechaHora(data.hora))
        .then((res: any) => {
          const backendId = res?.id_recordatorio;
          if (backendId) {
            setRecordatorios((prev) =>
              prev.map((r) => (r.id === localId ? { ...r, backendId } : r))
            );
          }
        })
        .catch(() => {});
    }
  };

  const editarRecordatorio = (id: string, data: Partial<Recordatorio>) => {
    let item: Recordatorio | undefined;
    setRecordatorios((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          item = { ...r, ...data };
          return item;
        }
        return r;
      })
    );
    if (token && item?.backendId) {
      reminderApi
        .update(item.backendId, {
          titulo: item.titulo,
          fecha: aFechaHora(item.hora),
          activo: item.activo ? 1 : 0,
        })
        .catch(() => {});
    }
  };

  const eliminarRecordatorio = (id: string) => {
    const item = recordatorios.find((r) => r.id === id);
    setRecordatorios((prev) => prev.filter((r) => r.id !== id));
    if (token && item?.backendId) {
      reminderApi.remove(item.backendId).catch(() => {});
    }
  };

  return (
    <RecordatoriosContext.Provider value={{
      recordatorios, toggleActivo, agregarRecordatorio, editarRecordatorio, eliminarRecordatorio,
    }}>
      {children}
    </RecordatoriosContext.Provider>
  );
};

export const useRecordatorios = () => useContext(RecordatoriosContext);
