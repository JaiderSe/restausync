export interface Mesa {
  id: number;
  numero: string; // Ejemplo: "M1", "M2"
  capacidad: number;
  estado: 'disponible' | 'ocupada' | 'reservada';
}
