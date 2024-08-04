import { useQuestions } from "../context/QuestionsContext";

export default function Progress() {
  const {state} = useQuestions();
  const {currentQuestion, points, answer} = state;
  const numQuestions = state.questions.length;
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
