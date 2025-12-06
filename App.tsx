import React, { useState } from 'react';
import Header from './components/Header';
import ExamForm from './components/ExamForm';
import ResultDisplay from './components/ResultDisplay';
import { generateExamContent, generateCorrectionContent } from './services/geminiService';
import { ExamRequest, GeneratedContent } from './types';

function App() {
  const [currentContent, setCurrentContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [correctionLoading, setCorrectionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateExam = async (request: ExamRequest) => {
    setLoading(true);
    setError(null);
    try {
      const text = await generateExamContent(request);
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        request: request,
        examContent: text,
        createdAt: new Date()
      };
      setCurrentContent(newContent);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCorrection = async () => {
    if (!currentContent) return;
    
    setCorrectionLoading(true);
    setError(null);
    try {
      const correction = await generateCorrectionContent(currentContent.examContent);
      setCurrentContent(prev => prev ? { ...prev, correctionContent: correction } : null);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la correction.");
    } finally {
      setCorrectionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Banner */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border-l-4 border-[#FDEF42] flex items-start">
           <div className="flex-shrink-0">
             <span className="text-2xl">🇸🇳</span>
           </div>
           <div className="ml-4">
             <h2 className="text-lg font-bold text-gray-800">Bienvenue dans l'espace numérique du Lycée</h2>
             <p className="text-gray-600 mt-1">
               Utilisez cet outil pour préparer vos devoirs, compositions et exercices. 
               L'assistant respecte le programme officiel sénégalais.
             </p>
           </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Erreur : </strong>
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setError(null)} className="fill-current h-6 w-6 text-red-500 role=button" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-1">
            <ExamForm onSubmit={handleGenerateExam} isLoading={loading} />
            
            <div className="mt-6 bg-[#00853F] bg-opacity-10 rounded-lg p-4 border border-[#00853F]">
              <h4 className="text-[#00853F] font-bold text-sm mb-2 uppercase">Astuce Pédagogique</h4>
              <p className="text-xs text-green-800">
                Soyez précis dans le champ "Chapitre/Thème". Plus le contexte est clair, plus le sujet sera adapté au niveau de vos élèves.
              </p>
            </div>
          </div>

          {/* Right Column: Result */}
          <div className="lg:col-span-2 min-h-[500px]">
            {currentContent ? (
              <ResultDisplay 
                content={currentContent} 
                onGenerateCorrection={handleGenerateCorrection}
                isGeneratingCorrection={correctionLoading}
              />
            ) : (
              <div className="h-full bg-white rounded-xl shadow-sm border border-dashed border-gray-300 flex flex-col items-center justify-center p-12 text-center text-gray-400">
                <svg className="w-20 h-20 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium text-gray-500">Aucun sujet généré</p>
                <p className="text-sm mt-2">Remplissez le formulaire à gauche pour créer votre première évaluation.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2025 Lycée de Thiaroye. Fait avec passion pour l'éducation au Sénégal.
          </p>
          <div className="flex justify-center space-x-2 mt-2">
            <div className="w-8 h-1 bg-[#00853F]"></div>
            <div className="w-8 h-1 bg-[#FDEF42]"></div>
            <div className="w-8 h-1 bg-[#E31B23]"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;