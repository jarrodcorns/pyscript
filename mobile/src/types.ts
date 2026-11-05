export type PhaseId = 1 | 2 | 3 | 4;

export type DayContent = {
  day: number;
  phase: PhaseId;
  phaseTitle: string;
  title: string;
  theme: string;
  dailyRead: string;
  example: string;
  practice: string;
  reflection: string;
  evidenceNote: string;
  sourceIds: string[];
};

export type ResearchSource = {
  id: string;
  title: string;
  publisher: string;
  year: number;
  url: string;
};

export type LearnArticle = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  readingMinutes: number;
  sections: {
    heading: string;
    body: string;
  }[];
  keyPoints: string[];
  sourceIds: string[];
};

import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  Paywall: { dismissible?: boolean } | undefined;
  Day: { day: number };
  Article: { articleId: string };
};

export type MainTabParamList = {
  Today: undefined;
  Journey: undefined;
  Learn: undefined;
  Support: undefined;
};
