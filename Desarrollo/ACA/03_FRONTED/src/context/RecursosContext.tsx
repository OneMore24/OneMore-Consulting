import React, { createContext, useContext, useState } from 'react';
import { Recurso, RECURSOS } from '../utils/recursosData';

interface RecursosContextType {
  recursos: Recurso[];
  toggleFavorito: (id: string) => void;
  busqueda: string;
  setBusqueda: (texto: string) => void;
}

const RecursosContext = createContext<RecursosContextType>({
  recursos: RECURSOS,
  toggleFavorito: () => {},
  busqueda: '',
  setBusqueda: () => {},
});

export const RecursosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recursos, setRecursos] = useState<Recurso[]>(RECURSOS);
  const [busqueda, setBusqueda] = useState('');

  const toggleFavorito = (id: string) => {
    setRecursos((prev) =>
      prev.map((r) => r.id === id ? { ...r, favorito: !r.favorito } : r)
    );
  };

  return (
    <RecursosContext.Provider value={{ recursos, toggleFavorito, busqueda, setBusqueda }}>
      {children}
    </RecursosContext.Provider>
  );
};

export const useRecursos = () => useContext(RecursosContext);