import { createContext, useContext } from "react";
import { initialState } from "../data/initialState";
import { IAction } from "../types/IAction";

export const QuestionsContext = createContext({
    state: initialState,
    dispatch: (() => null) as React.Dispatch<IAction>
  });

  export const useQuestions = () => {
    const context = useContext(QuestionsContext);
    if (!context) {
      throw new Error("useQuestions must be used within a QuestionsProvider");
    }
    return context;
  };
  