import { jwtDecode } from "jwt-decode";

export function getUserRoleFromToken(token: string): string | null {
    try {
      // Decodificando el token
      const decoded: any = jwtDecode(token);
      console.log('Decoded Token:', decoded); // Muestra el token decodificado
      // Asegúrate de que el rol esté en el formato esperado
      return decoded.role && decoded.role[0] ? decoded.role[0] : null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }