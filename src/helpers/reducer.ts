import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
      // case 'setup':
      case 'dataReceived':
        return {
          ...state,
          questions: action.payload,
          status: 'ready',
        };
      case 'dataFailed':
        return { ...state, status: 'error', questions: [] };
      case 'start':
        return {
          ...state,
          status: 'active',
        };
      case 'newAnswer': {
        const question = state.questions[state.currentQuestion];
        return {
          ...state,
          answer: action.payload,
          // add points if the answer is correct
          points:
            question.correct_answer === action.payload
              ? state.points + 1
              : state.points,
        };
      }
      case 'nextQuestion': {
        // check if the current question is the last question and return the appropriate state
        return state.currentQuestion === state.questions.length - 1
          ? {
              ...state,
              status: 'finished',
              highscore:
                state.points > state.highscore ? state.points : state.highscore,
            }
          : {
              ...state,
              currentQuestion: state.currentQuestion + 1,
              answer: null,
            };
      }
      case 'restart':
        return {
          ...state,
          status: 'active',
          currentQuestion: 0,
          answer: null,
          points: 0,
        };
      
      default:
        throw new Error('Invalid action type');
    }
  };