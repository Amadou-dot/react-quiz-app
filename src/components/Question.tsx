import { IQuestion } from '../types/QResponse';
import Options from './Options';
import { useQuestions } from '../context/QuestionsContext';
export default function Question() {
  const {state, dispatch} = useQuestions();
  const {questions, currentQuestion, answer} = state;
  const question: IQuestion = questions[currentQuestion];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
