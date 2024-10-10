import Answer from "./Answer";
import {useContext} from "react";
import {QuizContext} from "../contexts/quiz";

const Question = ({questions}) => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    return (<div>
        <div className="question">{currentQuestion.question}</div>
        <div className="answers">
            {quizState.answers.map((answer, index) => (
                <Answer
                    answerText={answer}
                    key={index}
                    index={index}
                    selectedAnswer={quizState.selectedAnswer}
                    correctAnswer={currentQuestion.correctAnswer}
                    onSelectAnswer={
                    (answerText) => dispatch({type: 'SELECT_ANSWER', payload: answerText })} />
            ))}
        </div>
    </div>);}

export default Question;