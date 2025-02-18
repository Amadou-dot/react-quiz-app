import { useQuestions } from "../context/QuestionsContext";

export default function FinishScreen() {
  const {state} = useQuestions();
  const {highscore, points} = state;
  const possiblePoints = state.questions.length;
  const percentage = (points / possiblePoints) * 100;
  let feedback = '';
  if (percentage === 100) feedback = 'Perfect!';
  else if (percentage >= 80) feedback = 'Well done!';
  else if (percentage >= 50) feedback = 'Good effort!';
  else feedback = 'Keep practicing!';
  return (
    <>
      <p className='result'>
        {feedback} You scored <strong>{points}</strong> points out of{' '}
        {possiblePoints} ({Math.round(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>
    </>
  );
}
