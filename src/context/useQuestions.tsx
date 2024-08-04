import { useReducer } from "react";
import { initialState } from "../data/initialState";
import { reducer } from "../helpers/reducer";
import { QuestionsContext } from "./QuestionsContext";


export const QuestionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QuestionsContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionsContext.Provider>
  );
};

