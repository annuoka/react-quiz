import Question from "./Question";
import {useContext, useEffect} from "react";
import {QuizContext} from "../contexts/quiz";


const Quiz = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const quizLength = quizState.questions.length;
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple';

    useEffect(() => {
        if (quizState.error || quizState.questions.length > 0) {
            return;
        }
        console.log('init');
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'SET_QUESTIONS', payload: data.results});
            }).catch(error => {
                dispatch({type: 'SERVER_ERROR', payload: error.message});
        });
    });

    return (<div className="quiz">

        {quizState.error && (<div className="results">

            <div className="message-title">Server Error</div>
            <div className="message-info">
                <div>{quizState.error}</div>
            </div>
        </div>)
        }

        {!quizState.showResults && quizState.questions.length > 0 && (<div>
            <div className="score">Question {quizState.currentQuestionIndex + 1}/{quizLength}</div>
            <Question/>
            <div className="next-button"
                 onClick={() => dispatch({type: 'NEXT_QUESTION'})}>
                Next Question
            </div>
        </div>)}

        {quizState.showResults && (<div className="results">

            <div className="message-title">Congratulations!</div>
            <div className="message-info">
                <div>You have completed the quiz!</div>
                <div>You've got {quizState.correctAnswers} of {quizLength}</div>
            </div>
            <div className="next-button"
                 onClick={() => dispatch({type: 'RESTART'})}>
                Restart Quiz
            </div>
        </div>)
        }
    </div>);
};

export default Quiz;