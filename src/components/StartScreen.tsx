import { useQuestions } from "../context/QuestionsContext";

export default function StartScreen() {
  const {state, dispatch} = useQuestions();
  const numQuestions = state.questions.length;
  return (
    <div className='start'>
      <h2>Welcome to the react quiz!</h2>
      <h3>
        {numQuestions} question{numQuestions === 1 ? '' : 's'} to test your
        mastery.
      </h3>
      <button className="btn btn-ui" onClick={() => dispatch({type:'start'})}>Let's start</button>
    </div>
  );
}
