import '../../global.css';
import { Stack } from 'expo-router';
import { RegistrosProvider } from '../context/RegistrosContext';
import { RecursosProvider } from '../context/RecursosContext';
import { RecordatoriosProvider } from '../context/RecordatoriosContext';

export default function Layout() {
  return (
    <RegistrosProvider>
      <RecursosProvider>
        <RecordatoriosProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </RecordatoriosProvider>
      </RecursosProvider>
    </RegistrosProvider>
  );
}