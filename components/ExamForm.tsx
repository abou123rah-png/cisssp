import React, { useState } from 'react';
import { Subject, Level, ExamType, ExamRequest } from '../types';

interface ExamFormProps {
  onSubmit: (data: ExamRequest) => void;
  isLoading: boolean;
}

const ExamForm: React.FC<ExamFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ExamRequest>({
    subject: Subject.MATH,
    level: Level.TERMINALE,
    type: ExamType.DEVOIR,
    topic: '',
    difficulty: 'Moyenne',
    duration: '2 heures'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-[#00853F]">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-[#E31B23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Paramètres du Sujet
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#00853F] focus:ring focus:ring-[#00853F] focus:ring-opacity-50 p-2 border"
              >
                {Object.values(Subject).map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau / Classe</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#00853F] focus:ring focus:ring-[#00853F] focus:ring-opacity-50 p-2 border"
              >
                {Object.values(Level).map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type d'évaluation</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#00853F] focus:ring focus:ring-[#00853F] focus:ring-opacity-50 p-2 border"
              >
                {Object.values(ExamType).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulté</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#00853F] focus:ring focus:ring-[#00853F] focus:ring-opacity-50 p-2 border"
              >
                <option value="Facile">Facile (Révisions)</option>
                <option value="Moyenne">Moyenne (Standard)</option>
                <option value="Difficile">Difficile (Excellence)</option>
                <option value="Type Bac">Type Bac / BFEM</option>
              </select>
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chapitre / Thème précis</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Ex: Les nombres complexes, La Guerre Froide..."
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#00853F] focus:ring focus:ring-[#00853F] focus:ring-opacity-50 p-2 border"
            />
          </div>

           {/* Duration */}
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Durée de l'épreuve</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Ex: 4 heures"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#00853F] focus:ring focus:ring-[#00853F] focus:ring-opacity-50 p-2 border"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E31B23] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'}
                transition-colors duration-200`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Conception en cours...
                </span>
              ) : (
                'GÉNÉRER LE SUJET'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamForm;