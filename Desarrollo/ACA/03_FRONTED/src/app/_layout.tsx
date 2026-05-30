import '../../global.css';
import { Stack } from 'expo-router';
import { RegistrosProvider } from '../context/RegistrosContext';

export default function Layout() {
  return (
    <RegistrosProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RegistrosProvider>
  );
}