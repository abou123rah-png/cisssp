export enum Subject {
  MATH = 'Mathématiques',
  FRENCH = 'Français',
  PC = 'Physique-Chimie',
  SVT = 'SVT',
  HG = 'Histoire-Géographie',
  ENGLISH = 'Anglais',
  PHILOSOPHY = 'Philosophie',
  SPANISH = 'Espagnol'
}

export enum Level {
  SECONDE = '2nde',
  PREMIERE = '1ère',
  TERMINALE = 'Terminale'
}

export enum ExamType {
  DEVOIR = 'Devoir Surveillé',
  COMPO = 'Composition',
  EXO = 'Exercices d\'application',
  QUIZ = 'Quiz rapide'
}

export interface ExamRequest {
  subject: string;
  level: string;
  type: string;
  topic: string;
  difficulty: string;
  duration?: string;
}

export interface GeneratedContent {
  id: string;
  request: ExamRequest;
  examContent: string;
  correctionContent?: string;
  createdAt: Date;
}
