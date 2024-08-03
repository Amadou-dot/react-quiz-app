import { IQuestion } from './QResponse';

export interface IState {
  questions: IQuestion[];
  // 'loading' | 'error' | 'ready' | 'active' | 'finished';
  status: string;
  currentQuestion: number;
  answer: string | null;
  points: number;
  highscore: number;
  // secondsRemaining: number | null;
}
