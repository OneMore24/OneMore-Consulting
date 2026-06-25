import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recurso, RECURSOS, TipoRecurso } from '../utils/recursosData';
import { resourceApi, ResourceRecord } from '../services/api';
import { useAuth } from './AuthContext';

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

// El backend guarda tipo como Audio/Video/Artículo; la UI usa estas categorías.
const mapearTipo = (tipo: string | null): TipoRecurso => {
  switch ((tipo || '').toLowerCase()) {
    case 'video':
      return 'VIDEO';
    case 'audio':
    case 'podcast':
      return 'PODCAST';
    default:
      return 'ARTÍCULO';
  }
};

// Imágenes locales (los recursos del backend no traen imagen propia).
const IMAGENES = RECURSOS.map((r) => r.imagen);

const mapearRecurso = (r: ResourceRecord, i: number): Recurso => ({
  id: String(r.id_recurso),
  tipo: mapearTipo(r.tipo),
  titulo: r.titulo,
  duracion: r.duracion_minutos ? `${r.duracion_minutos} min` : '—',
  imagen: IMAGENES[i % IMAGENES.length],
  favorito: r.favorito,
});

export const RecursosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [recursos, setRecursos] = useState<Recurso[]>(RECURSOS);
  const [busqueda, setBusqueda] = useState('');

  // Con sesión: carga la biblioteca real y los favoritos del paciente.
  // Sin sesión (o sin conexión): se conservan los recursos locales.
  useEffect(() => {
    if (!token) {
      setRecursos(RECURSOS);
      return;
    }
    let activo = true;
    resourceApi
      .list()
      .then((data) => {
        if (activo && data.length) setRecursos(data.map(mapearRecurso));
      })
      .catch(() => {});
    return () => {
      activo = false;
    };
  }, [token]);

  const toggleFavorito = (id: string) => {
    let nuevoFav = false;
    setRecursos((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          nuevoFav = !r.favorito;
          return { ...r, favorito: nuevoFav };
        }
        return r;
      })
    );
    // Persiste el favorito en el backend (si hay sesión).
    if (token) {
      const idNum = Number(id);
      const accion = nuevoFav
        ? resourceApi.addFavorite(idNum)
        : resourceApi.removeFavorite(idNum);
      accion.catch(() => {});
    }
  };

  return (
    <RecursosContext.Provider value={{ recursos, toggleFavorito, busqueda, setBusqueda }}>
      {children}
    </RecursosContext.Provider>
  );
};

export const useRecursos = () => useContext(RecursosContext);
