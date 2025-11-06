
import React from 'react';

interface HeaderProps {
  onScreenshot: () => void;
  onStartQuestionnaire: () => void;
}

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H12.5a1 1 0 00.707-.293l1.414-1.414A1 1 0 0115.414 4H17a2 2 0 012 2v1.5a.5.5 0 001 0V6a3 3 0 00-3-3h-1.586a2 2 0 00-1.414.586L12.5 5.172a2 2 0 01-1.414.586H8.914a2 2 0 01-1.414-.586L6.086 3.586A2 2 0 004.672 3H3a3 3 0 00-3 3v1.5a.5.5 0 001 0V6z" />
        <path fillRule="evenodd" d="M2 7.5A2.5 2.5 0 014.5 5h11A2.5 2.5 0 0118 7.5v6A2.5 2.5 0 0115.5 16h-11A2.5 2.5 0 012 13.5v-6zM10 14a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
    </svg>
);

const UserPlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z" />
    </svg>
);


export default function Header({ onScreenshot, onStartQuestionnaire }: HeaderProps): React.ReactElement {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-start bg-gray-900/50 backdrop-blur-sm">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">3D Political Spectrum</h1>
        <p className="text-sm text-gray-400">Click a sphere to learn about an ideology.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
            onClick={onStartQuestionnaire}
            className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-colors"
            aria-label="Start Questionnaire"
        >
            <UserPlusIcon />
            <span className="hidden sm:inline">Plot Yourself</span>
        </button>
        <button
            onClick={onScreenshot}
            className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors"
            aria-label="Take Screenshot"
        >
            <CameraIcon/>
            <span className="hidden sm:inline">Screenshot</span>
        </button>
      </div>
    </header>
  );
}
