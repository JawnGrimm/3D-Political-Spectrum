// FIX: This side-effect import is necessary to extend the JSX namespace with @react-three/fiber elements.
// This ensures that the custom JSX elements like `<group>` and `<meshStandardMaterial>`
// are correctly typed and recognized by TypeScript, resolving all related errors in this file.
import '@react-three/fiber';
import React, { useState, Suspense, Ref } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line, Sphere, Html } from '@react-three/drei';
import type { Ideology } from '../types';
import { CUBE_SCALE } from '../constants';

// Helper component for a single axis
const Axis = ({ direction, label, posEnd, negEnd }: { direction: 'x' | 'y' | 'z', label: string, posEnd: string, negEnd: string }) => {
  const points: [[number, number, number], [number, number, number]] = [[0,0,0], [0,0,0]];
  const labelPos: [number, number, number] = [0,0,0];
  const endLabelPos: [number, number, number] = [0,0,0];
  const negEndLabelPos: [number, number, number] = [0,0,0];
  
  const axisLength = CUBE_SCALE;
  const mainLabelOffset = 2.5; // Increased distance from axis end
  const endLabelOffset = 1.2; // Increased distance from axis end

  if (direction === 'x') {
    points[0] = [-axisLength, 0, 0];
    points[1] = [axisLength, 0, 0];
    labelPos[0] = axisLength + mainLabelOffset;
    endLabelPos[0] = axisLength + endLabelOffset;
    negEndLabelPos[0] = -axisLength - endLabelOffset;
  } else if (direction === 'y') {
    points[0] = [0, -axisLength, 0];
    points[1] = [0, axisLength, 0];
    labelPos[1] = axisLength + mainLabelOffset;
    endLabelPos[1] = axisLength + endLabelOffset;
    negEndLabelPos[1] = -axisLength - endLabelOffset;
  } else {
    points[0] = [0, 0, -axisLength];
    points[1] = [0, 0, axisLength];
    labelPos[2] = axisLength + mainLabelOffset;
    endLabelPos[2] = axisLength + endLabelOffset;
    negEndLabelPos[2] = -axisLength - endLabelOffset;
  }

  return (
    <group>
      <Line points={points} color="gray" lineWidth={2} />
      <Text position={labelPos} fontSize={0.7} color="white" fontWeight="bold">{label}</Text>
      <Text position={endLabelPos} fontSize={0.5} color="lightgray">{posEnd}</Text>
      <Text position={negEndLabelPos} fontSize={0.5} color="lightgray">{negEnd}</Text>
    </group>
  );
};

// FIX: Explicitly typed the IdeologyPoint component as a React.FC
// and defined a props interface to resolve a TypeScript error where the
// `key` prop was being incorrectly type-checked against the component's props.
interface IdeologyPointProps {
  ideology: Ideology;
  onSelect: (ideology: Ideology) => void;
  isSelected: boolean;
}

// Component for each interactive ideology point
const IdeologyPoint: React.FC<IdeologyPointProps> = ({ ideology, onSelect, isSelected }) => {
  const [hovered, setHover] = useState(false);
  
  // Calculate the sphere's position in the 3D scene
  const position = ideology.position.map(p => p * CUBE_SCALE) as [number, number, number];

  // Define scale constants for mapping movement strength to sphere size
  const MIN_POINT_SCALE = 0.6;
  const MAX_POINT_SCALE = 1.6;

  // The base size of the sphere is determined by its `movementStrength`.
  const baseScale = ideology.movementStrength !== undefined
    ? MIN_POINT_SCALE + (ideology.movementStrength * (MAX_POINT_SCALE - MIN_POINT_SCALE))
    : 1.0; // Default size for ideologies without a strength value (like 'You')
  
  // A multiplier is applied on top of the base size for hover and selection effects.
  const interactiveMultiplier = isSelected ? 1.8 : (hovered ? 1.5 : 1.0);
  
  // The final scale is the base size multiplied by the interactive effect.
  const scale = baseScale * interactiveMultiplier;

  return (
    <group position={position}>
      <Sphere
        onClick={(e) => { e.stopPropagation(); onSelect(ideology); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        scale={scale}
      >
        <meshStandardMaterial color={ideology.color} emissive={isSelected || hovered ? ideology.color : 'black'} emissiveIntensity={0.5} toneMapped={false} />
      </Sphere>
       <Text
          position={[0, 0.6 + baseScale * 0.2, 0]} // Adjust text position based on the sphere's base size to prevent it from jumping on hover
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          visible={hovered || isSelected}
        >
          {ideology.name}
        </Text>
    </group>
  );
};

interface PoliticalCubeProps {
  onIdeologySelect: (ideology: Ideology | null) => void;
  selectedIdeology: Ideology | null;
  canvasRef: Ref<HTMLCanvasElement>;
  ideologies: Ideology[];
}

export default function PoliticalCube({ onIdeologySelect, selectedIdeology, canvasRef, ideologies }: PoliticalCubeProps): React.ReactElement {
  const economicLabels = [
    { text: "Radical\nRedistribution", position: -0.88 * CUBE_SCALE },
    { text: "Progressive\nReform", position: -0.44 * CUBE_SCALE },
    { text: "Mixed\nEconomy", position: 0 * CUBE_SCALE },
    { text: "Market\nOriented", position: 0.44 * CUBE_SCALE },
    { text: "Laissez-Faire", position: 0.88 * CUBE_SCALE },
  ];

  return (
    <Canvas 
      ref={canvasRef}
      camera={{ position: [10, 8, 10], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Html center><span className="text-white">Loading 3D Scene...</span></Html>}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        <group>
          {/* Axes and Labels */}
          <Axis direction="x" label="Economic" posEnd="Right" negEnd="Left" />
          <Axis direction="y" label="Authority" posEnd="Authoritarian" negEnd="Libertarian" />
          <Axis direction="z" label="Cultural" posEnd="Progressive" negEnd="Traditionalist" />

          {/* Economic Axis Detail Labels */}
          {economicLabels.map(({ text, position }) => (
            <Text
              key={text}
              position={[position, -0.7, 0]} // Place below the X axis
              fontSize={0.25}
              color="gray"
              anchorX="center"
              anchorY="middle"
              lineHeight={1.2}
            >
              {text}
            </Text>
          ))}
          
          {/* Bounding Box */}
          <Line points={[[-5,-5,-5],[-5,-5,5],[-5,5,5],[-5,5,-5],[-5,-5,-5]]} color="dimgray" dashed dashSize={0.5} gapSize={0.2} />
          <Line points={[[5,-5,-5],[5,-5,5],[5,5,5],[5,5,-5],[5,-5,-5]]} color="dimgray" dashed dashSize={0.5} gapSize={0.2} />
          <Line points={[[-5,-5,5],[5,-5,5]]} color="dimgray" dashed dashSize={0.5} gapSize={0.2} />
          <Line points={[[-5,5,5],[5,5,5]]} color="dimgray" dashed dashSize={0.5} gapSize={0.2} />
          <Line points={[[-5,5,-5],[5,5,-5]]} color="dimgray" dashed dashSize={0.5} gapSize={0.2} />
          <Line points={[[-5,-5,-5],[5,-5,-5]]} color="dimgray" dashed dashSize={0.5} gapSize={0.2} />

          {/* Ideology Points */}
          {ideologies.map((ideology) => (
            <IdeologyPoint 
              key={ideology.name} 
              ideology={ideology} 
              onSelect={onIdeologySelect}
              isSelected={selectedIdeology?.name === ideology.name}
            />
          ))}
        </group>
        
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Suspense>
    </Canvas>
  );
}