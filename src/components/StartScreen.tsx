import { IAction } from "../types/IAction";

export default function StartScreen({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: React.Dispatch<IAction>;
}) {
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
