
import React from 'react';
import type { Ideology } from '../types';
import Loader from './Loader';

interface IdeologyTooltipProps {
  ideology: Ideology | null;
  description: string;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export default function IdeologyTooltip({ ideology, description, isLoading, error, onClose }: IdeologyTooltipProps): React.ReactElement | null {
  if (!ideology) return null;

  return (
    <aside className="absolute top-0 right-0 h-full w-full max-w-sm bg-gray-800/60 backdrop-blur-lg shadow-2xl z-20 transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold" style={{ color: ideology.color }}>
            {ideology.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close panel">
            <CloseIcon/>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto pr-2">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          )}
          {error && (
            <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}
          {description && !isLoading && (
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{description}</p>
          )}
        </div>
      </div>
    </aside>
  );
}
