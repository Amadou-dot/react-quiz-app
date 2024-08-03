import { IAction } from '../types/IAction';

export default function NextButton({
  dispatch,
  answer,
  currentQuestion,
  numQuestions,
  restart,
}: {
  dispatch: React.Dispatch<IAction>;
  restart?: boolean;
  answer?: string | null;
  currentQuestion?: number;
  numQuestions?: number;
}) {
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
