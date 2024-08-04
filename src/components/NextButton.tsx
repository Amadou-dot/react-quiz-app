import { useQuestions } from '../context/QuestionsContext';
export default function NextButton({restart}: {restart?: boolean;}) {
  const {state, dispatch} = useQuestions();
  const {currentQuestion, answer} = state;
  const numQuestions = state.questions.length;
  if (restart)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}>
        Restart quiz
      </button>
    );
  let text = 'Next';
  if (answer === null) return null;
  else if (numQuestions && currentQuestion === numQuestions - 1)
    text = 'Finish';

  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'nextQuestion' })}>
      {text}
    </button>
  );
}
