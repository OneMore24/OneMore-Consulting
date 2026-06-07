import React, { createContext, useContext, useState } from 'react';
import { Recordatorio, RECORDATORIOS_INICIALES, DiaSemana, TipoRecordatorio } from '../utils/recordatoriosData';

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

export const RecordatoriosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>(RECORDATORIOS_INICIALES);

  const toggleActivo = (id: string) => {
    setRecordatorios((prev) =>
      prev.map((r) => r.id === id ? { ...r, activo: !r.activo } : r)
    );
  };

  const agregarRecordatorio = (data: Omit<Recordatorio, 'id'>) => {
    setRecordatorios((prev) => [
      ...prev,
      { ...data, id: Date.now().toString() },
    ]);
  };

  const editarRecordatorio = (id: string, data: Partial<Recordatorio>) => {
    setRecordatorios((prev) =>
      prev.map((r) => r.id === id ? { ...r, ...data } : r)
    );
  };

  const eliminarRecordatorio = (id: string) => {
    setRecordatorios((prev) => prev.filter((r) => r.id !== id));
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