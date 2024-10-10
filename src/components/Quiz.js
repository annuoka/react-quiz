import Question from "./Question";
import {useContext, useEffect} from "react";
import {QuizContext} from "../contexts/quiz";
import CategorySelect from "./CategorySelect";
import {fetchQuestions} from "../helpers";


const Quiz = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const quizLength = quizState.questions.length;
    const categoriesUrl = 'https://opentdb.com/api_category.php';

    useEffect(() => {
        if (quizState.error || quizState.categories.length > 0) {
            return;
        }
        console.log('categories');
        fetch(categoriesUrl)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'SET_CATEGORIES', payload: data.trivia_categories});
            }).catch(error => {
                dispatch({type: 'SERVER_ERROR', payload: error.message});
        });
    });

    useEffect(() => {
        if (quizState.error || quizState.questions.length > 0 || !quizState.currentCategory) {
            return;
        }
        fetchQuestions(quizState.currentCategory)
            .then(data => {
                dispatch({type: 'SET_QUESTIONS', payload: data.results});
            }).catch(error => {
            dispatch({type: 'SERVER_ERROR', payload: error.message});

        });
    });

    return (<div className="quiz">
        {!quizState.currentCategory && (<div className="category">
                <CategorySelect />
        </div>)}

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
                New Quiz
            </div>
        </div>)
        }
    </div>);
};

export default Quiz;