import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import Quiz from "./components/Quiz";
import './index.css';
import {QuizProvider} from "./contexts/quiz";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
      <QuizProvider>
          <Quiz />
      </QuizProvider>
  </StrictMode>
);
