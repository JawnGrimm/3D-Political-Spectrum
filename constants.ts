
import type { Ideology } from './types';

// This factor scales the -1 to 1 coordinates to fit the 3D scene
export const CUBE_SCALE = 5;

// Defines the positions of major political groups on three axes:
// X-Axis: Economic (Left [-] to Right [+])
// Y-Axis: Authority (Libertarian [-] to Authoritarian [+])
// Z-Axis: Cultural (Traditionalist [-] to Progressive [+])
// movementStrength: A value from 0 to 1 representing the ideology's influence.
export const IDEOLOGIES: Ideology[] = [
  {
    name: 'Progressive Left',
    position: [-0.7, -0.4, 0.8],
    color: '#34D399', // Emerald 400
    movementStrength: 0.7,
  },
  {
    name: 'Mainstream Democrats',
    position: [-0.3, 0.2, 0.4],
    color: '#60A5FA', // Blue 400
    movementStrength: 0.9,
  },
  {
    name: 'Libertarian',
    position: [0.8, -0.9, 0.0],
    color: '#FBBF24', // Amber 400
    movementStrength: 0.5,
  },
  {
    name: 'MAGA / Right Populism',
    position: [0.5, 0.7, -0.7],
    color: '#F87171', // Red 400
    movementStrength: 0.9,
  },
  {
    name: 'Anarcho-Communist',
    position: [-0.9, -0.9, 0.9],
    color: '#C084FC', // Purple 400
    movementStrength: 0.3,
  },
];