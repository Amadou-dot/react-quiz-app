import { IAction } from '../types/IAction';
import { IQuestion } from '../types/QResponse';

export default function Options({
  question,
  dispatch,
  answer,
}: {
  question: IQuestion;
  dispatch: React.Dispatch<IAction>;
  answer: string | null;
}) {
  const hasAnswered = answer !== null;
  const questionOptions = [
    ...question.incorrect_answers,
    question.correct_answer,
  ];
  return (
    <div className='options'>
      {questionOptions.map(option => (
        <button
          className={`btn btn-option ${option === answer ? 'answer' : ''} ${
            hasAnswered && option === question.correct_answer
              ? 'correct'
              : !hasAnswered
              ? ''
              : 'wrong'
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: option })}>
          {option}
        </button>
      ))}
    </div>
  );
}
