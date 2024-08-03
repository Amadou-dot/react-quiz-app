export default function FinishScreen({
  points,
  possiblePoints,
  highscore,
}: {
  points: number;
  possiblePoints: number;
  highscore: number;
}) {
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
