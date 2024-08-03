// TODO: Allow user to choose number of questions
// TODO: Allow user to filter difficulty of questions
// TODO: Allow user to filter category of questions
// TODO: Allow user to choose time per question
// TODO: Save highscore to {somewhere}
// TODO: Allow user to go back to previous question
// TODO: Add more questions
import { useEffect, useReducer } from 'react';
import { IState } from './types/IState';
import { IAction } from './types/IAction';
import { IQuestion } from './types/QResponse';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
// import Timer from './components/Timer';

// const SEC_PER_QUESTION = 30;
const NUM_QUESTIONS = 10;
const initialState: IState = {
  questions: [],
  status: 'loading',
  currentQuestion: 0,
  answer: null,
  points: 0,
  highscore: 0,
  // secondsRemaining: null,
};

const reducer = (state: IState, action: IAction): IState => {
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
        // secondsRemaining: state.questions.length * SEC_PER_QUESTION,
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
        // secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    // case 'tick': {
    //   if (!state.secondsRemaining) return state;

    //   if (state.secondsRemaining <= 0) {
    //     return {
    //       ...state,
    //       status: 'finished',
    //       highscore:
    //         state.points > state.highscore ? state.points : state.highscore,
    //     };
    //   }
    //   return {
    //     ...state,
    //     secondsRemaining: state.secondsRemaining - 1,
    //   };
    // }
    default:
      throw new Error('Invalid action type');
  }
};

const decodeEntities = (str: string) =>
  str.replace(/&quot;/g, '"').replace(/&#039;/g, "'");

export default function App() {
  const [
    {
      questions,
      status,
      currentQuestion,
      answer,
      points,
      highscore,
      // secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  // fetch data from the server and update the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${NUM_QUESTIONS}&category=18&type=multiple`
        );
        const data = await res.json();
        const newData: IQuestion[] = data.results.map(
          (question: IQuestion) => ({
            ...question,
            // decode the HTML entities in the questions and answers
            question: decodeEntities(question.question),
            incorrect_answers: question.incorrect_answers.map((ans: string) =>
              decodeEntities(ans)
            ),
          })
        );
        dispatch({ type: 'dataReceived', payload: newData });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
      }
    };
    fetchData();
  }, []);
  return (
    <div className='app'>
      <Header />
      <Main>
        {/* render the appropriate component based on the status */}
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorDisplay />}
        {status === 'ready' && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              currentQuestion={currentQuestion}
              numQuestions={questions.length}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[currentQuestion]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              {/* {<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />} */}
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={questions.length}
                currentQuestion={currentQuestion}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishScreen
              points={points}
              possiblePoints={questions.length}
              highscore={highscore}
            />
            <NextButton dispatch={dispatch} restart />
          </>
        )}
      </Main>
    </div>
  );
}
