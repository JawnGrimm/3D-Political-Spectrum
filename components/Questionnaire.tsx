
import React, { useState, useMemo } from 'react';
import { questions, AXIS_CONFIGS } from '../questionnaireData';
import type { Question } from '../types';

const ANSWER_OPTIONS = [
  { text: 'Strongly Disagree', value: 1 },
  { text: 'Disagree', value: 2 },
  { text: 'Neutral', value: 3 },
  { text: 'Agree', value: 4 },
  { text: 'Strongly Agree', value: 5 },
];

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface QuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (position: [number, number, number]) => void;
}

export default function Questionnaire({ isOpen, onClose, onComplete }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateAndSubmit(newAnswers);
    }
  };
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  const calculateAndSubmit = (finalAnswers: Record<number, number>) => {
    const rawScores = { x: 0, y: 0, z: 0 };

    questions.forEach((q, index) => {
      let answerValue = finalAnswers[index];
      if (!answerValue) return; // Should not happen in normal flow

      if (q.reverse) {
        answerValue = 6 - answerValue; // Reverses 1-5 scale
      }
      rawScores[q.axis] += answerValue * q.weight;
    });

    // Normalize scores to -1 to 1 range
    const normalize = (score: number, config: { min: number; max: number }) => {
      if (config.max === config.min) return 0;
      return 2 * (score - config.min) / (config.max - config.min) - 1;
    };
    
    let posX = normalize(rawScores.x, AXIS_CONFIGS.x);
    let posY = normalize(rawScores.y, AXIS_CONFIGS.y);
    let posZ = normalize(rawScores.z, AXIS_CONFIGS.z);

    // --- Score to Cube Coordinate System Alignment ---

    // X-Axis (Economic): The questionnaire scores Left-wing answers high, resulting in a normalized score near +1.
    // The cube's X-axis is Left [-] to Right [+]. So we must flip the score.
    posX = -posX;

    // Y-Axis (Authority): The questionnaire scores Libertarian answers high, resulting in a normalized score near +1.
    // The cube's Y-axis is Libertarian [-] to Authoritarian [+]. So we must flip the score.
    posY = -posY;

    // Z-Axis (Cultural): The questionnaire scores Progressive answers high, resulting in a normalized score near +1.
    // The cube's Z-axis is Traditionalist [-] to Progressive [+]. This matches, so no flip is needed.

    onComplete([posX, posY, posZ]);
  };
  
  const reset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    onClose();
  }

  const progress = useMemo(() => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex]);

  if (!isOpen) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md z-30 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-fade-in">
        <header className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Find Your Place</h2>
          <button onClick={reset} className="text-gray-400 hover:text-white transition-colors" aria-label="Close questionnaire">
            <CloseIcon />
          </button>
        </header>

        <div className="p-8 flex-grow">
          <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
          </div>
          <p className="text-gray-400 text-sm mb-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <p className="text-lg text-gray-200 min-h-[6rem]">{currentQuestion.text}</p>
        </div>

        <footer className="p-6 bg-gray-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button 
             onClick={handleBack}
             disabled={currentQuestionIndex === 0}
             className="text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
            Back
          </button>
          <div className="flex flex-wrap justify-center gap-2">
            {ANSWER_OPTIONS.map(({ text, value }) => (
              <button
                key={value}
                onClick={() => handleAnswer(value)}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
              >
                {text}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
