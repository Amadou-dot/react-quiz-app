import { IState } from "../types/IState";

export const initialState: IState = {
    questions: [],
    status: 'loading',
    currentQuestion: 0,
    answer: null,
    points: 0,
    highscore: 0,
  };