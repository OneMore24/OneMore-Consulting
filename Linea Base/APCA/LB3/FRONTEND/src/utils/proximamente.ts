import { Alert, Platform } from 'react-native';

/**
 * Feedback para acciones cuya funcionalidad aún no está implementada
 * (selector de foto/hora, exportar datos, 2FA, etc.). Evita botones "muertos":
 * el usuario recibe una respuesta clara en lugar de que no pase nada.
 */
export function proximamente(mensaje = 'Esta opción estará disponible en una próxima versión.') {
  if (Platform.OS === 'web') {
    // Alert de RN no se muestra en web; usamos el del navegador.
    if (typeof window !== 'undefined') window.alert(mensaje);
    return;
  }
  Alert.alert('Función no disponible', mensaje);
}
