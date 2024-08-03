import { useReducer } from 'react';
interface ICount {
  type: 'inc' | 'dec' | 'setCount' | 'setStep' | 'reset';
  payload?: number;
}
interface IState {
  count: number;
  step: number;
}
const reducer = (state: IState, action: ICount) => {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'setCount':
      return {
        ...state,
        count: action.payload === undefined ? state.count : action.payload,
      };
    case 'setStep':
      return {
        ...state,
        step: action.payload === undefined ? state.step : action.payload,
      };
    case 'reset':
      return { count: 0, step: 1 };
    default:
      throw new Error('Unknown action');
  }
};

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = () => dispatch({ type: 'dec' });
  const inc = () => dispatch({ type: 'inc' });
  const reset = () => dispatch({ type: 'reset' });

  const defineCount = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setCount', payload: Number(e.target.value) });

  const defineStep = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setStep', payload: Number(e.target.value) });

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
