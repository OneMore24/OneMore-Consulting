import React, { createContext, useContext, useState } from 'react';
import { RegistroCuestionario, REGISTROS_MOCK } from '../utils/cuestionarioData';

interface RegistrosContextType {
  registros: RegistroCuestionario[];
  agregarRegistro: (registro: RegistroCuestionario) => void;
}

const RegistrosContext = createContext<RegistrosContextType>({
  registros: REGISTROS_MOCK,
  agregarRegistro: () => {},
});

export const RegistrosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registros, setRegistros] = useState<RegistroCuestionario[]>(REGISTROS_MOCK);

  const agregarRegistro = (registro: RegistroCuestionario) => {
    setRegistros((prev) => [registro, ...prev]);
  };

  return (
    <RegistrosContext.Provider value={{ registros, agregarRegistro }}>
      {children}
    </RegistrosContext.Provider>
  );
};

export const useRegistros = () => useContext(RegistrosContext);