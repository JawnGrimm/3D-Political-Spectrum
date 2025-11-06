
import React, { useState, useCallback, useRef, useMemo } from 'react';
import type { Ideology } from './types';
import { getIdeologyDescription } from './services/geminiService';
import PoliticalCube from './components/PoliticalCube';
import IdeologyTooltip from './components/IdeologyTooltip';
import Header from './components/Header';
import Questionnaire from './components/Questionnaire';
import { IDEOLOGIES } from './constants';


export default function App(): React.ReactElement {
  const [selectedIdeology, setSelectedIdeology] = useState<Ideology | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuestionnaireOpen, setQuestionnaireOpen] = useState(false);
  const [userIdeology, setUserIdeology] = useState<Ideology | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleIdeologySelect = useCallback(async (ideology: Ideology | null) => {
    if (!ideology) {
      setSelectedIdeology(null);
      setDescription('');
      return;
    }

    if (selectedIdeology?.name === ideology.name) {
        return; // Don't re-fetch if already selected
    }

    setSelectedIdeology(ideology);
    setIsLoading(true);
    setError(null);
    setDescription('');

    if (ideology.name === 'You') {
        const [x,y,z] = ideology.position;
        const desc = `Your calculated coordinates:\n\nEconomic (Left/Right): ${x.toFixed(2)}\nAuthority (Libertarian/Authoritarian): ${y.toFixed(2)}\nCultural (Traditionalist/Progressive): ${z.toFixed(2)}`;
        setDescription(desc);
        setIsLoading(false);
        return;
    }

    try {
      const desc = await getIdeologyDescription(ideology.name);
      setDescription(desc);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [selectedIdeology]);

  const handleScreenshot = useCallback(() => {
    if (canvasRef.current) {
      const image = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'political-spectrum.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);
  
  const handleQuestionnaireComplete = (position: [number, number, number]) => {
      const newUserIdeology: Ideology = {
          name: 'You',
          position,
          color: '#FFFFFF', // White
      };
      setUserIdeology(newUserIdeology);
      setQuestionnaireOpen(false);
      handleIdeologySelect(newUserIdeology);
  };
  
  const ideologies = useMemo(() => {
      return userIdeology ? [...IDEOLOGIES, userIdeology] : IDEOLOGIES;
  }, [userIdeology]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 text-gray-100 font-sans">
      <Header onScreenshot={handleScreenshot} onStartQuestionnaire={() => setQuestionnaireOpen(true)} />
      <main className="w-full h-full">
        <PoliticalCube 
          ideologies={ideologies}
          onIdeologySelect={handleIdeologySelect} 
          selectedIdeology={selectedIdeology}
          canvasRef={canvasRef}
        />
      </main>
      <IdeologyTooltip
        ideology={selectedIdeology}
        description={description}
        isLoading={isLoading}
        error={error}
        onClose={() => handleIdeologySelect(null)}
      />
      <Questionnaire 
        isOpen={isQuestionnaireOpen}
        onClose={() => setQuestionnaireOpen(false)}
        onComplete={handleQuestionnaireComplete}
      />
    </div>
  );
}
