import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface ResultDisplayProps {
  content: any;
  onGenerateCorrection: () => void;
  isGeneratingCorrection: boolean;
}

export default function ResultDisplay({ content, onGenerateCorrection, isGeneratingCorrection }: ResultDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">Sujet généré</h2>
        {!content.correctionContent && (
          <button
            onClick={onGenerateCorrection}
            disabled={isGeneratingCorrection}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {isGeneratingCorrection ? 'Génération...' : 'Générer la correction'}
          </button>
        )}
      </div>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {content.examContent}
        </ReactMarkdown>
      </div>

      {content.correctionContent && (
        <div className="mt-12 pt-8 border-t-4 border-green-600">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Corrigé détaillé</h3>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {content.correctionContent}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}