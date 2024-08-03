import { IQuestion } from './QResponse';

export type IAction =
  | { type: 'dataReceived'; payload: IQuestion[] }
  | { type: 'dataFailed' }
  | { type: 'newAnswer'; payload: string }
  | { type: 'setup' }
  | { type: 'start' }
  | { type: 'nextQuestion' }
  | { type: 'restart' }
  | { type: 'tick' };
