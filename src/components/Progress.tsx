export default function Progress({
  currentQuestion,
  numQuestions,
  points,
  answer,
}: {
  currentQuestion: number;
  numQuestions: number;
  points: number;
  answer: string | null;
}) {
  return (
    <header className='progress'>
      <progress
        value={currentQuestion + Number(answer !== null)}
        max={numQuestions}></progress>
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {numQuestions}
      </p>
    </header>
  );
}
