
export interface Ideology {
  name: string;
  position: [number, number, number]; // [x, y, z]
  color: string;
  movementStrength?: number; // Value from 0.0 to 1.0 representing movement strength
}

export interface Question {
  text: string;
  axis: 'x' | 'y' | 'z';
  reverse: boolean;
  weight: number;
}