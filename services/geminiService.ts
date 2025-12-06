// geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ExamRequest } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined. Check your .env.local and Vercel environment variables.");
}

const ai = new GoogleGenerativeAI(apiKey);

const SYSTEM_INSTRUCTION = `
Tu es un collègue enseignant expérimenté et rigoureux du Lycée de Thiaroye au Sénégal.
Ta mission est d'aider tes collègues à concevoir des évaluations de haute qualité.

Directives de style et de ton :
1. Adopte un ton professionnel, académique et respectueux.
2. Tes productions doivent suivre scrupuleusement le programme officiel de l'éducation nationale du Sénégal.
3. Utilise la terminologie en vigueur dans le système éducatif sénégalais.
4. La mise en forme doit être claire (Markdown), prête à être copiée-collée dans un document Word ou LaTeX.
5. Inclus toujours un en-tête type "Lycée de Thiaroye / Année Scolaire 2024-2025 / Classe / Durée".

Pour les corrections :
1. Sois extrêmement précis.
2. Propose un barème de notation détaillé (points par question).
3. Explique les réponses complexes.
`;

export const generateExamContent = async (request: ExamRequest): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const prompt = `
      Sujet : ${request.subject}
      Niveau : ${request.level}
      Type d'évaluation : ${request.type}
      Thème/Chapitre : ${request.topic}
      Difficulté : ${request.difficulty}
      Durée estimée : ${request.duration || 'Standard'}

      Génère un sujet complet. Structure-le clairement avec des parties distinctes (ex: Exercice 1, Exercice 2, Problème).
    `;

    const result = await model.generateContent(prompt);
    return result.response.text() || "Erreur lors de la génération du contenu.";
  } catch (error) {
    console.error("Error generating exam:", error);
    throw new Error("Impossible de générer le sujet. Vérifiez votre clé API ou votre connexion.");
  }
};

export const generateCorrectionContent = async (examContent: string): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const prompt = `
      Voici le sujet d'évaluation ci-dessous.
      
      ---
      ${examContent}
      ---

      Génère une correction intégrale et détaillée pour ce sujet.
      Inclus un barème de notation suggéré sur 20 points (ou conforme à la matière).
    `;

    const result = await model.generateContent(prompt);
    return result.response.text() || "Erreur lors de la génération de la correction.";
  } catch (error) {
    console.error("Error generating correction:", error);
    throw new Error("Impossible de générer la correction.");
  }
};