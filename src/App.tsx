import { useEffect } from 'react';
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
import { decodeEntities } from './helpers/decodeEntities';
import { useQuestions } from './context/QuestionsContext';

const NUM_QUESTIONS = 10;

export default function App() {
  const {state, dispatch} = useQuestions();
  const { status }  = state;

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
  }, [dispatch]);
  return (
    <div className='app'>
      <Header />
      <Main>
        {/* render the appropriate component based on the status */}
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorDisplay />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishScreen />
            <NextButton restart />
          </>
        )}
      </Main>
    </div>
  );
}
