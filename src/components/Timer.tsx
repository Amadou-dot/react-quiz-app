import { useEffect } from 'react';
import { IAction } from '../types/IAction';

export default function Timer({
  dispatch,
  secondsRemaining,
}: {
  dispatch: React.Dispatch<IAction>;
  secondsRemaining: number | null;
}) {
  const mins = Math.floor((secondsRemaining || 0) / 60);
  const secs = (secondsRemaining || 0) % 60;
  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <p className='timer'>
      {mins < 10 && '0'}
      {mins}:{secs < 10 && '0'}
      {secs}
    </p>
  );
}
