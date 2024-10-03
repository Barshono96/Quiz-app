// context/QuizContext.tsx
import { createContext, useState, ReactNode } from "react";

interface QuizContextProps {
  quizTitle: string;
  timeLimit: number;
  quizActive: boolean;
  activateQuiz: (title: string, time: number) => void;
}

export const QuizContext = createContext<QuizContextProps>({
  quizTitle: "",
  timeLimit: 0,
  quizActive: false,
  activateQuiz: () => {},
});

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [quizActive, setQuizActive] = useState(false);

  const activateQuiz = (title: string, time: number) => {
    setQuizTitle(title);
    setTimeLimit(time);
    setQuizActive(true);
  };

  return (
    <QuizContext.Provider value={{ quizTitle, timeLimit, quizActive, activateQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
