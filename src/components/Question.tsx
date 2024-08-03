import React from 'react';
import { IAction } from '../types/IAction';
import { IQuestion } from '../types/QResponse';
import Options from './Options';
export default function Question({
  question,
  dispatch,
  answer,
}: {
  question: IQuestion;
  dispatch: React.Dispatch<IAction>;
  answer: string | null;
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
